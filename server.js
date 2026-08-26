const http = require("http");
const net = require("net");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 5173);
const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, "public");
const DATA_DIR = path.join(ROOT, "data");
const UPLOADS_DIR = path.join(PUBLIC_DIR, "uploads");
const DB_FILE = path.join(DATA_DIR, "toilets.json");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const NOMINATIM_REVERSE_URL = "https://nominatim.openstreetmap.org/reverse";
const NOMINATIM_SEARCH_URL = "https://nominatim.openstreetmap.org/search";
const DEFAULT_USER_DISPLAY_NAME = "Bathroom Scout";
const TEST_USER = {
  id: "test-admin",
  displayName: "Test Admin",
  email: "test",
  authProvider: "test"
};

try {
  const envFile = require("fs").readFileSync(path.join(ROOT, ".env"), "utf8");
  envFile.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);
    if (!match || process.env[match[1]]) return;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  });
} catch {
  // Local .env is optional.
}

const SUPABASE_URL = cleanText(process.env.SUPABASE_URL).replace(/\/$/, "");
const SUPABASE_ANON_KEY = cleanText(process.env.SUPABASE_ANON_KEY);
const reverseGeocodeCache = new Map();
const searchPlaceCache = new Map();
let lastReverseLookupAt = 0;
let lastSearchLookupAt = 0;

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

async function ensureStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, "[]\n");
  }

  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, "[]\n");
  }
}

async function readToilets() {
  await ensureStorage();
  const raw = await fs.readFile(DB_FILE, "utf8");
  return JSON.parse(raw || "[]");
}

async function writeToilets(toilets) {
  await ensureStorage();
  await fs.writeFile(DB_FILE, `${JSON.stringify(toilets, null, 2)}\n`);
}

async function readUsers() {
  await ensureStorage();
  const raw = await fs.readFile(USERS_FILE, "utf8");
  return JSON.parse(raw || "[]");
}

async function writeUsers(users) {
  await ensureStorage();
  await fs.writeFile(USERS_FILE, `${JSON.stringify(users, null, 2)}\n`);
}

async function upsertUser(displayName) {
  const name = cleanText(displayName);
  if (!name || name.toLowerCase() === "anonymous") return null;

  const users = await readUsers();
  const existingUser = users.find((user) => user.displayName.toLowerCase() === name.toLowerCase());
  const now = new Date().toISOString();

  if (existingUser) {
    existingUser.updatedAt = now;
    await writeUsers(users);
    return existingUser;
  }

  const user = {
    id: crypto.randomUUID(),
    displayName: name,
    createdAt: now,
    updatedAt: now
  };
  users.unshift(user);
  await writeUsers(users);
  return user;
}

async function upsertSupabaseUser(authUser) {
  if (!authUser?.id) return null;

  const users = await readUsers();
  const existingUser = users.find((user) => user.id === authUser.id);
  const now = new Date().toISOString();
  const displayName =
    cleanText(authUser.user_metadata?.display_name) ||
    cleanText(authUser.user_metadata?.name) ||
    cleanText(authUser.email) ||
    DEFAULT_USER_DISPLAY_NAME;

  if (existingUser) {
    existingUser.displayName = displayName;
    existingUser.email = cleanText(authUser.email) || existingUser.email || null;
    existingUser.authProvider = "supabase";
    existingUser.updatedAt = now;
    await writeUsers(users);
    return existingUser;
  }

  const user = {
    id: authUser.id,
    displayName,
    email: cleanText(authUser.email) || null,
    authProvider: "supabase",
    createdAt: now,
    updatedAt: now
  };
  users.unshift(user);
  await writeUsers(users);
  return user;
}

async function upsertTestUser() {
  const users = await readUsers();
  const existingUser = users.find((user) => user.id === TEST_USER.id);
  const now = new Date().toISOString();

  if (existingUser) {
    Object.assign(existingUser, TEST_USER, { updatedAt: now });
    await writeUsers(users);
    return existingUser;
  }

  const user = {
    ...TEST_USER,
    createdAt: now,
    updatedAt: now
  };
  users.unshift(user);
  await writeUsers(users);
  return user;
}

async function findUserById(userId) {
  const id = cleanText(userId);
  if (!id) return null;

  const users = await readUsers();
  return users.find((user) => user.id === id) || null;
}

function authConfig() {
  return {
    provider: SUPABASE_URL && SUPABASE_ANON_KEY ? "supabase" : "local",
    supabaseUrl: SUPABASE_URL || null,
    supabaseAnonKey: SUPABASE_ANON_KEY || null
  };
}

function bearerToken(req) {
  const header = req.headers.authorization || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : "";
}

async function supabaseAuthUserFromRequest(req) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;

  const token = bearerToken(req);
  if (!token) return null;

  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) return null;
  return response.json();
}

function isTestAuthRequest(req) {
  return req.headers["x-shitterscene-test-auth"] === "test";
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(payload));
}

function sendError(res, statusCode, message) {
  sendJson(res, statusCode, { error: message });
}

async function readJsonBody(req) {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;
    if (size > 7 * 1024 * 1024) {
      throw new Error("Request is too large. Please use a photo under 5 MB.");
    }
    chunks.push(chunk);
  }

  const body = Buffer.concat(chunks).toString("utf8");
  return body ? JSON.parse(body) : {};
}

function cleanText(value) {
  return String(value || "").trim();
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidCoordinate(latitude, longitude) {
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

function placeLabelFromReverseResult(result) {
  if (!result) return "";

  const address = result.address || {};
  const namedPlace =
    result.name ||
    address.amenity ||
    address.shop ||
    address.tourism ||
    address.leisure ||
    address.building;
  const locality = address.city || address.town || address.village || address.neighbourhood;
  const street = [address.house_number, address.road].filter(Boolean).join(" ");

  if (namedPlace && locality) return `${namedPlace}, ${locality}`;
  if (namedPlace) return namedPlace;
  if (street && locality) return `${street}, ${locality}`;
  if (street) return street;

  return result.display_name || "";
}

async function reverseGeocode(latitude, longitude) {
  const cacheKey = `${latitude.toFixed(5)},${longitude.toFixed(5)}`;
  if (reverseGeocodeCache.has(cacheKey)) return reverseGeocodeCache.get(cacheKey);

  const waitMs = Math.max(0, 1000 - (Date.now() - lastReverseLookupAt));
  if (waitMs) await delay(waitMs);
  lastReverseLookupAt = Date.now();

  const url = new URL(NOMINATIM_REVERSE_URL);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  url.searchParams.set("zoom", "18");
  url.searchParams.set("addressdetails", "1");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "ShitterScenePrototype/0.1 local-development"
      }
    });

    if (!response.ok) throw new Error("Place lookup failed.");

    const result = await response.json();
    const place = placeLabelFromReverseResult(result);
    reverseGeocodeCache.set(cacheKey, place);
    return place;
  } finally {
    clearTimeout(timeout);
  }
}

function placeLabelFromSearchResult(result) {
  if (!result) return "";

  const address = result.address || {};
  const locality = address.city || address.town || address.village || address.county || address.state;
  const namedPlace = result.name || address.amenity || address.shop || address.tourism;

  if (namedPlace && locality) return `${namedPlace}, ${locality}`;
  return result.display_name || namedPlace || locality || "";
}

async function searchPlace(query) {
  const normalizedQuery = cleanText(query).replace(/\s+/g, " ");
  const cacheKey = normalizedQuery.toLowerCase();
  if (searchPlaceCache.has(cacheKey)) return searchPlaceCache.get(cacheKey);

  const waitMs = Math.max(0, 1000 - (Date.now() - lastSearchLookupAt));
  if (waitMs) await delay(waitMs);
  lastSearchLookupAt = Date.now();

  const url = new URL(NOMINATIM_SEARCH_URL);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("q", normalizedQuery);
  url.searchParams.set("limit", "1");
  url.searchParams.set("addressdetails", "1");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "ShitterScenePrototype/0.1 local-development"
      }
    });

    if (!response.ok) throw new Error("Place search failed.");

    const results = await response.json();
    const firstResult = Array.isArray(results) ? results[0] : null;
    const place = firstResult
      ? {
          label: placeLabelFromSearchResult(firstResult),
          lat: Number(firstResult.lat),
          lng: Number(firstResult.lon)
        }
      : null;
    searchPlaceCache.set(cacheKey, place);
    return place;
  } finally {
    clearTimeout(timeout);
  }
}

function validateToilet(payload) {
  const location = cleanText(payload.location);
  const state = cleanText(payload.state).toUpperCase();
  const latitude = Number(payload.latitude);
  const longitude = Number(payload.longitude);
  const review = cleanText(payload.review);
  const rating = Number(payload.rating);
  const freeAccess = cleanText(payload.freeAccess);

  if (!location) return "Location is required.";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return "Rating must be a whole number from 1 to 5.";
  }
  if (!review) return "Review is required.";
  if (location.length > 160) return "Location must be 160 characters or less.";
  if (state && state.length !== 2) return "State must be a two-letter abbreviation.";
  if (payload.latitude && !Number.isFinite(latitude)) return "Latitude must be a number.";
  if (payload.longitude && !Number.isFinite(longitude)) return "Longitude must be a number.";
  if (review.length > 1200) return "Review must be 1200 characters or less.";
  if (freeAccess && !["yes", "no", "unsure"].includes(freeAccess)) {
    return "Free access must be yes, no, or not sure.";
  }

  return null;
}

async function savePhoto(photoDataUrl) {
  if (!photoDataUrl) return null;

  const match = String(photoDataUrl).match(
    /^data:image\/(png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=]+)$/
  );
  if (!match) {
    throw new Error("Photo must be a PNG, JPG, or WebP image.");
  }

  const extension = match[1] === "jpeg" ? "jpg" : match[1];
  const buffer = Buffer.from(match[2], "base64");
  if (buffer.length > 5 * 1024 * 1024) {
    throw new Error("Photo must be under 5 MB.");
  }

  const filename = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  await fs.writeFile(path.join(UPLOADS_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

async function handleApi(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/api/auth-config") {
    sendJson(res, 200, authConfig());
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/session") {
    if (isTestAuthRequest(req)) {
      const user = await upsertTestUser();
      sendJson(res, 200, user);
      return;
    }

    const authUser = await supabaseAuthUserFromRequest(req);
    if (!authUser) {
      sendError(res, 401, "Log in to continue.");
      return;
    }

    const user = await upsertSupabaseUser(authUser);
    sendJson(res, 200, user);
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/toilets") {
    const toilets = await readToilets();
    sendJson(res, 200, toilets);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/test-login") {
    const payload = await readJsonBody(req);
    const username = cleanText(payload.username).toLowerCase();
    const password = cleanText(payload.password);

    if (username !== "test" || password !== "test") {
      sendError(res, 401, "Use test / test for the prototype login.");
      return;
    }

    const user = await upsertTestUser();
    sendJson(res, 200, user);
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/users") {
    const users = await readUsers();
    sendJson(res, 200, users);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/users") {
    const payload = await readJsonBody(req);
    const displayName = cleanText(payload.displayName);

    if (!displayName) {
      sendError(res, 400, "Display name is required.");
      return;
    }

    if (displayName.length > 60) {
      sendError(res, 400, "Display name must be 60 characters or less.");
      return;
    }

    const user = await upsertUser(displayName);
    sendJson(res, 201, user);
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/current-user") {
    const user = await upsertUser(DEFAULT_USER_DISPLAY_NAME);
    sendJson(res, 200, user);
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/reverse-geocode") {
    const latitude = Number(url.searchParams.get("lat"));
    const longitude = Number(url.searchParams.get("lng"));

    if (!isValidCoordinate(latitude, longitude)) {
      sendError(res, 400, "Latitude and longitude are required.");
      return;
    }

    try {
      const place = await reverseGeocode(latitude, longitude);
      sendJson(res, 200, { place });
    } catch {
      sendJson(res, 200, { place: "" });
    }
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/search-place") {
    const query = cleanText(url.searchParams.get("q"));

    if (!query || query.length < 2) {
      sendError(res, 400, "Search for a city, address, or place.");
      return;
    }

    if (query.length > 120) {
      sendError(res, 400, "Search must be 120 characters or less.");
      return;
    }

    try {
      const place = await searchPlace(query);
      sendJson(res, 200, { place });
    } catch {
      sendJson(res, 200, { place: null });
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/toilets") {
    const payload = await readJsonBody(req);
    const validationError = validateToilet(payload);

    if (validationError) {
      sendError(res, 400, validationError);
      return;
    }

    const photoUrl = await savePhoto(payload.photoDataUrl);
    const authUser = await supabaseAuthUserFromRequest(req);
    const isTestUser = isTestAuthRequest(req);
    if (SUPABASE_URL && SUPABASE_ANON_KEY && !authUser && !isTestUser) {
      sendError(res, 401, "Log in to add a bathroom report.");
      return;
    }

    const selectedUser = authUser
      ? await upsertSupabaseUser(authUser)
      : isTestUser
        ? await upsertTestUser()
      : await findUserById(payload.userId);
    const user = selectedUser || await upsertUser(DEFAULT_USER_DISPLAY_NAME);
    const toilets = await readToilets();
    const location = cleanText(payload.location);
    const state = cleanText(payload.state).toUpperCase();
    const freeAccess = cleanText(payload.freeAccess);
    const toilet = {
      id: crypto.randomUUID(),
      barName: location,
      userId: user?.id || null,
      rankedBy: user?.displayName || "Anonymous",
      location,
      state: state || null,
      latitude: payload.latitude ? Number(payload.latitude) : null,
      longitude: payload.longitude ? Number(payload.longitude) : null,
      rating: Number(payload.rating),
      freeAccess: freeAccess || "unsure",
      review: cleanText(payload.review),
      photoUrl,
      createdAt: new Date().toISOString()
    };

    toilets.unshift(toilet);
    await writeToilets(toilets);
    sendJson(res, 201, toilet);
    return;
  }

  sendError(res, 404, "API route not found.");
}

async function serveStatic(req, res) {
  const requestPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  const normalizedPath = path.normalize(decodeURIComponent(requestPath));
  const safePath = normalizedPath === "/" ? "/index.html" : normalizedPath;
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const file = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream"
    });
    res.end(file);
  } catch {
    const fallback = await fs.readFile(path.join(PUBLIC_DIR, "index.html"));
    res.writeHead(200, { "Content-Type": MIME_TYPES[".html"] });
    res.end(fallback);
  }
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.url.startsWith("/api/")) {
      await handleApi(req, res);
      return;
    }

    await serveStatic(req, res);
  } catch (error) {
    sendError(res, 500, error.message || "Something went wrong.");
  }
});

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const probe = net.createServer();
    probe.once("error", () => resolve(false));
    probe.once("listening", () => {
      probe.close(() => resolve(true));
    });
    probe.listen(port, HOST);
  });
}

async function findAvailablePort(startPort) {
  for (let port = startPort; port < startPort + 20; port += 1) {
    if (await isPortAvailable(port)) return port;
  }

  throw new Error(`No available local port found from ${startPort} to ${startPort + 19}.`);
}

ensureStorage().then(async () => {
  const port = await findAvailablePort(PORT);
  server.listen(port, HOST, () => {
    console.log(`ShitterScene is running at http://${HOST}:${port}`);
  });
});

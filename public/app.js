const STATES = [
  ["AL", "Alabama", 59, 66, 32.8067, -86.7911],
  ["AK", "Alaska", 15, 79, 61.3707, -152.4044],
  ["AZ", "Arizona", 24, 59, 33.7298, -111.4312],
  ["AR", "Arkansas", 52, 59, 34.9697, -92.3731],
  ["CA", "California", 12, 48, 36.1162, -119.6816],
  ["CO", "Colorado", 35, 46, 39.0598, -105.3111],
  ["CT", "Connecticut", 88, 30, 41.5978, -72.7554],
  ["DE", "Delaware", 84, 42, 39.3185, -75.5071],
  ["FL", "Florida", 75, 82, 27.7663, -81.6868],
  ["GA", "Georgia", 66, 69, 33.0406, -83.6431],
  ["HI", "Hawaii", 32, 84, 21.0943, -157.4983],
  ["IA", "Iowa", 53, 36, 42.0115, -93.2105],
  ["ID", "Idaho", 26, 25, 44.2405, -114.4788],
  ["IL", "Illinois", 59, 42, 40.3495, -88.9861],
  ["IN", "Indiana", 64, 42, 39.8494, -86.2583],
  ["KS", "Kansas", 45, 49, 38.5266, -96.7265],
  ["KY", "Kentucky", 66, 50, 37.6681, -84.6701],
  ["LA", "Louisiana", 55, 70, 31.1695, -91.8678],
  ["MA", "Massachusetts", 90, 27, 42.2302, -71.5301],
  ["MD", "Maryland", 82, 42, 39.0639, -76.8021],
  ["ME", "Maine", 92, 17, 44.6939, -69.3819],
  ["MI", "Michigan", 65, 31, 43.3266, -84.5361],
  ["MN", "Minnesota", 52, 25, 45.6945, -93.9002],
  ["MO", "Missouri", 55, 49, 38.4561, -92.2884],
  ["MS", "Mississippi", 58, 66, 32.7416, -89.6787],
  ["MT", "Montana", 35, 22, 46.9219, -110.4544],
  ["NC", "North Carolina", 76, 58, 35.6301, -79.8064],
  ["ND", "North Dakota", 48, 20, 47.5289, -99.784],
  ["NE", "Nebraska", 45, 40, 41.1254, -98.2681],
  ["NH", "New Hampshire", 89, 24, 43.4525, -71.5639],
  ["NJ", "New Jersey", 85, 38, 40.2989, -74.521],
  ["NM", "New Mexico", 33, 59, 34.8405, -106.2485],
  ["NV", "Nevada", 19, 43, 38.3135, -117.0554],
  ["NY", "New York", 82, 27, 42.1657, -74.9481],
  ["OH", "Ohio", 68, 40, 40.3888, -82.7649],
  ["OK", "Oklahoma", 46, 56, 35.5653, -96.9289],
  ["OR", "Oregon", 17, 30, 44.572, -122.0709],
  ["PA", "Pennsylvania", 78, 37, 40.5908, -77.2098],
  ["RI", "Rhode Island", 91, 30, 41.6809, -71.5118],
  ["SC", "South Carolina", 72, 64, 33.8569, -80.945],
  ["SD", "South Dakota", 47, 30, 44.2998, -99.4388],
  ["TN", "Tennessee", 63, 57, 35.7478, -86.6923],
  ["TX", "Texas", 43, 70, 31.0545, -97.5635],
  ["UT", "Utah", 27, 47, 40.15, -111.8624],
  ["VA", "Virginia", 78, 50, 37.7693, -78.17],
  ["VT", "Vermont", 87, 22, 44.0459, -72.7107],
  ["WA", "Washington", 20, 20, 47.4009, -121.4905],
  ["WI", "Wisconsin", 58, 30, 44.2685, -89.6165],
  ["WV", "West Virginia", 73, 47, 38.4912, -80.9545],
  ["WY", "Wyoming", 36, 34, 42.756, -107.3025]
];

const stateByCode = Object.fromEntries(
  STATES.map(([code, name, x, y, lat, lng]) => [code, { code, name, x, y, lat, lng }])
);
const stateByName = Object.fromEntries(
  Object.values(stateByCode).map((state) => [state.name.toLowerCase(), state])
);

const form = document.querySelector("#toilet-form");
const formMessage = document.querySelector("#form-message");
const loginView = document.querySelector("#login-view");
const loginExistingForm = document.querySelector("#login-existing-form");
const loginCreateForm = document.querySelector("#login-create-form");
const loginTitle = document.querySelector("#login-title");
const loginIntro = document.querySelector("#login-intro");
const loginEmailInput = document.querySelector("#login-email");
const loginPasswordInput = document.querySelector("#login-password");
const loginNewUserNameInput = document.querySelector("#login-new-user-name");
const signupEmailInput = document.querySelector("#signup-email");
const signupPasswordInput = document.querySelector("#signup-password");
const loginSwitchToCreate = document.querySelector("#login-switch-to-create");
const loginSwitchToLogin = document.querySelector("#login-switch-to-login");
const loginMessage = document.querySelector("#login-message");
const mapView = document.querySelector("#map-view");
const newView = document.querySelector("#new-view");
const detailView = document.querySelector("#detail-view");
const profileView = document.querySelector("#profile-view");
const topbar = document.querySelector(".topbar");
const profileNavLink = document.querySelector("[data-nav-link='profile']");
const newNavLink = document.querySelector("[data-nav-link='new']");
const loginNavLink = document.querySelector("[data-nav-link='login']");
const mapViewport = document.querySelector("#map-viewport");
const osmMapEl = document.querySelector("#osm-map");
const mapCanvas = document.querySelector("#map-canvas");
const mapPins = document.querySelector("#map-pins");
const mapCount = document.querySelector("#map-count");
const mapHint = document.querySelector(".map-hint");
const reportPanel = document.querySelector("#report-panel");
const funMetrics = document.querySelector("#fun-metrics");
const recentList = document.querySelector("#recent-list");
const topList = document.querySelector("#top-list");
const profileMetrics = document.querySelector("#profile-metrics");
const profileRecentList = document.querySelector("#profile-recent-list");
const profileTitle = document.querySelector("#profile-title");
const accountName = document.querySelector("#account-name");
const accountMeta = document.querySelector("#account-meta");
const logoutUserButton = document.querySelector("#logout-user");
const stateSelect = document.querySelector("#state");
const latitudeInput = document.querySelector("#latitude");
const longitudeInput = document.querySelector("#longitude");
const mapOriginStatus = document.querySelector("#map-origin-status");
const photoUploadInput = document.querySelector("#photoUpload");
const photoCameraInput = document.querySelector("#photoCamera");
const photoStatus = document.querySelector("#photo-status");
const ratingInputs = [...document.querySelectorAll("input[name='rating']")];
const ratingStatus = document.querySelector("#rating-status");
const mapSearchControl = document.querySelector(".map-search-control");
const mapSearchForm = document.querySelector("#map-search-form");
const mapSearchQuery = document.querySelector("#map-search-query");
const locateUserButton = document.querySelector("#locate-user");
const locationStatus = document.querySelector("#location-status");

let selectedPhotoInput = null;
let toilets = [];
let users = [];
let currentUser = null;
let authReady = false;
let authProvider = "local";
let authMode = "login";
let supabaseClient = null;
let authSession = null;
let mapScale = 1;
let mapOffset = { x: 0, y: 0 };
let isDraggingMap = false;
let dragStart = null;
let osmMap = null;
let osmMarkers = [];
let osmMarkerByToiletId = new Map();
let userLocationMarker = null;
let selectedMapMarker = null;
let selectedFallbackPin = null;
let currentMapSelection = null;
let mapSelectionLookupId = 0;
let hasFitInitialToilets = false;
let previousRoute = "";
const reverseLookupCache = new Map();
const mapPopupOptions = {
  autoPan: false,
  autoPanPaddingBottomRight: [20, 24],
  autoPanPaddingTopLeft: [20, 160],
  className: "selection-popup",
  closeButton: true,
  keepInView: false,
  maxWidth: 280,
  minWidth: 240
};

function stars(rating) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function freeAccessLabel(value) {
  if (value === "yes") return "Free access";
  if (value === "no") return "Purchase required";
  return "Access unknown";
}

function displayNameForToilet(toilet) {
  const user = users.find((entry) => entry.id === toilet.userId);
  return user?.displayName || toilet.rankedBy || "Anonymous";
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function setMessage(message, isError = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle("is-error", isError);
}

function setLoginMessage(message, isError = false) {
  loginMessage.textContent = message;
  loginMessage.classList.toggle("is-error", isError);
}

function setAuthMode(mode) {
  authMode = mode === "create" ? "create" : "login";
  setLoginMessage("");
  renderLoginUsers();
}

function renderHeaderNav() {
  const isLoggedIn = Boolean(currentUser);
  profileNavLink.hidden = !isLoggedIn;
  newNavLink.hidden = !isLoggedIn;
  loginNavLink.hidden = isLoggedIn;
}

async function fetchAuthConfig() {
  const staticConfig = window.SHITTERSCENE_CONFIG || {};
  if (staticConfig.supabaseUrl && staticConfig.supabaseAnonKey) {
    return {
      provider: "supabase",
      supabaseUrl: staticConfig.supabaseUrl,
      supabaseAnonKey: staticConfig.supabaseAnonKey
    };
  }

  try {
    const response = await fetch("/api/auth-config", {
      headers: { Accept: "application/json" }
    });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.includes("application/json")) return { provider: "local" };
    return response.json();
  } catch {
    return { provider: "local" };
  }
}

async function configureAuth() {
  const config = await fetchAuthConfig();
  authProvider = config.provider || "local";
  if (authProvider === "supabase") {
    authMode = "login";
  }

  if (authProvider === "supabase" && window.supabase?.createClient) {
    supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      authSession = session;
      if (!session) {
        currentUser = null;
        clearCurrentUserId();
        authReady = true;
        showRoute();
      }
    });
  } else if (authProvider === "supabase") {
    authProvider = "local";
    setLoginMessage("Supabase auth could not load. Using local prototype login for now.", true);
  }
}

async function apiFetch(url, options = {}) {
  const headers = new Headers(options.headers || {});
  if (authProvider === "supabase" && authSession?.access_token) {
    headers.set("Authorization", `Bearer ${authSession.access_token}`);
  }
  if (currentUser?.authProvider === "test") {
    headers.set("X-ShitterScene-Test-Auth", "test");
  }

  return fetch(url, {
    ...options,
    headers
  });
}

async function appUserFromSession(session) {
  if (!session?.access_token) return null;
  if (supabaseClient) return upsertSupabaseProfile(session.user);

  const response = await apiFetch("/api/session");
  if (!response.ok) return null;
  return response.json();
}

function profileFromRow(row) {
  return {
    id: row.id,
    displayName: row.display_name || row.email || "Bathroom Scout",
    email: row.email || null,
    authProvider: row.auth_provider || "supabase",
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function toiletFromRow(row) {
  return {
    id: row.id,
    barName: row.bar_name,
    userId: row.user_id,
    rankedBy: row.ranked_by,
    location: row.location,
    state: row.state,
    latitude: Number.isFinite(Number(row.latitude)) ? Number(row.latitude) : null,
    longitude: Number.isFinite(Number(row.longitude)) ? Number(row.longitude) : null,
    rating: Number(row.rating),
    freeAccess: row.free_access || "unsure",
    review: row.review,
    photoUrl: row.photo_data_url || null,
    createdAt: row.created_at
  };
}

function cleanInputText(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function validateToiletPayload(payload) {
  const location = cleanInputText(payload.location);
  const rating = Number(payload.rating);
  const review = cleanInputText(payload.review);
  const freeAccess = cleanInputText(payload.freeAccess);

  if (!location) return "Location is required.";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return "Rating must be a whole number from 1 to 5.";
  if (!review) return "Review is required.";
  if (location.length > 160) return "Location must be 160 characters or less.";
  if (review.length > 1200) return "Review must be 1200 characters or less.";
  if (freeAccess && !["yes", "no", "unsure"].includes(freeAccess)) return "Free access must be yes, no, or not sure.";

  return null;
}

async function upsertSupabaseProfile(authUser) {
  if (!supabaseClient || !authUser?.id) return null;

  const profile = {
    id: authUser.id,
    display_name:
      cleanInputText(authUser.user_metadata?.display_name) ||
      cleanInputText(authUser.user_metadata?.name) ||
      cleanInputText(authUser.email) ||
      "Bathroom Scout",
    email: cleanInputText(authUser.email) || null,
    auth_provider: "supabase",
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabaseClient
    .from("profiles")
    .upsert(profile, { onConflict: "id" })
    .select()
    .single();

  if (error) throw error;
  return profileFromRow(data);
}

async function createSupabaseToilet(payload) {
  if (!supabaseClient || !currentUser?.id) throw new Error("Log in to add a bathroom report.");

  const validationError = validateToiletPayload(payload);
  if (validationError) throw new Error(validationError);

  const row = {
    user_id: currentUser.id,
    ranked_by: currentUser.displayName || "Anonymous",
    bar_name: cleanInputText(payload.location),
    location: cleanInputText(payload.location),
    state: cleanInputText(payload.state).toUpperCase() || null,
    latitude: payload.latitude ? Number(payload.latitude) : null,
    longitude: payload.longitude ? Number(payload.longitude) : null,
    rating: Number(payload.rating),
    free_access: cleanInputText(payload.freeAccess) || "unsure",
    review: cleanInputText(payload.review),
    photo_data_url: payload.photoDataUrl || null
  };

  const { data, error } = await supabaseClient
    .from("toilets")
    .insert(row)
    .select()
    .single();

  if (error) throw error;
  return toiletFromRow(data);
}

function savedCurrentUserId() {
  return localStorage.getItem("shitterscene.currentUserId") || "";
}

function saveCurrentUserId(userId) {
  if (userId) localStorage.setItem("shitterscene.currentUserId", userId);
}

function clearCurrentUserId() {
  localStorage.removeItem("shitterscene.currentUserId");
}

function setCurrentUser(user) {
  currentUser = user || null;
  if (currentUser) saveCurrentUserId(currentUser.id);
  renderHeaderNav();
}

async function logoutCurrentUser() {
  if (supabaseClient) {
    await supabaseClient.auth.signOut();
  }

  authSession = null;
  currentUser = null;
  clearCurrentUserId();
  renderHeaderNav();
  window.location.hash = "#map";
  showRoute();
}

function populateStates() {
  if (stateSelect.tagName !== "SELECT") return;

  STATES.forEach(([code, name]) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = name;
    stateSelect.append(option);
  });
}

function readPhotoAsDataUrl(file) {
  if (!file) return Promise.resolve(null);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(new Error("Could not read photo.")));
    reader.readAsDataURL(file);
  });
}

function setSelectedPhoto(input) {
  selectedPhotoInput = input;

  const file = input.files && input.files[0];
  if (!file) {
    selectedPhotoInput = null;
    photoStatus.textContent = "No photo selected";
    return;
  }

  const otherInput = input === photoUploadInput ? photoCameraInput : photoUploadInput;
  otherInput.value = "";
  photoStatus.textContent = `${file.name} selected`;
}

function setRatingStatus() {
  const selectedRating = form.elements.rating.value;
  ratingStatus.textContent = selectedRating
    ? `${selectedRating} ${selectedRating === "1" ? "star" : "stars"} selected`
    : "No rating selected";
}

function getStateForToilet(toilet) {
  if (toilet.state && stateByCode[toilet.state]) return stateByCode[toilet.state];

  const location = String(toilet.location || "").toLowerCase();
  const codeMatch = Object.keys(stateByCode).find((code) =>
    new RegExp(`\\b${code.toLowerCase()}\\b`).test(location)
  );
  if (codeMatch) return stateByCode[codeMatch];

  return Object.values(stateByName).find((state) => location.includes(state.name.toLowerCase()));
}

function pinPosition(toilet, index) {
  const state = getStateForToilet(toilet);
  if (!state) return null;

  const offset = (index % 5) - 2;
  return {
    x: Math.max(4, Math.min(96, state.x + offset * 0.9)),
    y: Math.max(6, Math.min(92, state.y + Math.floor(index / 5) * 1.1)),
    label: state.name,
    lat: toilet.latitude || state.lat,
    lng: toilet.longitude || state.lng
  };
}

function distanceBetween(a, b) {
  return Math.hypot(a.lat - b.lat, a.lng - b.lng);
}

function nearestStateFromLatLng(lat, lng) {
  return Object.values(stateByCode).reduce((closest, state) => {
    const distance = distanceBetween({ lat, lng }, state);
    return !closest || distance < closest.distance ? { ...state, distance } : closest;
  }, null);
}

function nearestStateFromPercent(x, y) {
  return Object.values(stateByCode).reduce((closest, state) => {
    const distance = Math.hypot(x - state.x, y - state.y);
    return !closest || distance < closest.distance ? { ...state, distance } : closest;
  }, null);
}

function milesBetween(a, b) {
  const latMiles = (a.lat - b.lat) * 69;
  const lngMiles = (a.lng - b.lng) * 69 * Math.cos(((a.lat + b.lat) / 2) * (Math.PI / 180));
  return Math.hypot(latMiles, lngMiles);
}

function toiletsNearPoint(lat, lng) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return [];

  return toilets
    .map((toilet) => ({
      ...toilet,
      distance: Number.isFinite(toilet.latitude) && Number.isFinite(toilet.longitude)
        ? milesBetween({ lat, lng }, { lat: toilet.latitude, lng: toilet.longitude })
        : Infinity
    }))
    .filter((toilet) => toilet.distance <= 0.15)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);
}

async function reverseLookupPlace(lat, lng) {
  const cacheKey = `${lat.toFixed(5)},${lng.toFixed(5)}`;
  if (reverseLookupCache.has(cacheKey)) return reverseLookupCache.get(cacheKey);

  try {
    const url = new URL("/api/reverse-geocode", window.location.origin);
    url.searchParams.set("lat", String(lat));
    url.searchParams.set("lng", String(lng));

    const response = await fetch(url.toString(), {
      headers: { Accept: "application/json" }
    });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.includes("application/json")) throw new Error("Place lookup failed.");

    const result = await response.json();
    const label = result.place || "";
    reverseLookupCache.set(cacheKey, label);
    return label;
  } catch {
    try {
      const label = await reverseLookupPlaceDirect(lat, lng);
      reverseLookupCache.set(cacheKey, label);
      return label;
    } catch {
      reverseLookupCache.set(cacheKey, "");
      return "";
    }
  }
}

async function searchPlace(query) {
  try {
    const url = new URL("/api/search-place", window.location.origin);
    url.searchParams.set("q", query);

    const response = await fetch(url.toString(), {
      headers: { Accept: "application/json" }
    });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.includes("application/json")) throw new Error("Search failed.");

    const result = await response.json();
    return result.place;
  } catch {
    return searchPlaceDirect(query);
  }
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

function placeLabelFromSearchResult(result) {
  if (!result) return "";

  const address = result.address || {};
  const locality = address.city || address.town || address.village || address.county || address.state;
  const namedPlace = result.name || address.amenity || address.shop || address.tourism;

  if (namedPlace && locality) return `${namedPlace}, ${locality}`;
  return result.display_name || namedPlace || locality || "";
}

async function reverseLookupPlaceDirect(lat, lng) {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lng));
  url.searchParams.set("zoom", "18");
  url.searchParams.set("addressdetails", "1");

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" }
  });
  if (!response.ok) throw new Error("Place lookup failed.");

  return placeLabelFromReverseResult(await response.json());
}

async function searchPlaceDirect(query) {
  const normalizedQuery = cleanSearchText(query);
  if (!normalizedQuery || normalizedQuery.length < 2) throw new Error("Search for a city, address, or place.");

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("q", normalizedQuery);
  url.searchParams.set("limit", "1");
  url.searchParams.set("addressdetails", "1");

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" }
  });
  if (!response.ok) throw new Error("Search failed.");

  const firstResult = (await response.json())[0];
  return firstResult
    ? {
        label: placeLabelFromSearchResult(firstResult),
        lat: Number(firstResult.lat),
        lng: Number(firstResult.lon)
      }
    : null;
}

function startNewFromMap({ state, lat, lng, place }) {
  const params = new URLSearchParams();
  if (state?.code) params.set("state", state.code);
  if (Number.isFinite(lat)) params.set("lat", lat.toFixed(6));
  if (Number.isFinite(lng)) params.set("lng", lng.toFixed(6));
  if (place) params.set("place", place);
  window.location.hash = `new?${params.toString()}`;
}

function mapSelectionHref(selection) {
  const params = new URLSearchParams();
  if (selection.state?.code) params.set("state", selection.state.code);
  if (Number.isFinite(selection.lat)) params.set("lat", selection.lat.toFixed(6));
  if (Number.isFinite(selection.lng)) params.set("lng", selection.lng.toFixed(6));
  if (selection.place) params.set("place", selection.place);
  return `#new?${params.toString()}`;
}

function mapSelectionTitle(selection) {
  if (selection.isLoading) return "Looking up this spot...";
  return selection.place || `Near ${selection.state?.name || "this spot"}`;
}

function createMapSelectionCard(selection) {
  const card = document.createElement("article");
  card.className = "map-selection-card";

  const eyebrow = document.createElement("p");
  eyebrow.className = "map-selection-eyebrow";
  eyebrow.textContent = "Dropped pin";

  const title = document.createElement("h2");
  title.textContent = mapSelectionTitle(selection);

  const status = document.createElement("p");
  status.className = selection.isLoading ? "map-selection-status is-loading" : "map-selection-status";
  status.textContent = selection.isLoading
    ? "Checking OpenStreetMap for the nearest place..."
    : "No exact place came back, but we can still start from these coordinates.";

  card.append(eyebrow, title);
  if (selection.isLoading || !selection.place) {
    card.append(status);
  }

  const nearby = toiletsNearPoint(selection.lat, selection.lng);
  const nearbyBlock = document.createElement("div");
  nearbyBlock.className = "map-selection-nearby";

  const nearbyTitle = document.createElement("strong");
  nearbyTitle.textContent = nearby.length ? "Already logged here" : "No bathroom logged here yet";
  nearbyBlock.append(nearbyTitle);

  if (nearby.length) {
    nearby.forEach((toilet) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.toiletId = toilet.id;
      button.textContent = `${toilet.barName} · ${stars(toilet.rating)}`;
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        previewTrackedToiletById(toilet.id);
      });
      nearbyBlock.append(button);
    });
  } else {
    const empty = document.createElement("span");
    empty.textContent = "Be brave. Be first.";
    nearbyBlock.append(empty);
  }

  const action = document.createElement(selection.isLoading ? "button" : "a");
  action.className = "map-selection-action";
  action.dataset.mapSelectionAction = "add";
  if (selection.isLoading) {
    action.type = "button";
    action.disabled = true;
  } else {
    action.href = mapSelectionHref(selection);
  }
  action.textContent = selection.isLoading ? "Finding place..." : "Add new entry here";
  action.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  card.append(nearbyBlock, action);
  return card;
}

function createTrackedToiletPreview(toilet) {
  const card = document.createElement("article");
  card.className = "map-selection-card tracked-preview-card";

  const eyebrow = document.createElement("p");
  eyebrow.className = "map-selection-eyebrow";
  eyebrow.textContent = "Bathroom report";

  const title = document.createElement("h2");
  title.textContent = toilet.barName;

  const rating = document.createElement("p");
  rating.className = "tracked-preview-rating";
  rating.textContent = stars(toilet.rating);

  const meta = document.createElement("p");
  meta.className = "tracked-preview-meta";
  meta.textContent = `${displayNameForToilet(toilet)} · ${formatDate(toilet.createdAt)}`;

  const access = document.createElement("p");
  access.className = "tracked-preview-access";
  access.textContent = freeAccessLabel(toilet.freeAccess);

  const review = document.createElement("p");
  review.className = "tracked-preview-review";
  review.textContent = toilet.review;

  const action = document.createElement("button");
  action.className = "map-selection-action";
  action.type = "button";
  action.dataset.previewToiletId = toilet.id;
  action.textContent = "View details";
  action.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  card.append(eyebrow, title, rating, meta, access, review, action);
  return card;
}

function selectionMarkerIcon(isLoading = false) {
  return L.divIcon({
    className: "leaflet-div-icon",
    html: `<span class="selection-pin${isLoading ? " is-loading" : ""}"></span>`,
    iconSize: [34, 42],
    iconAnchor: [17, 40],
    popupAnchor: [0, -38]
  });
}

function isVisible(element) {
  if (!element || element.hidden) return false;
  const style = window.getComputedStyle(element);
  return style.display !== "none" && style.visibility !== "hidden";
}

function keepPopupInSafeArea() {
  if (!osmMap || !mapViewport) return;

  const popup = osmMapEl.querySelector(".leaflet-popup");
  if (!popup) return;

  const popupRect = popup.getBoundingClientRect();
  const viewportRect = mapViewport.getBoundingClientRect();
  const inset = 14;
  let safeTop = viewportRect.top + inset;

  if (isVisible(topbar)) {
    const topbarRect = topbar.getBoundingClientRect();
    if (topbarRect.bottom > viewportRect.top) {
      safeTop = Math.max(safeTop, topbarRect.bottom + inset);
    }
  }

  if (isVisible(mapSearchControl)) {
    const searchRect = mapSearchControl.getBoundingClientRect();
    const overlapsMap = searchRect.bottom > viewportRect.top && searchRect.top < viewportRect.bottom;
    const overlapsPopupColumn = searchRect.right > popupRect.left && searchRect.left < popupRect.right;
    if (overlapsMap && overlapsPopupColumn) {
      safeTop = Math.max(safeTop, searchRect.bottom + inset);
    }
  }

  const safeLeft = viewportRect.left + inset;
  const safeRight = viewportRect.right - inset;
  const safeBottom = viewportRect.bottom - inset;
  let panX = 0;
  let panY = 0;

  if (popupRect.left < safeLeft) {
    panX = popupRect.left - safeLeft;
  } else if (popupRect.right > safeRight) {
    panX = popupRect.right - safeRight;
  }

  if (popupRect.top < safeTop) {
    panY = popupRect.top - safeTop;
  } else if (popupRect.bottom > safeBottom) {
    panY = popupRect.bottom - safeBottom;
  }

  if (panX || panY) {
    osmMap.panBy([panX, panY], {
      animate: true,
      duration: 0.24,
      easeLinearity: 0.4
    });
  }
}

function refreshPopupLayout(marker) {
  if (!marker) return;

  const updatePopup = () => {
    marker.getPopup()?.update();
  };

  window.requestAnimationFrame(updatePopup);
  window.setTimeout(updatePopup, 120);
}

function clearMapSelection({ cancelLookup = true } = {}) {
  if (cancelLookup) mapSelectionLookupId += 1;
  currentMapSelection = null;

  if (selectedMapMarker) {
    selectedMapMarker.remove();
    selectedMapMarker = null;
  }

  if (selectedFallbackPin) {
    selectedFallbackPin.remove();
    selectedFallbackPin = null;
  }
}

function renderOsmSelection(selection) {
  if (!osmMap) return;

  if (!selectedMapMarker) {
    selectedMapMarker = L.marker([selection.lat, selection.lng], {
      bubblingMouseEvents: false,
      icon: selectionMarkerIcon(selection.isLoading),
      zIndexOffset: 1000
    }).addTo(osmMap);
  } else {
    selectedMapMarker.setLatLng([selection.lat, selection.lng]);
    selectedMapMarker.setIcon(selectionMarkerIcon(selection.isLoading));
  }

  const card = createMapSelectionCard(selection);
  L.DomEvent.disableClickPropagation(card);

  selectedMapMarker.bindPopup(card, mapPopupOptions);
  selectedMapMarker.openPopup();
  refreshPopupLayout(selectedMapMarker);
}

function renderFallbackSelection(selection) {
  if (selectedFallbackPin) selectedFallbackPin.remove();

  selectedFallbackPin = document.createElement("div");
  selectedFallbackPin.className = "fallback-selection";
  selectedFallbackPin.style.left = `${selection.x}%`;
  selectedFallbackPin.style.top = `${selection.y}%`;
  selectedFallbackPin.append(createMapSelectionCard(selection));
  mapPins.append(selectedFallbackPin);
}

function getMapSafeTopOffset() {
  if (!mapViewport) return 0;

  const viewportRect = mapViewport.getBoundingClientRect();
  let safeTop = 14;

  if (isVisible(topbar)) {
    const topbarRect = topbar.getBoundingClientRect();
    if (topbarRect.bottom > viewportRect.top) {
      safeTop = Math.max(safeTop, topbarRect.bottom - viewportRect.top + 14);
    }
  }

  if (isVisible(mapSearchControl)) {
    const searchRect = mapSearchControl.getBoundingClientRect();
    const overlapsMap = searchRect.bottom > viewportRect.top && searchRect.top < viewportRect.bottom;
    if (overlapsMap) {
      safeTop = Math.max(safeTop, searchRect.bottom - viewportRect.top + 14);
    }
  }

  return safeTop;
}

function zoomToMapSelection(selection, { popupHeight = 245 } = {}) {
  if (!osmMap || !Number.isFinite(selection.lat) || !Number.isFinite(selection.lng)) return;

  const currentZoom = osmMap.getZoom();
  const targetZoom = Math.max(Number.isFinite(currentZoom) ? currentZoom : 4, 15);
  const mapSize = osmMap.getSize();
  const safeTop = getMapSafeTopOffset();
  const safeBottom = mapSize.y - 18;
  const visualCenterY = safeTop + (safeBottom - safeTop) / 2;
  const desiredMarkerY = Math.min(safeBottom - 42, visualCenterY + popupHeight / 2);
  const verticalOffset = desiredMarkerY - mapSize.y / 2;
  const targetPoint = osmMap.project(L.latLng(selection.lat, selection.lng), targetZoom);
  const targetCenter = osmMap.unproject(
    L.point(targetPoint.x, targetPoint.y - verticalOffset),
    targetZoom
  );

  if (!Number.isFinite(targetCenter.lat) || !Number.isFinite(targetCenter.lng)) {
    osmMap.flyTo([selection.lat, selection.lng], targetZoom, {
      animate: true,
      duration: 0.85,
      easeLinearity: 0.35
    });
    return;
  }

  osmMap.flyTo(targetCenter, targetZoom, {
    animate: true,
    duration: 0.85,
    easeLinearity: 0.35
  });
}

function previewTrackedToilet(toilet, position, marker) {
  if (!osmMap || !marker) return;

  clearMapSelection();

  const card = createTrackedToiletPreview(toilet);
  L.DomEvent.disableClickPropagation(card);

  marker.bindPopup(card, {
    ...mapPopupOptions,
    className: "selection-popup tracked-preview-popup"
  });

  marker.openPopup();
  refreshPopupLayout(marker);
  zoomToMapSelection(position, { popupHeight: 180 });
}

function previewTrackedToiletGroup(group, marker) {
  if (!osmMap || !marker) return;

  if (group.toilets.length === 1) {
    previewTrackedToilet(group.toilets[0], group.position, marker);
    return;
  }

  clearMapSelection();

  const card = createTrackedToiletGroupPreview(group);
  L.DomEvent.disableClickPropagation(card);

  marker.bindPopup(card, {
    ...mapPopupOptions,
    className: "selection-popup tracked-preview-popup tracked-group-popup"
  });

  marker.openPopup();
  refreshPopupLayout(marker);
  zoomToMapSelection(group.position, { popupHeight: 245 });
}

function previewTrackedToiletById(toiletId) {
  const toiletIndex = toilets.findIndex((toilet) => toilet.id === toiletId);
  if (toiletIndex === -1) return;

  const toilet = toilets[toiletIndex];
  const position = pinPosition(toilet, toiletIndex);
  const marker = osmMarkerByToiletId.get(toilet.id);

  if (marker && position) {
    previewTrackedToilet(toilet, position, marker);
    return;
  }

  openToiletDetails(toilet.id);
}

async function handleMapSelection(selection) {
  const lookupId = ++mapSelectionLookupId;
  osmMap.closePopup();
  zoomToMapSelection(selection);

  if (selection.place) {
    currentMapSelection = { ...selection, isLoading: false };
    renderOsmSelection(currentMapSelection);
    return;
  }

  currentMapSelection = { ...selection, isLoading: true };
  renderOsmSelection(currentMapSelection);

  const place = Number.isFinite(selection.lat) && Number.isFinite(selection.lng)
    ? await reverseLookupPlace(selection.lat, selection.lng)
    : "";
  if (lookupId !== mapSelectionLookupId) return;

  currentMapSelection = { ...selection, place, isLoading: false };
  renderOsmSelection(currentMapSelection);
}

async function handleFallbackMapSelection(selection) {
  const lookupId = ++mapSelectionLookupId;
  currentMapSelection = { ...selection, isLoading: true };
  renderFallbackSelection(currentMapSelection);

  const place = Number.isFinite(selection.lat) && Number.isFinite(selection.lng)
    ? await reverseLookupPlace(selection.lat, selection.lng)
    : "";
  if (lookupId !== mapSelectionLookupId) return;

  currentMapSelection = { ...selection, place, isLoading: false };
  renderFallbackSelection(currentMapSelection);
}

function applyMapPrefill() {
  const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
  const state = params.get("state");
  const lat = params.get("lat");
  const lng = params.get("lng");
  const place = params.get("place");

  if (state && stateByCode[state]) {
    stateSelect.value = state;
    latitudeInput.value = lat || "";
    longitudeInput.value = lng || "";
    if (place && !form.elements.location.value) {
      form.elements.location.value = place;
    }
    mapOriginStatus.hidden = false;
    mapOriginStatus.textContent = place
      ? `Started from the map near ${place}.`
      : `Started from the map near ${stateByCode[state].name}.`;
  }
}

function clearMapPrefill() {
  latitudeInput.value = "";
  longitudeInput.value = "";
  mapOriginStatus.hidden = true;
  mapOriginStatus.textContent = "";
}

function detailsHref(toiletId) {
  return `#details?id=${encodeURIComponent(toiletId)}`;
}

function groupDetailsHref(groupId) {
  return `#details?group=${encodeURIComponent(groupId)}`;
}

function openToiletDetails(toiletId) {
  window.location.hash = detailsHref(toiletId);
}

function openGroupDetails(groupId) {
  window.location.hash = groupDetailsHref(groupId);
}

function renderDetailPage(toilet) {
  reportPanel.innerHTML = "";

  if (!toilet) {
    reportPanel.innerHTML = `
      <div class="report-header">
        <div>
          <p class="eyebrow">Bathroom report</p>
          <h1 id="report-title">Report not found</h1>
          <p class="intro">This bathroom report may have moved or been removed.</p>
        </div>
        <a class="cancel-create" href="#map">Back to map</a>
      </div>
    `;
    return;
  }

  const header = document.createElement("div");
  header.className = "report-header";

  const headerCopy = document.createElement("div");
  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "Bathroom report";

  const title = document.createElement("h1");
  title.id = "report-title";
  title.textContent = toilet.barName;

  const intro = document.createElement("p");
  intro.className = "intro";
  intro.textContent = `${toilet.location}${toilet.state ? `, ${toilet.state}` : ""}`;

  const back = document.createElement("a");
  back.className = "cancel-create";
  back.href = "#map";
  back.textContent = "Back to map";

  headerCopy.append(eyebrow, title, intro);
  header.append(headerCopy, back);
  reportPanel.append(header);

  if (toilet.photoUrl) {
    const photo = document.createElement("img");
    photo.className = "report-photo";
    photo.src = toilet.photoUrl;
    photo.alt = `Bathroom photo for ${toilet.barName}`;
    reportPanel.append(photo);
  }

  const rating = document.createElement("p");
  rating.className = "report-rating";
  rating.textContent = stars(toilet.rating);

  const list = document.createElement("dl");
  list.className = "report-list";

  [
    ["Place", toilet.barName],
    ["Location", `${toilet.location}${toilet.state ? `, ${toilet.state}` : ""}`],
    ["Free access", freeAccessLabel(toilet.freeAccess)],
    ["Ranked by", displayNameForToilet(toilet)],
    ["Logged", formatDate(toilet.createdAt)],
    ["Coordinates", Number.isFinite(toilet.latitude) && Number.isFinite(toilet.longitude)
      ? `${toilet.latitude.toFixed(6)}, ${toilet.longitude.toFixed(6)}`
      : "Not mapped"]
  ].forEach(([label, value]) => {
    const row = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    row.append(term, description);
    list.append(row);
  });

  const reportBody = document.createElement("section");
  reportBody.className = "report-body";

  const review = document.createElement("p");
  review.className = "report-review";
  review.textContent = toilet.review;

  reportBody.append(rating, list, review);
  reportPanel.append(reportBody);
}

function renderGroupedDetailPage(group) {
  reportPanel.innerHTML = "";

  if (!group) {
    renderDetailPage(null);
    return;
  }

  const sortedToilets = group.toilets
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const header = document.createElement("div");
  header.className = "report-header";

  const headerCopy = document.createElement("div");
  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = `${group.toilets.length} bathroom reports`;

  const title = document.createElement("h1");
  title.id = "report-title";
  title.textContent = group.placeName;

  const intro = document.createElement("p");
  intro.className = "intro";
  intro.textContent = `${averageGroupRating(group)} average · ${group.position.label || sortedToilets[0]?.location || "Saved place"}`;

  const back = document.createElement("a");
  back.className = "cancel-create";
  back.href = "#map";
  back.textContent = "Back to map";

  headerCopy.append(eyebrow, title, intro);
  header.append(headerCopy, back);
  reportPanel.append(header);

  const list = document.createElement("section");
  list.className = "grouped-report-list";

  sortedToilets.forEach((toilet) => {
    const item = document.createElement("article");
    item.className = "grouped-report-card";

    if (toilet.photoUrl) {
      const photo = document.createElement("img");
      photo.className = "grouped-report-photo";
      photo.src = toilet.photoUrl;
      photo.alt = `Bathroom photo for ${toilet.barName}`;
      item.append(photo);
    }

    const rating = document.createElement("p");
    rating.className = "report-rating";
    rating.textContent = stars(toilet.rating);

    const meta = document.createElement("p");
    meta.className = "grouped-report-meta";
    meta.textContent = `${displayNameForToilet(toilet)} · ${formatDate(toilet.createdAt)} · ${freeAccessLabel(toilet.freeAccess)}`;

    const review = document.createElement("p");
    review.className = "report-review";
    review.textContent = toilet.review;

    item.append(rating, meta, review);
    list.append(item);
  });

  reportPanel.append(list);
}

function renderCurrentDetailRoute() {
  const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
  if (params.has("group")) {
    const group = groupedToiletMarkers().find((entry) => entry.id === params.get("group"));
    renderGroupedDetailPage(group);
    return;
  }

  renderDetailPage(toilets.find((entry) => entry.id === params.get("id")));
}

function averageRating() {
  if (toilets.length === 0) return "0.0";

  const total = toilets.reduce((sum, toilet) => sum + Number(toilet.rating || 0), 0);
  return (total / toilets.length).toFixed(1);
}

function uniqueStateCount() {
  return new Set(toilets.map((toilet) => toilet.state).filter(Boolean)).size;
}

function topState() {
  const counts = toilets.reduce((acc, toilet) => {
    if (!toilet.state) return acc;
    acc[toilet.state] = (acc[toilet.state] || 0) + 1;
    return acc;
  }, {});
  const [state, count] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0] || [];

  return state ? `${state} (${count})` : "None yet";
}

function renderMetrics() {
  const metrics = [
    [toilets.length, "bathrooms logged"],
    [averageRating(), "average rating"],
    [uniqueStateCount(), "states covered"],
    [topState(), "busiest state"]
  ];

  funMetrics.replaceChildren();
  metrics.forEach(([value, label]) => {
    const metric = document.createElement("div");
    metric.className = "metric";

    const strong = document.createElement("strong");
    strong.textContent = value;

    const span = document.createElement("span");
    span.textContent = label;

    metric.append(strong, span);
    funMetrics.append(metric);
  });
}

function renderSidebarList(container, entries, emptyMessage) {
  container.replaceChildren();

  if (entries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-sidebar";
    empty.textContent = emptyMessage;
    container.append(empty);
    return;
  }

  entries.forEach((toilet) => {
    const item = document.createElement("button");
    item.className = "sidebar-item";
    item.type = "button";

    const title = document.createElement("strong");
    title.textContent = toilet.barName;

    const meta = document.createElement("span");
    meta.textContent = `${stars(toilet.rating)} · ${toilet.location}${toilet.state ? `, ${toilet.state}` : ""}`;

    item.append(title, meta);
    item.addEventListener("click", () => openToiletDetails(toilet.id));
    container.append(item);
  });
}

function renderSidebarStats() {
  renderMetrics();
  renderSidebarList(
    recentList,
    toilets.slice(0, 4),
    "No bathrooms yet. Tap the map or hit New Shitter to add the first one."
  );
  renderSidebarList(
    topList,
    [...toilets].sort((a, b) => b.rating - a.rating || new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4),
    "Top bathrooms will appear once the map has entries."
  );
}

function renderLoginUsers() {
  document.body.classList.toggle("uses-supabase-auth", authProvider === "supabase");
  const canLogIn = authProvider === "supabase";
  if (!canLogIn) authMode = "create";

  loginTitle.textContent = authMode === "create" ? "Create account" : "Log in";
  loginIntro.textContent = canLogIn
    ? authMode === "create"
      ? "Create an account to start logging bathrooms."
      : "Log in with email to start logging bathrooms."
    : "Supabase is not configured yet. Use a local scout profile for now.";

  loginExistingForm.hidden = !canLogIn || authMode !== "login";
  loginCreateForm.hidden = authMode !== "create";
  loginSwitchToCreate.hidden = !canLogIn || authMode !== "login";
  loginSwitchToLogin.hidden = !canLogIn || authMode !== "create";
  signupEmailInput.hidden = !canLogIn;
  signupPasswordInput.hidden = !canLogIn;
  loginNewUserNameInput.placeholder = authProvider === "supabase" ? "Display name" : "Your display name";
}

function renderProfile() {
  const userReports = currentUser
    ? toilets.filter((toilet) => toilet.userId === currentUser.id)
    : [];
  const latest = userReports.slice(0, 5);
  const bestRating = userReports.length
    ? Math.max(...userReports.map((toilet) => Number(toilet.rating || 0)))
    : 0;
  const scoutCount = users.length;

  profileTitle.textContent = currentUser?.displayName || "My Profile";
  accountName.textContent = currentUser?.displayName || "Not logged in";
  accountMeta.textContent = currentUser
    ? currentUser.authProvider === "test"
      ? "Prototype test account"
      : currentUser.authProvider === "supabase"
        ? "Supabase account"
        : "Local prototype account"
    : "Log in to save reports under your account.";

  profileMetrics.replaceChildren();
  [
    [userReports.length, "your reports"],
    [userReports.length ? (userReports.reduce((sum, toilet) => sum + Number(toilet.rating || 0), 0) / userReports.length).toFixed(1) : "0.0", "your average"],
    [new Set(userReports.map((toilet) => toilet.state).filter(Boolean)).size, "your states"],
    [bestRating ? `${bestRating}★` : "None", "best find"],
    [scoutCount, "local scouts"],
    [toilets.length, "community reports"]
  ].forEach(([value, label]) => {
    const metric = document.createElement("div");
    metric.className = "metric profile-metric";

    const strong = document.createElement("strong");
    strong.textContent = value;

    const span = document.createElement("span");
    span.textContent = label;

    metric.append(strong, span);
    profileMetrics.append(metric);
  });

  renderSidebarList(
    profileRecentList,
    latest,
    "No local reports yet. Add a New Shitter and your scout history will show up here."
  );
}

function renderFallbackMap() {
  mapPins.replaceChildren();

  if (toilets.length === 0) {
    const empty = document.createElement("p");
    empty.className = "map-empty";
    empty.textContent = "No pins yet. Tap anywhere on the map to start the first bathroom report.";
    mapPins.append(empty);
    return;
  }

  toilets.forEach((toilet, index) => {
    const position = pinPosition(toilet, index);
    if (!position) return;

    const pin = document.createElement("button");
    pin.className = "map-pin";
    pin.type = "button";
    pin.style.left = `${position.x}%`;
    pin.style.top = `${position.y}%`;
    pin.setAttribute("aria-label", `${toilet.barName}, ${position.label}, ${toilet.rating} stars`);
    pin.innerHTML = `<span>${toilet.rating}</span>`;
    pin.addEventListener("click", (event) => {
      event.stopPropagation();
      openToiletDetails(toilet.id);
    });
    mapPins.append(pin);
  });
}

function clearOsmMarkers() {
  osmMarkers.forEach((marker) => {
    marker.remove();
  });
  osmMarkers = [];
  osmMarkerByToiletId = new Map();
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function markerContent(toilet) {
  return `<button class="osm-pin" type="button" data-toilet-marker-id="${toilet.id}" aria-label="${escapeHtml(toilet.barName)}"></button>`;
}

function groupMarkerContent(group) {
  const label = group.toilets.length > 1
    ? `${group.toilets.length} reviews for ${group.placeName}`
    : group.placeName;
  return `<button class="osm-pin${group.toilets.length > 1 ? " osm-pin-multiple" : ""}" type="button" data-toilet-group-id="${group.id}" aria-label="${escapeHtml(label)}"></button>`;
}

function markerGroupKey(toilet, position) {
  const lat = Number(position.lat).toFixed(5);
  const lng = Number(position.lng).toFixed(5);
  const place = String(toilet.barName || toilet.location || "").trim().toLowerCase();
  return `${place}:${lat},${lng}`;
}

function groupedToiletMarkers() {
  const groupsByKey = new Map();

  toilets.forEach((toilet, index) => {
    const position = pinPosition(toilet, index);
    if (!position) return;

    const key = markerGroupKey(toilet, position);
    if (!groupsByKey.has(key)) {
      groupsByKey.set(key, {
        id: key,
        placeName: toilet.barName,
        position,
        toilets: []
      });
    }

    groupsByKey.get(key).toilets.push(toilet);
  });

  return [...groupsByKey.values()];
}

function averageGroupRating(group) {
  if (!group.toilets.length) return "0.0";

  const total = group.toilets.reduce((sum, toilet) => sum + Number(toilet.rating || 0), 0);
  return (total / group.toilets.length).toFixed(1);
}

function createTrackedToiletGroupPreview(group) {
  const card = document.createElement("article");
  card.className = "map-selection-card tracked-preview-card tracked-group-card";

  const eyebrow = document.createElement("p");
  eyebrow.className = "map-selection-eyebrow";
  eyebrow.textContent = `${group.toilets.length} bathroom reports`;

  const title = document.createElement("h2");
  title.textContent = group.placeName;

  const summary = document.createElement("p");
  summary.className = "tracked-preview-meta";
  summary.textContent = `${averageGroupRating(group)} avg · ${group.position.label || group.toilets[0]?.location || "Saved place"}`;

  const list = document.createElement("div");
  list.className = "tracked-review-list";

  group.toilets
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .forEach((toilet) => {
      const item = document.createElement("button");
      item.type = "button";
      item.dataset.previewToiletId = toilet.id;
      item.className = "tracked-review-item";

      const rating = document.createElement("strong");
      rating.textContent = stars(toilet.rating);

      const meta = document.createElement("span");
      meta.textContent = `${displayNameForToilet(toilet)} · ${formatDate(toilet.createdAt)}`;

      const review = document.createElement("p");
      review.textContent = toilet.review;

      item.append(rating, meta, review);
      list.append(item);
    });

  const action = document.createElement("button");
  action.className = "map-selection-action";
  action.type = "button";
  action.dataset.previewGroupId = group.id;
  action.textContent = "View all";
  action.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  card.append(eyebrow, title, summary, list, action);
  return card;
}

function userLocationIcon() {
  return L.divIcon({
    className: "leaflet-div-icon",
    html: '<span class="user-location-pin"></span>',
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
}

function setLocationStatus(message, isError = false) {
  locationStatus.textContent = message;
  locationStatus.classList.toggle("is-error", isError);
}

function setLocateButtonLoading(isLoading) {
  locateUserButton.disabled = isLoading;
  locateUserButton.classList.toggle("is-loading", isLoading);
  locateUserButton.setAttribute("aria-busy", String(isLoading));
}

function centerMapOnUser(latitude, longitude, accuracy) {
  if (!osmMap) return;

  const latLng = [latitude, longitude];
  osmMap.setView(latLng, Math.max(osmMap.getZoom(), 15), { animate: true });

  if (!userLocationMarker) {
    userLocationMarker = L.marker(latLng, {
      icon: userLocationIcon(),
      title: "Your location",
      zIndexOffset: 1200
    }).addTo(osmMap);
  } else {
    userLocationMarker.setLatLng(latLng);
  }

  const accuracyText = Number.isFinite(accuracy) ? ` within about ${Math.round(accuracy)} meters` : "";
  setLocationStatus(`Centered on your location${accuracyText}.`);
}

function centerMapOnSelection(selection) {
  if (osmMap) {
    osmMap.setView([selection.lat, selection.lng], Math.max(osmMap.getZoom(), 13), { animate: true });
    handleMapSelection(selection);
    return;
  }

  handleFallbackMapSelection({
    ...selection,
    x: selection.state?.x || 50,
    y: selection.state?.y || 50
  });
}

async function handleMapSearch(event) {
  event.preventDefault();

  const query = cleanSearchText(mapSearchQuery.value);
  if (!query) {
    setLocationStatus("Search for a city or place first.", true);
    return;
  }

  const submitButton = mapSearchForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Searching...";
  setLocationStatus("Searching the map...");

  try {
    const place = await searchPlace(query);
    if (!place || !Number.isFinite(place.lat) || !Number.isFinite(place.lng)) {
      setLocationStatus("No match found. Try a city, address, or place name.", true);
      return;
    }

    const selection = {
      state: nearestStateFromLatLng(place.lat, place.lng),
      lat: place.lat,
      lng: place.lng,
      place: place.label || query
    };
    centerMapOnSelection(selection);
    setLocationStatus(`Moved map to ${selection.place}.`);
  } catch (error) {
    setLocationStatus(error.message || "Search failed. Try again.", true);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Search";
  }
}

function cleanSearchText(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function locateUser() {
  if (!navigator.geolocation) {
    setLocationStatus("Your browser does not support location lookup.", true);
    return;
  }

  if (!window.isSecureContext) {
    setLocationStatus("Location lookup needs the secure live HTTPS site.", true);
    return;
  }

  setLocateButtonLoading(true);
  setLocationStatus("Waiting for location permission...");

  const requestLocation = () => navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      centerMapOnUser(latitude, longitude, accuracy);
      setLocateButtonLoading(false);
    },
    (error) => {
      const message = error.code === error.PERMISSION_DENIED
        ? "Location permission was denied."
        : "Could not find your location. Try again when your signal is better.";
      setLocationStatus(message, true);
      setLocateButtonLoading(false);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 60000,
      timeout: 10000
    }
  );

  if (navigator.permissions?.query) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permission) => {
        if (permission.state === "denied") {
          setLocationStatus("Location is blocked for this site. Allow it in your browser's site settings, then try again.", true);
          setLocateButtonLoading(false);
          return;
        }

        requestLocation();
      })
      .catch(requestLocation);
  } else {
    requestLocation();
  }
}

function renderOsmMap() {
  if (!osmMap) return;

  clearOsmMarkers();
  const markerPositions = [];
  const groups = groupedToiletMarkers();
  groups.forEach((group) => {
    const { position } = group;
    markerPositions.push([position.lat, position.lng]);

    const marker = L.marker([position.lat, position.lng], {
      bubblingMouseEvents: false,
      title: group.placeName,
      icon: L.divIcon({
        className: "leaflet-div-icon",
        html: groupMarkerContent(group),
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })
    });
    marker.on("click", (event) => {
      if (event.originalEvent) L.DomEvent.stopPropagation(event.originalEvent);
      previewTrackedToiletGroup(group, marker);
    });
    marker.addTo(osmMap);
    marker.getElement()?.querySelector("[data-toilet-group-id]")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      previewTrackedToiletGroup(group, marker);
    });
    osmMarkers.push(marker);
    group.toilets.forEach((toilet) => {
      osmMarkerByToiletId.set(toilet.id, marker);
    });
  });

  if (!hasFitInitialToilets && markerPositions.length) {
    hasFitInitialToilets = true;
    const frameInitialMarkers = () => {
      osmMap.invalidateSize();
      if (markerPositions.length === 1) {
        const [lat, lng] = markerPositions[0];
        osmMap.setView(L.latLng(lat, lng), 13, { animate: false });
        return;
      }

      osmMap.fitBounds(markerPositions, {
        animate: false,
        maxZoom: 13,
        padding: [60, 60]
      });
    };

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(frameInitialMarkers);
    });
    window.setTimeout(frameInitialMarkers, 180);
  }
}

function renderMap() {
  if (mapCount) {
    mapCount.textContent = `${toilets.length} ${toilets.length === 1 ? "toilet" : "toilets"} mapped`;
  }
  if (mapHint) {
    mapHint.textContent = osmMap
      ? "OpenStreetMap is live. Tap the map to add a bathroom there."
      : "OpenStreetMap could not load, so the fallback map is active. Tap it to start an entry.";
  }

  if (osmMap) renderOsmMap();
  else renderFallbackMap();

  renderSidebarStats();
}

function applyMapTransform() {
  mapCanvas.style.transform = `translate(${mapOffset.x}px, ${mapOffset.y}px) scale(${mapScale})`;
}

function zoomMap(delta) {
  if (osmMap) {
    osmMap.setZoom(Math.max(3, Math.min(12, osmMap.getZoom() + Math.sign(delta))));
    return;
  }

  mapScale = Math.max(0.8, Math.min(2.6, mapScale + delta));
  applyMapTransform();
}

function initOsmMap() {
  if (!window.L) return;

  osmMap = L.map(osmMapEl, {
    center: [39.5, -98.35],
    zoom: 4,
    minZoom: 3,
    maxZoom: 18,
    scrollWheelZoom: true
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    referrerPolicy: "strict-origin-when-cross-origin",
    maxZoom: 19
  }).addTo(osmMap);

  osmMap.on("click", (event) => {
    const target = event.originalEvent?.target;
    if (target?.closest?.(".leaflet-marker-icon, .leaflet-popup")) return;

    handleMapSelection({
      state: nearestStateFromLatLng(event.latlng.lat, event.latlng.lng),
      lat: event.latlng.lat,
      lng: event.latlng.lng
    });
  });

  osmMapEl.hidden = false;
  mapCanvas.hidden = true;
}

async function fetchToilets() {
  if (supabaseClient) {
    const { data, error } = await supabaseClient
      .from("toilets")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map(toiletFromRow);
  }

  const response = await fetch("/api/toilets");
  if (!response.ok) throw new Error("Could not load toilet entries.");
  return response.json();
}

async function fetchUsers() {
  if (supabaseClient) {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map(profileFromRow);
  }

  const response = await fetch("/api/users");
  if (!response.ok) throw new Error("Could not load users.");
  return response.json();
}

async function createUser(displayName) {
  if (supabaseClient) {
    const { data } = await supabaseClient.auth.getUser();
    return upsertSupabaseProfile(data.user);
  }

  const response = await apiFetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ displayName })
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Could not add user.");
  return result;
}

async function loadUsers() {
  users = await fetchUsers();

  if (authProvider === "supabase" && supabaseClient) {
    const { data } = await supabaseClient.auth.getSession();
    authSession = data.session;
    const user = await appUserFromSession(authSession);
    if (user) {
      setCurrentUser(user);
      if (!users.find((entry) => entry.id === user.id)) users.unshift(user);
    } else {
      currentUser = null;
      clearCurrentUserId();
    }
  } else {
    const storedUser = users.find((user) => user.id === savedCurrentUserId());
    if (storedUser) {
      setCurrentUser(storedUser);
    } else {
      currentUser = null;
      clearCurrentUserId();
    }
  }

  authReady = true;
  renderHeaderNav();
  renderLoginUsers();
  renderProfile();
  showRoute();
}

async function loadToilets() {
  try {
    toilets = await fetchToilets();
    renderMap();
    renderProfile();
    if (window.location.hash.startsWith("#details")) renderCurrentDetailRoute();
  } catch (error) {
    setMessage(error.message, true);
  }
}

function showRoute() {
  const onLogin = window.location.hash.startsWith("#login");
  const onNew = window.location.hash.startsWith("#new");
  const onDetails = window.location.hash.startsWith("#details");
  const onProfile = window.location.hash.startsWith("#profile");
  const route = onLogin ? "login" : onNew ? "new" : onDetails ? "details" : onProfile ? "profile" : "map";
  if (route !== previousRoute && onLogin) {
    authMode = "login";
  }
  previousRoute = route;

  if (authReady && !currentUser && (onNew || onProfile)) {
    window.location.hash = "#login";
    return;
  }

  renderHeaderNav();
  const onFocusedPage = onLogin || onNew || onDetails || onProfile;
  document.body.classList.toggle("is-creating", onFocusedPage);
  document.body.classList.remove("is-creating-enter");
  loginView.hidden = !onLogin;
  newView.hidden = !onNew;
  detailView.hidden = !onDetails;
  profileView.hidden = !onProfile;
  mapView.hidden = onLogin || onNew || onDetails || onProfile;
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.navLink === route);
  });

  if (onLogin) renderLoginUsers();
  if (onNew) applyMapPrefill();
  if (onDetails) renderCurrentDetailRoute();
  if (onFocusedPage) {
    window.requestAnimationFrame(() => {
      document.body.classList.add("is-creating-enter");
    });
  }
  if (onProfile) renderProfile();
  if (!onNew && !onDetails && !onProfile && osmMap) {
    window.requestAnimationFrame(() => osmMap.invalidateSize());
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("");

  const submitButton = form.querySelector("button[type='submit']");
  const data = new FormData(form);
  const photo = selectedPhotoInput?.files?.[0] || null;

  try {
    submitButton.disabled = true;
    submitButton.textContent = "Adding...";

    const photoDataUrl = photo && photo.size > 0 ? await readPhotoAsDataUrl(photo) : null;
    const payload = {
      location: data.get("location"),
      state: data.get("state"),
      latitude: data.get("latitude"),
      longitude: data.get("longitude"),
      rating: Number(data.get("rating")),
      freeAccess: data.get("freeAccess") || "unsure",
      userId: currentUser?.id || null,
      review: data.get("review"),
      photoDataUrl
    };

    let result;
    if (supabaseClient) {
      result = await createSupabaseToilet(payload);
    } else {
      const response = await apiFetch("/api/toilets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not add toilet.");
    }

    form.reset();
    selectedPhotoInput = null;
    photoStatus.textContent = "No photo selected";
    clearMapPrefill();
    setRatingStatus();
    setMessage("Logged. It is now on the map.");
    await loadToilets();
    openToiletDetails(result.id);
  } catch (error) {
    setMessage(error.message, true);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Add toilet";
  }
});

document.querySelector("#map-viewport").addEventListener("wheel", (event) => {
  if (osmMap) return;
  event.preventDefault();
  zoomMap(event.deltaY > 0 ? -0.12 : 0.12);
});

document.querySelector("#map-viewport").addEventListener("pointerdown", (event) => {
  if (osmMap || event.target.closest(".map-pin") || event.target.closest(".fallback-selection")) return;
  isDraggingMap = true;
  dragStart = { x: event.clientX - mapOffset.x, y: event.clientY - mapOffset.y };
});

document.querySelector("#map-viewport").addEventListener("click", (event) => {
  if (osmMap || event.target.closest(".map-pin") || event.target.closest(".fallback-selection")) return;

  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left - mapOffset.x) / mapScale / rect.width) * 100;
  const y = ((event.clientY - rect.top - mapOffset.y) / mapScale / rect.height) * 100;
  const state = nearestStateFromPercent(x, y);
  handleFallbackMapSelection({ state, lat: state?.lat, lng: state?.lng, x, y });
});

document.addEventListener("pointermove", (event) => {
  if (!isDraggingMap) return;
  mapOffset = { x: event.clientX - dragStart.x, y: event.clientY - dragStart.y };
  applyMapTransform();
});

document.addEventListener("pointerup", () => {
  isDraggingMap = false;
});

document.addEventListener("click", (event) => {
  const toiletMarker = event.target.closest("[data-toilet-marker-id]");
  if (toiletMarker) {
    event.preventDefault();
    event.stopPropagation();
    previewTrackedToiletById(toiletMarker.dataset.toiletMarkerId);
    return;
  }

  const selectionAction = event.target.closest("[data-map-selection-action='add']");
  if (selectionAction) {
    event.preventDefault();
    event.stopPropagation();
    if (!selectionAction.disabled && currentMapSelection) {
      startNewFromMap(currentMapSelection);
    }
    return;
  }

  const nearbyButton = event.target.closest("[data-toilet-id]");
  if (nearbyButton) {
    event.preventDefault();
    event.stopPropagation();
    openToiletDetails(nearbyButton.dataset.toiletId);
    return;
  }

  const previewButton = event.target.closest("[data-preview-toilet-id]");
  if (previewButton) {
    event.preventDefault();
    event.stopPropagation();
    openToiletDetails(previewButton.dataset.previewToiletId);
    return;
  }

  const groupPreviewButton = event.target.closest("[data-preview-group-id]");
  if (groupPreviewButton) {
    event.preventDefault();
    event.stopPropagation();
    openGroupDetails(groupPreviewButton.dataset.previewGroupId);
  }
}, true);

photoUploadInput.addEventListener("change", () => setSelectedPhoto(photoUploadInput));
photoCameraInput.addEventListener("change", () => setSelectedPhoto(photoCameraInput));
mapSearchForm.addEventListener("submit", handleMapSearch);
locateUserButton.addEventListener("click", locateUser);
loginSwitchToCreate.querySelector("button").addEventListener("click", () => setAuthMode("create"));
loginSwitchToLogin.querySelector("button").addEventListener("click", () => setAuthMode("login"));
loginExistingForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = loginExistingForm.querySelector("button[type='submit']");
  try {
    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";

    const username = loginEmailInput.value.trim();
    const password = loginPasswordInput.value;
    let user;

    if (username.toLowerCase() === "test" && password === "test" && !supabaseClient) {
      const response = await fetch("/api/test-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not log in with the test account.");
      authSession = null;
      user = result;
    } else {
      if (!supabaseClient) throw new Error("Supabase is not configured yet.");
      if (username.toLowerCase() === "test") {
        throw new Error("The test login only works in local development. Use a real account on the live site.");
      }

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: username,
        password
      });
      if (error) throw error;

      authSession = data.session;
      user = await appUserFromSession(authSession);
      if (!user) throw new Error("Could not load your account.");
    }

    users = await fetchUsers();
    setCurrentUser(user);
    setLoginMessage("");
    renderProfile();
    window.location.hash = "#map";
  } catch (error) {
    setLoginMessage(error.message || "Could not log in.", true);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Log in";
  }
});
loginCreateForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setLoginMessage("");

  const submitButton = loginCreateForm.querySelector("button[type='submit']");
  try {
    submitButton.disabled = true;
    submitButton.textContent = "Creating...";

    let user;
    if (authProvider === "supabase" && supabaseClient) {
      const { data, error } = await supabaseClient.auth.signUp({
        email: signupEmailInput.value,
        password: signupPasswordInput.value,
        options: {
          data: {
            display_name: loginNewUserNameInput.value
          }
        }
      });
      if (error) throw error;

      authSession = data.session;
      user = await appUserFromSession(authSession);
      if (!user) {
        setLoginMessage("Check your email to confirm your account, then log in.");
        authMode = "login";
        renderLoginUsers();
        return;
      }
    } else {
      user = await createUser(loginNewUserNameInput.value);
    }

    users = await fetchUsers();
    setCurrentUser(user);
    loginNewUserNameInput.value = "";
    renderLoginUsers();
    renderProfile();
    window.location.hash = "#map";
  } catch (error) {
    setLoginMessage(error.message, true);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Create account";
  }
});
logoutUserButton.addEventListener("click", logoutCurrentUser);
ratingInputs.forEach((input) => input.addEventListener("change", setRatingStatus));
window.addEventListener("hashchange", showRoute);

populateStates();
setRatingStatus();
renderHeaderNav();
showRoute();
initOsmMap();
configureAuth()
  .then(loadUsers)
  .then(loadToilets)
  .catch((error) => {
    authReady = true;
    setLoginMessage(error.message, true);
    showRoute();
  });

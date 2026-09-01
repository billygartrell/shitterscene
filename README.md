# ShitterScene

A tiny bathroom review/map prototype for collecting toilet reports, ratings, locations, and optional photos.

## Local Development

1. Copy `.env.example` to `.env`.
2. Add your Supabase project URL and publishable key.
3. Run the app:

```sh
npm run dev
```

The server starts on `http://127.0.0.1:5173` by default, or another available port if that one is busy.

## Data Files

Local runtime data is stored in JSON files under `data/`, and uploaded photos are stored under `public/uploads/`. Those generated files are ignored by git so real user content does not get committed.

## Supabase Persistence

Run the SQL in `supabase/schema.sql` from the Supabase SQL editor. It creates:

- `profiles` for signed-in users.
- `toilets` for persisted bathroom reports.
- public read policies so the map can show reports.
- authenticated insert policies so only logged-in users can add reports.

Photo uploads are stored as data URLs in the first database pass. That keeps the prototype simple, but should move to Supabase Storage before real-world usage.

## Netlify

Netlify builds `public/config.js` from environment variables. Set these in Netlify under Site configuration > Environment variables:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

The local Node server still exists for development fallback routes and local JSON storage.

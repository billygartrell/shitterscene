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

## Netlify Note

This prototype currently uses a Node server for API routes, local JSON persistence, uploads, and OpenStreetMap lookup helpers. To run fully on Netlify, those server routes should be moved to Netlify Functions and persistent data should live in Supabase or another hosted database/storage service.

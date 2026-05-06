# Strapi Integration Notes

This document explains how the frontend repository connects to the separate Strapi backend repository.

## Repositories

- Frontend repo: `dezh19/The_Vlog`
- Backend repo: `dezh19/The_Vlog_Backend`

## Local development URLs

- Frontend: `http://localhost:3000`
- Strapi backend: `http://localhost:1337`
- Strapi admin: `http://localhost:1337/admin`

## Key integration files

- `frontend/lib/server/strapi.ts` - shared Strapi request helpers and media URL helpers
- `frontend/app/api/cms/site/route.ts` - normalizes Strapi content into the frontend `SiteData` shape
- `frontend/lib/api/cms.ts` - fetches site data from the bridge endpoint or static JSON fallback
- `frontend/scripts/fetch-cms-data.mjs` - snapshots CMS data for static builds

## Content fetched from Strapi

Single types:

1. Hero
2. About
3. Footer
4. Booking

Collections:

1. Content Features
2. Testimonies
3. Events

All frontend fetches use `populate=*` for media relations.

## Frontend environment variables

Create `frontend/.env` from `frontend/.env.example`.

Important values:

- `STRAPI_URL` - server-side backend URL
- `NEXT_PUBLIC_STRAPI_URL` - public backend URL for media assets
- `STRAPI_API_TOKEN` - token used by the frontend bridge when Strapi endpoints are protected
- `NEXT_PUBLIC_CMS_BRIDGE_URL` - optional deployed bridge URL for static hosts
- `CMS_SITE_DATA_URL` - optional override used when generating `public/cms-data.json`

## Backend environment variables

Create `backend/.env` from `backend/.env.example`.

For local development, keep the SQLite database outside OneDrive. Example:

- `DATABASE_FILENAME=C:/dev/strapi-data/data.db`

## Admin setup

Preferred path:

1. Start Strapi with `npm run develop` from `backend/`
2. Open `http://localhost:1337/admin`
3. Create the first admin user through the Strapi setup screen

Optional script path:

- Set `STRAPI_ADMIN_EMAIL` and `STRAPI_ADMIN_PASSWORD` in `backend/.env`
- Run `node create-admin.js`

Do not commit real admin credentials or API tokens.

## Static deployment flow

For static frontend hosting such as GitHub Pages:

1. Build the frontend from `frontend/`
2. Generate `public/cms-data.json` before export
3. Optionally point `NEXT_PUBLIC_CMS_BRIDGE_URL` to a live backend bridge

If the live bridge is unavailable, the frontend falls back to `cms-data.json`.

## Production notes

- Use persistent storage for uploads
- Use a persistent database in production
- Prefer a read-only API token for frontend requests
- Avoid storing SQLite databases inside OneDrive-synced directories

## Troubleshooting

### 401 from Strapi

- Verify `STRAPI_API_TOKEN`
- Confirm endpoint permissions in Strapi
- Restart frontend and backend after changing env vars

### Content missing after restart

- Verify the backend database file is outside OneDrive
- Verify media uploads are stored in a persistent location

### Media not loading

- Confirm Strapi URLs are correct
- Confirm related media fields are populated
- Confirm uploaded files still exist on the backend host

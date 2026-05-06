# The Vlog Frontend

This repository now contains the **Next.js frontend** for The Vlog.

The Strapi backend lives in a separate repository:

- Backend repo: `dezh19/The_Vlog_Backend`
- Local backend folder used during development: `backend/`

## Repo layout

- `frontend/` - Next.js app
- `STRAPI_INTEGRATION.md` - frontend/backend integration notes
- `netlify.toml` - Netlify config for the frontend repo

## Frontend setup

1. Go into the app folder:
  - `cd frontend`
2. Install dependencies:
  - `npm install`
3. Copy the example env file and fill in your values:
  - `.env.example` -> `.env`
4. Start development:
  - `npm run dev`

Open `http://localhost:3000` in your browser.

## Required environment variables

Create `frontend/.env` from `frontend/.env.example`.

Most important values:

- `STRAPI_URL` - backend base URL for server-side requests
- `NEXT_PUBLIC_STRAPI_URL` - public backend base URL for media URLs
- `STRAPI_API_TOKEN` - Strapi API token for protected reads
- `NEXT_PUBLIC_CMS_BRIDGE_URL` - optional deployed bridge/backend URL for static builds

## Deployment

### GitHub Pages

From `frontend/` run:

- `npm run build:gh`

This creates a static export with the correct `/The_Vlog` base path.

### Netlify

From `frontend/` run:

- `npm run build:netlify`

Use this when deploying the frontend separately from the backend.

## Backend connection

This frontend expects a Strapi backend running separately. For local development, the default backend URL is:

- `http://localhost:1337`

For production, point the frontend env vars to your deployed Strapi instance or your deployed CMS bridge endpoint.

## Notes

- Development uses Webpack to avoid Turbopack filesystem issues on some Windows + OneDrive setups.
- If you want live CMS updates in production, deploy the backend separately with persistent storage/database.

# Quick Bike client

Front end for Quick Bike, a short-term bike rental MVP: sign up, find a bike on a map, reserve it, and lock or unlock it in the app. The API lives in the separate `quick-bike-server` repo.

## Stack

- Create React App (`react-scripts` 3.4.1), React 16, TypeScript 3.9
- Redux with `redux-thunk` and `redux-persist`; slices in `src/store/` (`user`, `bike`, `reservation`, `appState`), each with `actions.ts`, `reducer.ts`, `selectors.ts`
- React Router 5, React Bootstrap 1, SCSS via `node-sass` 4
- Google Maps through `react-google-maps` (`src/components/Map.tsx`), distances with `geolib`
- Onboarding tooltips with `react-joyride`

## Commands

```bash
npm install
npm start      # dev server
npm run build  # production build, also writes build/_redirects for SPA routing
npm test
```

These are old toolchain versions. `node-sass` 4 and `react-scripts` 3 generally need an older Node (around Node 14). If install or build fails on a newer Node, switch versions with nvm before changing dependencies.

## Environment variables

Set in a local `.env` (gitignored) and in the hosting dashboard:

- `REACT_APP_API_URL`: API base URL. Falls back to `https://quick-bike-server.onrender.com` in `src/config/constants.ts`.
- `REACT_APP_GOOGLE_MAPS_API_KEY`: used in `Map.tsx`. Never hard-code it.

## Structure

- `src/pages/`: one folder per route (`Bikes` at `/`, `About`, `Login`, `SignUp`, `UserProfile` at `/user`, `Lock` at `/mybike`)
- `src/components/`: Navbar, Map, MessageBox, logged-in and logged-out nav
- `src/types/`: shared TypeScript types for bikes, reservations, users, messages, actions
- `attachments/`: README screenshots and the UML diagram

## Deploy

- Hosted as a static site on Netlify (`quick-bike.netlify.app`). `_redirects` sends every route to `index.html`.
- The API runs on Render. If the live demo shows no bikes, check the server and its database first (see the server's CLAUDE.md).

## Conventions

- Default branch is `development`.
- Keep new state in the existing slice pattern rather than adding local component state for shared data.
- `src/App.test.tsx` is the unchanged Create React App sample and will fail. Replace it before relying on `npm test`.
- Never commit API keys, passwords, or database URLs.

# SalonPro Service Provider App

Expo SDK 54 React Native app for the SalonPro v1 booking flow.

## Startup

```sh
npm install
npm run start:clear
```

Expo Go should load an SDK 54 manifest. If your backend is not running on the default LAN address, set:

```sh
EXPO_PUBLIC_API_BASE_URL=http://YOUR_MACHINE_IP:5000
```

The current fallback API URL is `http://10.10.20.10:5000`.

## RTK Query

All API calls are centralized in `src/store/salonApi.ts`.

Covered v1 surfaces:

- Auth: login, customer signup, salon owner signup, profile
- Customer: salon discovery, slot generation, booking creation, cancel, review, points
- Owner: salon list, service creation, worker creation, booking management
- Worker: assigned booking queue and status updates
- Admin/API support: demo seed, users, disputes, export-ready backend endpoints

## Demo Data

From the app Home screen, use `Seed Demo Data`, or call:

```sh
POST /api/v1/admin/seed-demo
```

Demo accounts use password `123456`:

- `admin@salonpro.local`
- `owner@salonpro.local`
- `worker@salonpro.local`
- `customer@salonpro.local`

## Checks

```sh
npx expo install --check
npx tsc --noEmit
npm test -- --runInBand
```

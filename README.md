# Ubar Ride Share — Frontend

<div align="center">

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.x-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Google Maps](https://img.shields.io/badge/Google_Maps-API-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)

**A modern, mobile-first ride-hailing frontend built with React + Vite**

[Features](#key-features) · [Quick Start](#quick-start) · [Pages & Routes](#pages--routes) · [Environment Variables](#environment-variables)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Pages & Routes](#pages--routes)
- [Component Architecture](#component-architecture)
- [State Management & Context](#state-management--context)
- [Real-Time Communication](#real-time-communication)
- [Ride Flow — Step by Step](#ride-flow--step-by-step)
- [Authentication Flow](#authentication-flow)
- [Live Map Tracking](#live-map-tracking)
- [Animation System (GSAP)](#animation-system-gsap)

---

## Overview

The **Ubar Ride Share Frontend** is a React 18 single-page application that delivers a complete ride-hailing experience for both passengers and drivers. Built mobile-first with Tailwind CSS, it features smooth GSAP-powered bottom-sheet animations, real-time Socket.IO communication, and live GPS map tracking using the Google Maps API.

The app communicates with the [Ubar Backend API](../Backend/README.md) for all data operations and maintains a persistent Socket.IO connection for real-time ride lifecycle updates.

---

## Key Features

| Feature | Description |
|---|---|
| 👤 **Dual User Roles** | Completely separate flows for Passengers (Users) and Drivers (Captains) |
| 🗺️ **Live Google Maps** | Real-time map with GPS tracking for both user and captain positions |
| 📡 **Real-Time Ride Updates** | Socket.IO events update UI instantly — no polling |
| 🎯 **Address Autocomplete** | Live suggestions as you type pickup/destination |
| 💰 **Multi-Vehicle Fare Estimation** | See Auto, Car, and Moto prices side by side before booking |
| 🔑 **OTP Verification** | 6-digit OTP confirms ride start between passenger and driver |
| 📍 **Captain Live Location** | Passenger sees captain's GPS position update in real time during ride |
| 🔐 **Protected Routes** | Route guards redirect unauthenticated users to login |
| ✨ **Smooth Animations** | GSAP-powered bottom-sheet panels slide in/out fluidly |
| 📱 **Mobile-First UI** | Designed for mobile screens with responsive bottom-sheet patterns |

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3.x |
| Routing | React Router DOM 6.x |
| Animations | GSAP 3.x + @gsap/react |
| HTTP Client | Axios |
| Real-Time | Socket.IO Client 4.x |
| Maps | @react-google-maps/api + Google Maps JavaScript API |
| Icons | Remixicon 4.x |
| Build Tool | Vite |
| Linting | ESLint 9.x |

---

## Project Structure

```
Frontend/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env                         # Environment variables (not committed)
├── package.json
│
└── src/
    ├── main.jsx                 # App entry point — wraps with all Context providers
    ├── App.jsx                  # Route definitions
    ├── index.css                # Global styles + Tailwind imports
    ├── App.css
    │
    ├── pages/                   # Route-level components (one per screen)
    │   ├── Start.jsx            # Landing page — choose Rider or Captain
    │   ├── UserLogin.jsx        # Passenger login
    │   ├── UserSignup.jsx       # Passenger registration
    │   ├── UserLogout.jsx       # Clears token, redirects to start
    │   ├── UserProtectWrapper.jsx  # Auth guard for user routes
    │   ├── Home.jsx             # 🔑 Main passenger screen (map + booking flow)
    │   ├── Riding.jsx           # Passenger active ride screen
    │   ├── Captainlogin.jsx     # Captain login
    │   ├── CaptainSignup.jsx    # Captain registration
    │   ├── CaptainLogout.jsx    # Clears captain token
    │   ├── CaptainProtectWrapper.jsx # Auth guard for captain routes
    │   ├── CaptainHome.jsx      # 🔑 Main captain screen (map + ride requests)
    │   └── CaptainRiding.jsx    # Captain active ride screen
    │
    ├── components/              # Reusable UI components
    │   ├── LiveTracking.jsx     # Google Map with real-time GPS markers
    │   ├── LocationSearchPanel.jsx  # Address suggestion list
    │   ├── VehiclePanel.jsx     # Vehicle selector with live fares
    │   ├── ConfirmRide.jsx      # Ride confirmation summary (user)
    │   ├── LookingForDriver.jsx # "Searching for driver" spinner panel
    │   ├── WaitingForDriver.jsx # Driver accepted — show details
    │   ├── RidePopUp.jsx        # New ride notification (captain)
    │   ├── ConfirmRidePopUp.jsx # OTP entry form (captain)
    │   ├── CaptainDetails.jsx   # Captain stats panel
    │   └── FinishRide.jsx       # End ride summary + button (captain)
    │
    ├── context/                 # React Context providers
    │   ├── UserContext.jsx      # Passenger profile state
    │   ├── CapatainContext.jsx  # Captain profile state
    │   └── SocketContext.jsx    # Singleton Socket.IO connection
    │
    └── assets/
        ├── hero.png
        └── ...
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- The [Backend server](../Backend/README.md) must be running on port 5005
- Google Maps API key (enabled: Maps JavaScript API)

### Installation

```bash
# 1. Navigate to frontend directory
cd Frontend

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Edit .env — add your API keys (see Environment Variables section)

# 4. Start the development server
npm run dev

# 5. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
# Output goes to dist/
npm run preview  # Preview the production build locally
```

### Available Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Start Vite dev server (HMR enabled) |
| Build | `npm run build` | Production build to `dist/` |
| Preview | `npm run preview` | Serve production build locally |
| Lint | `npm run lint` | Run ESLint |

---

## Environment Variables

Create a `.env` file in the `Frontend/` root:

```env
# Backend API base URL
VITE_BASE_URL=http://localhost:5005

# Google Maps JavaScript API Key
# Enable: Maps JavaScript API at https://console.cloud.google.com/
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

> ⚠️ All Vite environment variables must be prefixed with `VITE_` to be accessible in the browser.

---

## Pages & Routes

| Route | Component | Auth Required | Description |
|---|---|---|---|
| `/` | `Start` | ❌ | Landing page — choose Rider or Captain |
| `/login` | `UserLogin` | ❌ | Passenger login |
| `/signup` | `UserSignup` | ❌ | Passenger registration |
| `/home` | `Home` | ✅ User | Main booking screen with live map |
| `/riding` | `Riding` | ✅ User | Active ride screen for passenger |
| `/user/logout` | `UserLogout` | ✅ User | Clear session and redirect |
| `/captain-login` | `Captainlogin` | ❌ | Captain login |
| `/captain-signup` | `CaptainSignup` | ❌ | Captain registration |
| `/captain-home` | `CaptainHome` | ✅ Captain | Captain dashboard with ride requests |
| `/captain-riding` | `CaptainRiding` | ✅ Captain | Active ride navigation screen |
| `/captain/logout` | `CaptainLogout` | ✅ Captain | Clear captain session and redirect |

### Route Protection

`UserProtectWrapper` and `CaptainProtectWrapper` check for valid JWT tokens in `localStorage` (`token` for users, `captain-token` for captains). If missing or expired, they redirect to the respective login page.

---

## Component Architecture

```
App.jsx (Routes)
│
├── Start.jsx ─────────────────────────────────────── Landing
│
├── Home.jsx ──────────────────────────────────────── Passenger Booking
│   ├── LiveTracking.jsx        (Full-screen map)
│   ├── LocationSearchPanel.jsx (Address suggestions)
│   ├── VehiclePanel.jsx        (Auto / Car / Moto selector + fares)
│   ├── ConfirmRide.jsx         (Booking summary)
│   ├── LookingForDriver.jsx    (Searching animation)
│   └── WaitingForDriver.jsx    (Driver accepted details)
│
├── Riding.jsx ────────────────────────────────────── Active Passenger Ride
│   └── LiveTracking.jsx        (trackCaptain=true → shows captain's GPS)
│
├── CaptainHome.jsx ───────────────────────────────── Captain Dashboard
│   ├── CaptainDetails.jsx      (Stats: trips, earnings, time)
│   ├── RidePopUp.jsx           (New ride notification + Accept/Decline)
│   └── ConfirmRidePopUp.jsx    (OTP entry to start ride)
│
└── CaptainRiding.jsx ─────────────────────────────── Active Captain Ride
    ├── LiveTracking.jsx        (Full-screen map)
    └── FinishRide.jsx          (Trip summary + Finish Ride button)
```

---

## State Management & Context

The app uses React Context API with three providers, all composed in `main.jsx`:

### `UserContext`
Stores the authenticated passenger's profile data.

```jsx
const { user, setUser } = useContext(UserDataContext)
// user: { email, fullName: { firstName, lastName } }
```

### `CaptainContext`
Stores the authenticated captain's profile, loading, and error states.

```jsx
const { captain, setCaptain, isLoading, error } = useContext(CaptainDataContext)
```

### `SocketContext`
Maintains a **singleton Socket.IO connection** shared across the entire app.

```jsx
const { socket } = useContext(SocketContext)
// Same socket instance used in Home, CaptainHome, Riding, etc.
```

---

## Real-Time Communication

The app maintains a persistent Socket.IO connection established in `SocketContext.jsx` when the app first loads.

### Passenger Events

| Direction | Event | Where Handled | Action |
|---|---|---|---|
| Emit | `join` | `Home.jsx` `useEffect` | Registers user socket ID on the server |
| Listen | `ride-confirmed` | `Home.jsx` | Hides "Looking for Driver", shows "Waiting for Driver" panel |
| Listen | `ride-started` | `Home.jsx` | Navigates to `/riding` with ride data |
| Listen | `captain-location-update` | `LiveTracking.jsx` | Updates captain marker position on map |
| Listen | `ride-ended` | `Riding.jsx` | Navigates back to `/home` |

### Captain Events

| Direction | Event | Where Handled | Action |
|---|---|---|---|
| Emit | `join` | `CaptainHome.jsx` `useEffect` | Registers captain socket ID on the server |
| Emit | `update-location-captain` | `CaptainHome.jsx` | Sends GPS every 10 seconds |
| Listen | `new-ride` | `CaptainHome.jsx` | Shows ride request popup with trip details |

---

## Ride Flow — Step by Step

### Passenger Perspective

```
1. Open /home  ──────────────────────────────────────────────────────────
   • Full-screen Google Map shows current GPS position
   • Bottom sheet: "Where are you going?"

2. Enter locations  ─────────────────────────────────────────────────────
   • Type pickup/destination → live autocomplete via GET /maps/get-suggestions
   • Select from dropdown → fields fill automatically

3. Find a Trip  ─────────────────────────────────────────────────────────
   • Click "Find a Trip" → GET /rides/get-fare
   • VehiclePanel slides up with Auto / Car / Moto prices

4. Select Vehicle  ──────────────────────────────────────────────────────
   • Tap vehicle type → ConfirmRide panel slides up
   • Review trip summary and fare

5. Confirm Ride  ────────────────────────────────────────────────────────
   • Click "Confirm Ride" → POST /rides/create
   • LookingForDriver panel shows (searching animation)
   • Server notifies nearby captains via socket: new-ride

6. Captain Accepts  ─────────────────────────────────────────────────────
   • Server emits ride-confirmed → WaitingForDriver panel shows
   • Captain name, vehicle plate, ETA displayed

7. Ride Starts  ─────────────────────────────────────────────────────────
   • Captain enters OTP → server emits ride-started
   • App navigates to /riding
   • Map switches to trackCaptain=true — shows captain's live GPS

8. Ride Ends  ───────────────────────────────────────────────────────────
   • Captain taps Finish Ride → server emits ride-ended
   • App navigates back to /home
```

### Captain Perspective

```
1. Open /captain-home  ──────────────────────────────────────────────────
   • Emits join + starts sending GPS every 10 seconds
   • CaptainDetails panel shows stats

2. Ride Request Arrives  ────────────────────────────────────────────────
   • Socket emits new-ride → RidePopUp slides up
   • Shows: rider name, pickup, destination, fare

3. Accept Ride  ─────────────────────────────────────────────────────────
   • Click "Accept" → POST /rides/confirm
   • ConfirmRidePopUp slides up (full screen)
   • Shows trip details + OTP input field

4. Start Ride  ──────────────────────────────────────────────────────────
   • Passenger shares OTP → captain enters it
   • GET /rides/start-ride?rideId=...&otp=...
   • On success → navigates to /captain-riding

5. Navigate & Finish  ───────────────────────────────────────────────────
   • Full-screen map for navigation
   • Tap "Complete Ride" → FinishRide panel slides up
   • Review trip: pickup, destination, fare
   • Click "Finish Ride" → POST /rides/end-ride
   • Navigates back to /captain-home
```

---

## Authentication Flow

### Passenger Login

```
1. POST /users/login → { token, user }
2. localStorage.setItem('token', token)
3. setUser(user) → stored in UserContext
4. Navigate to /home
```

### Captain Login

```
1. POST /captains/login → { token, captain }
2. localStorage.setItem('captain-token', token)
3. setCaptain(captain) → stored in CaptainContext
4. Navigate to /captain-home
```

### All API Requests (Protected Endpoints)

```js
// User
headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }

// Captain
headers: { Authorization: `Bearer ${localStorage.getItem('captain-token')}` }
```

### Logout

```
1. GET /users/logout (or /captains/logout) — blacklists the token on server
2. localStorage.removeItem('token')
3. Navigate to /
```

---

## Live Map Tracking

`LiveTracking.jsx` is a versatile Google Maps component used in 4 different screens:

| Screen | Props | Behavior |
|---|---|---|
| `Home.jsx` | `(default)` | Shows user's own GPS position (blue dot) |
| `CaptainHome.jsx` | `(default)` | Shows captain's own GPS position |
| `Riding.jsx` | `trackCaptain={true}` | Shows user position + captain's live GPS (updated via socket) |
| `CaptainRiding.jsx` | `(default)` | Full-screen map for captain navigation |

The component uses `navigator.geolocation.watchPosition` for continuous user position updates and listens to `captain-location-update` socket events when `trackCaptain` is `true`.

---

## Animation System (GSAP)

All bottom-sheet panels use GSAP for smooth entry/exit animations via the `useGSAP` hook:

```jsx
// Panel slides up from bottom
useGSAP(() => {
  gsap.to(panelRef.current, {
    transform: isOpen ? 'translateY(0)' : 'translateY(100%)'
  })
}, [isOpen])
```

| Panel | Trigger |
|---|---|
| Location Search | Click on pickup/destination input |
| Vehicle Selector | "Find a Trip" button → fare loaded |
| Confirm Ride | Vehicle selected |
| Looking for Driver | "Confirm Ride" clicked |
| Waiting for Driver | `ride-confirmed` socket event |
| Ride Request (Captain) | `new-ride` socket event |
| OTP Entry (Captain) | Captain clicks Accept |
| Finish Ride (Captain) | Tap bottom bar on `/captain-riding` |

---

## License

ISC © Ubar Ride Share

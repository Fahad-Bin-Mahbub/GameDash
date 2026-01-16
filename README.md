# GameDash
A modular, real-time gaming dashboard built with **Next.js 16 (App Router)**.

## Description

GameDash is an interactive dashboard experience designed for monitoring player performance and server health in a game-like environment. It combines a leaderboard, detailed player stats, achievements, live notifications, and data visualizations into a single responsive interface with polished motion and visual effects.

---

## What it offers

- A complete dashboard UI (leaderboard + stats + charts)
- Real-time simulated updates (players + server status)
- Notification center + toast system
- Responsive layout with mobile navigation
- Smooth animations and rich visual styling

---

## Key features

- **Live simulation** (periodic player stats + server metrics updates)
- **Leaderboard** (search + sort + selection)
- **Stats tabs** (Overview / Combat / Achievements)
- **Charts** (Recharts: Line / Area / Bar)
- **Notifications**
  - dropdown center
  - toast queue (max visible)
  - dismiss + clear-all
- **Animations** (Framer Motion)
- **Tailwind-based styling** (glass/gradients/shimmer/noise)

---

## Tech used

- Next.js **16.1.3** (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React

---

## Architecture

### High-level flow

- **`DashboardContainer`** orchestrates the page:
  - consumes simulated data from hooks
  - owns UI state (tabs, selection, filters, mobile menu)
  - passes state/data down into presentational components

### Layers

- **UI Components (`components/`)**
  - reusable UI primitives (stat cards, chart cards, toasts, achievement cards)
  - layout elements (header, mobile menu, notification center)
  - feature areas (leaderboard, stats panels)

- **Hooks (`hooks/`)**
  - `usePlayerUpdates` — player stat simulation + ranking recalculation
  - `useServerStatus` — server status/load/active player simulation
  - `useNotifications` — notification list + toast queue behavior

- **Domain & Utilities (`lib/`)**
  - `types.ts` — shared TypeScript models
  - `mockData.ts` — mock generation + update logic
  - `constants.ts` — intervals/config
  - `utils.ts` — formatting/helpers

---

## Structure

```text
game-dash-nextjs/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Renders the dashboard
│   └── globals.css                # Tailwind + global styles
│
├── components/
│   ├── dashboard/
│   │   └── DashboardContainer.tsx # Orchestration + state wiring
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── NotificationCenter.tsx
│   │   └── Footer.tsx
│   │
│   ├── leaderboard/
│   │   ├── LeaderboardPanel.tsx
│   │   └── PlayerCard.tsx
│   │
│   ├── stats/
│   │   ├── PlayerStatsPanel.tsx   # Tabs + layout
│   │   ├── OverviewStats.tsx
│   │   ├── CombatStats.tsx
│   │   ├── AchievementStats.tsx
│   │   └── StatsCharts.tsx
│   │
│   └── ui/
│       ├── StatsCard.tsx
│       ├── ChartCard.tsx
│       ├── Toast.tsx
│       └── AchievementCard.tsx
│
├── hooks/
│   ├── usePlayerUpdates.ts
│   ├── useNotifications.ts
│   └── useServerStatus.ts
│
├── lib/
│   ├── types.ts
│   ├── mockData.ts
│   ├── constants.ts
│   └── utils.ts
│
└── public/
    └── noise.svg
````

---

## How to run

```bash
npm install
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

```bash
npm run build
npm start
```



# ⚽ WC 2026 Sticker Tracker

Track your Panini World Cup 2026 sticker collection with friends — leaderboard, trade finder, bulk import, and more.

## Features
- 🔐 Simple username login (no password)
- 📖 Full album: 874 stickers across 48 teams + intro section
- ✅ Click stickers to cycle: Missing → Owned → Duplicate
- 🔄 Smart trade finder: see exactly what to swap with each friend
- 📋 Copy trade lists for WhatsApp/iMessage
- 📊 Leaderboard, activity feed, hot trades
- ⌨️ Quick sticker entry by number + bulk paste import
- 💾 Export/import your collection as JSON backup
- 🌙 Dark mode, mobile-first design

## Quick Start

```bash
# 1. Install all dependencies
cd server && npm install
cd ../client && npm install
cd ..
npm install

# 2. Run (starts both server + client)
npm run dev
```

Then open **http://localhost:5173** in your browser.

A `demo` user with ~30% collection is pre-seeded so you can see how it looks right away.

## Sharing with friends
This app runs on your local network. To share with friends on the same WiFi:
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` / `ip addr` (Mac/Linux)
2. Tell friends to open `http://YOUR_LOCAL_IP:5173`

For internet sharing, deploy the server to any Node.js host (Railway, Render, Fly.io) and build the client pointing to your server URL.

## File structure
```
wc2026/
├── server/
│   ├── index.js       — Express API
│   ├── db.js          — SQLite database (sql.js, no native build needed)
│   ├── stickerData.js — All sticker seed data
│   └── package.json
├── client/
│   ├── src/
│   │   ├── pages/     — Login, Dashboard, Collection, Trades
│   │   ├── lib/api.js — API client
│   │   └── App.jsx
│   └── package.json
├── data/
│   └── wc2026.db      — Auto-created on first run
└── README.md
```

## Sticker data
- 10 intro/tournament stickers (logo, trophy, stadiums)
- 48 teams × 18 stickers = 864 team stickers
- **874 total stickers**
- Foil stickers clearly marked (badge, logo, trophy, opening ceremony)

## Tech stack
- **Frontend**: React 18 + Vite (no Redux, just props/state)
- **Backend**: Express.js
- **Database**: sql.js (SQLite in pure JavaScript — no native compilation needed)

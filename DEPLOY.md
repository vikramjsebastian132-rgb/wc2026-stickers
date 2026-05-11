# 🚀 Deploy to Railway (Free, Online in 5 minutes)

## Step 1 — Put the code on GitHub

1. Go to **github.com** → sign up free if needed
2. Click **New repository** → name it `wc2026-stickers` → click **Create**
3. Download **GitHub Desktop** from desktop.github.com
4. In GitHub Desktop: File → Add Local Repository → pick this `wc2026` folder
5. Click **Publish repository** → push to GitHub

## Step 2 — Deploy on Railway

1. Go to **railway.app** → sign up with your GitHub account (free)
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your `wc2026-stickers` repo
4. Railway auto-detects everything — click **Deploy**
5. Wait ~2 minutes for the build to finish
6. Click **Settings** → **Domains** → **Generate Domain**
7. You get a URL like `wc2026-stickers-production.up.railway.app`

## Step 3 — Share with friends

Send that URL to your friends — they open it in any browser on any device, type their name, and join! ⚽

---

## Alternative: Render.com (also free)

1. Go to **render.com** → sign up with GitHub
2. New → **Web Service** → connect your repo
3. Set:
   - **Build Command:** `npm run install-deps && npm run build`
   - **Start Command:** `npm start`
4. Click **Create Web Service**
5. Get your `.onrender.com` URL in ~3 minutes

---

## ⚠️ Note on free tiers
- Railway free tier: $5 credit/month (plenty for a friend group)
- Render free tier: app sleeps after 15 min of inactivity (first load takes ~30s to wake up)
- For always-on, Railway is better

## Data persistence
The SQLite database is stored on the server's disk. On free tiers, data may reset if the server restarts. For permanent storage, consider upgrading or exporting your collection JSON regularly via the Export button in the app.

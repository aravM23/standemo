# Stanley — Velocity Alerts

Detects algorithmic trend spikes from competitor creators before the wave peaks.  
Pushes high-urgency notifications with pre-drafted content rewritten through your content pillars.

This is **not** a content suggestion tool. It's an algorithmic survival engine.

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Background Scanner                     │
│              (APScheduler, every 30 min)                  │
│                                                          │
│  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐  │
│  │  Instagram   │──▶│   Velocity   │──▶│   Content    │  │
│  │  Ingestion   │   │   Engine     │   │   Rewriter   │  │
│  │              │   │              │   │   (GPT-4o)   │  │
│  └─────────────┘   └──────────────┘   └──────────────┘  │
│         │                  │                  │           │
│         ▼                  ▼                  ▼           │
│  ┌─────────────────────────────────────────────────┐     │
│  │          SQLite (posts, snapshots, alerts)       │     │
│  └─────────────────────────────────────────────────┘     │
│                          │                               │
│                          ▼                               │
│  ┌─────────────────────────────────────────────────┐     │
│  │     Push Notifications (Firebase Cloud Messaging)│     │
│  └─────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────┘
          │
          ▼
┌──────────────────┐
│  React Dashboard  │
│  (Vite + Tailwind)│
│                    │
│  • Alert feed      │
│  • Velocity feed   │
│  • Draft viewer    │
│  • Manual scan     │
└──────────────────┘
```

## How it works

1. **Ingest** — Every 30 minutes (configurable), the scanner pulls recent posts from all tracked competitor creators via Instagram scraping.

2. **Detect** — The velocity engine calculates view velocity (views/hour), compares against the creator's baseline average, and flags posts exceeding the spike threshold (default 2.5x). It also calculates acceleration (is the velocity increasing or decreasing?) and estimates hours until the wave peaks.

3. **Rewrite** — For each detected spike, the content rewriter reverse-engineers the post's format (FOMO listicle, storytime, hot take, etc.) and generates a complete draft — hook, visual beats, caption — rewritten through the user's content pillars.

4. **Alert** — A push notification fires with urgency scoring:
   - **CRITICAL**: 5x+ multiplier in first 3 hours → "Your draft is ready, tap to ride this wave"
   - **HIGH**: 3x+ in first 6 hours → "I already rewrote it for your pillars"
   - **MEDIUM**: 2.5x+ → "Draft available if you want to catch this wave"
   - **LOW**: Notable but not urgent

## Quick start

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your keys (all optional for demo mode)
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000. The setup modal walks you through entering your content pillars and competitor handles.

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `POLLING_INTERVAL_MINUTES` | 30 | How often the scanner runs |
| `VELOCITY_SPIKE_THRESHOLD` | 2.5 | Minimum multiplier to trigger alert |
| `ALERT_COOLDOWN_HOURS` | 6 | Prevent duplicate alerts for same post |
| `VELOCITY_WINDOW_HOURS` | 6 | How many hours of data = "recent" |
| `MIN_VIEWS_THRESHOLD` | 1000 | Minimum views before a post is tracked |
| `OPENAI_API_KEY` | (none) | For AI-powered draft rewriting |
| `INSTAGRAM_SESSION_ID` | (none) | For real Instagram data (mock data used if empty) |
| `FIREBASE_CREDENTIALS_PATH` | (none) | For push notifications (logs to console if empty) |

## API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `POST /api/users/` | POST | Create user with content pillars |
| `GET /api/users/{id}` | GET | Get user profile |
| `POST /api/users/{id}/creators/` | POST | Track a competitor |
| `GET /api/users/{id}/creators/` | GET | List tracked creators |
| `GET /api/users/{id}/alerts` | GET | Get alert feed |
| `GET /api/users/{id}/alerts/{aid}` | GET | Get alert with draft |
| `POST /api/users/{id}/alerts/{aid}/act` | POST | Mark alert acted on |
| `GET /api/users/{id}/velocity-feed` | GET | Real-time velocity rankings |
| `POST /api/users/{id}/scan` | POST | Manually trigger scan |

## Demo mode

Without any API keys, the system runs fully in demo mode:
- Mock Instagram scraper generates realistic engagement data with occasional viral spikes
- Template-based content rewriter generates drafts based on detected format patterns
- Push notifications log to console instead of sending

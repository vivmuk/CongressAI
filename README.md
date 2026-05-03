# CongressAI — Medical Affairs Congress Prep Platform

AI-powered platform that enables Medical Affairs teams to prepare for congresses 10x faster using Venice AI.

## Features

### 📥 Agenda Ingestion & Structuring
- Upload PDFs (100+ pages), websites (auto-crawl), screenshots, CSV/Excel
- AI extraction of sessions, speakers, topics, tracks, dates
- Auto-tagging: disease area, drug class, competitor mentions
- Filterable/searchable agenda with semantic search

### 🧠 Intelligent Insights Engine
- Daily briefings with top 10 insights
- Competitive landscape analysis (competitor & drug mentions)
- Topic clustering (AI-grouped themes)
- Must-attend session identification
- KOL dashboard with influence rankings

### 👨‍⚕️ HCP Intelligence & Profiling
- Extract speakers from any congress agenda
- PubMed publication lookup
- ClinicalTrials.gov involvement
- AI-generated "Why this HCP matters" summaries
- Influence scoring (0-100)
- Network graph (co-presenters)
- Engagement recommendations

### 🔎 Research Copilot
- Chat with your congress data
- Web search with citations (Venice AI)
- Context-aware: congress-specific + company-specific
- Grounded answers with source links

### 📊 Dashboards & Analytics
- Congress overview: total sessions, unique speakers, key topics
- Topic landscape heatmap
- HCP dashboard with KOL rankings
- Competitive intelligence tracking

### 🗂️ Personalization & Export
- Bookmark sessions and HCPs
- Export agenda as CSV or iCal
- Export briefings as Markdown
- Audio TTS summaries

### Architecture
- **Frontend**: Next.js 16 with React, CSS Modules
- **Backend**: Next.js API routes
- **AI**: Venice AI (chat, embeddings, TTS, STT, vision, image generation)
- **Database**: PostgreSQL (via Railway)
- **External APIs**: PubMed E-utilities, ClinicalTrials.gov v2

## Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Set your Venice API key
# VENICE_API_KEY=vn_your_key_here

# Set up PostgreSQL database
# DATABASE_URL=postgres://user:pass@host:5432/db

# Run development server
npm run dev
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VENICE_API_KEY` | Venice AI API key | Required |
| `VENICE_BASE_URL` | Venice API base URL | `https://api.venice.ai/api/v1` |
| `VENICE_MODEL_REASONING` | Model for extraction/reasoning | `kimi-k2-5` |
| `VENICE_MODEL_CHAT` | Model for chat | `deepseek-v3.2` |
| `VENICE_MODEL_VISION` | Model for image analysis | `qwen3-vl-235b-a22b` |
| `VENICE_MODEL_EMBED` | Embedding model | `text-embedding-bge-m3` |
| `VENICE_MODEL_TTS` | Text-to-speech model | `tts-kokoro` |
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PGSSL` | Use SSL for Postgres | `true` |

## Deployment

This app is designed for Railway deployment:

```bash
# Deploy via Railway CLI
railway up

# Or connect to a GitHub repo for auto-deploy
```

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analyze/pdf` | POST | Upload PDF agenda |
| `/api/analyze/website` | POST | Crawl & analyze website |
| `/api/analyze/screenshot` | POST | Analyze agenda screenshot |
| `/api/analyze/excel` | POST | Upload CSV/Excel |
| `/api/chat` | POST | Research copilot chat |
| `/api/embeddings` | POST | Generate embeddings |
| `/api/hcp/search` | POST | Search HCPs |
| `/api/hcp/profile` | POST | Build full HCP profile |
| `/api/hcp/list` | GET | List HCPs for congress |
| `/api/insights/briefing` | POST | Generate daily briefing |
| `/api/insights/competitive` | POST | Competitive landscape |
| `/api/insights/clusters` | POST | Topic clusters |
| `/api/insights/must-attend` | POST | Priority sessions |
| `/api/insights/kol` | POST | KOL dashboard |
| `/api/bookmarks/save` | POST | Save bookmark |
| `/api/bookmarks/list` | GET | List bookmarks |
| `/api/bookmarks/remove` | DELETE | Remove bookmark |
| `/api/save` | POST | Save congress data |
| `/api/list` | GET | List saved congresses |
| `/api/get` | GET | Get congress by ID |
| `/api/export` | GET | Export as CSV |
| `/api/export/briefing` | POST | Export briefing |
| `/api/tts` | POST | Text-to-speech |
| `/api/transcribe` | POST | Speech-to-text |
| `/api/models` | GET | List available models |
| `/api/health` | GET | Health check |
# BK.sys — Bharath Krishnan S · Portfolio (Full-Stack)

A security-operations-console themed portfolio. **React + Vite** frontend, **Node + Express**
backend with real email (Nodemailer), persistent visitor analytics, a feedback API, and
rate limiting.

```
bk-portfolio/
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/      # 17 UI components (Hero, Projects, Skills, Contact …)
│       ├── hooks/           # behaviour tracking, scrollspy, count-up, typed text
│       ├── data/            # your resume content as editable data files
│       ├── lib/             # API client
│       └── styles/          # global console theme
└── server/                 # Express API
    └── src/
        ├── routes/          # /contact /feedback /analytics /stats
        ├── controllers/     # request handlers
        ├── services/        # mailer (Nodemailer) + JSON store
        ├── middleware/      # rate limit, validation, errors
        └── utils/           # logger
```

## Quick start

```bash
# 1. install everything
npm run install:all

# 2. configure the backend
cp server/.env.example server/.env
#    → fill in SMTP_USER / SMTP_PASS (e.g. a Gmail App Password)

# 3. run both apps together (client :5173, server :5000)
npm run dev
```

Frontend: http://localhost:5173 · API: http://localhost:5000/api

## Features

**Frontend**
- Terminal boot sequence, cursor-reactive neural-network canvas, live IST HUD clock
- Typed role headline, scroll-triggered counters, animated skill bars, canvas skill radar
- Filterable project grid with detail modals
- Competitive-programming dashboard, awards & certifications
- Visitor behaviour console (time on page, scroll depth, sections seen, interest score)
- Star-rating feedback, validated contact form, easter-egg console commands
- Responsive, keyboard-accessible, respects `prefers-reduced-motion`

**Backend**
- `POST /api/contact`  — validates, emails you via Nodemailer, attaches visitor analytics
- `POST /api/feedback` — stores ratings + comments to a JSON store
- `POST /api/analytics`— records anonymous session behaviour
- `GET  /api/stats`    — aggregate numbers the frontend can display live
- IP rate limiting, input validation, centralized error handling, request logging

## Email setup (Gmail example)
1. Enable 2-Step Verification on your Google account.
2. Create an **App Password** (Google Account → Security → App passwords).
3. Put it in `server/.env` as `SMTP_PASS`, with `SMTP_USER` = your Gmail address.
Any SMTP provider works (Outlook, Zoho, SendGrid, Mailgun) — just change host/port.

## Deploy
- **Frontend**: `npm --prefix client run build` → deploy `client/dist` to Vercel/Netlify/GitHub Pages.
- **Backend**: deploy `server/` to Render/Railway/Fly. Set the env vars there.
- Point the frontend at the API with `VITE_API_URL` in `client/.env`.

Built by Bharath Krishnan S.

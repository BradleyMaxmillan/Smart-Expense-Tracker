# Smart Expense Tracker - Frontend v2 (Vite + React + Tailwind)

This upgraded frontend includes:
- Styled pages following a bright modern theme (white background, blue/green accents)
- Analytics page with Recharts visualizations (line, pie, bar)
- LocalStorage-powered dummy data (loads defaults on first run)
- Routing and protected routes

## Quick start

1. Install dependencies
```bash
cd frontend_v2
npm install
```

2. Run dev server
```bash
npm run dev
```

3. Open `http://localhost:5173`

Notes:
- Recharts is included in package.json; run `npm install` to fetch it.
- Replace `src/api/localStorageService.js` and `src/api/index.js` with real API calls when connecting to backend.

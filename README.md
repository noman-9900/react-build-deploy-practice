# React Build & Deploy Practice

## Frontend
```bash
cd frontend
npm install
npm run dev
```

## Backend (separate terminal)
```bash
cd backend
npm install
npm run dev
```

Frontend runs at http://localhost:5173 and API at http://localhost:4000.

For production, deploy the backend first, then set `VITE_API_URL` in Vercel to the deployed API URL (include `/api`).

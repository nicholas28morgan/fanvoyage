# FanVoyage Beta v3 — Full Package (Expedia + Ticketmaster + SeatGeek templates)

Generated on 2025-11-14T13:51:45.775627Z

This repository is a production-ready prototype for FanVoyage. It prioritizes Expedia flights, merges tickets from Ticketmaster and SeatGeek, and assembles FanTrip packages.

## Quick start (local)
1. Install dependencies:
   ```
   npm install
   ```
2. Create `.env.local` (optional) from `.env.local.example` and add any API keys you have.
3. Run locally:
   ```
   npm run dev
   ```
4. Open http://localhost:3000 and run a search from the form.

## Environment variables (examples)
- EXPEDIA_KEY
- EXPEDIA_SECRET
- AMA_CLIENT_ID
- AMA_CLIENT_SECRET
- HOTEL_API_KEY
- TICKETMASTER_API_KEY
- SG_CLIENT_ID
- SG_CLIENT_SECRET

Adapters fallback to mock data if keys are missing, so the app remains functional without secrets.

See DEPLOY.md for Vercel deploy steps.

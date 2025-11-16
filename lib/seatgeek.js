// lib/seatgeek.js - SeatGeek adapter template (mock-first)
export async function searchSeatGeek({ q, per_page = 5 }) {
  if (!process.env.SG_CLIENT_ID) return [];
  // Example endpoint: https://api.seatgeek.com/2/events?q=...
  // TODO: call SeatGeek API and normalize results
  return [];
}

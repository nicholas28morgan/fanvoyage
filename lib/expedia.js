// lib/expedia.js - Expedia adapter template (mock-first)
// Supports Expedia Partner Solutions / RapidAPI wrappers; replace endpoint details when you have credentials.

export async function searchExpediaFlights({ origin, destination, startDate, endDate, adults = 1 }) {
  if (!process.env.EXPEDIA_KEY) {
    return [
      { carrier: 'ExpediaSampleAir', price: 319, depart: startDate || '2026-01-10' },
      { carrier: 'SkyscannerMock', price: 349, depart: startDate || '2026-01-10' }
    ];
  }
  // TODO: implement real EPS/RapidAPI call here and transform to {carrier, price, depart, raw}
  return [];
}

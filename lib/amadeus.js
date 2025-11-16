// lib/amadeus.js - Amadeus adapter template (mock-first)
export async function searchAmadeusFlights({ origin, destination, startDate, endDate }) {
  if (!process.env.AMA_CLIENT_ID || !process.env.AMA_CLIENT_SECRET) {
    return [
      { carrier: 'MockAir', price: 299, depart: startDate || '2026-01-10' },
      { carrier: 'FanJet', price: 329, depart: startDate || '2026-01-10' }
    ];
  }
  // TODO: implement Amadeus OAuth + flight offers
  return [];
}

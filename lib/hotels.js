// lib/hotels.js - Hotel adapter template (mock-first)
export async function searchHotels({ city, checkIn, checkOut }) {
  if (!process.env.HOTEL_API_KEY && !process.env.EXPEDIA_KEY) {
    return [
      { name: 'Mock Hotel Downtown', pricePerNight: 159 },
      { name: 'Stadium View Suites', pricePerNight: 139 }
    ];
  }
  // TODO: implement Hotelbeds/Expedia hotel calls
  return [];
}

// lib/ticketmaster.js - Ticketmaster adapter template (mock-first)
export async function searchTicketmaster({ query, city, startDate }) {
  if (!process.env.TICKETMASTER_API_KEY) return [];
  // Example endpoint: https://app.ticketmaster.com/discovery/v2/events.json
  // TODO: call Ticketmaster Discovery API and normalize results
  return [];
}

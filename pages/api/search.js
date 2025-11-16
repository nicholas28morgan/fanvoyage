import { searchExpediaFlights } from '../../lib/expedia';
import { searchAmadeusFlights } from '../../lib/amadeus';
import { searchHotels } from '../../lib/hotels';
import { searchTicketmaster } from '../../lib/ticketmaster';
import { searchSeatGeek } from '../../lib/seatgeek';

export default async function handler(req, res) {
  const { team, airport, startDate, endDate } = req.query;

  try {
    // Flights: prefer Expedia -> Amadeus -> mocks
    let flights = [];
    try {
      const exp = await searchExpediaFlights({ origin: airport, destination: team, startDate, endDate });
      if (exp && exp.length) flights = exp;
    } catch(e){
      console.error('expedia adapter error', e);
    }
    if (!flights.length) {
      const amd = await searchAmadeusFlights({ origin: airport, destination: team, startDate, endDate });
      if (amd && amd.length) flights = amd;
    }
    if (!flights.length) {
      flights = [{ carrier: 'MockAir', price: 329, depart: startDate || '2026-01-10' }];
    }

    // Parallel: hotels + tickets
    const [hotels, tmEvents, sgEvents] = await Promise.all([
      searchHotels({ city: team, checkIn: startDate, checkOut: endDate }),
      searchTicketmaster({ query: team, city: '', startDate }),
      searchSeatGeek({ q: team })
    ]);

    const tickets = (tmEvents && tmEvents.length) ? tmEvents : (sgEvents && sgEvents.length) ? sgEvents : [{ name: (team || 'Game') + ' vs Rivals', date: startDate || '2026-01-10', price: 89 }];

    // Build sample packages
    const packages = [];
    const count = Math.max(1, Math.min(3, flights.length || 1));
    for (let i=0;i<count;i++){
      const f = flights[i] || flights[0];
      const h = (hotels && hotels.length) ? hotels[i % hotels.length] : { name: 'Mock Hotel', pricePerNight: 149 };
      const t = (tickets && tickets.length) ? tickets[i % tickets.length] : tickets[0];
      packages.push({ flight: f, hotel: h, ticket: t, totalPrice: (Number(f.price || 300) + Number(h.pricePerNight || 150) + Number(t.price || 89)) });
    }

    const stats = {
      airlines: process.env.EXPEDIA_KEY ? 700 : (process.env.AMA_CLIENT_ID ? 500 : 450),
      hotels: process.env.HOTEL_API_KEY ? 300000 : 50000,
      events: (process.env.TICKETMASTER_API_KEY || process.env.SG_CLIENT_ID) ? 20000 : 5000
    };

    res.status(200).json({ packages, stats });
  } catch (err) {
    console.error('search error', err);
    res.status(500).json({ error: String(err) });
  }
}

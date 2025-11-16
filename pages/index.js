import Image from 'next/image';
import {useState} from 'react';
import SearchCard from '../components/SearchCard';

export default function Home(){
  const [results,setResults] = useState(null);
  return (
    <div>
      <header className="header">
        <div className="brand">
          <Image src="/assets/fanvoyage-logo.svg" alt="FanVoyage" width={160} height={48} />
          <div style={{fontSize:13,opacity:0.9}}>Where sports passion meets adventure</div>
        </div>
        <nav style={{color:'#fff'}}>
          <a style={{marginRight:12}}>Trips</a>
          <a style={{marginRight:12}}>Partners</a>
          <a>Contact</a>
        </nav>
      </header>
      <main className="container">
        <section className="hero">
          <div style={{flex:1}}>
            <h1 style={{margin:0,fontFamily:'Montserrat, sans-serif'}}>Your next game-day getaway starts here</h1>
            <p style={{opacity:0.95,marginTop:8}}>FanVoyage bundles flights, hotels, and verified game tickets into one seamless booking experience tailored for fans.</p>
            <div style={{marginTop:12}}>
              <button className="button">Explore Top Fan Trips</button>
            </div>
            <div className="partner-row" aria-hidden style={{marginTop:14}}>
              <Image src="/assets/delta.png" alt="Delta" width={92} height={28} />
              <Image src="/assets/hilton.png" alt="Hilton" width={92} height={28} />
              <Image src="/assets/ticketmaster.png" alt="Ticketmaster" width={120} height={28} />
              <Image src="/assets/seatgeek.png" alt="SeatGeek" width={100} height={28} />
              <Image src="/assets/expedia.png" alt="Expedia" width={96} height={28} />
            </div>
          </div>
          <div style={{width:380}}>
            <SearchCard onResults={setResults} />
          </div>
        </section>

        <div className="grid-2">
          <section>
            <div className="card">
              <h2 style={{marginTop:0}}>Featured Fan Trips</h2>
              <div className="grid-pack">
                <div className="card"><strong>New York, NY</strong><div className="small">Yankees home & city highlights</div></div>
                <div className="card"><strong>Los Angeles, CA</strong><div className="small">Dodgers, Lakers, and fan experiences</div></div>
                <div className="card"><strong>Chicago, IL</strong><div className="small">Bears, Bulls, and city tours</div></div>
                <div className="card"><strong>Boston, MA</strong><div className="small">Historic sports & local culture</div></div>
              </div>
            </div>
            <div className="card" style={{marginTop:16}}>
              <h3 style={{marginTop:0}}>How it works</h3>
              <ol style={{paddingLeft:18}}>
                <li>Enter team, airport, and dates.</li>
                <li>We search flights, hotels, and tickets and assemble FanTrip packages.</li>
                <li>Pick a package and proceed to checkout (demo).</li>
              </ol>
            </div>
          </section>

          <aside>
            <div className="card">
              <h3 style={{marginTop:0}}>Search coverage</h3>
              {results && results.stats ? (
                <ul style={{listStyle:'none',paddingLeft:0}}>
                  <li>{results.stats.airlines.toLocaleString()}+ airlines</li>
                  <li>{results.stats.hotels.toLocaleString()}+ hotels</li>
                  <li>{results.stats.events.toLocaleString()}+ events</li>
                </ul>
              ) : <p className="small">Run a search to see coverage estimates.</p>}
            </div>
            <div className="card" style={{marginTop:12}}>
              <h4 style={{marginTop:0}}>Why FanVoyage?</h4>
              <p className="small">Because traveling for the game should be as easy as cheering from the stands.</p>
            </div>
          </aside>
        </div>

        <section style={{marginTop:20}}>
          <h3>Combined FanTrip packages</h3>
          {!results && <p className="small">Run a search above to see sample packages that bundle flights, hotels, and tickets.</p>}
          {results && results.packages && (
            <div className="grid-pack" style={{marginTop:8}}>
              {results.packages.map((p,i)=>(
                <div key={i} className="card">
                  <div style={{fontSize:12,color:'#6b7280'}}>Package {i+1}</div>
                  <h4 style={{margin:'6px 0'}}>{p.ticket?.name || 'Game package'}</h4>
                  <div className="small"><strong>Flight:</strong> {p.flight?.carrier || 'TBD'} · ${p.flight?.price || 0}</div>
                  <div className="small"><strong>Hotel:</strong> {p.hotel?.name || 'Hotel TBD'} · ${p.hotel?.pricePerNight || 0}/nt</div>
                  <div className="small"><strong>Ticket:</strong> {p.ticket?.date || 'TBD'}</div>
                  <div style={{marginTop:8,fontWeight:700}}>Est. total: ${p.totalPrice}</div>
                  <div style={{marginTop:10}}><button className="button" onClick={()=>alert('Demo booking flow')}>Continue to booking</button></div>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="footer">
          <div>© FanVoyage · Where Every Trip Is A Home Game</div>
          <div className="small">info@fanvoyage.com • New York, NY</div>
        </footer>
      </main>
    </div>
  );
}

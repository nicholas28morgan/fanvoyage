import {useState} from 'react';

export default function SearchCard({onResults}){
  const [team,setTeam] = useState('New York Yankees');
  const [airport,setAirport] = useState('JFK');
  const [start,setStart] = useState('2026-03-15');
  const [end,setEnd] = useState('2026-03-17');
  const [loading,setLoading] = useState(false);

  async function submit(e){
    e && e.preventDefault();
    setLoading(true);
    try{
      const params = new URLSearchParams();
      params.set('team', team);
      params.set('airport', airport);
      if (start) params.set('startDate', start);
      if (end) params.set('endDate', end);
      const res = await fetch('/api/search?' + params.toString());
      const json = await res.json();
      onResults(json);
    }catch(err){
      console.error(err);
      onResults(null);
    }finally{setLoading(false);}
  }

  return (
    <form className="card" onSubmit={submit}>
      <div style={{fontWeight:700,marginBottom:8}}>Plan your Fan Trip</div>
      <div style={{marginBottom:8}}>
        <label className="small">Team or City</label>
        <input className="input" value={team} onChange={e=>setTeam(e.target.value)} />
      </div>
      <div style={{marginBottom:8}}>
        <label className="small">Departing airport</label>
        <input className="input" value={airport} onChange={e=>setAirport(e.target.value)} />
      </div>
      <div style={{display:'flex',gap:8}}>
        <div style={{flex:1}}><label className="small">Start</label><input className="input" type="date" value={start} onChange={e=>setStart(e.target.value)} /></div>
        <div style={{width:120}}><label className="small">End</label><input className="input" type="date" value={end} onChange={e=>setEnd(e.target.value)} /></div>
      </div>
      <div style={{marginTop:12,textAlign:'right'}}>
        <button className="button" type="submit">{loading ? 'Searching…' : 'Search FanTrips'}</button>
      </div>
    </form>
  );
}

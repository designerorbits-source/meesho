import { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const carriers = [
  { name: 'Delhivery', color: '#5865f2', eta: '2–4 days', score: 94, base: 42, perKg: 26, note: 'Best value' },
  { name: 'Xpressbees', color: '#ff9b34', eta: '3–5 days', score: 89, base: 39, perKg: 30, note: 'Lowest cost' },
  { name: 'Ecom Express', color: '#f23e7a', eta: '3–6 days', score: 86, base: 45, perKg: 24, note: 'Reliable' },
  { name: 'Shadowfax', color: '#21aa8b', eta: '1–3 days', score: 91, base: 55, perKg: 21, note: 'Fastest' },
]

function App() {
  const [weight, setWeight] = useState(0.65)
  const [zone, setZone] = useState('Intercity')
  const [cod, setCod] = useState(true)
  const [volume, setVolume] = useState(84)
  const [selected, setSelected] = useState('Delhivery')
  const [tab, setTab] = useState('Overview')
  const zones = { Local: 0, 'Within state': 10, Intercity: 22, 'Remote zone': 45 }
  const zoneFee = zones[zone]
  const options = useMemo(() => carriers.map(c => ({ ...c, price: Math.round(c.base + Math.max(0, weight - .5) * c.perKg + zoneFee + (cod ? 18 : 0)) })), [weight, zone, cod])
  const best = options.reduce((a, b) => a.price < b.price ? a : b)
  const active = options.find(x => x.name === selected) || best
  const saved = Math.max(0, 154 - best.price)

  return <main>
    <aside>
      <div className="brand"><span className="brand-mark">m</span><span>meesho</span></div>
      <div className="workspace">SELLER WORKSPACE <button>⌄</button></div>
      <nav>
        <a>⌂ <span>Home</span></a><a>▣ <span>Orders</span><b>12</b></a><a className="active">⌁ <span>Shipping optimizer</span></a><a>▥ <span>Analytics</span></a><a>◈ <span>Catalog</span></a>
      </nav>
      <div className="support"><div className="support-icon">?</div><div><strong>Need help?</strong><small>Visit Seller Support</small></div><span>›</span></div>
      <div className="profile"><div className="avatar">AS</div><div><strong>Aruna Stores</strong><small>Delhi, India</small></div><span>⌄</span></div>
    </aside>
    <section className="content">
      <header><div className="crumb">Tools / <b>Shipping optimizer</b></div><div className="header-actions"><button className="help">? Help center</button><button className="bell">♧<i></i></button></div></header>
      <div className="heading"><div><h1>Shipping price optimizer</h1><p>Find the most efficient delivery partner for every shipment.</p></div><div className="sync"><span>●</span> Rates synced just now <button>↻</button></div></div>
      <div className="tabs"><button className={tab==='Overview'?'selected':''} onClick={()=>setTab('Overview')}>Overview</button><button className={tab==='Rate card'?'selected':''} onClick={()=>setTab('Rate card')}>Rate card</button><button className={tab==='History'?'selected':''} onClick={()=>setTab('History')}>History</button></div>
      <div className="grid">
        <div className="panel shipment"><div className="panel-title"><div><span className="eyebrow">SHIPMENT DETAILS</span><h2>Tell us about your shipment</h2></div><span className="step">Step 1 of 2</span></div>
          <label>Pickup pincode <span className="check">✓</span><input defaultValue="110001" /></label>
          <label>Delivery pincode <span className="check">✓</span><input defaultValue="560001" /></label>
          <div className="field-row"><label>Package weight <div className="unit-input"><input type="number" step="0.05" value={weight} onChange={e=>setWeight(Math.max(.1, Number(e.target.value)))} /><span>kg</span></div></label><label>Delivery zone<select value={zone} onChange={e=>setZone(e.target.value)}>{Object.keys(zones).map(z=><option key={z}>{z}</option>)}</select></label></div>
          <label className="toggle-line"><span><strong>Cash on delivery</strong><small>Collect payment at doorstep</small></span><button className={'toggle '+(cod?'on':'')} onClick={()=>setCod(!cod)} aria-label="Toggle cash on delivery"><i></i></button></label>
          <div className="volume"><div><span>Monthly shipment volume</span><b>{volume} shipments</b></div><input type="range" min="10" max="200" value={volume} onChange={e=>setVolume(e.target.value)} /></div>
        </div>
        <div className="recommendation"><div className="rec-top"><span className="spark">✦</span><span>SMART RECOMMENDATION</span></div><h2>Ship with <em>{best.name}</em></h2><p>Optimized for your cost, speed, and delivery success.</p><div className="hero-price"><div><span>Estimated shipping price</span><strong>₹{best.price}</strong><small>per shipment · incl. all charges</small></div><div className="save"><span>YOU SAVE</span><b>₹{saved}</b><small>vs. highest rate</small></div></div><div className="rec-stats"><div><span>Delivery estimate</span><b>{best.eta}</b></div><div><span>Success rate</span><b>{best.score}%</b></div></div><button className="primary" onClick={()=>alert(`${best.name} selected for this shipment.`)}>Create shipment <span>→</span></button><button className="secondary" onClick={()=>document.querySelector('.carrier-list').scrollIntoView({behavior:'smooth'})}>View full breakdown</button></div>
      </div>
      <div className="comparison-head"><div><span className="eyebrow">COMPARE OPTIONS</span><h2>Available delivery partners</h2></div><span>Prices include taxes & applicable surcharges</span></div>
      <div className="carrier-list">{options.map((c, i)=><article className={'carrier '+(selected===c.name?'chosen':'')} key={c.name} onClick={()=>setSelected(c.name)}><div className="radio">{selected===c.name && '✓'}</div><div className="carrier-logo" style={{background:c.color}}>{c.name[0]}</div><div className="carrier-name"><strong>{c.name} {c.name===best.name && <small className="tag">BEST MATCH</small>}</strong><span>{c.note} · {c.score}% success rate</span></div><div className="estimate"><span>DELIVERY</span><b>{c.eta}</b></div><div className="rate"><span>RATE</span><b>₹{c.price}</b></div><span className="chev">›</span></article>)}</div>
    </section>
  </main>
}
createRoot(document.getElementById('root')).render(<App />)

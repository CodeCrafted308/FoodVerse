import { useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
const features = [
  ['01', 'Food recognition', 'Identify dishes and food items from an image.', 'Scan'],
  ['02', 'Nutrition intelligence', 'Explore estimated calories and macros.', 'Nutrition'],
  ['03', 'Freshness review', 'Review visual freshness signals responsibly.', 'Freshness'],
  ['04', 'Kitchen hygiene', 'Review a kitchen video checklist.', 'Hygiene'],
  ['05', 'Smart cooking', 'Turn ingredients into practical recipes.', 'Recipes'],
  ['06', 'Personal meal plans', 'Generate flexible meal ideas for your goals.', 'Meal plans'],
]
function Panel({ title, subtitle, children }) { return <section className="panel"><div className="panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>{children}</section> }
function Result({ data }) { return data && <pre className="result">{JSON.stringify(data, null, 2)}</pre> }

export default function App() {
  const [tab, setTab] = useState('Overview')
  const [file, setFile] = useState(null)
  const [video, setVideo] = useState(null)
  const [ingredients, setIngredients] = useState('tomato, spinach, rice, chickpeas')
  const [diet, setDiet] = useState('No preference')
  const [goal, setGoal] = useState('Balanced eating')
  const [days, setDays] = useState('3')
  const [meals, setMeals] = useState('3')
  const [result, setResult] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  async function callApi(path, body) {
    setBusy(true); setError(''); setResult(null)
    try {
      const response = await fetch(`${API}${path}`, { method: 'POST', body })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || 'Request failed')
      setResult(data)
    } catch (e) { setError(`${e.message}. Make sure the FastAPI backend is running at ${API}.`) }
    finally { setBusy(false) }
  }
  function upload(path, selected, field='file') {
    if (!selected) { setError('Please choose a file first.'); return }
    const body = new FormData(); body.append(field, selected)
    return callApi(path, body)
  }
  const nav = ['Overview', 'Food scanner', 'Freshness', 'Hygiene review', 'Cooking assistant', 'Meal planner']
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-icon">✳</span><div><b>foodverse</b><small>FOOD INTELLIGENCE</small></div></div>
      <div className="workspace"><span className="dot"/> WORKSPACE <span className="chevron">⌄</span></div>
      <nav>{nav.map((n,i)=><button key={n} className={tab===n?'nav-item active':'nav-item'} onClick={()=>{setTab(n);setResult(null);setError('')}}><span className="nav-icon">{['◫','◉','◌','▦','♨','☷'][i]}</span>{n}<span className="nav-arrow">{tab===n?'•':''}</span></button>)}</nav>
      <div className="sidebar-bottom"><div className="help-mark">?</div><div><b>FoodVerse demo</b><small>Prototype environment</small></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="crumb">Workspace <span>/</span> <b>{tab}</b></div><div className="top-actions"><span className="status"><i/> API-ready UI</span><div className="avatar">FV</div></div></header>
      <div className="content">
        <div className="welcome"><div><div className="eyebrow">YOUR FOOD, UNDERSTOOD</div><h1>{tab==='Overview'?'A smarter way to see food.':tab}</h1><p>{tab==='Overview'?'One workspace for food recognition, nutrition, freshness, and everyday cooking.':'Explore this FoodVerse capability using the demo workflow below.'}</p></div><div className="date-pill"><span>✳</span> MULTIMODAL AI STUDIO</div></div>
        {tab==='Overview' && <>
          <div className="hero"><div className="hero-copy"><div className="hero-label"><span/> FOOD INTELLIGENCE, CONNECTED</div><h2>Make every food<br/>decision <em>more informed.</em></h2><p>Bring images, kitchen videos, ingredients, and personal goals into one intelligent food workspace.</p><button className="primary" onClick={()=>setTab('Food scanner')}>Explore food scanner <span>↗</span></button><div className="hero-foot"><span>✦ Modular AI services</span><span>◈ Practical insights</span><span>⌁ Built to extend</span></div></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="food-circle"><div className="food-emoji">🥗</div></div><div className="float-card nutrition-card"><span className="mini-icon">✳</span><div><b>Food insights</b><small>Recognition · Nutrition</small></div><span className="tiny-check">✓</span></div><div className="float-card fresh-card"><span className="fresh-dot"/> <div><b>Freshness review</b><small>Visual signals</small></div></div><div className="sparkle s1">✳</div><div className="sparkle s2">✦</div></div></div>
          <div className="section-title"><div><h2>Your intelligence toolkit</h2><p>Six capabilities. One connected experience.</p></div><span className="muted-tag">06 MODULES</span></div>
          <div className="feature-grid">{features.map(([n,title,desc,action])=><button key={n} className="feature-card" onClick={()=>setTab(({Scan:'Food scanner',Nutrition:'Food scanner',Freshness:'Freshness',Hygiene:'Hygiene review',Recipes:'Cooking assistant','Meal plans':'Meal planner'})[action]||'Overview')}><div className="feature-top"><span className="feature-number">{n}</span><span className="feature-arrow">↗</span></div><h3>{title}</h3><p>{desc}</p><span className="feature-link">Open module <b>→</b></span></button>)}</div>
          <div className="notice"><span>ⓘ</span><div><b>Prototype transparency</b><p>Food recognition uses a demo fallback; freshness and hygiene models are not connected. Results are illustrative and must not be used as food-safety or medical decisions.</p></div></div>
        </>}
        {tab==='Food scanner' && <div className="two-col"><Panel title="Food & nutrition scanner" subtitle="Upload a food image to receive a demo analysis."><div className="upload-box"><div className="upload-symbol">◉</div><b>Choose a food image</b><p>JPG, PNG or WEBP · Max 20 MB</p><input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>setFile(e.target.files[0])}/>{file&&<span className="selected-file">{file.name}</span>}<button className="primary" disabled={busy} onClick={()=>upload('/api/food/analyze',file)}>{busy?'Analyzing…':'Analyze food image →'}</button></div><div className="tip"><b>What you'll see</b><p>Food label, generic serving nutrition, estimated health score, and practical suggestions.</p></div></Panel><Panel title="Freshness check" subtitle="A cautious visual review entry point."><p className="body-copy">Freshness can be difficult to determine from an image alone. This demo deliberately avoids claiming that food is safe or spoiled without a validated model.</p><button className="secondary" onClick={()=>setTab('Freshness')}>Open freshness review →</button></Panel></div>}
        {tab==='Freshness' && <Panel title="Freshness review" subtitle="Upload an image to see the prototype's responsible-review response."><div className="upload-box compact"><div className="upload-symbol">◌</div><b>Upload a food image</b><p>JPG, PNG or WEBP · Max 20 MB</p><input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>setFile(e.target.files[0])}/>{file&&<span className="selected-file">{file.name}</span>}<button className="primary" disabled={busy} onClick={()=>upload('/api/freshness/analyze',file)}>Review image →</button></div><div className="notice"><span>!</span><div><b>Safety first</b><p>Smell, storage history, temperature, expiry information, and direct inspection matter. An image cannot rule out harmful microbes.</p></div></div></Panel>}
        {tab==='Hygiene review' && <Panel title="Kitchen hygiene review" subtitle="Upload a short kitchen video to return a review checklist."><div className="upload-box compact"><div className="upload-symbol">▦</div><b>Select a kitchen video</b><p>MP4, MOV, AVI or WEBM · Max 20 MB</p><input type="file" accept="video/mp4,video/quicktime,video/x-msvideo,video/webm" onChange={e=>setVideo(e.target.files[0])}/>{video&&<span className="selected-file">{video.name}</span>}<button className="primary" disabled={busy} onClick={()=>upload('/api/hygiene/review',video)}>Review video checklist →</button></div><div className="notice"><span>ⓘ</span><div><b>No automatic compliance verdict</b><p>Glove usage, hair coverings, handling, and cleanliness require validated video models and human review. Obtain authorization before analyzing footage.</p></div></div></Panel>}
        {tab==='Cooking assistant' && <Panel title="Smart cooking assistant" subtitle="List ingredients separated by commas to get recipe ideas."><label className="field-label">Ingredients you have</label><textarea value={ingredients} onChange={e=>setIngredients(e.target.value)} rows="3" placeholder="e.g. tomato, rice, spinach"/><label className="field-label">Dietary preference</label><select value={diet} onChange={e=>setDiet(e.target.value)}><option>No preference</option><option>Vegetarian</option><option>Vegan</option><option>High protein</option><option>Gluten-free</option></select><button className="primary" disabled={busy} onClick={()=>{const b=new FormData();b.append('ingredients',ingredients);b.append('dietary_preference',diet);callApi('/api/cooking/recipes',b)}}>Generate recipe ideas →</button></Panel>}
        {tab==='Meal planner' && <Panel title="Personal meal planner" subtitle="Create flexible meal ideas based on your stated preferences."><label className="field-label">Goal</label><select value={goal} onChange={e=>setGoal(e.target.value)}><option>Balanced eating</option><option>More plant-based meals</option><option>Convenient meal prep</option><option>Higher-protein ideas</option><option>Budget-friendly meals</option></select><label className="field-label">Dietary preference</label><select value={diet} onChange={e=>setDiet(e.target.value)}><option>No preference</option><option>Vegetarian</option><option>Vegan</option><option>High protein</option><option>Gluten-free</option></select><div className="form-row"><div><label className="field-label">Days (1–7)</label><input type="number" min="1" max="7" value={days} onChange={e=>setDays(e.target.value)}/></div><div><label className="field-label">Meals per day (1–6)</label><input type="number" min="1" max="6" value={meals} onChange={e=>setMeals(e.target.value)}/></div></div><button className="primary" disabled={busy} onClick={()=>{const b=new FormData();b.append('goal',goal);b.append('dietary_preference',diet);b.append('days',days);b.append('meals_per_day',meals);callApi('/api/meals/plan',b)}}>Build my meal plan →</button></Panel>}
        {error&&<div className="error-box">⚠ {error}</div>}
        {result&&<Panel title="Analysis results" subtitle="API response from the current prototype."><Result data={result}/></Panel>}
        <footer><span>✳ foodverse</span><span>Designed for clearer food decisions · Prototype v0.1</span></footer>
      </div>
    </main>
  </div>
}

<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>MUTEMA — Officiel</title>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
  :root {
    --gold: #f5c842; --emerald: #10d98f; 
    --bg: #050c14; --bg2: #0a1622; --text: #e8f0fe;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); padding-bottom: 90px; }

  /* ── EN-TÊTE AMÉLIORÉ ── */
  .hero {
    background: linear-gradient(180deg, #003366 0%, var(--bg) 100%);
    height: 180px; display: flex; flex-direction: column; align-items: center; justify-content: center;
    border-bottom: 1px solid var(--gold);
    position: relative; overflow: hidden;
  }
  
  /* Animation du nom MUTEMA */
  .logo-main { 
    font-family: 'Bebas Neue', sans-serif; 
    font-size: 60px; 
    letter-spacing: 8px; 
    background: linear-gradient(135deg, #f5c842, #ffffff); 
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent;
    animation: shine 3s infinite;
  }
  @keyframes shine {
    0% { filter: brightness(1); }
    50% { filter: brightness(1.3) drop-shadow(0 0 10px var(--gold)); }
    100% { filter: brightness(1); }
  }

  /* Vague décorative */
  .wave { position: absolute; bottom: 0; width: 200%; height: 30px; background: url('https://raw.githubusercontent.com/front-end-relative/waves-animation/master/wave.png'); background-size: 50% 30px; animation: wave-move 10s linear infinite; opacity: 0.1; }
  @keyframes wave-move { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  /* NAVIGATION */
  nav { position: fixed; bottom: 0; left: 0; right: 0; background: #050c14; border-top: 1px solid var(--gold); display: flex; justify-content: space-around; padding: 12px 0; z-index: 1000; }
  .nav-btn { background: none; border: none; color: rgba(232,240,254,0.4); display: flex; flex-direction: column; align-items: center; font-size: 8px; text-transform: uppercase; font-weight: bold; }
  .nav-btn.active { color: var(--gold); }
  .nav-btn i { font-size: 20px; margin-bottom: 4px; }

  /* CONTENU */
  .tab { display: none; padding: 20px; max-width: 500px; margin: 0 auto; animation: slideUp 0.4s ease; }
  .tab.active { display: block; }
  .card { background: var(--bg2); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; transition: 0.3s; }
  .card:hover { border-color: var(--gold); }
  
  @keyframes slideUp { from{opacity:0; transform:translateY(20px)} to{opacity:1; transform:translateY(0)} }
</style>
</head>
<body>

<header class="hero">
  <div class="logo-main">MUTEMA</div>
  <div style="font-size:10px; color:var(--gold); letter-spacing:5px; font-weight:bold; text-transform:uppercase; z-index:10">RIGUEUR • DISCIPLINE • ENTRAIDE</div>
  <div class="wave"></div>
</header>

<div id="tab-home" class="tab active">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom:10px">
    <h2 style="font-family:'Bebas Neue'; font-size:26px; color:var(--gold); letter-spacing:1px">💰 TABLEAU DE BORD</h2>
    <div id="sync-status" style="font-size:9px; color:var(--emerald); background:rgba(16,217,143,0.1); padding:4px 8px; border-radius:4px">● CLOUD CONNECTÉ</div>
  </div>
  <div id="financeList" class="space-y-3 text-sm">
    <p style="text-align:center; color:gray; padding:20px">Synchronisation avec Supabase...</p>
  </div>
</div>

<div id="tab-projets" class="tab">
  <h2 style="font-family:'Bebas Neue'; font-size:26px; color:var(--gold); margin-bottom:20px">🚀 PROJETS</h2>
  <div class="card italic" style="color:gray; justify-content:center; padding:40px text-center">Aucun projet en cours de développement.</div>
</div>

<nav>
  <button class="nav-btn active" onclick="showTab('home', this)"><i class="fas fa-wallet"></i><span>Finances</span></button>
  <button class="nav-btn" onclick="showTab('projets', this)"><i class="fas fa-rocket"></i><span>Projets</span></button>
</nav>

<script>
// ── CONFIGURATION SUPABASE ──
const SUPABASE_URL = "https://jkliffcnmmkjwphqufon.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprbGlmZmNubW1randwaHF1Zm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MDQxMTksImV4cCI6MjA5MzM4MDExOX0.WdCzzecQuqpemC4Th01UIHMO-MnBRWEZXT42lH1vo7s";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function showTab(id, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  btn.classList.add('active');
}

async function loadData() {
  const list = document.getElementById('financeList');
  
  // Lecture de la table 'finances'
  const { data, error } = await _supabase
    .from('finances')
    .select('*')
    .order('nom', { ascending: true });

  if (error) {
    list.innerHTML = `<div class="card" style="color:var(--red); border-color:var(--red)">Erreur Cloud : ${error.message}</div>`;
    return;
  }

  if (!data || data.length === 0) {
    list.innerHTML = `<div class="card" style="color:gray; border-style:dashed">La base de données est vide. Veuillez remplir votre table Supabase.</div>`;
    return;
  }

  list.innerHTML = "";
  data.forEach(item => {
    list.innerHTML += `
      <div class="card">
        <div>
          <div style="font-weight:bold; text-transform:uppercase; letter-spacing:0.5px">${item.nom}</div>
          <div style="font-size:10px; color:rgba(232,240,254,0.4); margin-top:2px italic">Paiement : ${item.date_paiement || 'En attente'}</div>
        </div>
        <div style="color:var(--gold); font-weight:bold; font-size:16px">${item.montant || '0'} <span style="font-size:9px">FCFA</span></div>
      </div>
    `;
  });
}

// Lancement automatique
window.onload = loadData;
// Rafraîchir toutes les 15 secondes pour le "Live"
setInterval(loadData, 15000);
</script>
</body>
</html>

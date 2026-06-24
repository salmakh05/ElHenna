/* ── Particles ────────────────────────────────────────────── */
(function initParticles(){
  const wrap = document.getElementById('particles');
  const count = window.innerWidth < 700 ? 14 : 24;
  for(let i = 0; i < count; i++){
    const p = document.createElement('div');
    p.className = 'particle ' + (i % 5 === 0 ? 'red' : 'gold');
    const size = 3 + Math.random() * 4;
    p.style.cssText = `
      left:${Math.random()*100}vw;
      width:${size}px; height:${size}px;
      animation-duration:${9 + Math.random()*10}s;
      animation-delay:${Math.random()*10}s;
      --drift:${(Math.random()*60-30)}px;
    `;
    wrap.appendChild(p);
  }
})();

/* ── Splash screen + Music ────────────────────────────────── */
const splash = document.getElementById('splash');
const audio  = document.getElementById('music');
const musicBtn = document.getElementById('musicBtn');
let musicStarted = false;
let userMuted = false;

function startMusic(){
  if (musicStarted) return;
  musicStarted = true;
  audio.volume = 0;
  audio.play().then(() => {
    let v = 0;
    const fade = setInterval(() => {
      v += 0.04;
      audio.volume = Math.min(v, 1);
      if (v >= 1) clearInterval(fade);
    }, 80);
  }).catch(() => { musicStarted = false; });
}

function dismissSplash(){
  startMusic();
  splash.classList.add('hidden');
  // Remove from DOM after transition
  splash.addEventListener('transitionend', () => splash.remove(), { once: true });
}

// Tap/click anywhere on the splash to enter
splash.addEventListener('click',      dismissSplash);
splash.addEventListener('touchstart', dismissSplash, { passive: true });

// Fallback: auto-dismiss after 8s if user doesn't tap
setTimeout(dismissSplash, 8000);

/* ── Envelope ─────────────────────────────────────────────── */
const envelope = document.getElementById('envelope');
const details  = document.getElementById('details');

envelope.addEventListener('click', () => {
  if (envelope.classList.contains('open')) return;
  envelope.classList.add('open');
  setTimeout(() => details.classList.add('show'), 750);
});

/* ── Countdown ────────────────────────────────────────────── */
const target = new Date('2026-07-14T15:00:00');
const elDays  = document.getElementById('cd-days');
const elHours = document.getElementById('cd-hours');
const elMins  = document.getElementById('cd-mins');
const elSecs  = document.getElementById('cd-secs');
const countdownEl = document.getElementById('countdown');

function pad(n){ return String(n).padStart(2, '0'); }

function tick(){
  const diff = target - new Date();
  if (diff <= 0){
    countdownEl.innerHTML = '<p style="font-family:\'Playfair Display\',serif;font-size:20px;color:var(--maroon)">Bienvenue à la henna ❤️</p>';
    return;
  }
  elDays.textContent  = pad(Math.floor(diff / 86400000));
  elHours.textContent = pad(Math.floor(diff % 86400000 / 3600000));
  elMins.textContent  = pad(Math.floor(diff % 3600000 / 60000));
  elSecs.textContent  = pad(Math.floor(diff % 60000 / 1000));
}
tick();
setInterval(tick, 1000);

/* ── Music button (mute/unmute only) ─────────────────────── */
musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!musicStarted){ startMusic(); return; }
  userMuted = !userMuted;
  audio.muted = userMuted;
  musicBtn.classList.toggle('muted', userMuted);
});

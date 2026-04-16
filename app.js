// ── CURSOR ──────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx+'px'; cursor.style.top = my+'px'; });
(function animRing() {
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='20px'; cursor.style.height='20px'; ring.style.width='50px'; ring.style.height='50px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='12px'; cursor.style.height='12px'; ring.style.width='36px'; ring.style.height='36px'; });
});

// ── NEURAL CANVAS ───────────────────────────────────────
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
let W, H, nodes = [], animId;
const N = 60;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
function initNodes() {
  nodes = Array.from({length: N}, () => ({
    x: Math.random()*W, y: Math.random()*H,
    vx: (Math.random()-.5)*0.35, vy: (Math.random()-.5)*0.35,
    r: Math.random()*2+1
  }));
}
function drawNeural() {
  ctx.clearRect(0,0,W,H);
  nodes.forEach(n => {
    n.x += n.vx; n.y += n.vy;
    if(n.x<0||n.x>W) n.vx*=-1;
    if(n.y<0||n.y>H) n.vy*=-1;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(168,85,247,0.7)';
    ctx.fill();
  });
  for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++) {
    const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
    const d=Math.sqrt(dx*dx+dy*dy);
    if(d<140) {
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[j].x, nodes[j].y);
      ctx.strokeStyle = `rgba(124,58,237,${0.6*(1-d/140)})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }
  animId = requestAnimationFrame(drawNeural);
}
window.addEventListener('resize', () => { resize(); initNodes(); });
resize(); initNodes(); drawNeural();

// ── HAMBURGER ───────────────────────────────────────────
document.getElementById('hamburger').addEventListener('click', () => document.getElementById('mobile-menu').classList.add('open'));
document.getElementById('mobile-close').addEventListener('click', () => document.getElementById('mobile-menu').classList.remove('open'));
document.querySelectorAll('.mm-link').forEach(a => a.addEventListener('click', () => document.getElementById('mobile-menu').classList.remove('open')));

// ── SCROLL REVEAL ────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if(e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── CONTACT FORM ─────────────────────────────────────────
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const status = document.getElementById('form-status');
  status.style.display = 'block';
  this.reset();
  setTimeout(() => { status.style.display = 'none'; }, 5000);
});

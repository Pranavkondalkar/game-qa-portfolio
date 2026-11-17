const navWrap = document.querySelector('.nav-wrap');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

window.addEventListener('scroll', () => navWrap.classList.toggle('scrolled', window.scrollY > 20), {passive:true});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resizeCanvas() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  particles = Array.from({length: window.innerWidth < 700 ? 24 : 45}, () => ({
    x:Math.random()*window.innerWidth,
    y:Math.random()*window.innerHeight,
    r:Math.random()*1.2+.3,
    vx:(Math.random()-0.5)*.12,
    vy:(Math.random()-0.5)*.12
  }));
}

function drawParticles() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if(p.x<0)p.x=window.innerWidth;if(p.x>window.innerWidth)p.x=0;
    if(p.y<0)p.y=window.innerHeight;if(p.y>window.innerHeight)p.y=0;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(120,160,255,.18)';ctx.fill();
  });
  if(!reduceMotion) requestAnimationFrame(drawParticles);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
drawParticles();

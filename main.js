// Small helpers (year, mobile nav)
document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if(navToggle && navMenu){
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
// Close menu when clicking a link (mobile)
document.querySelectorAll('#navMenu a').forEach(a => a.addEventListener('click', () => {
  navMenu.classList.remove('open'); navToggle.setAttribute('aria-expanded','false');
}));

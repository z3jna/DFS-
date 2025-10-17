
const nav = document.getElementById('site-nav');
const burger = document.getElementById('navToggle');

function closeMenu(){
  nav.classList.remove('open');
  burger.setAttribute('aria-expanded','false');
}
function openMenu(){
  nav.classList.add('open');
  burger.setAttribute('aria-expanded','true');
}

if (burger && nav){
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') closeMenu();
  });

  document.addEventListener('click', (e) => {
    const within = nav.contains(e.target) || burger.contains(e.target);
    if (!within) closeMenu();
  });

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}


const TRANSLATIONS = {
  sr:{meta_title:"DFS",nav_home:"Početna",nav_algorithms:"Algoritmi",nav_dfs:"DFS",nav_contact:"Kontakt",nav_login:"Prijava",lang_button:"EN",aria_brand:"Početna",aria_menu:"Otvorite meni",footer_text:"© 2025 DFS Vizualizacija — Zejna Mahmutović"},
  en:{meta_title:"DFS",nav_home:"Home",nav_algorithms:"Algorithms",nav_dfs:"DFS",nav_contact:"Contact",nav_login:"Login",lang_button:"SR",aria_brand:"Home",aria_menu:"Open menu",footer_text:"© 2025 DFS Visualization — Zejna Mahmutović"}
};
let currentLang = localStorage.getItem('lang') || 'sr';

function applyTranslations(lang){
  const t = TRANSLATIONS[lang] || TRANSLATIONS.sr;
  document.title = t.meta_title;
  document.documentElement.setAttribute('lang', lang==='sr'?'sr':'en');

  const links = nav.querySelectorAll('a');
  if (links.length >= 5){
    links[0].textContent = t.nav_home;
    links[1].textContent = t.nav_algorithms;
    links[2].textContent = t.nav_dfs;
    links[3].textContent = t.nav_contact;
    links[4].textContent = t.nav_login;
  }
  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = t.lang_button;

  const brand = document.querySelector('.brand');
  if (brand) brand.setAttribute('aria-label', t.aria_brand);
  if (burger) burger.setAttribute('aria-label', t.aria_menu);

  const footerP = document.querySelector('.footer-content p');
  if (footerP) footerP.textContent = t.footer_text;

  currentLang = lang;
  localStorage.setItem('lang', lang);
}
applyTranslations(currentLang);

const langBtn = document.getElementById('langToggle');
if (langBtn){
  langBtn.addEventListener('click', ()=>{
    const next = currentLang === 'sr' ? 'en' : 'sr';
    applyTranslations(next);
  });
}


(function relocateLangBtn(){
  const headerContainer = document.querySelector('.site-header .container');
  if (!langBtn || !nav || !headerContainer) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile){
    
    headerContainer.appendChild(langBtn);
    langBtn.classList.add('lang-btn--floating');
  } else {
  
    nav.appendChild(langBtn);
    langBtn.classList.remove('lang-btn--floating');
  }
})();
window.addEventListener('resize', () => {

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const headerContainer = document.querySelector('.site-header .container');
  if (!langBtn || !nav || !headerContainer) return;

  if (isMobile){
    headerContainer.appendChild(langBtn);
    langBtn.classList.add('lang-btn--floating');
  } else {
    nav.appendChild(langBtn);
    langBtn.classList.remove('lang-btn--floating');
  }
});


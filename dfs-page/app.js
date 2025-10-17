
const btn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}


const TRANSLATIONS = {
  sr: {
    meta_title: "DFS",
    nav_home: "Početna",
    nav_algorithms: "Algoritmi",
    nav_dfs: "DFS",
    nav_contact: "Kontakt",
    nav_login: "Prijava",
    lang_button: "EN",
    aria_brand: "Početna",
    aria_menu: "Otvorite meni",
    footer_text: "© 2025 DFS Vizualizacija — Zejna Mahmutović"
  },
  en: {
    meta_title: "DFS",
    nav_home: "Home",
    nav_algorithms: "Algorithms",
    nav_dfs: "DFS",
    nav_contact: "Contact",
    nav_login: "Login",
    lang_button: "SR",
    aria_brand: "Home",
    aria_menu: "Open menu",
    footer_text: "© 2025 DFS Visualization — Zejna Mahmutović"
  }
};

let currentLang = localStorage.getItem('lang') || 'sr';

function applyTranslations(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.sr;

  document.title = t.meta_title;
  document.documentElement.setAttribute('lang', lang === 'sr' ? 'sr' : 'en');

  const navLinks = document.querySelectorAll('.nav a');
  if (navLinks.length >= 5) {
    navLinks[0].textContent = t.nav_home;
    navLinks[1].textContent = t.nav_algorithms;
    navLinks[2].textContent = t.nav_dfs;
    navLinks[3].textContent = t.nav_contact;
    navLinks[4].textContent = t.nav_login;
  }

  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = t.lang_button;

  const brand = document.querySelector('.brand');
  if (brand) brand.setAttribute('aria-label', t.aria_brand);
  if (btn) btn.setAttribute('aria-label', t.aria_menu);

  const footerP = document.querySelector('.footer-content p');
  if (footerP) footerP.textContent = t.footer_text;

  currentLang = lang;
  localStorage.setItem('lang', lang);
}
applyTranslations(currentLang);


const langToggle = document.getElementById('langToggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    const next = currentLang === 'sr' ? 'en' : 'sr';
    applyTranslations(next);
  });
}

(function () {
  const nav = document.querySelector('.nav');
  const headerContainer = document.querySelector('.site-header .container');
  const langBtn = document.getElementById('langToggle');

  function relocateLangBtn() {
    if (!langBtn || !nav || !headerContainer) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      if (!langBtn.classList.contains('lang-btn--floating')) {
        headerContainer.appendChild(langBtn);
        langBtn.classList.add('lang-btn--floating');
      }
    } else {
      if (langBtn.classList.contains('lang-btn--floating')) {
        nav.appendChild(langBtn);
        langBtn.classList.remove('lang-btn--floating');
      }
    }
  }

  relocateLangBtn();
  window.addEventListener('resize', relocateLangBtn);
  window.addEventListener('orientationchange', relocateLangBtn);
})();

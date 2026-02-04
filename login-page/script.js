
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


const toggle = document.getElementById('togglePw');
const pw = document.getElementById('password');

if (toggle && pw) {
  toggle.addEventListener('click', () => {
    pw.type = pw.type === 'password' ? 'text' : 'password';
    toggle.classList.toggle('active');
  });
}


const TRANSLATIONS = {
  sr: {
    'meta.title': 'Login — DFS Vizualizacija',
    'nav.home': 'Početna',
    'nav.algoritmi': 'Algoritmi',
    'nav.dfs': 'DFS',
    'nav.kontakt': 'Kontakt',
    'nav.prijava': 'Prijava',

    'login.title': 'Prijava',
    'login.subtitle': 'Prijava je simulacija i koristi se isključivo za demonstraciju rada aplikacije.',
    'login.emailLabel': 'Email',
    'login.emailPh': 'npr. ana@mail.com',
    'login.passwordLabel': 'Lozinka',
    'login.passwordPh': '••••••••',
    'login.showPw': 'Prikaži lozinku',
    'login.remember': 'Zapamti me',
    'login.submit': 'Prijavi se',

    'msg.fill': 'Popuni oba polja.',
    'msg.invalid': 'Neispravan email ili lozinka.',
    'msg.success': 'Uspešna prijava! (simulacija)',

    'footer.copy': '© 2025 DFS Vizualizacija — Zejna Mahmutović'
  },
  en: {
    'meta.title': 'Login — DFS Visualization',
    'nav.home': 'Home',
    'nav.algoritmi': 'Algorithms',
    'nav.dfs': 'DFS',
    'nav.kontakt': 'Contact',
    'nav.prijava': 'Login',

    'login.title': 'Login',
    'login.subtitle': 'Login is a simulation and is used exclusively for demonstrating the application.',
    'login.emailLabel': 'Email',
    'login.emailPh': 'e.g. ana@mail.com',
    'login.passwordLabel': 'Password',
    'login.passwordPh': '••••••••',
    'login.showPw': 'Show password',
    'login.remember': 'Remember me',
    'login.submit': 'Sign in',

    'msg.fill': 'Fill in both fields.',
    'msg.invalid': 'Invalid email or password.',
    'msg.success': 'Login successful! (simulation)',

    'footer.copy': '© 2025 DFS Visualization — Zejna Mahmutović'
  }
};

let currentLang = localStorage.getItem('lang') || 'sr';

function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.sr;

  const titleEl = document.querySelector('title[data-i18n="meta.title"]');
  if (titleEl) titleEl.textContent = dict['meta.title'];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (dict[key]) el.setAttribute('aria-label', dict[key]);
  });

  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = (lang === 'sr') ? 'EN' : 'SR';

  currentLang = lang;
  localStorage.setItem('lang', lang);
}

applyTranslations(currentLang);

document.getElementById('langToggle')?.addEventListener('click', () => {
  applyTranslations(currentLang === 'sr' ? 'en' : 'sr');
});


(async () => {
  const form = document.getElementById('loginForm');

 
  let msg = document.getElementById('msg');
  if (!msg) {
    msg = document.createElement('div');
    msg.id = 'msg';
    msg.style.marginTop = '14px';
    msg.style.fontWeight = '600';
    form.appendChild(msg);
  }

  function setMsg(text, ok = false) {
    msg.style.color = ok ? '#00ff99' : '#ff7b7b';
    msg.textContent = text;
  }

  async function sha256Hex(text) {
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest('SHA-256', enc);
    return [...new Uint8Array(buf)]
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async function loadUsers() {
    const resp = await fetch('./users.json', { cache: 'no-store' });
    if (!resp.ok) throw new Error('Cannot load users.json');
    return await resp.json();
  }

  let users = [];
  try {
    users = await loadUsers();
  } catch (e) {
    console.error(e);
    setMsg('Greška pri učitavanju users.json.');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setMsg('');

    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      setMsg(TRANSLATIONS[currentLang]['msg.fill']);
      return;
    }

    const user = users.find(u => u.email.toLowerCase() === email);
    if (!user) {
      setMsg(TRANSLATIONS[currentLang]['msg.invalid']);
      return;
    }

    const hashed = await sha256Hex(password);

    if (hashed === user.password) {
      setMsg(TRANSLATIONS[currentLang]['msg.success'], true);

     
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userEmail', email);

   
    } else {
      setMsg(TRANSLATIONS[currentLang]['msg.invalid']);
    }
  });
})();

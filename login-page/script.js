
const btn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', e => {
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
    'login.subtitle': 'Pristupi nalogu da sačuvaš stabla, scenarije i rezultate.',
    'login.emailLabel': 'Email',
    'login.emailPh': 'npr. ana@mail.com',
    'login.passwordLabel': 'Lozinka',
    'login.passwordPh': '••••••••',
    'login.showPw': 'Prikaži lozinku',
    'login.remember': 'Zapamti me',
    'login.submit': 'Prijavi se',

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
    'login.subtitle': 'Access your account to save trees, scenarios, and results.',
    'login.emailLabel': 'Email',
    'login.emailPh': 'e.g. ana@mail.com',
    'login.passwordLabel': 'Password',
    'login.passwordPh': '••••••••',
    'login.showPw': 'Show password',
    'login.remember': 'Remember me',
    'login.submit': 'Sign in',

    'footer.copy': '© 2025 DFS Visualization — Zejna Mahmutović'
  }
};

let currentLang = localStorage.getItem('lang') || 'sr';

function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.sr;

 
  const titleEl = document.querySelector('title[data-i18n="meta.title"]');
  if (titleEl && dict['meta.title']) titleEl.textContent = dict['meta.title'];


  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

 
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
  });


  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
  });


  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = (lang === 'sr') ? 'EN' : 'SRP';

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


const form = document.getElementById('loginForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('.field').forEach(f => {
      const input = f.querySelector('input');
      const err = f.querySelector('.error');
      if (!input.checkValidity()) {
        ok = false;
        err.textContent = currentLang === 'en' ? 'Check input.' : 'Proveri unos.';
      } else {
        err.textContent = '';
      }
    });
    if (ok) {
      alert(currentLang === 'en' ? 'Demo login successful!' : 'Uspešna demo prijava!');
      form.reset();
    }
  });
}



(async () => {
  const q = id => document.getElementById(id);
  const msg = q('msg');
  const loginBtn = q('loginBtn');

  
  async function loadUsers() {
    try {
      const resp = await fetch('users.json', {cache: "no-store"});
      if (!resp.ok) throw new Error('Cannot load users.json');
      return await resp.json();
    } catch (e) {
      console.error(e);
      msg.textContent = 'Greška pri učitavanju podataka (pogledaj konzolu).';
      return [];
    }
  }

  
  const sha256Hex = async (text) => {
    const enc = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest('SHA-256', enc.encode(text));
    const bytes = new Uint8Array(hashBuffer);
    return Array.from(bytes).map(b => b.toString(16).padStart(2,'0')).join('');
  };

  const users = await loadUsers();

  loginBtn.addEventListener('click', async () => {
    msg.textContent = '';
    const email = q('email').value.trim().toLowerCase();
    const password = q('password').value;

    if (!email || !password) {
      msg.textContent = 'Popuni oba polja.';
      return;
    }

    const user = users.find(u => u.email.toLowerCase() === email);
    if (!user) {
      msg.textContent = 'Neispravan email ili lozinka.';
      return;
    }

    
    const hashed = await sha256Hex(password);
    if (hashed === user.password) {
      msg.style.color = '#0f0';
      msg.textContent = 'Uspešna prijava! (simulacija)';
      
    } else {
      msg.style.color = '#f66';
      msg.textContent = 'Neispravan email ili lozinka.';
    }
  });

  
  ['email','password'].forEach(id => {
    q(id).addEventListener('keydown', (e) => {
      if (e.key === 'Enter') loginBtn.click();
    });
  });

})();


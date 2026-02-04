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
    'meta.contactTitle': 'Kontakt — DFS Vizualizacija',
    'nav.home': 'Početna',
    'nav.algoritmi': 'Algoritmi',
    'nav.dfs': 'DFS',
    'nav.kontakt': 'Kontakt',
    'nav.prijava': 'Prijava',
    'contact.title': 'Kontakt',
    'contact.subtitle': 'Imaš pitanje, predlog ili želiš saradnju? Piši nam.',
    'contact.nameLabel': 'Ime i prezime',
    'contact.namePh': 'Zejna Mahmutović',
    'contact.emailLabel': 'Email',
    'contact.emailPh': 'zejna@gmail.com',
    'contact.phoneLabel': 'Telefon (opciono)',
    'contact.phonePh': '+381 60 123 4567',
    'contact.subjectLabel': 'Tema',
    'contact.subjectPh': 'Predlog za novu funkciju',
    'contact.messageLabel': 'Poruka',
    'contact.messagePh': 'Napiši poruku...',
    'contact.consent': 'Slažem se da se moji podaci koriste za odgovor na ovu poruku.',
    'contact.send': 'Pošalji',
    'contact.infoTitle': 'Kontakt podaci',
    'contact.city': 'Novi Pazar, Srbija',
    'contact.hours': 'Pon–Pet 09:00–17:00',
    'err.required': 'Popuni ovo polje.',
    'err.email': 'Unesi ispravan email (primer: ime@gmail.com).',
    'err.phone': 'Unesi ispravan broj telefona.',
    'err.consent': 'Potvrdi saglasnost.'
  },
  en: {
    'meta.contactTitle': 'Contact — DFS Visualization',
    'nav.home': 'Home',
    'nav.algoritmi': 'Algorithms',
    'nav.dfs': 'DFS',
    'nav.kontakt': 'Contact',
    'nav.prijava': 'Login',
    'contact.title': 'Contact',
    'contact.subtitle': 'Got a question, suggestion, or want to collaborate? Write to us.',
    'contact.nameLabel': 'Full name',
    'contact.namePh': 'Zejna Mahmutović',
    'contact.emailLabel': 'Email',
    'contact.emailPh': 'zejna@gmail.com',
    'contact.phoneLabel': 'Phone (optional)',
    'contact.phonePh': '+381 60 123 4567',
    'contact.subjectLabel': 'Subject',
    'contact.subjectPh': 'Suggestion for a new feature',
    'contact.messageLabel': 'Message',
    'contact.messagePh': 'Write your message...',
    'contact.consent': 'I agree that my data will be used to respond to this message.',
    'contact.send': 'Send',
    'contact.infoTitle': 'Contact details',
    'contact.city': 'Novi Pazar, Serbia',
    'contact.hours': 'Mon–Fri 09:00–17:00',
    'err.required': 'Please fill out this field.',
    'err.email': 'Please enter a valid email (example: name@gmail.com).',
    'err.phone': 'Please enter a valid phone number.',
    'err.consent': 'Please confirm consent.'
  }
};

let currentLang = localStorage.getItem('lang') || 'sr';

function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.sr;
  const titleEl = document.querySelector('title[data-i18n]');
  if (titleEl) {
    const key = titleEl.getAttribute('data-i18n');
    if (dict[key]) titleEl.textContent = dict[key];
  }
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
  });
  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = (lang === 'sr') ? 'EN' : 'SRP';
  currentLang = lang;
  localStorage.setItem('lang', lang);
}

applyTranslations(currentLang);

document.getElementById('langToggle')?.addEventListener('click', () => {
  applyTranslations(currentLang === 'sr' ? 'en' : 'sr');
});

const form = document.getElementById('contactForm');

function clearErrors() {
  form?.querySelectorAll('.error').forEach(e => e.textContent = '');
}

function validateForm() {
  let ok = true;
  const dict = TRANSLATIONS[currentLang];
  clearErrors();
  form.querySelectorAll('.field').forEach(f => {
    const input = f.querySelector('input, textarea');
    const err = f.querySelector('.error');
    if (!input) return;
    if (input.required && input.value.trim() === '') {
      err.textContent = dict['err.required'];
      ok = false;
      return;
    }
    if (input.type === 'email' && input.value && !input.checkValidity()) {
      err.textContent = dict['err.email'];
      ok = false;
      return;
    }
    if (input.type === 'tel' && input.value && !input.checkValidity()) {
      err.textContent = dict['err.phone'];
      ok = false;
    }
  });
  const consent = document.getElementById('consent');
  if (consent && !consent.checked) {
    alert(dict['err.consent']);
    ok = false;
  }
  return ok;
}

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm()) {
      window.location.href = 'hvala.html';
    }
  });
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      const err = el.closest('.field')?.querySelector('.error');
      if (err) err.textContent = '';
    });
  });
}




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
    'meta.thanksTitle': 'Hvala — DFS Vizualizacija',

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
    'contact.toast': 'Poruka je poslata. Hvala!',

    'thanks.title': 'Hvala!',
    'thanks.subtitle': 'Poruka je uspešno poslata.',
    'thanks.backHome': 'Nazad na početnu',
    'thanks.sendAnother': 'Pošalji još jednu poruku',

    'footer.copy': '© 2025 DFS Vizualizacija — Zejna Mahmutović'
  },
  en: {
    'meta.contactTitle': 'Contact — DFS Visualization',
    'meta.thanksTitle': 'Thanks — DFS Visualization',

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
    'contact.toast': 'Message sent. Thank you!',

    'thanks.title': 'Thank you!',
    'thanks.subtitle': 'Your message has been sent successfully.',
    'thanks.backHome': 'Back to Home',
    'thanks.sendAnother': 'Send another message',

    'footer.copy': '© 2025 DFS Visualization — Zejna Mahmutović'
  }
};

let currentLang = localStorage.getItem('lang') || 'sr';

function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.sr;

  
  const titleEl = document.querySelector('title[data-i18n^="meta."]');
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

 
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
  });

 
  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = (lang === 'sr') ? 'EN' : 'SR';

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


const form = document.getElementById('contactForm');
if (form) {
  const toast = document.getElementById('toast');

  function validateForm() {
    let ok = true;
    form.querySelectorAll('.field').forEach((f) => {
      const input = f.querySelector('input, textarea');
      const err = f.querySelector('.error');
      if (!input.checkValidity()) {
        ok = false;
        err.textContent = currentLang === 'en' ? 'Please check this field.' : 'Popuni ovo polje.';
      } else {
        err.textContent = '';
      }
    });
    if (!document.getElementById('consent').checked) {
      alert(currentLang === 'en' ? 'Please confirm consent.' : 'Potvrdi saglasnost.');
      ok = false;
    }
    return ok;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => { window.location.href = 'hvala.html'; }, 600);
      } else {
        window.location.href = 'hvala.html';
      }
    }
  });
}


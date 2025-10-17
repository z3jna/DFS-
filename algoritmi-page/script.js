

(function () {
  
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

  
  const STORAGE_KEY = 'lang';
  const DEFAULT_LANG = 'sr';
  let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

  const translations = {
    sr: {
      nav: ["Početna", "Algoritmi", "DFS", "Kontakt", "Prijava"],
      title: "Šta su algoritmi?",
      subtitle: "Osnova svake računarske logike.",
      p1: "<strong>Algoritam</strong> je precizan skup uputstava koji opisuje kako rešiti određeni problem ili izvršiti neki zadatak. U suštini, to je plan koji računar sledi korak po korak.",
      p2: "U svakodnevnom životu i programiranju, algoritmi predstavljaju srž svake operacije: od sortiranja brojeva, pretrage podataka i pronalaženja najkraćih puteva, do kompleksnih zadataka kao što su obrada slike, veštačka inteligencija ili analiza podataka.",
      h2_1: "Vrste algoritama",
      h2_2: "Zašto su algoritmi važni?",
      ul: [
        "Algoritmi pretrage – pronalaženje podataka u strukturama (npr. DFS, BFS).",
        "Algoritmi sortiranja – uređivanje podataka (npr. Bubble Sort, Merge Sort, Quick Sort).",
        "Rekurzivni algoritmi – pozivaju sami sebe za rešavanje podproblema.",
        "Greedy algoritmi – biraju trenutno najbolju opciju.",
        "Dinamičko programiranje – rešavanje složenih problema pamćenjem prethodnih rešenja."
      ],
      p3: "Bez algoritama, računari ne bi mogli donositi odluke ili rešavati probleme. Oni su temelj svih digitalnih sistema i procesa. Učenje algoritama pomaže u razumevanju načina na koji računar 'razmišlja' i omogućava nam da gradimo efikasne i pametne programe.",
      quote: "„Algoritam je ono što pretvara ideju u kod.“",
      author: "— Donald Knuth",
      footer: "© 2025 DFS Vizualizacija — Zejna Mahmutović"
    },
    en: {
      nav: ["Home", "Algorithms", "DFS", "Contact", "Login"],
      title: "What are algorithms?",
      subtitle: "The foundation of every computer logic.",
      p1: "<strong>An algorithm</strong> is a precise set of instructions describing how to solve a specific problem or perform a task. In essence, it’s a plan that the computer follows step by step.",
      p2: "In everyday life and programming, algorithms are the core of every operation: from sorting numbers, searching data, and finding the shortest paths, to complex tasks like image processing, artificial intelligence, and data analysis.",
      h2_1: "Types of algorithms",
      h2_2: "Why are algorithms important?",
      ul: [
        "Search algorithms – finding data in structures (e.g. DFS, BFS).",
        "Sorting algorithms – arranging data (e.g. Bubble Sort, Merge Sort, Quick Sort).",
        "Recursive algorithms – call themselves to solve subproblems.",
        "Greedy algorithms – choose the currently best option.",
        "Dynamic programming – solve complex problems by remembering previous results."
      ],
      p3: "Without algorithms, computers couldn’t make decisions or solve problems. They are the foundation of all digital systems and processes. Learning algorithms helps us understand how a computer 'thinks' and enables us to build efficient and smart programs.",
      quote: "“An algorithm is what turns an idea into code.”",
      author: "— Donald Knuth",
      footer: "© 2025 DFS Visualization — Zejna Mahmutović"
    }
  };

  function applyTranslation(lang) {
    const t = translations[lang];
    if (!t) return;

    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach((a, i) => a.textContent = t.nav[i]);

    const title = document.querySelector('.page-title');
    const subtitle = document.querySelector('.page-sub');
    const p = document.querySelectorAll('.algoritmi-content p');
    const h2s = document.querySelectorAll('.algoritmi-content h2');
    const lis = document.querySelectorAll('.algoritmi-content ul li');
    const quote = document.querySelector('.quote-box p');
    const footer = document.querySelector('.site-footer p');

    if (title) title.textContent = t.title;
    if (subtitle) subtitle.textContent = t.subtitle;
    if (p[0]) p[0].innerHTML = t.p1;
    if (p[1]) p[1].innerHTML = t.p2;
    if (h2s[0]) h2s[0].textContent = t.h2_1;
    if (h2s[1]) h2s[1].textContent = t.h2_2;
    lis.forEach((li, i) => li.textContent = t.ul[i]);
    if (p[2]) p[2].textContent = t.p3;
    if (quote) quote.innerHTML = `${t.quote}<span>${t.author}</span>`;
    if (footer) footer.textContent = t.footer;

    const langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.textContent = (lang === 'sr') ? 'EN' : 'SRP';
  }

  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = (currentLang === 'sr') ? 'en' : 'sr';
      localStorage.setItem(STORAGE_KEY, currentLang);
      applyTranslation(currentLang);
    });
  }

  
  applyTranslation(currentLang);

 
  
  const headerContainer = document.querySelector('.site-header .container');

  function relocateLangBtn() {
    if (!langBtn || !nav || !headerContainer) return;
    const isMobile = window.matchMedia('(max-width:768px)').matches;

    if (isMobile) {
      if (!langBtn.classList.contains('lang-btn--floating')) {
        headerContainer.appendChild(langBtn);
        langBtn.classList.add('lang-btn--floating');
        langBtn.setAttribute('aria-label', 'Promena jezika');
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

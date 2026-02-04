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

  document.addEventListener('click', (e) => {
    const inside = nav.contains(e.target) || btn.contains(e.target);
    if (!inside) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
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
    title: "Algoritam Pretrage po Dubini (DFS)",
    intro_bold: "Depth-First Search (DFS)",
    intro_text: "— pogled u unutrašnju logiku pretrage.",
    highlight: "Na ovom sajtu možeš vizuelno pratiti kako DFS prolazi kroz čvorove i grane — korak po korak.",
    viz_title: "Vizualizacija",
    steps_title: "Koraci",
    lg_current: "Trenutni",
    lg_stack: "U steku",
    footer_text: "© 2025 DFS Vizualizacija — Zejna Mahmutović",
    next_step: "Sledeći korak",
    reset: "Reset",
    done: "Gotovo",
    loading: "Učitavanje…",
    finished: "✅ DFS završen."
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
    title: "Depth-First Search (DFS) Algorithm",
    intro_bold: "Depth-First Search (DFS)",
    intro_text: "— a look into the inner logic of searching.",
    highlight: "On this site, you can visually follow how DFS traverses nodes and edges — step by step.",
    viz_title: "Visualization",
    steps_title: "Steps",
    lg_current: "Current",
    lg_stack: "In stack",
    footer_text: "© 2025 DFS Visualization — Zejna Mahmutović",
    next_step: "Next step",
    reset: "Reset",
    done: "Done",
    loading: "Loading…",
    finished: "✅ DFS finished."
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

  const h1 = document.getElementById('dfsTitle');
  if (h1) h1.textContent = t.title;

  const introP = document.getElementById('dfsIntro');
  if (introP) introP.innerHTML = `<strong>${t.intro_bold}</strong> ${t.intro_text}`;

  const highlight = document.getElementById('dfsHighlight');
  if (highlight) highlight.textContent = t.highlight;

  const vizTitle = document.getElementById('vizTitle');
  if (vizTitle) vizTitle.textContent = t.viz_title;

  const stepsTitle = document.getElementById('stepsTitle');
  if (stepsTitle) stepsTitle.textContent = t.steps_title;

  const lgCurrent = document.getElementById('lgCurrent');
  if (lgCurrent) lgCurrent.textContent = t.lg_current;

  const lgStack = document.getElementById('lgStack');
  if (lgStack) lgStack.textContent = t.lg_stack;

  const footer = document.getElementById('footerText');
  if (footer) footer.textContent = t.footer_text;

  const nextBtn = document.getElementById('nextStep');
  if (nextBtn && !nextBtn.disabled) nextBtn.textContent = t.next_step;

  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) resetBtn.textContent = t.reset;

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

const API_URL = "https://vebdizajn-4.onrender.com/api/vebdizajn/pretraga-stabla-po-dubini-koraci";

const nextBtn = document.getElementById("nextStep");
const resetBtn = document.getElementById("resetBtn");
const stepsEl = document.getElementById("dfs-steps");
const metaEl = document.getElementById("dfs-meta");
const nodeEls = Array.from(document.querySelectorAll("#treeSvg .node"));

let data = null;
let stepIndex = 0;
let visited = new Set();
let currentNode = null;

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getNodeEl(id) {
  return document.querySelector(`#treeSvg .node[data-id="${id}"]`);
}

function parseVisitedFromAction(actionText) {
  const m = String(actionText).match(/Visited node\s+(\d+)/i);
  return m ? Number(m[1]) : null;
}

function clearSteps() {
  if (stepsEl) stepsEl.innerHTML = "";
}

function appendStep(stepObj, idx) {
  if (!stepsEl) return;
  const p = document.createElement("p");
  p.innerHTML =
    `<strong>${idx + 1}.</strong> ${escapeHtml(stepObj.action)} ` +
    `<span style="opacity:.85">| stack: [${escapeHtml((stepObj.currentStack || []).join(", "))}]</span>`;
  stepsEl.appendChild(p);
  stepsEl.scrollTop = stepsEl.scrollHeight;
}

function paint(stepObj) {
  nodeEls.forEach(el => el.classList.remove("visited", "stack", "current"));

  for (const v of visited) {
    const el = getNodeEl(v);
    if (el) el.classList.add("visited");
  }

  const stack = stepObj?.currentStack || [];
  for (const s of stack) {
    const el = getNodeEl(s);
    if (el) el.classList.add("stack");
  }

  if (currentNode !== null) {
    const el = getNodeEl(currentNode);
    if (el) el.classList.add("current");
  }

  if (!metaEl) return;
  metaEl.innerHTML = `
    <div><strong>Current:</strong> ${currentNode ?? "—"}</div>
    <div><strong>Visited:</strong> [${escapeHtml(Array.from(visited).join(", "))}]</div>
    <div><strong>Stack:</strong> [${escapeHtml(stack.join(", "))}]</div>
  `;
}

function setLoading(isLoading) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.sr;
  if (!nextBtn) return;
  if (isLoading) {
    nextBtn.disabled = true;
    nextBtn.textContent = t.loading;
    if (metaEl) metaEl.textContent = t.loading;
  } else {
    nextBtn.disabled = false;
    nextBtn.textContent = t.next_step;
  }
}

async function loadData() {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("API error: " + res.status);
  const json = await res.json();
  if (!json || !Array.isArray(json.steps)) throw new Error("Bad API format (missing steps)");
  return json;
}

function finish() {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.sr;
  if (!nextBtn) return;
  nextBtn.disabled = true;
  nextBtn.textContent = t.done;

  const p = document.createElement("p");
  p.innerHTML = `<strong>${t.finished}</strong>`;
  stepsEl.appendChild(p);
  stepsEl.scrollTop = stepsEl.scrollHeight;
}

async function init() {
  try {
    setLoading(true);
    data = await loadData();
    stepIndex = 0;
    visited = new Set();
    currentNode = null;
    clearSteps();
    paint({ currentStack: [] });
    setLoading(false);
  } catch (e) {
    if (metaEl) {
      metaEl.innerHTML = "<strong>Greška:</strong> Ne mogu da učitam DFS podatke sa API-ja.";
    }
    if (nextBtn) nextBtn.disabled = true;
  }
}

nextBtn?.addEventListener("click", () => {
  if (!data) return;

  if (stepIndex < data.steps.length) {
    const stepObj = data.steps[stepIndex];
    appendStep(stepObj, stepIndex);

    const v = parseVisitedFromAction(stepObj.action);
    if (v !== null) {
      currentNode = v;
      visited.add(v);
    }

    paint(stepObj);
    stepIndex++;
  }

  if (stepIndex >= data.steps.length) finish();
});

resetBtn?.addEventListener("click", () => init());

init();


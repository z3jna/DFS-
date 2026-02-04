
const API_URL =
  "https://vebdizajn-4.onrender.com/api/vebdizajn/pretraga-stabla-po-dubini-koraci"

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
  if (!nextBtn) return;
  if (isLoading) {
    nextBtn.disabled = true;
    nextBtn.textContent = "Učitavanje…";
    if (metaEl) metaEl.textContent = "Učitavanje…";
  } else {
    nextBtn.disabled = false;
    nextBtn.textContent = "Sledeći korak";
  }
}

async function loadData() {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("API error: " + res.status);

  const json = await res.json();

  
  if (!json || !Array.isArray(json.steps)) {
    throw new Error("Bad API format (missing steps)");
  }
  return json;
}

function finish() {
  if (!nextBtn) return;
  nextBtn.disabled = true;
  nextBtn.textContent = "Gotovo";

  const p = document.createElement("p");
  p.innerHTML = `<strong>✅ DFS završen.</strong>`;
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
    console.error(e);
    if (metaEl) {
      metaEl.innerHTML =
        "<strong>Greška:</strong> Ne mogu da učitam DFS podatke sa API-ja. Pogledaj Console.";
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





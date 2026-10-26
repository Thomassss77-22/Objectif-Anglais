import { LEVELS } from "./data.js";
import { LEGAL, JURY_QUESTIONS, SELF_GRID, DRILL_SENTENCES, ERROR_SENTENCES } from "./legal.js";
import { ARTICLES } from "./articles.js";
import { newCard, review, dueCards } from "./srs.js";

const KEY = "objectif-anglais-v1";
const DAILY_GOAL = 30; // XP par jour
const root = document.getElementById("app");

// ---------- État ----------
function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}
const state = Object.assign({ done: {}, deck: {}, xp: 0, streak: 0, lastDay: null, days: {}, mode: "general" }, load());
// Le mode CRFPA a ses propres leçons et cartes ; XP et série sont communes aux deux modes.
state.legal = Object.assign({ done: {}, deck: {} }, state.legal);
const legalMode = () => state.mode === "legal";
const P = () => (legalMode() ? state.legal : state);
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

const dayKey = (t = Date.now()) => new Date(t).toISOString().slice(0, 10);
function addXp(n) {
  state.xp += n;
  state.days[dayKey()] = (state.days[dayKey()] || 0) + n;
  const t = dayKey();
  if (state.lastDay !== t) {
    state.streak = state.lastDay === dayKey(Date.now() - 864e5) ? state.streak + 1 : 1;
    state.lastDay = t;
  }
  save();
}
// Une série non prolongée hier est perdue.
const liveStreak = () => (state.lastDay === dayKey() || state.lastDay === dayKey(Date.now() - 864e5) ? state.streak : 0);

// Les nouvelles cartes sont introduites au rythme de NEW_PER_DAY par jour.
const NEW_PER_DAY = 20;
const isNew = (c) => c.reps === 0 && c.interval === 0;
function reviewQueue() {
  const due = dueCards(P().deck).sort((a, b) => a.due - b.due);
  const seen = P().newDay === dayKey() ? P().newSeen : 0;
  const fresh = due.filter(isNew).slice(0, Math.max(0, NEW_PER_DAY - seen));
  return [...due.filter((c) => !isNew(c)), ...fresh];
}

const levels = () => (legalMode() ? LEGAL : LEVELS);
const allLessons = () => levels().flatMap((lv) => lv.lessons.map((l) => ({ ...l, lv })));
const findLesson = (id) => allLessons().find((l) => l.id === id);
const nextLesson = () => allLessons().find((l) => !P().done[l.id]);

// ---------- Utilitaires ----------
// Compare des réponses en ignorant ponctuation, casse et contractions (I'm = I am).
const CONTRACTIONS = { "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is", "it's": "it is",
  "we're": "we are", "they're": "they are", "i've": "i have", "you've": "you have", "we've": "we have",
  "they've": "they have", "i'd": "i would", "i'll": "i will", "you'll": "you will", "don't": "do not",
  "doesn't": "does not", "didn't": "did not", "can't": "cannot", "won't": "will not", "isn't": "is not",
  "aren't": "are not", "haven't": "have not", "hasn't": "has not", "wouldn't": "would not", "let's": "let us",
  "what's": "what is", "that's": "that is", "there's": "there is" };
const norm = (s) => s.toLowerCase().replace(/’/g, "'").replace(/[.,!?;:]/g, " ").trim().split(/\s+/)
  .map((w) => CONTRACTIONS[w] || w).join(" ").replace(/\bcan not\b/g, "cannot");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const buzz = (p) => navigator.vibrate && navigator.vibrate(p);

const ICONS = {
  path: "M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6zM9 3v15M15 6v15",
  cards: "m12 2 10 5-10 5L2 7l10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  flame: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z",
  bolt: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l12 12",
  back: "m12 19-7-7 7-7M19 12H5",
  play: "M7 4v16l13-8L7 4z",
  sound: "M11 5 6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14",
  mic: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15zM6.5 17A2.5 2.5 0 0 0 4 19.5 2.5 2.5 0 0 0 6.5 22H20v-5",
  star: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2L7 14.2 2 9.3l6.9-1L12 2z",
  trophy: "M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3",
  bulb: "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  pen: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  chevron: "m9 18 6-6-6-6",
  heart: "M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7 7-7z",
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z",
  food: "M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2M6 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7",
  map: "M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13zM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  plane: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
  briefcase: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  smile: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01",
  link: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  plus: "M12 5v14M5 12h14",
  bag: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0",
  shirt: "M20.4 6.6 16 4a4 4 0 0 1-8 0L3.6 6.6a1 1 0 0 0-.5 1.2l1.2 3.5a1 1 0 0 0 1.3.6L7 11.3V20a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-8.7l1.4.6a1 1 0 0 0 1.3-.6l1.2-3.5a1 1 0 0 0-.5-1.2z",
  ball: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10zM2 12h20",
  phone: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01",
  tv: "M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM17 2l-5 5-5-5",
  layers: "M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5",
  link2: "M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8",
  alert: "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01",
  scale: "M12 3v18M7 21h10M3 7h18M6 7l-3 7a3 3 0 0 0 6 0L6 7zM18 7l-3 7a3 3 0 0 0 6 0l-3-7z",
  flask: "M9 3h6M10 3v6L4 19a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3L14 9V3M7 15h10",
  chart: "M3 3v18h18M7 15l4-4 3 3 6-6",
  leaf: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10zM2 21c0-3 1.9-5.4 5-6",
  sparkle: "M12 3l1.9 5.8L20 10.7l-6.1 1.9L12 18.5l-1.9-5.9L4 10.7l6.1-1.9L12 3zM19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17z",
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  split: "M16 3h5v5M8 3H3v5M21 3l-9 9M3 3l9 9v9",
  quote: "M3 21c3 0 7-1 7-8V5H3v8h4c0 3-1 5-4 5zM14 21c3 0 7-1 7-8V5h-7v8h4c0 3-1 5-4 5z",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20",
};
const icon = (n, cls = "") => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[n]}"/></svg>`;

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-GB";
  u.rate = 0.95;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// Reconnaissance vocale (Chrome, Edge, Safari). Sinon, on tape la réponse.
const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
function listen(btn, label, done) {
  const r = new Rec();
  r.lang = "en-US";
  r.interimResults = false;
  btn.classList.add("live");
  label.textContent = "Je t'écoute…";
  r.onresult = (e) => done(e.results[0][0].transcript);
  r.onend = () => { btn.classList.remove("live"); label.textContent = "Touche pour parler"; };
  r.onerror = () => (label.textContent = "Je n'ai rien entendu, réessaie");
  r.start();
}

function render(html, { nav = null, lv = null } = {}) {
  root.innerHTML = `<main id="view" class="enter ${nav ? "" : "no-nav"}">${html}</main>${nav ? tabbar(nav) : ""}`;
  // La couleur du niveau s'applique à tout l'écran, y compris aux éléments fixes.
  root.dataset.mode = state.mode;
  if (lv) root.dataset.lv = lv;
  else delete root.dataset.lv;
  window.scrollTo(0, 0);
  root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { stopTimer(); TABS[b.dataset.tab](); }));
}

function tabbar(on) {
  const due = reviewQueue().length;
  const tab = (id, ic, label, extra = "") =>
    `<button class="tab ${on === id ? "on" : ""}" data-tab="${id}">${icon(ic)}${label}${extra}</button>`;
  return `<nav class="tabbar">
    ${tab("home", "path", "Parcours")}
    ${tab("words", "book", "Mots")}
    ${tab("review", "cards", "Révision", due ? `<span class="dot">${due}</span>` : "")}
    ${tab("profile", "user", "Profil")}
  </nav>`;
}

const topbar = () => `
  <header class="topbar">
    <div class="brand"><div class="logo">OA</div><span class="brand-name">Objectif Anglais</span>${legalMode() ? `<span class="mode-chip">CRFPA</span>` : ""}</div>
    <div class="pills">
      <span class="pill" title="Série">${icon("flame", "flame")}${liveStreak()}</span>
      <span class="pill" title="XP">${icon("bolt", "bolt")}${state.xp}</span>
    </div>
  </header>`;

// ---------- Parcours ----------
function home() {
  const today = state.days[dayKey()] || 0;
  const pct = Math.min(1, today / DAILY_GOAL);
  const C = 2 * Math.PI * 36;
  const next = nextLesson();
  const due = reviewQueue().length;

  const units = levels().map((lv) => {
    const n = lv.lessons.filter((l) => P().done[l.id]).length;
    return `
    <section class="unit" data-lv="${lv.id}">
      <div class="unit-head" data-lv="${lv.id}">
        <small>${lv.label || `Niveau ${lv.id}`}</small>
        <h3>${esc(lv.name)}</h3>
        <div class="meter"><i style="width:${(n / lv.lessons.length) * 100}%"></i></div>
        <div class="count">${n} / ${lv.lessons.length} leçons</div>
      </div>
      <div class="path">
        ${lv.lessons.map((l) => {
          const st = P().done[l.id] ? "done" : next && next.id === l.id ? "next" : "todo";
          const ic = st === "done" ? "check" : st === "next" ? "star" : "book";
          return `<div class="node ${st}">
            <button class="node-btn" data-id="${l.id}" aria-label="${esc(l.title)}">
              ${st === "next" ? `<span class="start-tag">COMMENCER</span>` : ""}${icon(ic)}
            </button>
            <div class="node-label">${esc(l.title)}</div>
          </div>`;
        }).join("")}
      </div>
    </section>`;
  }).join("");

  render(`
    ${topbar()}
    <section class="hero">
      <div class="hero-top">
        <div class="ring">
          <svg viewBox="0 0 84 84"><circle class="track" cx="42" cy="42" r="36"/>
            <circle class="bar" cx="42" cy="42" r="36" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg>
          <span>${Math.round(pct * 100)}%</span>
        </div>
        <div>
          <small>Objectif du jour</small>
          <h2>${pct >= 1 ? "Objectif atteint !" : `${today} / ${DAILY_GOAL} XP`}</h2>
          <p>${pct >= 1 ? "Bravo, ta série continue." : legalMode() ? "Un peu chaque jour : l'aisance à l'oral vient en parlant." : "Une leçon par jour, et l'anglais devient naturel."}</p>
        </div>
      </div>
      ${next ? `<button class="cta-light" id="continue">${icon("play")}Continuer · ${esc(next.title)}</button>`
             : `<button class="cta-light" id="continue">${icon("cards")}Réviser mes cartes</button>`}
    </section>
    <button class="tile" data-tab="review">
      <div class="tile-icon ${due ? "" : "calm"}">${icon(due ? "cards" : "check")}</div>
      <div><b>${due ? "Cartes à réviser" : "Révisions à jour"}</b>
        <span>${due ? "Révise maintenant pour ne pas oublier" : "Les mots de tes leçons arriveront ici"}</span></div>
      ${due ? `<span class="badge-count">${due}</span>` : `<span class="go">${icon("chevron")}</span>`}
    </button>
    ${legalMode() ? `<button class="tile" data-tab="training">
      <div class="tile-icon alt">${icon("clock")}</div>
      <div><b>Entraînement à l'oral</b><span>Simulation chronométrée et questions du jury</span></div>
      <span class="go">${icon("chevron")}</span></button>` : ""}
    ${units}
  `, { nav: "home" });

  requestAnimationFrame(() => setTimeout(() => {
    const bar = root.querySelector(".ring .bar");
    if (bar) bar.style.strokeDashoffset = C * (1 - pct);
  }, 60));
  root.querySelector("#continue").onclick = () => (next ? lesson(next.id) : reviewSession());
  root.querySelectorAll(".node-btn").forEach((b) => (b.onclick = () => lesson(b.dataset.id)));
}

// ---------- Leçon ----------
function lesson(id) {
  const l = findLesson(id);
  const minutes = Math.max(3, Math.round(l.exercises.length * 1.2 + l.words.length * 0.3));
  render(`
    <div class="ex-top"><button class="icon-btn" id="back" aria-label="Retour">${icon("back")}</button></div>
    <section class="lesson-hero" data-lv="${l.lv.id}">
      <span class="chip">${l.lv.id} · ${esc(l.lv.name.split(" — ")[0])}</span>
      <h1>${esc(l.title)}</h1>
      <div class="meta">
        <span>${icon("clock")}${minutes} min</span>
        <span>${icon("list")}${l.exercises.length} exercices</span>
        <span>${icon("cards")}${l.words.length} mots</span>
      </div>
    </section>
    <h4 class="section-title">${icon("bulb")}L'essentiel</h4>
    <div class="tip">${l.tip}</div>
    <h4 class="section-title">${icon("book")}Vocabulaire</h4>
    <div class="vocab">${l.words.map(([fr, en]) => `
      <div class="word"><div><b>${esc(en)}</b><span>${esc(fr)}</span></div>
        <button class="say" data-en="${esc(en)}" aria-label="Écouter">${icon("sound")}</button></div>`).join("")}
    </div>
    <div class="dock"><button class="btn lv" id="go">${icon("play")}Commencer la leçon</button></div>
  `, { lv: l.lv.id });
  root.querySelector("#back").onclick = home;
  root.querySelectorAll(".say").forEach((b) => (b.onclick = () => speak(b.dataset.en)));
  root.querySelector("#go").onclick = () => exercise(l, 0, 0);
}

const KINDS = {
  qcm: ["target", "Choisis la bonne réponse"],
  translate: ["pen", "Traduis en anglais"],
  speak: ["chat", "Expression orale"],
};

function exercise(l, i, score) {
  if (i >= l.exercises.length) return finish(l, score);
  const ex = l.exercises[i];
  const [kIcon, kLabel] = KINDS[ex.type];
  let body;
  if (ex.type === "qcm") {
    body = `<div class="choices">${ex.choices.map((c, k) =>
      `<button class="choice" data-k="${k}"><span class="k">${"ABCD"[k]}</span>${esc(c)}</button>`).join("")}</div>`;
  } else {
    const speakUI = ex.type === "speak" && Rec
      ? `<div class="mic-wrap"><button class="mic" id="mic" aria-label="Parler">${icon("mic")}</button>
         <span class="mic-label" id="micl">Touche pour parler</span></div><div class="or">ou écris ta réponse</div>`
      : "";
    body = `${speakUI}<textarea class="answer" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false"
      placeholder="${ex.type === "speak" ? "Ce que tu as dit…" : "Écris en anglais…"}"></textarea>`;
  }

  render(`
    <div class="ex-top">
      <button class="icon-btn" id="quit" aria-label="Quitter">${icon("x")}</button>
      <div class="bar"><i style="width:${(i / l.exercises.length) * 100}%"></i></div>
    </div>
    <span class="ex-kind">${icon(kIcon)}${kLabel}</span>
    <p class="q">${esc(ex.q)}</p>
    ${body}
    ${ex.type === "qcm" ? "" : `<div class="dock"><button class="btn lv" id="ok" disabled>Valider</button></div>`}
  `, { lv: l.lv.id });
  root.querySelector("#quit").onclick = () => lesson(l.id);

  const next = (good, correction) => {
    buzz(good ? 15 : [30, 40, 30]);
    root.querySelector(".dock")?.remove();
    root.querySelectorAll(".choice, #ans, #mic").forEach((e) => (e.disabled = true));
    root.querySelector(".ex-top .bar i").style.width = `${((i + 1) / l.exercises.length) * 100}%`;
    const sheet = document.createElement("div");
    sheet.className = `sheet ${good ? "ok" : "ko"}`;
    const praise = ["Excellent !", "Parfait !", "Bien joué !", "Impeccable !"][i % 4];
    sheet.innerHTML = `<div>
      <h3><span class="badge">${icon(good ? "check" : "x")}</span>${good ? praise : "Pas tout à fait…"}</h3>
      <p>${good ? (ex.type === "qcm" ? "" : `<b>${esc(correction)}</b>`) : `Bonne réponse :<b>${esc(correction)}</b>`}</p>
      <button class="btn ${good ? "ok" : "ko"}" id="nx">Continuer</button></div>`;
    root.appendChild(sheet);
    sheet.querySelector("#nx").onclick = () => exercise(l, i + 1, score + (good ? 1 : 0));
  };

  if (ex.type === "qcm") {
    root.querySelectorAll(".choice").forEach((b) => (b.onclick = () => {
      const good = +b.dataset.k === ex.answer;
      b.classList.add(good ? "right" : "wrong");
      if (!good) root.querySelector(`.choice[data-k="${ex.answer}"]`).classList.add("right");
      next(good, ex.choices[ex.answer]);
    }));
  } else {
    const input = root.querySelector("#ans");
    const ok = root.querySelector("#ok");
    input.oninput = () => (ok.disabled = !input.value.trim());
    const submit = () => {
      if (!input.value.trim()) return;
      next(ex.answers.map(norm).includes(norm(input.value)), ex.answers[0]);
      speak(ex.answers[0]);
    };
    ok.onclick = submit;
    input.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } };
    const mic = root.querySelector("#mic");
    if (mic) mic.onclick = () => listen(mic, root.querySelector("#micl"), (text) => { input.value = text; submit(); });
    else input.focus();
  }
}

function finish(l, score) {
  const first = !P().done[l.id];
  P().done[l.id] = true;
  const gained = 10 + score * 5;
  let added = 0;
  for (const [fr, en] of l.words) if (!P().deck[en]) { P().deck[en] = newCard(fr, en); added++; }
  addXp(gained);
  const acc = Math.round((score / l.exercises.length) * 100);
  render(`
    <canvas id="confetti"></canvas>
    <div class="done-screen">
      <div class="trophy">${icon("trophy")}</div>
      <h1>${acc === 100 ? "Sans faute !" : "Leçon terminée !"}</h1>
      <p>${esc(l.title)}</p>
      <div class="stats">
        <div class="stat" style="--c:#ffb020"><b data-count="${gained}">0</b><span>XP</span></div>
        <div class="stat" style="--c:#12b886"><b data-count="${acc}" data-suffix="%">0</b><span>Précision</span></div>
        <div class="stat" style="--c:#5b5bf7"><b data-count="${first ? added : 0}">0</b><span>Nouvelles cartes</span></div>
      </div>
    </div>
    <div class="dock"><button class="btn" id="h">Continuer</button></div>
  `);
  buzz([20, 60, 20]);
  root.querySelectorAll("[data-count]").forEach((el) => countUp(el, +el.dataset.count, el.dataset.suffix || ""));
  if (acc >= 60) confetti(root.querySelector("#confetti"));
  root.querySelector("#h").onclick = home;
}

function countUp(el, to, suffix) {
  const t0 = performance.now();
  const step = (t) => {
    const p = Math.min(1, (t - t0) / 900);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function confetti(cv) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = cv.getContext("2d");
  const dpr = devicePixelRatio || 1;
  cv.width = innerWidth * dpr;
  cv.height = innerHeight * dpr;
  ctx.scale(dpr, dpr);
  const colors = ["#5b5bf7", "#9b4dff", "#12b886", "#ffb020", "#f0468f", "#1eb6e8"];
  const parts = Array.from({ length: 140 }, () => ({
    x: innerWidth / 2, y: innerHeight * 0.32,
    vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4,
    s: 6 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
    c: colors[(Math.random() * colors.length) | 0],
  }));
  const t0 = performance.now();
  const frame = (t) => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of parts) {
      p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore();
    }
    if (t - t0 < 3500 && cv.isConnected) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, innerWidth, innerHeight);
  };
  requestAnimationFrame(frame);
}

// ---------- Révision ----------
const fmtDays = (d) => (d < 1 ? "< 1 j" : d < 30 ? `${d} j` : `${Math.round(d / 30)} mois`);

function reviewSession() {
  const due = reviewQueue();
  const card = due[0];
  if (!card) {
    const total = Object.keys(P().deck).length;
    render(`
      ${topbar()}
      <div class="screen-title"><h1>Révision</h1></div>
      <div class="empty">
        <div class="tile-icon calm">${icon("check")}</div>
        <h2>${total ? "Tout est révisé" : "Aucune carte pour l'instant"}</h2>
        <p>${total ? `Tes ${total} cartes sont à jour (${NEW_PER_DAY} nouvelles cartes maximum par jour). Reviens demain pour la suite.` : "Termine une leçon : son vocabulaire arrivera ici automatiquement."}</p>
      </div>
      <button class="btn" id="h">${icon("path")}Retour au parcours</button>
    `, { nav: "review" });
    root.querySelector("#h").onclick = home;
    return;
  }
  render(`
    ${topbar()}
    <div class="screen-title"><h1>Révision</h1><span class="pill">${icon("cards")}${due.length}</span></div>
    <div class="flip" id="flip">
      <div class="flip-inner">
        <div class="face front"><small>Français</small><div class="term">${esc(card.fr)}</div>
          <span class="hint">Touche pour révéler</span></div>
        <div class="face back"><small>Anglais</small><div class="term">${esc(card.en)}</div>
          ${card.ex ? `<div class="ex">${esc(card.ex)}</div>` : ""}
          <button class="say" id="say" aria-label="Écouter">${icon("sound")}</button></div>
      </div>
    </div>
    <div class="grades" id="grades"></div>
  `, { nav: "review" });

  const flip = root.querySelector("#flip");
  root.querySelector("#say").onclick = (e) => { e.stopPropagation(); speak(card.en); };
  flip.onclick = () => {
    if (flip.classList.contains("on")) return;
    flip.classList.add("on");
    buzz(10);
    setTimeout(() => speak(card.en), 250);
    const grades = [["Raté", 1], ["Difficile", 3], ["Bien", 4], ["Facile", 5]];
    root.querySelector("#grades").innerHTML = grades.map(([t, q]) => {
      const d = q < 3 ? 0 : review(card, q).interval;
      return `<button class="grade g${q}" data-q="${q}">${t}<small>${fmtDays(d)}</small></button>`;
    }).join("");
    root.querySelectorAll(".grade").forEach((b) => (b.onclick = () => {
      if (isNew(card)) {
        if (P().newDay !== dayKey()) Object.assign(P(), { newDay: dayKey(), newSeen: 0 });
        P().newSeen += 1;
      }
      const key = Object.keys(P().deck).find((k) => P().deck[k] === card);
      P().deck[key] = review(card, +b.dataset.q);
      addXp(1);
      reviewSession();
    }));
  };
}

// ---------- Banque de mots ----------
// Les fichiers sont chargés à la demande puis gardés en mémoire.
// Une banque par mode : words/ (général) et words-legal/ (CRFPA).
const banks = { general: { index: null, cats: {} }, legal: { index: null, cats: {} } };
const bankDir = () => (legalMode() ? "words-legal" : "words");
const curBank = () => banks[state.mode];
async function loadIndex() {
  const b = curBank();
  if (!b.index) b.index = await (await fetch(`${bankDir()}/index.json`)).json();
  return b.index;
}
async function loadCat(id) {
  const b = curBank();
  if (!b.cats[id]) b.cats[id] = await (await fetch(`${bankDir()}/${id}.json`)).json();
  return b.cats[id];
}
// Même clé que les cartes des leçons (le mot anglais), sauf pour un mot à plusieurs sens.
const cardKey = (w) => (w.alt ? `${w.en} (${w.fr})` : w.en);
const inDeck = (w) => Boolean(P().deck[cardKey(w)]);
function addWord(w) {
  if (!inDeck(w)) P().deck[cardKey(w)] = newCard(w.fr, w.en, w.ex);
}
const LV_IDS = ["A1", "A2", "B1", "B2", "C1", "C2"];
let wordFilter = { lv: null, q: "" };

function wordRow(w) {
  const on = inDeck(w);
  return `<div class="wrow" data-lv="${w.lv}">
    <button class="say" data-en="${esc(w.en)}" aria-label="Écouter">${icon("sound")}</button>
    <div class="wtxt"><b>${esc(w.en)}</b> <span class="lvtag">${w.lv}</span>
      <span class="wfr">${esc(w.fr)}</span><i>${esc(w.ex)}</i></div>
    <button class="add ${on ? "on" : ""}" data-id="${w.id}" aria-label="${on ? "Dans mes cartes" : "Ajouter à mes cartes"}">${icon(on ? "check" : "plus")}</button>
  </div>`;
}

function bindRows(list) {
  root.querySelectorAll(".wrow .say").forEach((b) => (b.onclick = () => speak(b.dataset.en)));
  root.querySelectorAll(".wrow .add").forEach((b) => (b.onclick = () => {
    const w = list.find((x) => x.id === b.dataset.id);
    if (inDeck(w)) return;
    addWord(w);
    save();
    buzz(10);
    b.classList.add("on");
    b.innerHTML = icon("check");
  }));
}

// Seuls les niveaux présents dans la banque sont proposés (la banque juridique va de B1 à C1).
const lvChips = (idx) => `<div class="chips">
  <button class="fchip ${wordFilter.lv ? "" : "on"}" data-lv-f="">Tous</button>
  ${LV_IDS.filter((lv) => idx.categories.some((c) => c.levels[lv])).map((lv) => `<button class="fchip ${wordFilter.lv === lv ? "on" : ""}" data-lv-f="${lv}" data-lv="${lv}">${lv}</button>`).join("")}
</div>`;

async function wordsHome() {
  const idx = await loadIndex();
  const known = (c) => (curBank().cats[c.id] ? curBank().cats[c.id].filter(inDeck).length : null);
  render(`
    ${topbar()}
    <div class="screen-title"><h1>${legalMode() ? "Vocabulaire juridique" : "Banque de mots"}</h1><span class="pill">${icon("book")}${idx.total}</span></div>
    <label class="searchbox">${icon("search")}<input id="q" type="search" placeholder="Chercher un mot (anglais ou français)" value="${esc(wordFilter.q)}" autocomplete="off"></label>
    ${lvChips(idx)}
    <div id="results"></div>
    <div class="catgrid" id="cats">${idx.categories.map((c) => {
      const n = wordFilter.lv ? c.levels[wordFilter.lv] : c.count;
      const k = known(c);
      return `<button class="catcard" data-cat="${c.id}" ${n ? "" : "disabled"}>
        <span class="caticon">${icon(ICONS[c.icon] ? c.icon : "book")}</span>
        <b>${esc(c.name)}</b><span>${n} mot${n > 1 ? "s" : ""}${k ? ` · ${k} appris` : ""}</span></button>`;
    }).join("")}</div>
  `, { nav: "words" });
  root.querySelectorAll(".catcard").forEach((b) => (b.onclick = () => category(b.dataset.cat)));
  root.querySelectorAll("[data-lv-f]").forEach((b) => (b.onclick = () => { wordFilter.lv = b.dataset.lvF || null; wordsHome(); }));
  const q = root.querySelector("#q");
  q.oninput = () => search(q.value);
  if (wordFilter.q) search(wordFilter.q);
}

// Recherche sans accents ni majuscules, sur l'anglais et le français.
const fold = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
async function search(text) {
  wordFilter.q = text;
  const res = root.querySelector("#results");
  const cats = root.querySelector("#cats");
  const t = fold(text.trim());
  if (t.length < 2) { res.innerHTML = ""; cats.hidden = false; return; }
  const idx = await loadIndex();
  const all = (await Promise.all(idx.categories.map((c) => loadCat(c.id)))).flat();
  if (wordFilter.q !== text) return; // une frappe plus récente a pris le relais
  const hits = all.filter((w) => (!wordFilter.lv || w.lv === wordFilter.lv) && (fold(w.en).includes(t) || fold(w.fr).includes(t))).slice(0, 60);
  cats.hidden = true;
  res.innerHTML = hits.length ? `<div class="wlist">${hits.map(wordRow).join("")}</div>` : `<p class="muted center">Aucun mot trouvé.</p>`;
  bindRows(hits);
}

async function category(id) {
  const idx = await loadIndex();
  const c = idx.categories.find((x) => x.id === id);
  const list = (await loadCat(id)).filter((w) => !wordFilter.lv || w.lv === wordFilter.lv);
  const todo = list.filter((w) => !inDeck(w));
  render(`
    <div class="ex-top"><button class="icon-btn" id="back" aria-label="Retour">${icon("back")}</button></div>
    <section class="cat-hero">
      <span class="caticon big">${icon(ICONS[c.icon] ? c.icon : "book")}</span>
      <h1>${esc(c.name)}</h1><p>${esc(c.desc)}</p>
      <div class="meta"><span>${icon("book")}${list.length} mots${wordFilter.lv ? ` · niveau ${wordFilter.lv}` : ""}</span>
        <span>${icon("check")}${list.length - todo.length} dans mes cartes</span></div>
    </section>
    <div class="wlist">${list.map(wordRow).join("")}</div>
    ${todo.length ? `<div class="dock"><button class="btn" id="all">${icon("plus")}Ajouter ${todo.length} mot${todo.length > 1 ? "s" : ""} à mes cartes</button></div>` : ""}
  `);
  root.querySelector("#back").onclick = wordsHome;
  bindRows(list);
  const all = root.querySelector("#all");
  if (all) all.onclick = () => {
    todo.forEach(addWord);
    save();
    buzz([15, 40, 15]);
    category(id);
  };
}

// ---------- Profil ----------
function profile() {
  const cards = Object.values(P().deck);
  const mastered = cards.filter((c) => c.interval >= 21).length;
  const doneCount = Object.keys(P().done).length;
  const current = (nextLesson() || allLessons()[allLessons().length - 1]).lv;
  const kpi = (ic, c, v, label) => `<div class="kpi"><div class="ico" style="--c:${c}">${icon(ic)}</div><b>${v}</b><span>${label}</span></div>`;
  const modeBtn = (id, title, sub) => `<button class="mode-opt ${state.mode === id ? "on" : ""}" data-mode="${id}">
    <b>${title}</b><span>${sub}</span></button>`;
  render(`
    ${topbar()}
    <div class="profile-head">
      <div class="avatar">${current.id}</div>
      <div><h1>Mon parcours</h1><p>${legalMode() ? "Module en cours" : "Niveau actuel"} : ${current.id} · ${esc(current.name.split(" — ")[0])}</p></div>
    </div>
    <h4 class="section-title">${icon("split")}Mode d'apprentissage</h4>
    <div class="mode-switch">
      ${modeBtn("general", "Anglais général", "Du débutant au niveau courant")}
      ${modeBtn("legal", "Anglais juridique · CRFPA", "Préparer l'oral d'anglais")}
    </div>
    <div class="grid2">
      ${kpi("flame", "#ff7a1a", liveStreak(), "Jours de série")}
      ${kpi("bolt", "#ffb020", state.xp, "XP au total")}
      ${kpi("book", "#5b5bf7", `${doneCount}/${allLessons().length}`, "Leçons terminées")}
      ${kpi("star", "#12b886", `${mastered}/${cards.length}`, "Mots maîtrisés")}
    </div>
    <h4 class="section-title">${icon("target")}${legalMode() ? "Ma préparation au CRFPA" : "Vers le niveau courant"}</h4>
    <div class="levels">${levels().map((lv) => {
      const n = lv.lessons.filter((l) => P().done[l.id]).length;
      return `<div class="lvrow" data-lv="${lv.id}"><span class="cefr">${lv.id}</span>
        <div><b>${esc(lv.name.split(" — ")[0])}</b><div class="meter"><i style="width:${(n / lv.lessons.length) * 100}%"></i></div></div>
        <em>${n}/${lv.lessons.length}</em></div>`;
    }).join("")}</div>
    <button class="link-danger" id="reset">Réinitialiser ma progression (${legalMode() ? "mode CRFPA" : "anglais général"})</button>
  `, { nav: "profile" });
  root.querySelectorAll("[data-mode]").forEach((b) => (b.onclick = () => {
    if (state.mode === b.dataset.mode) return;
    state.mode = b.dataset.mode;
    wordFilter = { lv: null, q: "" };
    save();
    buzz(15);
    home();
  }));
  root.querySelector("#reset").onclick = () => {
    if (!confirm("Effacer la progression de ce mode (leçons et cartes) ?")) return;
    Object.assign(P(), { done: {}, deck: {}, newDay: null, newSeen: 0 });
    save();
    home();
  };
}

// ---------- Entraînement CRFPA ----------
const mmss = (sec) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;
let timer = null;
const stopTimer = () => { clearInterval(timer); timer = null; };

// Les deux temps de l'épreuve, avec leurs repères (en secondes depuis le début de la phase).
const SIM_PHASES = {
  prep: { title: "Préparation", total: 15 * 60, steps: [
    [0, "Lire et comprendre", "Source, date, auteur. Deux lectures : acteurs, chiffres, déclencheur de l'article, structure."],
    [5 * 60, "Problématiser et planifier", "Thème en une phrase, enjeu, problématique sous forme de question, plan, deux axes de commentaire."],
    [8 * 60, "Rédiger les notes", "Intro et conclusion rédigées, le reste en mots-clés. Écris les transitions en entier."],
  ] },
  talk: { title: "Exposé", total: 8 * 60, steps: [
    [0, "Introduction", "Accroche, titre, source, date, auteur, problématique, plan."],
    [60, "Synthèse", "Rendre compte de l'article de façon neutre et organisée. Pas de paraphrase."],
    [210, "Transition → commentaire", "« Having summed up the main points, I would now like to move on to my analysis. »"],
    [7 * 60, "Conclusion", "Bilan, avis nuancé, ouverture. « Thank you for your attention. I am now ready to answer your questions. »"],
  ] },
};

function training() {
  stopTimer();
  render(`
    ${topbar()}
    <div class="screen-title"><h1>Entraînement</h1></div>
    <div class="exam-card">
      <small>L'épreuve</small>
      <p>Un article de presse (450 à 550 mots) · <b>15 min</b> de préparation sans document · <b>15 min</b> d'oral :
      exposé de 7-8 min puis entretien d'environ 7 min · coefficient 1.</p>
      <span class="muted small">Arrêté du 17 octobre 2016 · vérifie la règle en vigueur pour ta session.</span>
    </div>
    <button class="tile" id="lib">
      <div class="tile-icon">${icon("book")}</div>
      <div><b>Articles d'entraînement</b><span>${ARTICLES.length} articles au format de l'épreuve, avec corrigé</span></div>
      <span class="go">${icon("chevron")}</span>
    </button>
    <button class="tile" id="mine">
      <div class="tile-icon calm">${icon("pen")}</div>
      <div><b>Mon article</b><span>Colle un sujet (ex. du dossier) : il reste sur ton appareil</span></div>
      <span class="go">${icon("chevron")}</span>
    </button>
    <button class="tile" id="sim">
      <div class="tile-icon">${icon("clock")}</div>
      <div><b>Simulation sans article</b><span>Le chrono seul, avec un article papier ou PDF à côté</span></div>
      <span class="go">${icon("chevron")}</span>
    </button>
    <button class="tile" id="drill">
      <div class="tile-icon">${icon("mic")}</div>
      <div><b>Exercices oraux</b><span>Collocations, termes, fautes à corriger, phrases à traduire · 10 exercices</span></div>
      <span class="go">${icon("chevron")}</span>
    </button>
    <button class="tile" id="jury">
      <div class="tile-icon calm">${icon("chat")}</div>
      <div><b>Questions du jury</b><span>Une question tirée au sort, 45 secondes pour répondre</span></div>
      <span class="go">${icon("chevron")}</span>
    </button>
    <button class="tile" id="grid">
      <div class="tile-icon alt">${icon("list")}</div>
      <div><b>Grille d'auto-évaluation</b><span>Note-toi sur 20 après une simulation</span></div>
      <span class="go">${icon("chevron")}</span>
    </button>
  `, { nav: "home" });
  root.querySelector("#sim").onclick = () => simulation("prep");
  root.querySelector("#lib").onclick = library;
  root.querySelector("#drill").onclick = drillSession;
  root.querySelector("#mine").onclick = myArticle;
  root.querySelector("#jury").onclick = jury;
  root.querySelector("#grid").onclick = () => selfGrid();
}

// Enregistrement de l'exposé, gardé en mémoire le temps de la séance.
let recorder = null;
let recording = null;

function simulation(phase, art = null) {
  stopTimer();
  const ph = SIM_PHASES[phase];
  let t = 0;
  render(`
    <div class="ex-top"><button class="icon-btn" id="quit" aria-label="Quitter">${icon("x")}</button>
      <div class="bar"><i id="bar" style="width:0"></i></div></div>
    <div class="sim">
      <small>${ph.title}${phase === "talk" ? " · cible 7 à 8 min" : " · 15 min"}</small>
      <div class="clock" id="clock">0:00</div>
      <div class="step" id="step"><b></b><p></p></div>
      <ol class="steps">${ph.steps.map(([at, name]) => `<li data-at="${at}"><span>${mmss(at)}</span>${name}</li>`).join("")}</ol>
    </div>
    ${art && phase === "prep" ? `<article class="paper sim-paper">${articleHtml(art)}</article>` : ""}
    <div class="dock"><div class="row2">
      ${phase === "prep"
        ? `<button class="btn ghost" id="pause">Pause</button><button class="btn" id="next">Passer à l'exposé</button>`
        : `<button class="btn ghost" id="pause">Pause</button><button class="btn" id="next">Terminer l'exposé</button>`}
    </div></div>
  `);
  const show = () => {
    root.querySelector("#clock").textContent = mmss(t);
    root.querySelector("#bar").style.width = `${Math.min(100, (t / ph.total) * 100)}%`;
    const cur = [...ph.steps].reverse().find(([at]) => t >= at);
    root.querySelector("#step b").textContent = cur[1];
    root.querySelector("#step p").textContent = cur[2];
    root.querySelectorAll(".steps li").forEach((li) => li.classList.toggle("on", +li.dataset.at <= t));
    root.querySelector("#clock").classList.toggle("over", t > ph.total);
  };
  const tick = () => {
    t += 1;
    if (ph.steps.some(([at]) => at === t) || t === ph.total) buzz([40, 60, 40]);
    show();
  };
  show();
  timer = setInterval(tick, 1000);
  const pause = root.querySelector("#pause");
  pause.onclick = () => {
    if (timer) { stopTimer(); pause.textContent = "Reprendre"; } else { timer = setInterval(tick, 1000); pause.textContent = "Pause"; }
  };
  root.querySelector("#quit").onclick = () => { stopRecording(); training(); };
  if (phase === "prep") {
    root.querySelector("#next").onclick = () => simulation("talk", art);
  } else {
    startRecording();
    root.querySelector("#next").onclick = () => { stopTimer(); stopRecording(); addXp(15); selfGrid(t, art); };
  }
}

async function startRecording() {
  recording = null;
  if (!navigator.mediaDevices || !window.MediaRecorder) return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks = [];
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      stream.getTracks().forEach((tr) => tr.stop());
      recording = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType }));
      const a = root.querySelector("#playback");
      if (a) { a.src = recording; a.hidden = false; }
    };
    recorder.start();
  } catch {
    recorder = null; // micro refusé : la simulation continue sans enregistrement
  }
}
function stopRecording() {
  if (recorder && recorder.state !== "inactive") recorder.stop();
  recorder = null;
}

function selfGrid(talkSeconds, art = null) {
  stopTimer();
  const scores = SELF_GRID.map(() => 1);
  render(`
    <div class="ex-top"><button class="icon-btn" id="back" aria-label="Retour">${icon("back")}</button></div>
    <div class="screen-title"><h1>Auto-évaluation</h1></div>
    ${talkSeconds ? `<p class="muted">Exposé : <b>${mmss(talkSeconds)}</b> ${talkSeconds < 420 ? "· un peu court (cible 7-8 min)" : talkSeconds > 510 ? "· trop long (cible 7-8 min)" : "· dans la cible"}</p>` : ""}
    <audio id="playback" controls ${recording ? `src="${recording}"` : "hidden"}></audio>
    <div class="grid-list">${SELF_GRID.map((c, i) => `
      <div class="crit"><p>${esc(c)}</p><div class="seg" data-i="${i}">
        ${[0, 1, 2].map((v) => `<button data-v="${v}" class="${v === 1 ? "on" : ""}">${v}</button>`).join("")}</div></div>`).join("")}
    </div>
    <div class="dock"><div class="score-bar"><span>Total</span><b id="total">10 / 20</b><button class="btn" id="done">Valider</button></div></div>
  `);
  const advice = (n) => (n < 10 ? "Reprends la méthode : l'épreuve, la lecture, la boîte à phrases."
    : n <= 15 ? "Bonne base : travaille la langue (fautes, vocabulaire, prononciation)."
    : "Très bien : multiplie les articles inconnus et suis l'actualité.");
  const update = () => (root.querySelector("#total").textContent = `${scores.reduce((a, b) => a + b, 0)} / 20`);
  root.querySelectorAll(".seg").forEach((seg) => seg.querySelectorAll("button").forEach((b) => (b.onclick = () => {
    scores[+seg.dataset.i] = +b.dataset.v;
    seg.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    update();
  })));
  root.querySelector("#back").onclick = training;
  root.querySelector("#done").onclick = () => {
    const n = scores.reduce((a, b) => a + b, 0);
    render(`
      <div class="done-screen">
        <div class="trophy">${icon("target")}</div>
        <h1>${n} / 20</h1>
        <p>${advice(n)}</p>
      </div>
      <div class="dock"><div class="${art && art.guide ? "row2" : ""}">
        ${art && art.guide ? `<button class="btn ghost" id="h">Retour</button><button class="btn" id="g">Voir le corrigé</button>` : `<button class="btn" id="h">Retour à l'entraînement</button>`}
      </div></div>
    `);
    root.querySelector("#h").onclick = training;
    const g = root.querySelector("#g");
    if (g) g.onclick = () => guideView(art);
  };
}

// ---------- Exercices oraux (mode CRFPA) ----------
const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((x) => x[1]);
// Pour comparer un terme, on ignore « to », les articles et la précision entre parenthèses.
const bare = (s) => norm(s.replace(/\(.*?\)/g, "")).replace(/^(to|a|an|the) /, "");
const DRILL_CATS = ["sources", "institutions", "criminal", "civil", "rights", "courtroom", "profession",
  "politics", "international", "debates", "business", "tax", "falsefriends"];

async function drillSession() {
  stopTimer();
  // Collocations verbales : on masque le verbe (« to lodge an appeal » → « to ___ an appeal »).
  const colloc = (await loadCat("collocations")).filter((w) => /^to \w+ \S/.test(w.en));
  const verbs = [...new Set(colloc.map((w) => w.en.split(" ")[1]))];
  const collocItems = shuffle(colloc).slice(0, 3).map((w) => {
    const verb = w.en.split(" ")[1];
    const rest = w.en.split(" ").slice(2).join(" ");
    // Pas de leurre qui formerait une autre collocation juste (« to bring a case » pour « to hear a case »).
    const valid = new Set(colloc.filter((x) => x.en.split(" ").slice(2).join(" ") === rest).map((x) => x.en.split(" ")[1]));
    const choices = shuffle([verb, ...shuffle(verbs.filter((v) => !valid.has(v))).slice(0, 3)]);
    return { type: "colloc", w, verb, choices, gap: w.en.replace(` ${verb} `, " ___ ") };
  });
  const terms = (await Promise.all(DRILL_CATS.map((c) => loadCat(c)))).flat()
    .filter((w) => w.en.split(" ").length <= 4);
  const termItems = shuffle(terms).slice(0, 2).map((w) => ({ type: "term", w }));
  const errItems = shuffle(ERROR_SENTENCES).slice(0, 2).map((x) => ({ type: "error", ...x }));
  const sentItems = shuffle(DRILL_SENTENCES).slice(0, 3).map((x) => ({ type: "sentence", ...x }));
  drillStep(shuffle([...collocItems, ...termItems, ...errItems]).concat(sentItems), 0, 0);
}

function drillStep(items, i, score) {
  if (i >= items.length) return drillDone(items.length, score);
  const it = items[i];
  const head = (kIcon, label) => `
    <div class="ex-top">
      <button class="icon-btn" id="quit" aria-label="Quitter">${icon("x")}</button>
      <div class="bar"><i style="width:${(i / items.length) * 100}%"></i></div>
    </div>
    <span class="ex-kind">${icon(kIcon)}${label}</span>`;
  const speakBox = Rec ? `<div class="mic-wrap"><button class="mic" id="mic" aria-label="Parler">${icon("mic")}</button>
    <span class="mic-label" id="micl">Touche pour parler</span></div><div class="or">ou écris ta réponse</div>` : "";
  const next = (ok) => drillStep(items, i + 1, score + (ok ? 1 : 0));
  // Un élément raté rejoint les cartes de révision.
  const miss = (w) => { if (w) { addWord(w); save(); } };

  if (it.type === "colloc") {
    render(`${head("link", "Complète la collocation")}
      <p class="q">${esc(it.gap)}</p><p class="muted">${esc(it.w.fr)}</p>
      <div class="choices">${it.choices.map((c, k) => `<button class="choice" data-c="${esc(c)}"><span class="k">${"ABCD"[k]}</span>${esc(c)}</button>`).join("")}</div>`);
    root.querySelectorAll(".choice").forEach((b) => (b.onclick = () => {
      const ok = b.dataset.c === it.verb;
      b.classList.add(ok ? "right" : "wrong");
      if (!ok) { root.querySelector(`.choice[data-c="${it.verb}"]`).classList.add("right"); miss(it.w); }
      speak(it.w.en);
      drillSheet(ok, it.w.en, it.w.ex, () => next(ok));
    }));
  } else if (it.type === "term") {
    render(`${head("pen", "Dis-le en anglais")}
      <p class="q">${esc(it.w.fr)}</p>${speakBox}
      <textarea class="answer" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="En anglais…"></textarea>
      <div class="dock"><button class="btn lv" id="ok" disabled>Valider</button></div>`);
    const input = root.querySelector("#ans");
    const okBtn = root.querySelector("#ok");
    input.oninput = () => (okBtn.disabled = !input.value.trim());
    const submit = () => {
      if (!input.value.trim()) return;
      const ok = bare(input.value) === bare(it.w.en);
      const had = inDeck(it.w);
      root.querySelector(".dock").remove();
      speak(it.w.en);
      if (!ok) miss(it.w);
      // « J'avais bon » retire la carte seulement si cet exercice vient de l'ajouter.
      const accept = () => { if (!had) { delete P().deck[cardKey(it.w)]; save(); } next(true); };
      drillSheet(ok, it.w.en, it.w.ex, () => next(ok), ok ? null : accept);
    };
    okBtn.onclick = submit;
    input.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } };
    const mic = root.querySelector("#mic");
    if (mic) mic.onclick = () => listen(mic, root.querySelector("#micl"), (t) => { input.value = t; submit(); });
  } else if (it.type === "error") {
    render(`${head("alert", "Corrige la faute")}
      <p class="q wrong-line">${esc(it.wrong)}</p>
      <p class="muted">Dis ou écris la phrase correcte.</p>${speakBox}
      <textarea class="answer" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="La phrase corrigée…"></textarea>
      <div class="dock"><button class="btn lv" id="ok" disabled>Valider</button></div>`);
    const input = root.querySelector("#ans");
    const okBtn = root.querySelector("#ok");
    input.oninput = () => (okBtn.disabled = !input.value.trim());
    // La phrase corrigée devient une carte : recto = la faute, verso = la correction.
    const key = `✔ ${it.right[0]}`;
    const submit = () => {
      if (!input.value.trim()) return;
      const ok = it.right.some((r) => norm(r) === norm(input.value));
      root.querySelector(".dock").remove();
      speak(it.right[0]);
      const had = Boolean(P().deck[key]);
      if (!ok && !had) { P().deck[key] = newCard(`Corrige : « ${it.wrong} »`, it.right[0], it.rule); save(); }
      const accept = () => { if (!had) { delete P().deck[key]; save(); } next(true); };
      drillSheet(ok, it.right[0], it.rule, () => next(ok), ok ? null : accept);
    };
    okBtn.onclick = submit;
    input.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } };
    const mic = root.querySelector("#mic");
    if (mic) mic.onclick = () => listen(mic, root.querySelector("#micl"), (t) => { input.value = t; submit(); });
  } else {
    render(`${head("chat", "Traduis à voix haute")}
      <p class="q">${esc(it.fr)}</p>
      <p class="muted">Dis ta traduction à voix haute (ou dans ta tête), puis compare avec le modèle.</p>
      <div class="dock"><button class="btn lv" id="show">Voir la traduction</button></div>`);
    root.querySelector("#show").onclick = () => {
      root.querySelector(".dock").remove();
      speak(it.en);
      const sheet = document.createElement("div");
      sheet.className = "sheet neutral";
      sheet.innerHTML = `<div><h3><span class="badge">${icon("sound")}</span>Une traduction possible</h3>
        <p><b>${esc(it.en)}</b></p>
        <div class="row2"><button class="btn ghost" id="ko">À revoir</button><button class="btn ok" id="ok">J'avais bon</button></div></div>`;
      root.appendChild(sheet);
      sheet.querySelector("#ok").onclick = () => next(true);
      sheet.querySelector("#ko").onclick = () => {
        P().deck[`${it.en}`] ??= newCard(it.fr, it.en);
        save();
        next(false);
      };
    };
  }
  root.querySelector("#quit").onclick = training;
}

// Feuille de correction ; « accept » permet de valider une réponse juste mais formulée autrement.
function drillSheet(ok, answer, example, onNext, accept = null) {
  buzz(ok ? 15 : [30, 40, 30]);
  root.querySelectorAll(".choice, #ans, #mic").forEach((e) => (e.disabled = true));
  const sheet = document.createElement("div");
  sheet.className = `sheet ${ok ? "ok" : "ko"}`;
  sheet.innerHTML = `<div>
    <h3><span class="badge">${icon(ok ? "check" : "x")}</span>${ok ? "Exact !" : "La réponse attendue"}</h3>
    <p><b>${esc(answer)}</b>${example ? `<i class="sheet-ex">${esc(example)}</i>` : ""}</p>
    ${accept ? `<div class="row2"><button class="btn ghost" id="acc">J'avais bon</button><button class="btn ko" id="nx">Continuer</button></div>`
             : `<button class="btn ${ok ? "ok" : "ko"}" id="nx">Continuer</button>`}</div>`;
  root.appendChild(sheet);
  sheet.querySelector("#nx").onclick = onNext;
  if (accept) sheet.querySelector("#acc").onclick = accept;
}

function drillDone(total, score) {
  addXp(5 + score * 2);
  render(`
    <canvas id="confetti"></canvas>
    <div class="done-screen">
      <div class="trophy">${icon("mic")}</div>
      <h1>${score} / ${total}</h1>
      <p>${score === total ? "Parfait ! Ces expressions deviennent automatiques." : "Les éléments ratés ont été ajoutés à tes cartes de révision."}</p>
    </div>
    <div class="dock"><div class="row2"><button class="btn ghost" id="h">Terminer</button><button class="btn" id="again">Nouvelle séance</button></div></div>
  `);
  if (score / total >= 0.7) confetti(root.querySelector("#confetti"));
  root.querySelector("#h").onclick = training;
  root.querySelector("#again").onclick = drillSession;
}

// ---------- Articles d'entraînement ----------
const wordCount = (a) => a.body.join(" ").split(/\s+/).filter(Boolean).length;
const articleHtml = (a) => `
  ${a.asOf ? `<span class="paper-tag">Article d'entraînement original · faits arrêtés en ${esc(a.asOf)}</span>` : ""}
  <h2 class="paper-title">${esc(a.title)}</h2>
  ${a.standfirst ? `<p class="paper-standfirst">${esc(a.standfirst)}</p>` : ""}
  ${a.body.map((p) => `<p>${esc(p)}</p>`).join("")}
  <p class="paper-count">${wordCount(a)} mots</p>`;

function library() {
  stopTimer();
  render(`
    <div class="ex-top"><button class="icon-btn" id="back" aria-label="Retour">${icon("back")}</button></div>
    <div class="screen-title"><h1>Articles</h1><span class="pill">${icon("book")}${ARTICLES.length}</span></div>
    <p class="muted">Des articles originaux, écrits pour l'entraînement à partir de faits réels, au format de l'épreuve (450 à 550 mots). Chacun a son corrigé.</p>
    <div class="art-list">${ARTICLES.map((a) => `
      <button class="art-card" data-id="${a.id}">
        <small>${esc(a.theme)} · ${esc(a.asOf)}</small>
        <b>${esc(a.title)}</b>
        <span>${esc(a.standfirst)}</span>
      </button>`).join("")}</div>
  `);
  root.querySelector("#back").onclick = training;
  root.querySelectorAll(".art-card").forEach((b) => (b.onclick = () => articleView(ARTICLES.find((a) => a.id === b.dataset.id))));
}

function articleView(a) {
  stopTimer();
  render(`
    <div class="ex-top"><button class="icon-btn" id="back" aria-label="Retour">${icon("back")}</button></div>
    <article class="paper">${articleHtml(a)}</article>
    <div class="dock"><div class="row2"><button class="btn ghost" id="g">Corrigé</button><button class="btn" id="go">${icon("clock")}S'entraîner</button></div></div>
  `);
  root.querySelector("#back").onclick = library;
  root.querySelector("#g").onclick = () => guideView(a);
  root.querySelector("#go").onclick = () => simulation("prep", a);
}

function guideView(a) {
  stopTimer();
  const g = a.guide;
  const list = (items) => `<ul class="guide-list">${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const words = g.vocab.map(([en, fr]) => ({ id: `art-${a.id}-${en}`, en, fr, ex: "", lv: "C1" }));
  render(`
    <div class="ex-top"><button class="icon-btn" id="back" aria-label="Retour">${icon("back")}</button></div>
    <span class="ex-kind">${icon("target")}Corrigé</span>
    <h1 class="guide-title">${esc(a.title)}</h1>
    <h4 class="section-title">${icon("zap")}Le déclencheur</h4><div class="tip">${esc(g.trigger)}</div>
    <h4 class="section-title">${icon("target")}Problématique</h4>
    <div class="tip"><b>${esc(g.issue)}</b> <button class="say inline-say" data-en="${esc(g.issue)}" aria-label="Écouter">${icon("sound")}</button></div>
    <h4 class="section-title">${icon("list")}Plan</h4>${list(g.plan)}
    <h4 class="section-title">${icon("scale")}Références pour le commentaire</h4>${list(g.refs)}
    <h4 class="section-title">${icon("chat")}Questions probables du jury</h4>
    <div class="grid-list">${g.questions.map((q) => `
      <details class="model"><summary>${esc(q.q)}</summary><p>${esc(q.hint)}</p></details>`).join("")}</div>
    <h4 class="section-title">${icon("book")}Vocabulaire de l'article</h4>
    <div class="wlist">${words.map(wordRow).join("")}</div>
    <div class="dock"><button class="btn" id="go">${icon("clock")}S'entraîner sur cet article</button></div>
  `);
  root.querySelector("#back").onclick = () => articleView(a);
  root.querySelector("#go").onclick = () => simulation("prep", a);
  root.querySelectorAll(".inline-say").forEach((b) => (b.onclick = () => speak(b.dataset.en)));
  bindRows(words);
}

// L'article collé reste dans le stockage local du navigateur, jamais publié.
const MINE_KEY = "objectif-anglais-mon-article";
function myArticle() {
  stopTimer();
  let saved = "";
  try { saved = localStorage.getItem(MINE_KEY) || ""; } catch {}
  render(`
    <div class="ex-top"><button class="icon-btn" id="back" aria-label="Retour">${icon("back")}</button></div>
    <div class="screen-title"><h1>Mon article</h1></div>
    <p class="muted">Colle le texte d'un sujet (titre sur la première ligne). Il est gardé uniquement sur cet appareil.</p>
    <textarea class="answer tall" id="txt" placeholder="Title of the article&#10;&#10;First paragraph…">${esc(saved)}</textarea>
    <p class="muted small" id="count"></p>
    <div class="dock"><button class="btn" id="go" disabled>${icon("clock")}Lancer la simulation</button></div>
  `);
  const txt = root.querySelector("#txt");
  const go = root.querySelector("#go");
  const upd = () => {
    const n = txt.value.split(/\s+/).filter(Boolean).length;
    root.querySelector("#count").textContent = n ? `${n} mots${n < 450 || n > 550 ? " (l'épreuve : 450 à 550)" : ""}` : "";
    go.disabled = n < 50;
  };
  txt.oninput = () => { upd(); try { localStorage.setItem(MINE_KEY, txt.value); } catch {} };
  upd();
  root.querySelector("#back").onclick = training;
  go.onclick = () => {
    const lines = txt.value.split(/\n+/).map((l) => l.trim()).filter(Boolean);
    simulation("prep", { title: lines[0], body: lines.slice(1) });
  };
}

function jury() {
  stopTimer();
  const q = JURY_QUESTIONS[Math.floor(Math.random() * JURY_QUESTIONS.length)];
  let t = 45;
  render(`
    <div class="ex-top"><button class="icon-btn" id="back" aria-label="Retour">${icon("back")}</button></div>
    <span class="ex-kind">${icon("chat")}${esc(q.topic)}</span>
    <p class="q">${esc(q.q)}</p>
    <button class="say big-say" id="say" aria-label="Écouter la question">${icon("sound")}Écouter la question</button>
    <div class="sim"><div class="clock" id="clock">0:45</div>
      <p class="muted center-text">Réponds à voix haute en 4 temps : réponse · justification · exemple précis · nuance ou comparaison avec la France.</p></div>
    <details class="model"><summary>Pistes de réponse</summary><p>${esc(q.hint)}</p></details>
    <div class="dock"><div class="row2"><button class="btn ghost" id="other">Autre</button><button class="btn" id="start">${icon("play")}Démarrer</button></div></div>
  `);
  speak(q.q);
  root.querySelector("#say").onclick = () => speak(q.q);
  root.querySelector("#back").onclick = training;
  root.querySelector("#other").onclick = jury;
  root.querySelector("#start").onclick = (e) => {
    e.currentTarget.disabled = true;
    timer = setInterval(() => {
      t -= 1;
      root.querySelector("#clock").textContent = mmss(Math.max(0, t));
      if (t <= 0) { stopTimer(); buzz([40, 60, 40]); root.querySelector("#clock").classList.add("over"); addXp(3); }
    }, 1000);
  };
}

const TABS = { home, words: wordsHome, review: reviewSession, profile, training };
home();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});

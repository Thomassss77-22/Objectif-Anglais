import { LEVELS } from "./data.js";
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
const state = Object.assign({ done: {}, deck: {}, xp: 0, streak: 0, lastDay: null, days: {} }, load());
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
  const due = dueCards(state.deck).sort((a, b) => a.due - b.due);
  const seen = state.newDay === dayKey() ? state.newSeen : 0;
  const fresh = due.filter(isNew).slice(0, Math.max(0, NEW_PER_DAY - seen));
  return [...due.filter((c) => !isNew(c)), ...fresh];
}

const allLessons = LEVELS.flatMap((lv) => lv.lessons.map((l) => ({ ...l, lv })));
const findLesson = (id) => allLessons.find((l) => l.id === id);
const nextLesson = () => allLessons.find((l) => !state.done[l.id]);

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
  if (lv) root.dataset.lv = lv;
  else delete root.dataset.lv;
  window.scrollTo(0, 0);
  root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => TABS[b.dataset.tab]()));
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
    <div class="brand"><div class="logo">OA</div>Objectif Anglais</div>
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

  const units = LEVELS.map((lv) => {
    const n = lv.lessons.filter((l) => state.done[l.id]).length;
    return `
    <section class="unit" data-lv="${lv.id}">
      <div class="unit-head" data-lv="${lv.id}">
        <small>Niveau ${lv.id}</small>
        <h3>${esc(lv.name)}</h3>
        <div class="meter"><i style="width:${(n / lv.lessons.length) * 100}%"></i></div>
        <div class="count">${n} / ${lv.lessons.length} leçons</div>
      </div>
      <div class="path">
        ${lv.lessons.map((l) => {
          const st = state.done[l.id] ? "done" : next && next.id === l.id ? "next" : "todo";
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
          <p>${pct >= 1 ? "Bravo, ta série continue." : "Une leçon par jour, et l'anglais devient naturel."}</p>
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
  const first = !state.done[l.id];
  state.done[l.id] = true;
  const gained = 10 + score * 5;
  let added = 0;
  for (const [fr, en] of l.words) if (!state.deck[en]) { state.deck[en] = newCard(fr, en); added++; }
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
    const total = Object.keys(state.deck).length;
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
        if (state.newDay !== dayKey()) Object.assign(state, { newDay: dayKey(), newSeen: 0 });
        state.newSeen += 1;
      }
      const key = Object.keys(state.deck).find((k) => state.deck[k] === card);
      state.deck[key] = review(card, +b.dataset.q);
      addXp(1);
      reviewSession();
    }));
  };
}

// ---------- Banque de mots ----------
// Les fichiers sont chargés à la demande puis gardés en mémoire.
const bank = { index: null, cats: {} };
async function loadIndex() {
  if (!bank.index) bank.index = await (await fetch("words/index.json")).json();
  return bank.index;
}
async function loadCat(id) {
  if (!bank.cats[id]) bank.cats[id] = await (await fetch(`words/${id}.json`)).json();
  return bank.cats[id];
}
// Même clé que les cartes des leçons (le mot anglais), sauf pour un mot à plusieurs sens.
const cardKey = (w) => (w.alt ? `${w.en} (${w.fr})` : w.en);
const inDeck = (w) => Boolean(state.deck[cardKey(w)]);
function addWord(w) {
  if (!inDeck(w)) state.deck[cardKey(w)] = newCard(w.fr, w.en, w.ex);
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

const lvChips = () => `<div class="chips">
  <button class="fchip ${wordFilter.lv ? "" : "on"}" data-lv-f="">Tous</button>
  ${LV_IDS.map((lv) => `<button class="fchip ${wordFilter.lv === lv ? "on" : ""}" data-lv-f="${lv}" data-lv="${lv}">${lv}</button>`).join("")}
</div>`;

async function wordsHome() {
  const idx = await loadIndex();
  const known = (c) => (bank.cats[c.id] ? bank.cats[c.id].filter(inDeck).length : null);
  render(`
    ${topbar()}
    <div class="screen-title"><h1>Banque de mots</h1><span class="pill">${icon("book")}${idx.total}</span></div>
    <label class="searchbox">${icon("search")}<input id="q" type="search" placeholder="Chercher un mot (anglais ou français)" value="${esc(wordFilter.q)}" autocomplete="off"></label>
    ${lvChips()}
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
  const cards = Object.values(state.deck);
  const mastered = cards.filter((c) => c.interval >= 21).length;
  const doneCount = Object.keys(state.done).length;
  const current = (nextLesson() || allLessons[allLessons.length - 1]).lv;
  const kpi = (ic, c, v, label) => `<div class="kpi"><div class="ico" style="--c:${c}">${icon(ic)}</div><b>${v}</b><span>${label}</span></div>`;
  render(`
    ${topbar()}
    <div class="profile-head">
      <div class="avatar">${current.id}</div>
      <div><h1>Mon parcours</h1><p>Niveau actuel : ${current.id} · ${esc(current.name.split(" — ")[0])}</p></div>
    </div>
    <div class="grid2">
      ${kpi("flame", "#ff7a1a", liveStreak(), "Jours de série")}
      ${kpi("bolt", "#ffb020", state.xp, "XP au total")}
      ${kpi("book", "#5b5bf7", `${doneCount}/${allLessons.length}`, "Leçons terminées")}
      ${kpi("star", "#12b886", `${mastered}/${cards.length}`, "Mots maîtrisés")}
    </div>
    <h4 class="section-title">${icon("target")}Vers le niveau courant</h4>
    <div class="levels">${LEVELS.map((lv) => {
      const n = lv.lessons.filter((l) => state.done[l.id]).length;
      return `<div class="lvrow" data-lv="${lv.id}"><span class="cefr">${lv.id}</span>
        <div><b>${esc(lv.name.split(" — ")[0])}</b><div class="meter"><i style="width:${(n / lv.lessons.length) * 100}%"></i></div></div>
        <em>${n}/${lv.lessons.length}</em></div>`;
    }).join("")}</div>
    <button class="link-danger" id="reset">Réinitialiser ma progression</button>
  `, { nav: "profile" });
  root.querySelector("#reset").onclick = () => {
    if (!confirm("Effacer toute ta progression ?")) return;
    Object.assign(state, { done: {}, deck: {}, xp: 0, streak: 0, lastDay: null, days: {} });
    save();
    home();
  };
}

const TABS = { home, words: wordsHome, review: reviewSession, profile };
home();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});

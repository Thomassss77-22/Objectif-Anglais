import { LEVELS } from "./data.js";
import { LEGAL, JURY_QUESTIONS, SELF_GRID, DRILL_SENTENCES, ERROR_SENTENCES } from "./legal.js";
import { ARTICLES } from "./articles.js";
import { FILMS } from "./films.js";
import { READINGS } from "./reading.js";
import * as PT from "./placement.js";
import { norm, check, fixesText } from "./match.js";
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
const DEFAULTS = () => ({ done: {}, deck: {}, xp: 0, streak: 0, lastDay: null, days: {}, mode: "general" });
const state = Object.assign(DEFAULTS(), load());
// Le mode CRFPA a ses propres leçons et cartes ; XP et série sont communes aux deux modes.
state.legal = Object.assign({ done: {}, deck: {} }, state.legal);
const legalMode = () => state.mode === "legal";
const P = () => (legalMode() ? state.legal : state);
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

// ---------- Sauvegarde ----------
// La progression ne vit que dans ce navigateur : on peut l'exporter dans un fichier et la restaurer
// sur un autre appareil.
const BACKUP_APP = "objectif-anglais";
// Dans l'application iPhone (Capacitor), pas de téléchargement : on écrit le fichier puis on ouvre
// la feuille de partage (Fichiers, AirDrop, e-mail…).
const nativePlugin = (name) => window.Capacitor?.isNativePlatform?.() && (window.Capacitor.Plugins?.[name] || window.Capacitor.registerPlugin?.(name));
async function exportProgress() {
  state.lastBackup = Date.now();
  save();
  const json = JSON.stringify({ app: BACKUP_APP, version: 1, exported: new Date().toISOString(), state });
  const fs = nativePlugin("Filesystem"), share = nativePlugin("Share");
  if (fs && share) {
    try {
      const { uri } = await fs.writeFile({ path: `objectif-anglais-${dayKey()}.json`, data: json, directory: "CACHE", encoding: "utf8" });
      await share.share({ title: "Sauvegarde Objectif Anglais", files: [uri] });
    } catch (e) {
      if (!/cancel/i.test(String(e?.message || e))) alert("La sauvegarde n'a pas pu être partagée.");
    }
    return;
  }
  const blob = new Blob([json], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `objectif-anglais-${dayKey()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
// Rappel sur l'accueil dès qu'il y a quelque chose à perdre, puis toutes les deux semaines.
const needsBackup = () => Object.keys(state.done).length + Object.keys(state.legal.done).length >= 3
  && (!state.lastBackup || Date.now() - state.lastBackup > 14 * 864e5);
const isObj = (o) => o && typeof o === "object" && !Array.isArray(o);
function importProgress(file, after) {
  const r = new FileReader();
  r.onload = () => {
    let d = null;
    try { d = JSON.parse(r.result); } catch {}
    const s = d && d.app === BACKUP_APP && d.state;
    if (!isObj(s) || !isObj(s.done || {}) || !isObj(s.deck || {})) return alert("Ce fichier n'est pas une sauvegarde d'Objectif Anglais.");
    const lessons = Object.keys(s.done || {}).length + Object.keys(s.legal?.done || {}).length;
    const cards = Object.keys(s.deck || {}).length + Object.keys(s.legal?.deck || {}).length;
    const when = new Date(d.exported).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    if (!confirm(`Restaurer la sauvegarde du ${when} (${lessons} leçons, ${cards} cartes, ${s.xp || 0} XP) ?\nTa progression actuelle sur cet appareil sera remplacée.`)) return;
    for (const k of Object.keys(state)) delete state[k];
    Object.assign(state, DEFAULTS(), s);
    state.legal = Object.assign({ done: {}, deck: {} }, state.legal);
    save();
    after();
  };
  r.readAsText(file);
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

// Les nouvelles cartes sont introduites au rythme choisi dans le profil (20 par jour par défaut).
const PACES = [10, 20, 40, 60];
const newPerDay = () => state.newPerDay || 20;
// Temps de révision quotidien une fois le rythme installé : environ 5 révisions par nouvelle carte,
// comptées 6 s chacune, plus 10 s pour découvrir la carte.
const paceMinutes = (n) => Math.round((n * 10 + n * 5 * 6) / 60);
const isNew = (c) => c.reps === 0 && c.interval === 0;
function reviewQueue() {
  const due = dueCards(P().deck).sort((a, b) => a.due - b.due);
  const seen = P().newDay === dayKey() ? P().newSeen : 0;
  const fresh = due.filter(isNew).slice(0, Math.max(0, newPerDay() - seen));
  return [...due.filter((c) => !isNew(c)), ...fresh];
}

// Parcours = leçons rédigées + leçons de vocabulaire tirées de la banque (words/index.json → units),
// intercalées régulièrement. En mode CRFPA, le vocabulaire juridique forme un module 5.
const composed = {};
const vocabStub = (u) => ({ id: u.id, title: u.title, vocab: u });
function interleave(main, extra) {
  if (!main.length) return extra;
  const out = [];
  main.forEach((l, i) => {
    out.push(l);
    out.push(...extra.slice(Math.floor((i * extra.length) / main.length), Math.floor(((i + 1) * extra.length) / main.length)));
  });
  return out;
}
const levels = () => {
  const base = legalMode() ? LEGAL : LEVELS;
  const units = banks[state.mode].index?.units;
  if (!units) return base;
  if (!composed[state.mode]) {
    const out = base.map((lv) => ({ ...lv, lessons: interleave(lv.lessons, units.filter((u) => u.lv === lv.id).map(vocabStub)) }));
    const m5 = units.filter((u) => u.lv === "M5");
    if (m5.length) out.push({ id: "M5", label: "Module 5", name: "Vocabulaire juridique", lessons: m5.map(vocabStub) });
    composed[state.mode] = out;
  }
  return composed[state.mode];
};
const allLessons = () => levels().flatMap((lv) => lv.lessons.map((l) => ({ ...l, lv })));
const findLesson = (id) => allLessons().find((l) => l.id === id);
const nextLesson = () => allLessons().find((l) => !P().done[l.id]);

// ---------- Utilitaires ----------
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
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  trophy: "M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3",
  bulb: "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z",
  headphones: "M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1v-6h3v4zM3 19a2 2 0 0 0 2 2h1v-6H3v4z",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  stop: "M6 6h12v12H6z",
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
  film: "M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4",
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
    ${Object.keys(mistakes()).length ? `<button class="tile" id="mistakes-home">
      <div class="tile-icon ${dueMistakes().length ? "alt" : "calm"}">${icon("target")}</div>
      <div><b>Mes erreurs</b><span>${dueMistakes().length ? "À retravailler maintenant" : `${Object.keys(mistakes()).length} en cours, rien à revoir aujourd'hui`}</span></div>
      ${dueMistakes().length ? `<span class="badge-count">${dueMistakes().length}</span>` : `<span class="go">${icon("chevron")}</span>`}</button>` : ""}
    ${needsBackup() ? `<button class="tile" id="backup-home">
      <div class="tile-icon alt-test">${icon("download")}</div>
      <div><b>Sauvegarde ta progression</b><span>${state.lastBackup ? "Ta dernière sauvegarde date de plus de 2 semaines" : "Elle n'existe que sur cet appareil : garde-en une copie"}</span></div>
      <span class="go">${icon("chevron")}</span></button>` : ""}
    ${legalMode() ? "" : `<button class="tile" id="test-home">
      <div class="tile-icon alt-test">${icon("target")}</div>
      <div><b>${state.placement ? `Ton niveau : ${state.placement.level}` : "Tester mon niveau"}</b>
        <span>${state.placement ? "Refaire le test de niveau" : "Un test adaptatif de 10 à 15 minutes pour démarrer au bon niveau"}</span></div>
      <span class="go">${icon("chevron")}</span></button>`}
    ${legalMode() ? "" : `<button class="tile" id="read-home">
      <div class="tile-icon read">${icon("headphones")}</div>
      <div><b>Écouter et lire</b><span>Dialogues et textes du A1 au C2 · ${Object.keys(state.reads || {}).length}/${READINGS.length} faits</span></div>
      <span class="go">${icon("chevron")}</span></button>`}
    ${legalMode() ? "" : `<button class="tile" id="cine-home">
      <div class="tile-icon cine">${icon("film")}</div>
      <div><b>Ciné et séries</b><span>Prépare ton prochain film en anglais</span></div>
      <span class="go">${icon("chevron")}</span></button>`}
    ${legalMode() ? `<button class="tile" data-tab="training">
      <div class="tile-icon alt">${icon("clock")}</div>
      <div><b>Entraînement à l'oral</b><span>Simulation chronométrée et questions du jury</span></div>
      <span class="go">${icon("chevron")}</span></button>` : ""}
    <div id="path">${pathSection(next)}</div>
  `, { nav: "home" });

  requestAnimationFrame(() => setTimeout(() => {
    const bar = root.querySelector(".ring .bar");
    if (bar) bar.style.strokeDashoffset = C * (1 - pct);
  }, 60));
  root.querySelector("#continue").onclick = () => (next ? lesson(next.id) : reviewSession());
  root.querySelector("#cine-home")?.addEventListener("click", cinema);
  root.querySelector("#test-home")?.addEventListener("click", placementIntro);
  root.querySelector("#mistakes-home")?.addEventListener("click", mistakesHome);
  root.querySelector("#read-home")?.addEventListener("click", readingList);
  root.querySelector("#backup-home")?.addEventListener("click", async () => { await exportProgress(); home(); });
  bindPath(next);
}

// Le parcours s'affiche un niveau à la fois (onglets), découpé en chapitres : une leçon rédigée
// suivie des leçons de vocabulaire qui l'accompagnent. Un module fait uniquement de vocabulaire
// (CRFPA, module 5) est découpé par thème. Seul le chapitre en cours est déplié.
const shownLv = {};          // niveau affiché, par mode
const toggled = new Set();   // chapitres ouverts ou fermés à la main
const baseTitle = (t) => t.replace(/ \(\d+\/\d+\)$/, "");
function chapters(lv) {
  const vocabOnly = lv.lessons.every((l) => l.vocab);
  const out = [];
  for (const l of lv.lessons) {
    const last = out[out.length - 1];
    const join = last && l.vocab && (!vocabOnly || last.cat === l.vocab.cat);
    if (join) last.lessons.push(l);
    else out.push({ id: l.id, cat: l.vocab?.cat, title: vocabOnly ? baseTitle(l.title) : l.title, lessons: [l] });
  }
  return out;
}

function pathSection(next) {
  const lvls = levels();
  const cur = (next && lvls.find((lv) => lv.lessons.some((l) => l.id === next.id))) || lvls[lvls.length - 1];
  const lv = lvls.find((x) => x.id === shownLv[state.mode]) || cur;
  const doneIn = (list) => list.filter((l) => P().done[l.id]).length;
  const n = doneIn(lv.lessons);
  const tabs = lvls.map((x) => {
    const full = doneIn(x.lessons) === x.lessons.length;
    return `<button class="lv-tab ${x.id === lv.id ? "on" : ""} ${full ? "full" : ""}" data-lv="${x.id}" data-pick="${x.id}">
      ${full ? icon("check") : ""}${x.id}${x.id === cur.id && !full ? `<i class="dot"></i>` : ""}</button>`;
  }).join("");
  const chs = chapters(lv).map((ch, i) => {
    const k = doneIn(ch.lessons), len = ch.lessons.length;
    const isNext = next && ch.lessons.some((l) => l.id === next.id);
    const st = k === len ? "done" : isNext ? "next" : "todo";
    const open = isNext !== toggled.has(ch.id);
    const nv = ch.lessons.filter((l) => l.vocab).length, ng = len - nv;
    const pl = (k, w) => `${k} ${w}${k > 1 ? "s" : ""}`;
    const parts = ng ? `${pl(ng, "leçon")}${nv ? ` + ${nv} de vocabulaire` : ""}` : `${pl(nv, "leçon")} de vocabulaire`;
    const rows = ch.lessons.map((l) => {
      const d = P().done[l.id], nx = next && next.id === l.id;
      return `<button class="ch-row ${d ? "done" : nx ? "next" : ""}" data-id="${l.id}">
        <span class="ch-ic ${l.vocab ? "vocab" : ""}">${icon(d ? "check" : l.vocab ? "cards" : "book")}</span>
        <span class="ch-txt"><small>${l.vocab ? "Vocabulaire" : "Leçon"}</small><b>${esc(ch.cat ? l.title.replace(/^.* \((\d+)\/(\d+)\)$/, "Partie $1 sur $2") : l.title)}</b></span>
        ${nx ? `<span class="ch-go">${icon("play")}</span>` : ""}</button>`;
    }).join("");
    return `<section class="chapter ${st} ${open ? "open" : ""}">
      <button class="ch-head" data-ch="${ch.id}" aria-expanded="${open}">
        <span class="ch-num">${st === "done" ? icon("check") : i + 1}</span>
        <span class="ch-txt"><b>${esc(ch.title)}</b><small>${parts}</small></span>
        <span class="ch-count">${k}/${len}</span><span class="ch-arrow">${icon("chevron")}</span>
      </button>
      <div class="ch-body">${rows}</div>
    </section>`;
  }).join("");
  return `<div class="lv-tabs" role="tablist">${tabs}</div>
    <section class="unit" data-lv="${lv.id}">
      <div class="unit-head" data-lv="${lv.id}">
        <small>${lv.label || `Niveau ${lv.id}`}</small>
        <h3>${esc(lv.name)}</h3>
        <div class="meter"><i style="width:${(n / lv.lessons.length) * 100}%"></i></div>
        <div class="count">${n} / ${lv.lessons.length} étapes · ${chapters(lv).length} chapitres</div>
      </div>
      <div class="chapters">${chs}</div>
    </section>`;
}

function bindPath(next) {
  const box = root.querySelector("#path");
  box.querySelectorAll(".ch-row").forEach((b) => (b.onclick = () => lesson(b.dataset.id)));
  box.querySelectorAll(".ch-head").forEach((b) => (b.onclick = () => {
    const ch = b.parentElement;
    ch.classList.toggle("open");
    b.setAttribute("aria-expanded", ch.classList.contains("open"));
    toggled.has(b.dataset.ch) ? toggled.delete(b.dataset.ch) : toggled.add(b.dataset.ch);
  }));
  box.querySelectorAll(".lv-tab").forEach((b) => (b.onclick = () => {
    shownLv[state.mode] = b.dataset.pick;
    box.innerHTML = pathSection(next);
    bindPath(next);
    box.querySelector(".lv-tab.on").scrollIntoView({ inline: "center", block: "nearest" });
  }));
}

// ---------- Leçon ----------
// Écran où revenir après une leçon ouverte ailleurs que dans le parcours (thème de l'onglet Mots).
let origin = null;
function lesson(id, from = null) {
  origin = from;
  const found = findLesson(id);
  if (found.vocab) return openVocab(found);
  showLesson(found);
}

// Leçon de vocabulaire : mots chargés depuis la banque, exercices générés.
async function openVocab(stub) {
  const words = [];
  for (const ref of stub.vocab.ids) {
    const [cat, wid] = ref.split("/");
    const w = (await loadCat(cat)).find((x) => x.id === wid);
    if (w) words.push(w);
  }
  const theme = stub.vocab.cat === "mix" ? "de thèmes variés" : `sur le thème « ${stub.vocab.title.replace(/ \(\d+\/\d+\)$/, "")} »`;
  showLesson({
    ...stub,
    tip: `${words.length} mots ${theme}. Écoute chaque mot, lis l'exemple, puis entraîne-toi : à la fin de la leçon, tous ces mots rejoignent tes cartes de révision.`,
    words: words.map((w) => [w.fr, w.en, w.ex]),
    bankWords: words,
    exercises: vocabExercises(words),
  });
}

// Forme « nue » d'une expression pour la retrouver dans une phrase (« to cook » → « cook »).
const core = (en) => en.replace(/\(.*?\)/g, "").replace(/^(to|a|an|the) /i, "").trim();

function vocabExercises(words) {
  const pick = shuffle(words);
  let k = 0;
  const nextWord = () => pick[k++ % pick.length];
  const others = (w, field) => shuffle([...new Set(words.filter((x) => x[field] !== w[field]).map((x) => x[field]))]).slice(0, 3);
  const qcm = (q, right, wrong) => {
    const choices = shuffle([right, ...wrong]);
    return { type: "qcm", q, choices, answer: choices.indexOf(right) };
  };
  const ex = [];
  for (let n = 0; n < 3; n++) { const w = nextWord(); ex.push(qcm(`Comment dit-on « ${w.fr} » ?`, w.en, others(w, "en"))); }
  for (let n = 0; n < 2; n++) { const w = nextWord(); ex.push(qcm(`Que veut dire « ${w.en} » ?`, w.fr, others(w, "fr"))); }
  { const w = nextWord();
    const e = qcm("Écoute et choisis la traduction", w.fr, others(w, "fr"));
    ex.push("speechSynthesis" in window ? { ...e, type: "listen", audio: w.en } : { ...e, q: `Que veut dire « ${w.en} » ?` }); }
  for (let n = 0; n < 2; n++) { const w = nextWord(); ex.push({ type: "translate", q: `Écris en anglais : « ${w.fr} »`, answers: [...new Set([w.en, core(w.en)])] }); }
  // Phrase à compléter, si l'exemple contient le mot.
  const w = pick.find((x) => x.ex && core(x.en).length > 2 && x.ex.toLowerCase().includes(core(x.en).toLowerCase()));
  if (w) {
    const re = new RegExp(core(w.en).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    const wrong = shuffle(words.filter((x) => core(x.en).toLowerCase() !== core(w.en).toLowerCase()).map((x) => core(x.en))).slice(0, 3);
    ex.push(qcm(`Complète : « ${w.ex.replace(re, "___")} »`, core(w.en), wrong));
  }
  return shuffle(ex);
}

function showLesson(l) {
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
    <div class="vocab">${l.words.map(([fr, en, ex]) => `
      <div class="word"><div><b>${esc(en)}</b><span>${esc(fr)}</span>${ex ? `<i class="word-ex">${esc(ex)}</i>` : ""}</div>
        <button class="say" data-en="${esc(en)}" aria-label="Écouter">${icon("sound")}</button></div>`).join("")}
    </div>
    <div class="dock"><button class="btn lv" id="go">${icon("play")}Commencer la leçon</button></div>
  `, { lv: l.lv.id });
  root.querySelector("#back").onclick = origin || home;
  root.querySelectorAll(".say").forEach((b) => (b.onclick = () => speak(b.dataset.en)));
  root.querySelector("#go").onclick = () => exercise(l, 0, 0);
}


// ---------- Carnet d'erreurs ----------
// Chaque exercice raté en leçon y est noté, puis reproposé selon des boîtes de Leitner :
// réussi, il revient après 1, 3 puis 7 jours, et quitte le carnet après trois réussites ;
// raté, il revient le lendemain.
const BOXES = [1, 3, 7];
const mistakes = () => (P().mistakes ||= {});
const mistakeKey = (lessonId, ex) => `${lessonId}#${ex.q}`;
const answerText = (ex) => (ex.type === "qcm" || ex.type === "listen" ? ex.choices[ex.answer] : ex.answers[0]);
const dueMistakes = () => Object.entries(mistakes()).filter(([, m]) => m.due <= Date.now()).map(([k, m]) => ({ key: k, ...m }));
function logMistake(l, ex, given) {
  const key = mistakeKey(l.id, ex);
  mistakes()[key] = { ex: { ...ex, from: l.id, lv: l.lv.id }, title: l.title, given, box: 0, due: Date.now(), added: mistakes()[key]?.added || Date.now() };
  save();
}

// Accès au carnet depuis l'écran de révision.
const errorsPill = () => {
  const n = Object.keys(mistakes()).length;
  return n ? `<button class="pill pill-btn" id="to-errors">${icon("target")}Erreurs${dueMistakes().length ? ` · ${dueMistakes().length}` : ""}</button>` : "";
};
document.addEventListener("click", (e) => { if (e.target.closest("#to-errors")) mistakesHome(); });

function mistakesHome() {
  const all = Object.entries(mistakes()).map(([key, m]) => ({ key, ...m })).sort((a, b) => a.due - b.due);
  const due = all.filter((m) => m.due <= Date.now());
  const when = (t) => {
    const d = Math.ceil((t - Date.now()) / 864e5);
    return d <= 0 ? "maintenant" : d === 1 ? "demain" : `dans ${d} jours`;
  };
  render(`
    ${topbar()}
    <div class="screen-title"><h1>Mes erreurs</h1><span class="pill">${icon("target")}${all.length}</span></div>
    <p class="lead">Les exercices ratés reviennent ici jusqu'à ce que tu les réussisses trois fois, à quelques jours d'intervalle.</p>
    ${all.length ? `<div class="mlist">${all.map((m) => `
      <div class="mrow" data-lv="${m.ex.lv}">
        <span class="cefr-mini">${m.ex.lv}</span>
        <div><small>${esc(m.title)}</small><b>${esc(m.ex.q)}</b>
          <span class="m-ans">${icon("check")}${esc(answerText(m.ex))}</span>
          ${m.given ? `<span class="m-given">${icon("x")}${esc(m.given)}</span>` : ""}</div>
        <em class="${m.due <= Date.now() ? "now" : ""}">${when(m.due)}${m.box ? ` · ${m.box}/3` : ""}</em>
      </div>`).join("")}</div>`
    : `<div class="empty"><div class="tile-icon calm">${icon("check")}</div><h2>Aucune erreur à retravailler</h2>
        <p>Les exercices que tu rates dans les leçons arriveront ici automatiquement.</p></div>`}
    ${due.length ? `<div class="dock"><button class="btn" id="go">${icon("play")}Retravailler ${due.length} exercice${due.length > 1 ? "s" : ""}</button></div>` : ""}
  `, { nav: "review" });
  root.querySelector("#go")?.addEventListener("click", () => mistakesSession(due));
}

function mistakesSession(list) {
  const items = shuffle(list).slice(0, 15);
  let fixed = 0;
  exercise({
    id: "mistakes", title: "Mes erreurs", lv: { id: items[0].ex.lv },
    exercises: items.map((m) => ({ ...m.ex, key: m.key })),
    onAnswer: (ex, good) => {
      const m = mistakes()[ex.key];
      if (!m) return;
      if (good) {
        m.box += 1;
        if (m.box >= BOXES.length) { delete mistakes()[ex.key]; fixed++; } else m.due = Date.now() + BOXES[m.box - 1] * 864e5;
      } else Object.assign(m, { box: 0, due: Date.now() + 864e5 });
      save();
    },
    onQuit: mistakesHome,
    onEnd: (score) => {
      addXp(score * 3);
      render(`
        <div class="done-screen">
          <div class="trophy">${icon("target")}</div>
          <h1>${score === items.length ? "Tout est juste !" : "Séance terminée"}</h1>
          <p>${score} / ${items.length} réussi${score > 1 ? "s" : ""}${fixed ? ` · ${fixed} erreur${fixed > 1 ? "s" : ""} définitivement corrigée${fixed > 1 ? "s" : ""}` : ""}</p>
        </div>
        <div class="dock"><button class="btn" id="h">Retour au carnet</button></div>
      `);
      root.querySelector("#h").onclick = mistakesHome;
    },
  }, 0, 0);
}

const KINDS = {
  qcm: ["target", "Choisis la bonne réponse"],
  listen: ["sound", "Écoute"],
  translate: ["pen", "Traduis en anglais"],
  speak: ["chat", "Expression orale"],
};

function exercise(l, i, score) {
  if (i >= l.exercises.length) return l.onEnd ? l.onEnd(score) : finish(l, score);
  const ex = l.exercises[i];
  const lv = ex.lv || l.lv.id;
  // Règle de la leçon d'origine, rappelée en cas d'erreur (leçons rédigées uniquement).
  const tip = l.vocab ? null : ex.from ? findLesson(ex.from)?.tip : l.tip;
  const [kIcon, kLabel] = KINDS[ex.type];
  let body;
  if (ex.type === "qcm" || ex.type === "listen") {
    body = `${ex.type === "listen" ? `<button class="say big-say" id="play">${icon("sound")}Réécouter</button>` : ""}
      <div class="choices">${ex.choices.map((c, k) =>
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
    ${ex.type === "qcm" || ex.type === "listen" ? "" : `<div class="dock"><button class="btn lv" id="ok" disabled>Valider</button></div>`}
  `, { lv });
  root.querySelector("#quit").onclick = l.onQuit || (() => lesson(l.id, origin));

  const next = (good, correction, fixes = [], given = "") => {
    if (l.onAnswer) l.onAnswer(ex, good);
    else if (!good) logMistake(l, ex, given);
    buzz(good ? 15 : [30, 40, 30]);
    root.querySelector(".dock")?.remove();
    root.querySelectorAll(".choice, #ans, #mic").forEach((e) => (e.disabled = true));
    root.querySelector(".ex-top .bar i").style.width = `${((i + 1) / l.exercises.length) * 100}%`;
    const sheet = document.createElement("div");
    sheet.className = `sheet ${good ? "ok" : "ko"}`;
    const praise = ["Excellent !", "Parfait !", "Bien joué !", "Impeccable !"][i % 4];
    sheet.innerHTML = `<div>
      <h3><span class="badge">${icon(good ? "check" : "x")}</span>${good ? (fixes.length ? "Presque parfait !" : praise) : "Pas tout à fait…"}</h3>
      <p>${good ? (ex.type === "qcm" ? "" : `<b>${esc(correction)}</b>`) : `Bonne réponse :<b>${esc(correction)}</b>`}
        ${fixes.length ? `<i class="sheet-ex">Attention à l'orthographe : ${esc(fixesText(fixes))}</i>` : ""}</p>
      ${!good && tip ? `<details class="rule"><summary>${icon("bulb")}Revoir la règle</summary><div>${tip}</div></details>` : ""}
      <button class="btn ${good ? "ok" : "ko"}" id="nx">Continuer</button></div>`;
    root.appendChild(sheet);
    sheet.querySelector("#nx").onclick = () => exercise(l, i + 1, score + (good ? 1 : 0));
  };

  if (ex.type === "listen") {
    root.querySelector("#play").onclick = () => speak(ex.audio);
    setTimeout(() => speak(ex.audio), 300);
  }
  if (ex.type === "qcm" || ex.type === "listen") {
    root.querySelectorAll(".choice").forEach((b) => (b.onclick = () => {
      const good = +b.dataset.k === ex.answer;
      b.classList.add(good ? "right" : "wrong");
      if (!good) root.querySelector(`.choice[data-k="${ex.answer}"]`).classList.add("right");
      next(good, ex.type === "listen" ? `${ex.audio} = ${ex.choices[ex.answer]}` : ex.choices[ex.answer], [], ex.choices[+b.dataset.k]);
    }));
  } else {
    const input = root.querySelector("#ans");
    const ok = root.querySelector("#ok");
    input.oninput = () => (ok.disabled = !input.value.trim());
    const submit = () => {
      if (!input.value.trim()) return;
      const r = check(input.value, ex.answers);
      next(r.ok, r.ok ? r.answer : ex.answers[0], r.fixes, input.value.trim());
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
  if (l.bankWords) {
    for (const w of l.bankWords) if (!inDeck(w)) { addWord(w); added++; }
  } else {
    for (const [fr, en] of l.words) if (!P().deck[en]) { P().deck[en] = newCard(fr, en); added++; }
  }
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
    <div class="dock"><button class="btn" id="h">${origin ? "Retour au thème" : "Continuer"}</button></div>
  `);
  buzz([20, 60, 20]);
  root.querySelectorAll("[data-count]").forEach((el) => countUp(el, +el.dataset.count, el.dataset.suffix || ""));
  if (acc >= 60) confetti(root.querySelector("#confetti"));
  root.querySelector("#h").onclick = origin || home;
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

// Carte ratée : elle revient dans la séance, mais après quelques autres cartes (pas tout de suite).
const SNOOZE = 4;
const snoozed = new Map(); // carte → nombre de cartes à voir avant qu'elle revienne
function reviewSession() {
  const queue = reviewQueue();
  const wait = (c) => snoozed.get(c) || 0;
  const due = [...queue.filter((c) => !wait(c)), ...queue.filter((c) => wait(c)).sort((a, b) => wait(a) - wait(b))];
  const card = due[0];
  if (!card) {
    const total = Object.keys(P().deck).length;
    render(`
      ${topbar()}
      <div class="screen-title"><h1>Révision</h1>${errorsPill()}</div>
      <div class="empty">
        <div class="tile-icon calm">${icon("check")}</div>
        <h2>${total ? "Tout est révisé" : "Aucune carte pour l'instant"}</h2>
        <p>${total ? `Tes ${total} cartes sont à jour (${newPerDay()} nouvelles cartes maximum par jour, réglable dans le profil). Reviens demain pour la suite.` : "Termine une leçon : son vocabulaire arrivera ici automatiquement."}</p>
      </div>
      <button class="btn" id="h">${icon("path")}Retour au parcours</button>
    `, { nav: "review" });
    root.querySelector("#h").onclick = home;
    return;
  }
  render(`
    ${topbar()}
    <div class="screen-title"><h1>Révision</h1>${errorsPill()}<span class="pill">${icon("cards")}${due.length}</span></div>
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
      for (const [c, n] of snoozed) n > 1 ? snoozed.set(c, n - 1) : snoozed.delete(c);
      snoozed.delete(card);
      if (+b.dataset.q < 3) snoozed.set(P().deck[key], SNOOZE);
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

// Leçons de vocabulaire qui contiennent des mots d'une catégorie (les leçons « variées » comptent
// pour chacun de leurs thèmes).
const themeUnits = (idx, cat) => (idx.units || []).filter((u) => (!wordFilter.lv || legalMode() || u.lv === wordFilter.lv)
  && u.ids.some((r) => r.startsWith(`${cat}/`)));

async function wordsHome() {
  const idx = await loadIndex();
  render(`
    ${topbar()}
    <div class="screen-title"><h1>${legalMode() ? "Vocabulaire juridique" : "Banque de mots"}</h1><span class="pill">${icon("book")}${idx.total}</span></div>
    ${legalMode() ? "" : `<button class="tile cine-tile" id="cine">
      <div class="tile-icon">${icon("film")}</div>
      <div><b>Ciné et séries</b><span>Le vocabulaire à connaître avant de regarder</span></div>
      <span class="go">${icon("chevron")}</span></button>`}
    <label class="searchbox">${icon("search")}<input id="q" type="search" placeholder="Chercher un mot (anglais ou français)" value="${esc(wordFilter.q)}" autocomplete="off"></label>
    ${lvChips(idx)}
    <div id="results"></div>
    <div class="catgrid" id="cats">${idx.categories.map((c) => {
      const n = wordFilter.lv ? c.levels[wordFilter.lv] : c.count;
      const us = themeUnits(idx, c.id), d = us.filter((u) => P().done[u.id]).length;
      return `<button class="catcard" data-cat="${c.id}" ${n ? "" : "disabled"}>
        <span class="caticon">${icon(ICONS[c.icon] ? c.icon : "book")}</span>
        <b>${esc(c.name)}</b><span>${n} mot${n > 1 ? "s" : ""}${us.length ? ` · ${d}/${us.length} leçon${us.length > 1 ? "s" : ""}` : ""}</span>
        ${us.length ? `<i class="cat-meter"><i style="width:${(d / us.length) * 100}%"></i></i>` : ""}</button>`;
    }).join("")}</div>
  `, { nav: "words" });
  root.querySelectorAll(".catcard").forEach((b) => (b.onclick = () => category(b.dataset.cat)));
  root.querySelector("#cine")?.addEventListener("click", cinema);
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
  const units = themeUnits(idx, id);
  const nDone = units.filter((u) => P().done[u.id]).length;
  const nextU = units.find((u) => !P().done[u.id]);
  const themeRow = (u) => {
    const d = P().done[u.id], nx = nextU && nextU.id === u.id;
    const mine = u.ids.filter((r) => r.startsWith(`${id}/`)).length;
    return `<button class="ch-row ${d ? "done" : nx ? "next" : ""}" data-id="${u.id}" data-lv="${u.lv}">
      <span class="ch-ic vocab">${icon(d ? "check" : "cards")}</span>
      <span class="ch-txt"><small>${u.lv} · ${mine === u.ids.length ? `${mine} mots` : `${mine} mot${mine > 1 ? "s" : ""} de ce thème sur ${u.ids.length}`}</small><b>${esc(u.title)}</b></span>
      ${nx ? `<span class="ch-go">${icon("play")}</span>` : ""}</button>`;
  };
  render(`
    <div class="ex-top"><button class="icon-btn" id="back" aria-label="Retour">${icon("back")}</button></div>
    <section class="cat-hero">
      <span class="caticon big">${icon(ICONS[c.icon] ? c.icon : "book")}</span>
      <h1>${esc(c.name)}</h1><p>${esc(c.desc)}</p>
      <div class="meta"><span>${icon("book")}${list.length} mots${wordFilter.lv ? ` · niveau ${wordFilter.lv}` : ""}</span>
        <span>${icon("check")}${list.length - todo.length} dans mes cartes</span></div>
      ${todo.length ? `<button class="hero-link" id="all">${icon("plus")}Ajouter les ${todo.length} mot${todo.length > 1 ? "s" : ""} à mes cartes sans leçon</button>` : ""}
    </section>
    ${units.length ? `<h4 class="section-title">${icon("cards")}Leçons de ce thème · ${nDone}/${units.length}</h4>
      <div class="theme-lessons">${units.map(themeRow).join("")}</div>` : ""}
    <h4 class="section-title">${icon("book")}Tous les mots</h4>
    <div class="wlist">${list.map(wordRow).join("")}</div>
    ${nextU ? `<div class="dock"><button class="btn" id="next-u">${icon("play")}${nDone ? "Leçon suivante de ce thème" : "Commencer ce thème"}</button></div>` : ""}
  `);
  root.querySelector("#back").onclick = wordsHome;
  const back = () => category(id);
  root.querySelectorAll(".theme-lessons .ch-row").forEach((b) => (b.onclick = () => lesson(b.dataset.id, back)));
  root.querySelector("#next-u")?.addEventListener("click", () => lesson(nextU.id, back));
  bindRows(list);
  const all = root.querySelector("#all");
  if (all) all.onclick = () => {
    todo.forEach(addWord);
    save();
    buzz([15, 40, 15]);
    category(id);
  };
}

// ---------- Écouter et lire ----------
// Dialogues et textes gradués : écoute (voix de synthèse, une voix par personnage si possible),
// texte masqué au départ, mots difficiles traduits d'un toucher, puis questions de compréhension.
const readWords = (r) => r.lines.map((l) => (Array.isArray(l) ? l[1] : l)).join(" ").split(/\s+/).length;

function readingList() {
  stopReading();
  const reads = state.reads || {};
  const lvls = [...new Set(READINGS.map((r) => r.lv))];
  render(`
    <div class="ex-top"><button class="icon-btn" id="back" aria-label="Retour">${icon("back")}</button></div>
    <div class="screen-title"><h1>Écouter et lire</h1><span class="pill">${icon("headphones")}${Object.keys(reads).length}/${READINGS.length}</span></div>
    <p class="lead">Écoute d'abord sans le texte, puis lis-le en touchant les mots soulignés pour les traduire. Termine par les questions de compréhension.</p>
    ${lvls.map((lv) => `
      <h4 class="section-title">Niveau ${lv}</h4>
      <div class="rlist">${READINGS.filter((r) => r.lv === lv).map((r) => `
        <button class="rcard" data-r="${r.id}" data-lv="${r.lv}">
          <span class="rcard-ic">${icon(reads[r.id] != null ? "check" : r.kind === "dialogue" ? "chat" : "book")}</span>
          <span class="ch-txt"><small>${r.kind === "dialogue" ? "Dialogue" : "Texte"} · ${readWords(r)} mots${reads[r.id] != null ? ` · ${reads[r.id]}/${r.questions.length}` : ""}</small>
            <b>${esc(r.title)}</b><span class="rcard-intro">${esc(r.intro)}</span></span>
        </button>`).join("")}</div>`).join("")}
  `);
  root.querySelector("#back").onclick = home;
  root.querySelectorAll(".rcard").forEach((b) => (b.onclick = () => readingView(READINGS.find((r) => r.id === b.dataset.r))));
}

// Repère les mots du glossaire dans une ligne (expressions les plus longues d'abord).
function glossHtml(text, gloss) {
  const keys = Object.keys(gloss).sort((a, b) => b.length - a.length).map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(?<![\\w'])(${keys.join("|")})(?![\\w'])`, "gi");
  return esc(text).replace(re, (m) => `<button class="gl" data-g="${m.toLowerCase()}">${m}</button>`);
}

let reading = null; // lecture en cours (pour pouvoir l'arrêter)
function stopReading() {
  reading = null;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}
function readingVoices() {
  const all = "speechSynthesis" in window ? speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang)) : [];
  return [...all.filter((v) => /GB/i.test(v.lang)), ...all.filter((v) => !/GB/i.test(v.lang))];
}
// Lit les lignes à partir de « from », en surlignant la ligne en cours.
function playLines(r, from, rate, onLine, onDone) {
  if (!("speechSynthesis" in window)) return onDone();
  speechSynthesis.cancel();
  const token = (reading = {});
  const voices = readingVoices();
  const who = [...new Set(r.lines.filter(Array.isArray).map((l) => l[0]))];
  const step = (i) => {
    if (reading !== token) return;
    if (i >= r.lines.length) { reading = null; return onDone(); }
    const line = r.lines[i];
    const u = new SpeechSynthesisUtterance(Array.isArray(line) ? line[1] : line);
    u.lang = "en-GB";
    u.rate = rate;
    if (Array.isArray(line)) {
      const k = who.indexOf(line[0]);
      if (voices.length > 1) u.voice = voices[k % voices.length];
      else u.pitch = k % 2 ? 1.25 : 0.9;
    } else if (voices.length) u.voice = voices[0];
    u.onstart = () => onLine(i);
    u.onend = () => step(i + 1);
    u.onerror = () => step(i + 1);
    speechSynthesis.speak(u);
  };
  step(from);
}

function readingView(r, show = false) {
  stopReading();
  const reads = state.reads || {};
  let rate = 0.95;
  render(`
    <div class="ex-top"><button class="icon-btn" id="back" aria-label="Retour">${icon("back")}</button></div>
    <section class="lesson-hero" data-lv="${r.lv}">
      <span class="chip">${r.lv} · ${r.kind === "dialogue" ? "Dialogue" : "Texte"}</span>
      <h1>${esc(r.title)}</h1>
      <div class="meta"><span>${icon("clock")}${Math.max(2, Math.round(readWords(r) / 60))} min</span>
        <span>${icon("book")}${readWords(r)} mots</span><span>${icon("list")}${r.questions.length} questions</span></div>
    </section>
    <div class="tip">${esc(r.intro)}</div>
    <div class="read-ctrl">
      <button class="btn lv" id="play">${icon("play")}Tout écouter</button>
      <button class="speed" id="speed" aria-label="Vitesse">1×</button>
    </div>
    <div class="read-text ${show ? "" : "masked"}" id="text" data-lv="${r.lv}">
      ${r.lines.map((l, i) => `<p class="rline" data-i="${i}">${Array.isArray(l) ? `<span class="who">${esc(l[0])}</span>` : ""}
        <span class="rl">${glossHtml(Array.isArray(l) ? l[1] : l, r.gloss)}</span>
        <button class="say mini" data-i="${i}" aria-label="Écouter cette ligne">${icon("sound")}</button></p>`).join("")}
      <div class="mask"><p>Écoute d'abord sans lire : tu comprends plus que tu ne crois.</p>
        <button class="btn ghost" id="reveal">${icon("eye")}Afficher le texte</button></div>
    </div>
    <div class="gl-pop" id="pop" hidden></div>
    <div class="dock"><button class="btn" id="quiz">${icon("target")}${reads[r.id] != null ? `Refaire les questions (${reads[r.id]}/${r.questions.length})` : "Répondre aux questions"}</button></div>
  `, { lv: r.lv });
  const text = root.querySelector("#text");
  const play = root.querySelector("#play");
  const pop = root.querySelector("#pop");
  const mark = (i) => text.querySelectorAll(".rline").forEach((p) => p.classList.toggle("on", +p.dataset.i === i));
  const idle = () => { play.innerHTML = `${icon("play")}Tout écouter`; mark(-1); };
  root.querySelector("#back").onclick = readingList;
  root.querySelector("#reveal").onclick = () => text.classList.remove("masked");
  root.querySelector("#speed").onclick = (e) => {
    rate = rate > 0.9 ? 0.75 : 0.95;
    e.currentTarget.textContent = rate > 0.9 ? "1×" : "Lent";
  };
  play.onclick = () => {
    if (reading) { stopReading(); return idle(); }
    play.innerHTML = `${icon("stop")}Arrêter`;
    playLines(r, 0, rate, mark, idle);
  };
  text.querySelectorAll(".say.mini").forEach((b) => (b.onclick = () => { stopReading(); idle(); speak(Array.isArray(r.lines[+b.dataset.i]) ? r.lines[+b.dataset.i][1] : r.lines[+b.dataset.i]); }));
  text.querySelectorAll(".gl").forEach((b) => (b.onclick = () => {
    const fr = r.gloss[b.dataset.g], en = b.dataset.g.replace(/\bi\b/g, "I");
    const has = !!state.deck[en];
    pop.hidden = false;
    pop.innerHTML = `<div><b>${esc(b.textContent)}</b><span>${esc(fr)}</span></div>
      <button class="say" id="pop-say" aria-label="Écouter">${icon("sound")}</button>
      <button class="pop-add" id="pop-add" ${has ? "disabled" : ""}>${icon(has ? "check" : "plus")}${has ? "Dans mes cartes" : "Ajouter"}</button>
      <button class="icon-btn" id="pop-x" aria-label="Fermer">${icon("x")}</button>`;
    pop.querySelector("#pop-say").onclick = () => speak(en);
    pop.querySelector("#pop-x").onclick = () => (pop.hidden = true);
    pop.querySelector("#pop-add").onclick = (e) => {
      state.deck[en] = newCard(fr, en, "");
      save();
      e.currentTarget.disabled = true;
      e.currentTarget.innerHTML = `${icon("check")}Dans mes cartes`;
    };
  }));
  root.querySelector("#quiz").onclick = () => {
    stopReading();
    exercise({
      id: r.id, title: r.title, lv: { id: r.lv },
      exercises: r.questions.map((q) => ({ type: "qcm", ...q })),
      onQuit: () => readingView(r, true),
      onEnd: (score) => {
        const first = (state.reads ||= {})[r.id] == null;
        state.reads[r.id] = Math.max(score, state.reads[r.id] || 0);
        addXp(first ? 10 + score * 5 : score * 2);
        render(`
          <canvas id="confetti"></canvas>
          <div class="done-screen">
            <div class="trophy">${icon("headphones")}</div>
            <h1>${score === r.questions.length ? "Tout compris !" : "Bien joué !"}</h1>
            <p>${esc(r.title)} · ${score}/${r.questions.length} bonnes réponses</p>
          </div>
          <div class="dock"><button class="btn" id="h">Retour aux textes</button></div>
        `);
        if (score / r.questions.length >= 0.75) confetti(root.querySelector("#confetti"));
        root.querySelector("#h").onclick = readingList;
      },
    }, 0, 0);
  };
}

// ---------- Ciné et séries ----------
const filmWords = (f) => f.themes.flatMap((t) => t.words.map(([en, fr, ex]) => ({ id: `${f.id}-${en}`, en, fr, ex, lv: f.level })));

function cinema() {
  render(`
    ${topbar()}
    <div class="screen-title"><h1>Ciné et séries</h1><span class="pill">${icon("film")}${FILMS.length}</span></div>
    <p class="muted">Apprends le vocabulaire d'un film ou d'une série avant de le regarder en VO : tu suivras l'histoire au lieu de décrocher.</p>
    <div class="film-grid">${FILMS.map((f, i) => {
      const words = filmWords(f);
      const known = words.filter(inDeck).length;
      return `<button class="film-card" data-id="${f.id}" style="--h:${(i * 37) % 360}">
        <span class="film-kind">${f.kind} · ${f.year}</span>
        <b>${esc(f.title)}</b>
        <span class="film-meta">${f.level} · ${esc(f.accent)}</span>
        <span class="film-meta">${words.length} mots${known ? ` · ${known} appris` : ""}</span>
      </button>`;
    }).join("")}</div>
  `, { nav: "words" });
  root.querySelectorAll(".film-card").forEach((b) => (b.onclick = () => filmView(FILMS.find((f) => f.id === b.dataset.id))));
}

function filmView(f) {
  const words = filmWords(f);
  const todo = words.filter((w) => !inDeck(w));
  let k = 0;
  render(`
    <div class="ex-top"><button class="icon-btn" id="back" aria-label="Retour">${icon("back")}</button></div>
    <section class="film-hero" style="--h:${(FILMS.indexOf(f) * 37) % 360}">
      <span class="chip">${f.kind} · ${f.year} · ${esc(f.by)}</span>
      <h1>${esc(f.title)}</h1>
      <div class="meta"><span>${icon("target")}Niveau ${f.level}</span><span>${icon("sound")}${esc(f.accent)}</span><span>${icon("book")}${words.length} mots</span></div>
    </section>
    <h4 class="section-title">${icon("play")}L'histoire (sans spoiler)</h4>
    <div class="tip">${esc(f.pitch)}</div>
    ${f.themes.map((t) => `
      <h4 class="section-title">${icon("list")}${esc(t.name)}</h4>
      <div class="wlist">${t.words.map(() => wordRow(words[k++])).join("")}</div>`).join("")}
    <p class="muted small center-text">Vocabulaire du film et de son univers : chaque mot n'est pas forcément prononcé tel quel.</p>
    <div class="dock"><div class="row2">
      <button class="btn ghost" id="all" ${todo.length ? "" : "disabled"}>${todo.length ? `${icon("plus")}${todo.length}` : icon("check")}</button>
      <button class="btn" id="quiz">${icon("target")}Suis-je prêt ?</button>
    </div></div>
  `);
  root.querySelector("#back").onclick = cinema;
  bindRows(words);
  root.querySelector("#all").onclick = () => { todo.forEach(addWord); save(); buzz([15, 40, 15]); filmView(f); };
  root.querySelector("#quiz").onclick = () => filmQuiz(f);
}

// Quiz avant le film : 8 questions, du français vers l'anglais.
function filmQuiz(f) {
  const words = filmWords(f);
  const items = shuffle(words).slice(0, 8).map((w) => ({
    w, choices: shuffle([w, ...shuffle(words.filter((x) => x !== w)).slice(0, 3)]),
  }));
  const step = (i, score) => {
    if (i >= items.length) {
      addXp(5 + score * 2);
      render(`
        <canvas id="confetti"></canvas>
        <div class="done-screen">
          <div class="trophy">${icon("film")}</div>
          <h1>${score} / ${items.length}</h1>
          <p>${score >= 7 ? `Tu es prêt pour ${esc(f.title)}. Bon film en VO !` : "Encore un peu de révision : les mots ratés sont dans tes cartes."}</p>
        </div>
        <div class="dock"><div class="row2"><button class="btn ghost" id="h">Retour</button><button class="btn" id="again">Recommencer</button></div></div>`);
      if (score >= 7) confetti(root.querySelector("#confetti"));
      root.querySelector("#h").onclick = () => filmView(f);
      root.querySelector("#again").onclick = () => filmQuiz(f);
      return;
    }
    const it = items[i];
    render(`
      <div class="ex-top"><button class="icon-btn" id="quit" aria-label="Quitter">${icon("x")}</button>
        <div class="bar"><i style="width:${(i / items.length) * 100}%"></i></div></div>
      <span class="ex-kind">${icon("film")}${esc(f.title)}</span>
      <p class="q">Comment dit-on «\u00a0${esc(it.w.fr)}\u00a0»\u00a0?</p>
      <div class="choices">${it.choices.map((c, j) => `<button class="choice" data-j="${j}"><span class="k">${"ABCD"[j]}</span>${esc(c.en)}</button>`).join("")}</div>`);
    root.querySelector("#quit").onclick = () => filmView(f);
    root.querySelectorAll(".choice").forEach((b) => (b.onclick = () => {
      const ok = it.choices[+b.dataset.j] === it.w;
      b.classList.add(ok ? "right" : "wrong");
      if (!ok) {
        root.querySelector(`.choice[data-j="${it.choices.indexOf(it.w)}"]`).classList.add("right");
        addWord(it.w);
        save();
      }
      speak(it.w.en);
      drillSheet(ok, it.w.en, it.w.ex, () => step(i + 1, score + (ok ? 1 : 0)));
    }));
  };
  step(0, 0);
}

// ---------- Test de niveau ----------
function placementIntro() {
  render(`
    <div class="ex-top"><button class="icon-btn" id="back" aria-label="Retour">${icon("back")}</button></div>
    <section class="lesson-hero" data-lv="B1">
      <span class="chip">Test adaptatif · A1 à C2</span>
      <h1>Quel est ton niveau d'anglais ?</h1>
      <div class="meta"><span>${icon("clock")}10 à 15 min</span><span>${icon("list")}16 à 34 questions</span></div>
    </section>
    <h4 class="section-title">${icon("sound")}Peux-tu écouter de l'audio maintenant ?</h4>
    <div class="tip">Avec le son, le test inclut des questions de compréhension orale. Sans le son, elles sont remplacées par davantage de questions écrites, pour un résultat aussi fiable.</div>
    <h4 class="section-title">${icon("bulb")}Comment ça marche</h4>
    <div class="tip">Chaque réponse affine l'estimation de ton niveau : les questions s'adaptent et deviennent plus faciles ou plus difficiles.
      Le test porte sur <b>la grammaire, le vocabulaire, la compréhension écrite</b> et, si tu as le son, <b>la compréhension orale</b>.
      <br><br><b>Ne devine pas :</b> si tu ne sais pas, touche « Je ne sais pas ». Répondre au hasard fausse le résultat.</div>
    <h4 class="section-title">${icon("alert")}Ce que le test ne mesure pas</h4>
    <div class="tip">L'expression orale et écrite. Ce n'est pas une certification officielle (TOEIC, IELTS, Cambridge) : c'est une estimation fiable pour choisir ton point de départ.</div>
    <div class="dock"><div class="row2">
      <button class="btn ghost" id="go-noaudio">Non</button>
      <button class="btn" id="go">${icon("sound")}Oui, je peux écouter</button>
    </div></div>
  `);
  root.querySelector("#back").onclick = home;
  const start = (noAudio) => {
    const used = new Set();
    if (noAudio) PT.ITEMS.filter((it) => it.skill === "listening").forEach((it) => used.add(it.id));
    placementStep({ post: Array(6).fill(1 / 6), used, skills: [], answers: [], noAudio, lim: noAudio ? PT.LIMITS.noAudio : PT.LIMITS.audio });
  };
  // Sans synthèse vocale sur l'appareil, le test part directement sans écoute.
  root.querySelector("#go").onclick = () => start(!("speechSynthesis" in window));
  root.querySelector("#go-noaudio").onclick = () => start(true);
}

function placementStep(t) {
  if (PT.done(t.post, t.answers.length, t.lim)) return placementResult(t);
  const it = PT.pickNext(t.post, t.used, t.skills);
  if (!it) return placementResult(t);
  const n = t.answers.length;
  render(`
    <div class="ex-top">
      <button class="icon-btn" id="quit" aria-label="Quitter">${icon("x")}</button>
      <div class="bar"><i style="width:${Math.min(95, (n / (t.noAudio ? 27 : 22)) * 100)}%"></i></div>
    </div>
    <span class="ex-kind">${icon(it.skill === "listening" ? "sound" : it.skill === "reading" ? "book" : it.skill === "vocab" ? "list" : "pen")}${PT.SKILLS[it.skill]} · question ${n + 1}</span>
    ${it.text ? `<div class="paper test-text">${esc(it.text)}</div>` : ""}
    ${it.audio ? `<button class="say big-say" id="play">${icon("sound")}Écouter (2 fois max.)</button>` : ""}
    <p class="q">${esc(it.q)}</p>
    <div class="choices">${it.choices.map((c, k) => `<button class="choice" data-k="${k}"><span class="k">${"ABCD"[k]}</span>${esc(c)}</button>`).join("")}</div>
    <button class="btn ghost dunno" id="dunno">Je ne sais pas</button>
    ${it.audio ? `<button class="linklike no-audio" id="noaudio">${icon("x")}Je ne peux pas écouter</button>` : ""}
  `);
  let plays = 0;
  const play = () => { if (plays < 2) { plays++; speak(it.audio); } if (plays >= 2) root.querySelector("#play").disabled = true; };
  if (it.audio) { root.querySelector("#play").onclick = play; setTimeout(play, 400); }
  const answer = (outcome) => {
    t.used.add(it.id);
    t.skills.push(it.skill);
    t.answers.push({ id: it.id, skill: it.skill, lv: it.lv, outcome });
    t.post = PT.update(t.post, it, outcome);
    placementStep(t);
  };
  root.querySelectorAll(".choice").forEach((b) => (b.onclick = () => answer(+b.dataset.k === it.answer ? "right" : "wrong")));
  root.querySelector("#dunno").onclick = () => answer("unknown");
  // Sans écoute possible : la question n'est pas comptée et l'oral est retiré du reste du test.
  root.querySelector("#noaudio")?.addEventListener("click", () => {
    speechSynthesis.cancel();
    t.noAudio = true;
    t.lim = PT.LIMITS.noAudio;
    PT.ITEMS.filter((x) => x.skill === "listening").forEach((x) => t.used.add(x.id));
    placementStep(t);
  });
  root.querySelector("#quit").onclick = () => { if (confirm("Abandonner le test ?")) home(); };
}

function placementResult(t) {
  const i = PT.best(t.post);
  const level = PT.LEVEL_NAMES[i];
  const conf = Math.round(t.post[i] * 100);
  // Niveau voisin le plus probable, pour situer le candidat entre deux niveaux.
  const neighbours = [i - 1, i + 1].filter((j) => j >= 0 && j < 6).sort((a, b) => t.post[b] - t.post[a]);
  const near = neighbours.length && t.post[neighbours[0]] >= 0.15 ? PT.LEVEL_NAMES[neighbours[0]] : null;
  const bySkill = Object.keys(PT.SKILLS).map((k) => {
    const a = t.answers.filter((x) => x.skill === k);
    return { k, n: a.length, ok: a.filter((x) => x.outcome === "right").length };
  }).filter((x) => x.n);
  state.placement = { level, conf, date: dayKey(), noAudio: Boolean(t.noAudio) };
  addXp(10);
  render(`
    <canvas id="confetti"></canvas>
    <div class="done-screen">
      <div class="trophy level-badge" data-lv="${level}"><span>${level}</span></div>
      <h1>Ton niveau : ${level}</h1>
      <p>${esc(PT.LEVEL_INFO[level])}</p>
      <p class="muted small">Confiance de l'estimation : ${conf} %${near ? ` · proche du niveau ${near}` : ""} · ${t.answers.length} questions</p>
    </div>
    <h4 class="section-title">${icon("chart")}Par compétence</h4>
    <div class="levels">${bySkill.map((x) => `
      <div class="lvrow"><div><b>${PT.SKILLS[x.k]}</b>
        <div class="meter"><i style="width:${(x.ok / x.n) * 100}%"></i></div></div><em>${x.ok}/${x.n}</em></div>`).join("")}</div>
    ${t.noAudio ? `<p class="muted small center-text">Compréhension orale non évaluée : le niveau est calculé sur la grammaire, le vocabulaire et la compréhension écrite.</p>` : ""}
    <p class="muted small center-text">Les questions s'adaptent à ton niveau : un score par compétence se lit en comparant les compétences entre elles.</p>
    <div class="dock"><div class="row2"><button class="btn ghost" id="h">Plus tard</button><button class="btn" id="start">Commencer en ${level}</button></div></div>
  `);
  if (conf >= 60) confetti(root.querySelector("#confetti"));
  root.querySelector("#h").onclick = home;
  root.querySelector("#start").onclick = () => {
    // Les leçons des niveaux inférieurs sont marquées comme acquises (sans ajouter leurs mots aux cartes).
    levels().slice(0, i).forEach((lv) => lv.lessons.forEach((l) => (state.done[l.id] = true)));
    save();
    home();
  };
}

// ---------- Profil ----------
function profile() {
  const cards = Object.values(P().deck);
  const mastered = cards.filter((c) => c.interval >= 21).length;
  const waiting = cards.filter(isNew).length;
  const doneCount = Object.keys(P().done).length;
  const current = (nextLesson() || allLessons()[allLessons().length - 1]).lv;
  const kpi = (ic, c, v, label) => `<div class="kpi"><div class="ico" style="--c:${c}">${icon(ic)}</div><b>${v}</b><span>${label}</span></div>`;
  const modeBtn = (id, title, sub) => `<button class="mode-opt ${state.mode === id ? "on" : ""}" data-mode="${id}">
    <b>${title}</b><span>${sub}</span></button>`;
  render(`
    ${topbar()}
    <div class="profile-head">
      <div class="avatar">${current.id}</div>
      <div><h1>Mon parcours</h1><p>${legalMode() ? "Module en cours" : "Niveau actuel"} : ${current.id} · ${esc(current.name.split(" — ")[0])}</p>
        ${!legalMode() && state.placement ? `<p class="muted small">Test de niveau : ${state.placement.level} (${state.placement.conf} %) · <button class="linklike" id="retest">refaire</button></p>` : ""}</div>
    </div>
    <h4 class="section-title">${icon("split")}Mode d'apprentissage</h4>
    <div class="mode-switch">
      ${modeBtn("general", "Anglais général", "Du débutant au niveau courant")}
      ${modeBtn("legal", "Anglais juridique · CRFPA", "Préparer l'oral d'anglais")}
    </div>
    <h4 class="section-title">${icon("cards")}Nouvelles cartes par jour</h4>
    <div class="pace">${PACES.map((n) => `<button class="pace-opt ${n === newPerDay() ? "on" : ""}" data-pace="${n}">
      <b>${n}</b><span>≈ ${paceMinutes(n)} min/j</span></button>`).join("")}</div>
    <p class="pace-note">${waiting ? `${waiting} nouvelle${waiting > 1 ? "s" : ""} carte${waiting > 1 ? "s" : ""} en attente : environ ${Math.ceil(waiting / newPerDay())} jour${Math.ceil(waiting / newPerDay()) > 1 ? "s" : ""} à ce rythme. ` : ""}Temps de révision estimé par jour, une fois le rythme installé (après 2 à 3 semaines).</p>
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
    <h4 class="section-title">${icon("download")}Sauvegarde</h4>
    <div class="backup">
      <p>Ta progression est enregistrée <b>sur cet appareil uniquement</b>. Télécharge une sauvegarde pour la retrouver
        sur un autre appareil ou après avoir vidé ton navigateur.</p>
      <p class="muted small">${state.lastBackup ? `Dernière sauvegarde : ${new Date(state.lastBackup).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}` : "Aucune sauvegarde pour l'instant."}</p>
      <div class="backup-btns">
        <button class="btn" id="export">${icon("download")}Télécharger</button>
        <button class="btn ghost" id="import">${icon("upload")}Restaurer</button>
        <input type="file" id="import-file" accept=".json,application/json" hidden>
      </div>
    </div>
    <button class="link-danger" id="reset">Réinitialiser ma progression (${legalMode() ? "mode CRFPA" : "anglais général"})</button>
  `, { nav: "profile" });
  root.querySelector("#retest")?.addEventListener("click", placementIntro);
  root.querySelector("#export").onclick = async () => { await exportProgress(); profile(); };
  const file = root.querySelector("#import-file");
  root.querySelector("#import").onclick = () => file.click();
  file.onchange = () => file.files[0] && importProgress(file.files[0], home);
  root.querySelectorAll("[data-pace]").forEach((b) => (b.onclick = () => {
    state.newPerDay = +b.dataset.pace;
    save();
    buzz(15);
    const y = window.scrollY;
    profile();
    window.scrollTo(0, y);
  }));
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
    Object.assign(P(), { done: {}, deck: {}, newDay: null, newSeen: 0, mistakes: {} });
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
      const r = check(input.value, [it.w.en], bare);
      const ok = r.ok;
      const had = inDeck(it.w);
      root.querySelector(".dock").remove();
      speak(it.w.en);
      if (!ok) miss(it.w);
      // « J'avais bon » retire la carte seulement si cet exercice vient de l'ajouter.
      const accept = () => { if (!had) { delete P().deck[cardKey(it.w)]; save(); } next(true); };
      drillSheet(ok, it.w.en, it.w.ex, () => next(ok), ok ? null : accept, r.fixes);
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
      const res = check(input.value, it.right);
      const ok = res.ok;
      root.querySelector(".dock").remove();
      speak(it.right[0]);
      const had = Boolean(P().deck[key]);
      if (!ok && !had) { P().deck[key] = newCard(`Corrige : « ${it.wrong} »`, it.right[0], it.rule); save(); }
      const accept = () => { if (!had) { delete P().deck[key]; save(); } next(true); };
      drillSheet(ok, ok ? res.answer : it.right[0], it.rule, () => next(ok), ok ? null : accept, res.fixes);
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
function drillSheet(ok, answer, example, onNext, accept = null, fixes = []) {
  buzz(ok ? 15 : [30, 40, 30]);
  root.querySelectorAll(".choice, #ans, #mic").forEach((e) => (e.disabled = true));
  const sheet = document.createElement("div");
  sheet.className = `sheet ${ok ? "ok" : "ko"}`;
  sheet.innerHTML = `<div>
    <h3><span class="badge">${icon(ok ? "check" : "x")}</span>${ok ? (fixes.length ? "Presque parfait !" : "Exact !") : "La réponse attendue"}</h3>
    <p><b>${esc(answer)}</b>${fixes.length ? `<i class="sheet-ex">Attention à l'orthographe : ${esc(fixesText(fixes))}</i>` : ""}${example ? `<i class="sheet-ex">${esc(example)}</i>` : ""}</p>
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
// Le parcours a besoin du découpage en leçons de vocabulaire : on charge les deux index d'abord.
const loadAllIndexes = () => Promise.all(["general", "legal"].map(async (m) => {
  if (!banks[m].index) banks[m].index = await (await fetch(`${m === "legal" ? "words-legal" : "words"}/index.json`)).json();
}));
loadAllIndexes().catch(() => {}).finally(home);
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});

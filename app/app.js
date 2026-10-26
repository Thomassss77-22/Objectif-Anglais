import { LEVELS } from "./data.js";
import { newCard, review, dueCards } from "./srs.js";

const KEY = "objectif-anglais-v1";
const view = document.getElementById("view");

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}
const state = Object.assign({ done: {}, deck: {}, xp: 0, streak: 0, lastDay: null }, load());
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

const today = () => new Date().toISOString().slice(0, 10);
function touchStreak() {
  const t = today();
  if (state.lastDay === t) return;
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  state.streak = state.lastDay === y ? state.streak + 1 : 1;
  state.lastDay = t;
}

// Compare des réponses en ignorant ponctuation, casse et contractions (I'm = I am).
const CONTRACTIONS = { "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is", "it's": "it is",
  "we're": "we are", "they're": "they are", "i've": "i have", "you've": "you have", "we've": "we have",
  "they've": "they have", "i'd": "i would", "i'll": "i will", "you'll": "you will", "don't": "do not",
  "doesn't": "does not", "didn't": "did not", "can't": "cannot", "won't": "will not", "isn't": "is not",
  "aren't": "are not", "haven't": "have not", "hasn't": "has not", "wouldn't": "would not", "let's": "let us",
  "what's": "what is", "that's": "that is", "there's": "there is" };
const norm = (s) => s.toLowerCase().replace(/’/g, "'").replace(/[.,!?;:]/g, " ").trim().split(/\s+/)
  .map((w) => CONTRACTIONS[w] || w).join(" ").replace(/\bcan not\b/g, "cannot");
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-GB";
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// Reconnaissance vocale (Chrome, Edge, Safari). Sinon, on tape la réponse.
const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
function listen(btn, done) {
  const r = new Rec();
  r.lang = "en-US";
  r.interimResults = false;
  btn.textContent = "👂 J'écoute…";
  r.onresult = (e) => done(e.results[0][0].transcript);
  r.onend = () => (btn.textContent = "🎤 Parler");
  r.onerror = () => (btn.textContent = "🎤 Réessayer");
  r.start();
}

function header() {
  document.getElementById("stats").textContent = `🔥 ${state.streak}  ⭐ ${state.xp} XP  🃏 ${dueCards(state.deck).length}`;
}

// ---------- Accueil ----------
function home() {
  header();
  const due = dueCards(state.deck).length;
  view.innerHTML = `
    <button class="big" id="rev" ${due ? "" : "disabled"}>Réviser mes cartes (${due})</button>
    ${LEVELS.map((lv) => `
      <section class="level">
        <h2><span class="badge">${lv.id}</span> ${lv.name}</h2>
        ${lv.lessons.map((l) => `
          <button class="lesson ${state.done[l.id] ? "done" : ""}" data-id="${l.id}">
            ${state.done[l.id] ? "✅" : "📘"} ${l.title}
          </button>`).join("")}
      </section>`).join("")}`;
  view.querySelector("#rev").onclick = reviewSession;
  view.querySelectorAll(".lesson").forEach((b) => (b.onclick = () => lesson(b.dataset.id)));
}

// ---------- Leçon ----------
function findLesson(id) {
  for (const lv of LEVELS) for (const l of lv.lessons) if (l.id === id) return l;
}

function lesson(id) {
  const l = findLesson(id);
  view.innerHTML = `
    <button class="back">← Retour</button>
    <h2>${l.title}</h2>
    <div class="tip">${l.tip}</div>
    <h3>Vocabulaire</h3>
    <ul class="words">${l.words.map(([fr, en]) => `
      <li><span>${fr}</span><button class="say" data-en="${esc(en)}">🔊 ${en}</button></li>`).join("")}
    </ul>
    <button class="big" id="go">Commencer les exercices</button>`;
  view.querySelector(".back").onclick = home;
  view.querySelectorAll(".say").forEach((b) => (b.onclick = () => speak(b.dataset.en)));
  view.querySelector("#go").onclick = () => exercise(l, 0, 0);
}

function exercise(l, i, score) {
  if (i >= l.exercises.length) return finish(l, score);
  const ex = l.exercises[i];
  const body = ex.type === "qcm"
    ? ex.choices.map((c, k) => `<button class="choice" data-k="${k}">${esc(c)}</button>`).join("")
    : `${ex.type === "speak" ? `<p class="hint">🗣️ Dis-le à voix haute, puis vérifie.</p>${Rec ? `<button class="big mic" id="mic">🎤 Parler</button>` : ""}` : ""}
       <input id="ans" autocomplete="off" autocapitalize="off" placeholder="${ex.type === "speak" ? "Ce que tu as dit…" : "Écris en anglais…"}"><button class="big" id="ok">Valider</button>`;
  view.innerHTML = `
    <div class="progress"><div style="width:${(i / l.exercises.length) * 100}%"></div></div>
    <p class="q">${esc(ex.q)}</p>${body}<div id="fb"></div>`;

  const next = (good, correction) => {
    const fb = view.querySelector("#fb");
    fb.className = good ? "fb ok" : "fb ko";
    fb.innerHTML = `${good ? "Bravo !" : `Réponse : <b>${esc(correction)}</b>`}<button class="big" id="nx">Continuer</button>`;
    view.querySelectorAll("button.choice, #ok, #ans, #mic").forEach((e) => (e.disabled = true));
    fb.querySelector("#nx").onclick = () => exercise(l, i + 1, score + (good ? 1 : 0));
  };

  if (ex.type === "qcm") {
    view.querySelectorAll(".choice").forEach((b) => (b.onclick = () => {
      const good = +b.dataset.k === ex.answer;
      b.classList.add(good ? "right" : "wrong");
      next(good, ex.choices[ex.answer]);
    }));
  } else {
    const input = view.querySelector("#ans");
    input.focus();
    const submit = () => {
      next(ex.answers.map(norm).includes(norm(input.value)), ex.answers[0]);
      speak(ex.answers[0]);
    };
    const mic = view.querySelector("#mic");
    if (mic) mic.onclick = () => listen(mic, (text) => { input.value = text; submit(); });
    view.querySelector("#ok").onclick = submit;
    input.onkeydown = (e) => e.key === "Enter" && submit();
  }
}

function finish(l, score) {
  const first = !state.done[l.id];
  state.done[l.id] = true;
  state.xp += 10 + score * 5;
  for (const [fr, en] of l.words) if (!state.deck[en]) state.deck[en] = newCard(fr, en);
  touchStreak();
  save();
  header();
  view.innerHTML = `
    <h2>Leçon terminée 🎉</h2>
    <p>${score} / ${l.exercises.length} bonnes réponses · +${10 + score * 5} XP</p>
    ${first ? `<p>${l.words.length} mots ajoutés à tes cartes mémoire.</p>` : ""}
    <button class="big" id="h">Retour au parcours</button>`;
  view.querySelector("#h").onclick = home;
}

// ---------- Révision (cartes mémoire) ----------
function reviewSession() {
  const card = dueCards(state.deck).sort((a, b) => a.due - b.due)[0];
  if (!card) {
    view.innerHTML = `<h2>Tout est révisé ✅</h2><p>Reviens demain pour la suite.</p><button class="big" id="h">Retour</button>`;
    view.querySelector("#h").onclick = home;
    return;
  }
  header();
  view.innerHTML = `
    <button class="back">← Retour</button>
    <div class="card" id="card"><div class="front">${esc(card.fr)}</div><div class="hint">Touche pour retourner</div></div>
    <div id="grades"></div>`;
  view.querySelector(".back").onclick = home;
  const el = view.querySelector("#card");
  el.onclick = () => {
    el.innerHTML = `<div class="front">${esc(card.fr)}</div><div class="back-side">${esc(card.en)}</div>`;
    speak(card.en);
    el.onclick = null;
    const grades = [["Raté", 1], ["Difficile", 3], ["Bien", 4], ["Facile", 5]];
    view.querySelector("#grades").innerHTML = grades.map(([t, q]) => `<button class="grade g${q}" data-q="${q}">${t}</button>`).join("");
    view.querySelectorAll(".grade").forEach((b) => (b.onclick = () => {
      state.deck[card.en] = review(card, +b.dataset.q);
      state.xp += 1;
      touchStreak();
      save();
      reviewSession();
    }));
  };
}

home();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});

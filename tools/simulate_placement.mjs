// Valide le test de niveau par simulation : node tools/simulate_placement.mjs
// Candidats virtuels de chaque niveau ; la difficulté réelle des questions varie de ±0,5 niveau,
// et un candidat qui ne sait pas répond « je ne sais pas » une fois sur deux, sinon devine.
import { ITEMS, update, best, pickNext, done } from "../app/placement.js";
// Candidat simulé : niveau réel θ (1..6), difficulté réelle des questions = niveau annoncé ± 0,5.
const noise = Object.fromEntries(ITEMS.map((it) => [it.id, (Math.random() - 0.5)]));
const knows = (theta, b) => 1 / (1 + Math.exp(-(2 * (theta - b) + 1.1)));
// NOAUDIO=1 : candidats qui ne peuvent pas écouter (questions d'écoute retirées).
const noAudio = process.env.NOAUDIO === "1";
function run(theta) {
  let post = [1, 1, 1, 1, 1, 1].map((x) => x / 6); const used = new Set(); const skills = []; let n = 0;
  if (noAudio) ITEMS.filter((it) => it.skill === "listening").forEach((it) => used.add(it.id));
  while (!done(post, n)) {
    const it = pickNext(post, used, skills); used.add(it.id); skills.push(it.skill); n++;
    const b = it.lv + noise[it.id];
    let out;
    if (Math.random() < knows(theta, b) * 0.95) out = "right";
    else if (Math.random() < 0.5) out = "unknown";
    else out = Math.random() < 0.25 ? "right" : "wrong";
    post = update(post, it, out);
  }
  return { lv: best(post) + 1, n, conf: Math.max(...post) };
}
const N = 1000; let tot = 0, totExact = 0;
console.log("niveau réel | exact | à ±1 niveau | nb questions moyen");
for (let t = 1; t <= 6; t++) {
  let exact = 0, near = 0, len = 0;
  for (let k = 0; k < N; k++) { const r = run(t); if (r.lv === t) exact++; if (Math.abs(r.lv - t) <= 1) near++; len += r.n; }
  totExact += exact; tot += N;
  console.log(`${["A1","A2","B1","B2","C1","C2"][t-1]}          | ${(exact/N*100).toFixed(1)} % | ${(near/N*100).toFixed(1)} %     | ${(len/N).toFixed(1)}`);
}
console.log(`global exact : ${(totExact/tot*100).toFixed(1)} %`);

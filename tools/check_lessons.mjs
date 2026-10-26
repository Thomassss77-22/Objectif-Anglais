// Vérifie les leçons des deux parcours : node tools/check_lessons.mjs
import { LEVELS } from "../app/data.js";
import { LEGAL } from "../app/legal.js";
import { EXTRA } from "../app/lessons-extra.js";
let errors = 0;
const err = (m) => { errors++; console.log("ERREUR", m); };
for (const [name, levels] of [["général", LEVELS], ["CRFPA", LEGAL]]) {
  const ids = new Set();
  for (const lv of levels) for (const l of lv.lessons) {
    if (ids.has(l.id)) err(`${name} : id en double ${l.id}`); ids.add(l.id);
    if (!l.title || !l.tip || !l.words?.length || !l.exercises?.length) err(`${name} : leçon incomplète ${l.id}`);
    for (const w of l.words) if (w.length !== 2 || !w[0] || !w[1]) err(`${l.id} : mot mal formé ${w}`);
    for (const ex of l.exercises) {
      if (ex.type === "qcm" && !(ex.answer >= 0 && ex.answer < ex.choices.length)) err(`${l.id} : réponse QCM invalide`);
      if (ex.type !== "qcm" && !ex.answers?.length) err(`${l.id} : pas de réponse attendue`);
    }
  }
  console.log(`${name} : ${ids.size} leçons · ` + levels.map((lv) => `${lv.id} ${lv.lessons.length}`).join(" · "));
}
// Chaque « after » doit désigner une leçon existante, sinon l'insertion se fait en fin de niveau.
for (const [lv, list] of Object.entries(EXTRA)) for (const l of list)
  if (l.after && !LEVELS.find((x) => x.id === lv).lessons.some((x) => x.id === l.after)) err(`after inconnu : ${l.after}`);
process.exit(errors ? 1 : 0);

// Tests de la correction des réponses écrites (app/match.js). Lancer : npm test
// Chaque ligne : ce que l'utilisateur tape, les réponses attendues, et si ce doit être accepté.
import { check, norm } from "../app/match.js";

const CASES = [
  // Un seul terme d'une liste suffit.
  ["borrow", ["borrow / lend"], true],
  ["lend", ["borrow / lend"], true],
  ["borrow lend", ["borrow / lend"], true],
  ["steal", ["borrow / lend"], false],
  ["my lord", ["My Lord / My Lady"], true],
  ["the commentary", ["the analysis, the commentary"], true],
  ["analysis", ["the analysis, the commentary"], true],
  ["the analisis", ["the analysis, the commentary"], true],
  // Une phrase avec virgule n'est pas une liste : il faut la phrase entière.
  ["thank you", ["thank you, my friend"], false],
  ["the bill", ["the bill, please"], false],
  ["I am fine thanks", ["I'm fine, thanks"], true],
  // Article ou « to » facultatif sur le vocabulaire, pas dans une phrase.
  ["freedom", ["the freedom"], true],
  ["the freedom", ["freedom"], true],
  ["a judgement", ["judgment"], true],
  ["to apeal", ["to appeal (a decision)"], true],
  ["court ruled against him", ["the court ruled against him"], false],
  // Fautes de frappe, accents, traits d'union, orthographe britannique ou américaine.
  ["helo", ["hello"], true],
  ["fiance", ["fiancé"], true],
  ["asylum seeker", ["asylum-seeker"], true],
  ["Your Honor", ["Your Honour"], true],
  // Fautes de langue : elles doivent rester fausses.
  ["he go to school", ["he goes to school"], false],
  ["she are happy", ["she is happy"], false],
  ["a apple", ["an apple"], false],
  ["arrestation", ["arrest"], false],
];

let failed = 0;
for (const [typed, answers, expected] of CASES) {
  const got = check(typed, answers, norm).ok;
  if (got !== expected) { failed++; console.log(`ÉCHEC  « ${typed} » pour « ${answers.join(" | ")} » : ${got ? "accepté" : "refusé"}, attendu ${expected ? "accepté" : "refusé"}`); }
}
console.log(`${CASES.length - failed} / ${CASES.length} cas corrects`);
process.exit(failed ? 1 : 0);

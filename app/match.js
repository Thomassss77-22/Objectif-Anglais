// Correction des réponses écrites ou dictées.
// On ignore la casse, la ponctuation et les contractions (I'm = I am), et on tolère une petite faute
// de frappe sur les mots longs. Les mots courts, l'ordre des mots et les mots manquants restent stricts :
// ce sont des fautes de langue (is/are, a/an, he go…), pas des fautes de frappe.

const CONTRACTIONS = { "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is", "it's": "it is",
  "we're": "we are", "they're": "they are", "i've": "i have", "you've": "you have", "we've": "we have",
  "they've": "they have", "i'd": "i would", "i'll": "i will", "you'll": "you will", "don't": "do not",
  "doesn't": "does not", "didn't": "did not", "can't": "cannot", "won't": "will not", "isn't": "is not",
  "aren't": "are not", "haven't": "have not", "hasn't": "has not", "wouldn't": "would not", "let's": "let us",
  "what's": "what is", "that's": "that is", "there's": "there is", "couldn't": "could not",
  "shouldn't": "should not", "mustn't": "must not", "needn't": "need not", "wasn't": "was not", "weren't": "were not",
  "you'd": "you would", "he'd": "he would", "she'd": "she would", "we'd": "we would", "they'd": "they would",
  "it'll": "it will", "he'll": "he will", "she'll": "she will", "we'll": "we will", "they'll": "they will",
  // Apostrophe oubliée (fréquent sur téléphone), seulement quand la forme sans apostrophe n'est pas un vrai mot.
  im: "i am", ive: "i have", youre: "you are", theyre: "they are", youve: "you have", weve: "we have",
  theyve: "they have", dont: "do not", doesnt: "does not", didnt: "did not", cant: "cannot", isnt: "is not",
  arent: "are not", havent: "have not", hasnt: "has not", wouldnt: "would not", couldnt: "could not",
  shouldnt: "should not", thats: "that is", whats: "what is", theres: "there is", id: "i would", youd: "you would",
  theyd: "they would", youll: "you will", theyll: "they will", itll: "it will", wasnt: "was not", werent: "were not",
  wont: "will not", mustnt: "must not", neednt: "need not" };

export const norm = (s) => s.toLowerCase().replace(/[’‘]/g, "'").replace(/[“”"«».,!?;:()]/g, " ").trim().split(/\s+/)
  .filter(Boolean).map((w) => CONTRACTIONS[w] || w).join(" ").replace(/\bcan not\b/g, "cannot");

// Distance d'édition avec transposition de deux lettres voisines (« teh » → « the » = 1).
export function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

// Fautes de frappe admises selon la longueur du mot attendu.
const allowed = (w) => (w.length <= 3 ? 0 : w.length <= 7 ? 1 : 2);

// Compare une réponse à une réponse attendue, déjà normalisées.
// Renvoie null si c'est faux, sinon la liste des fautes de frappe tolérées [tapé, attendu].
function compare(given, expected) {
  const g = given.split(" "), e = expected.split(" ");
  if (g.length !== e.length) return null;
  const fixes = [];
  for (let k = 0; k < e.length; k++) {
    if (g[k] === e[k]) continue;
    // Les nombres et les mots avec apostrophe (formes grammaticales) doivent être exacts.
    // Sur un mot court, seule l'inversion de deux lettres est admise (« yuo » → « you »).
    const swap = e[k].length === 3 && [...g[k]].sort().join("") === [...e[k]].sort().join("") && distance(g[k], e[k]) === 1;
    if (/\d|'/.test(e[k]) || (!swap && distance(g[k], e[k]) > allowed(e[k]))) return null;
    fixes.push([g[k], e[k]]);
  }
  return fixes;
}

// answers : réponses acceptées ; prep : normalisation à appliquer (norm par défaut).
// Résultat : { ok, fixes, answer } — fixes vide si la réponse est exacte.
// Sans espaces, apostrophes ni traits d'union : « o clock » = « o'clock », « twenty five » = « twenty-five ».
const squash = (s) => s.replace(/[\s'-]/g, "");

// Partie qui diffère entre deux phrases (mots communs au début et à la fin retirés), pour l'afficher.
function diff(given, expected) {
  const g = given.split(" "), e = expected.split(" ");
  let i = 0;
  while (i < g.length && i < e.length && g[i] === e[i]) i++;
  let j = 0;
  while (j < g.length - i && j < e.length - i && g[g.length - 1 - j] === e[e.length - 1 - j]) j++;
  return [g.slice(i, g.length - j).join(" "), e.slice(i, e.length - j).join(" ")];
}

export function check(input, answers, prep = norm) {
  const given = prep(input);
  let best = null;
  for (const a of answers) {
    const fixes = compare(given, prep(a));
    if (fixes && (!best || fixes.length < best.fixes.length)) best = { ok: true, fixes, answer: a };
    if (best && !best.fixes.length) break;
  }
  if (best) return best;
  // Seuls les espaces, apostrophes ou traits d'union diffèrent : accepté, avec la forme correcte affichée.
  for (const a of answers) {
    if (squash(given) === squash(prep(a))) return { ok: true, fixes: [diff(given, prep(a))], answer: a };
  }
  return { ok: false, fixes: [], answer: answers[0] };
}

// Texte affiché pour signaler les fautes tolérées : « helo → hello ».
export const fixesText = (fixes) => fixes.map(([g, e]) => `${g} → ${e}`).join(", ");

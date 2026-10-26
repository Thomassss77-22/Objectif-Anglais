// Répétition espacée, algorithme SM-2.
const DAY = 24 * 60 * 60 * 1000;

export function newCard(fr, en, ex) {
  const c = { fr, en, ef: 2.5, interval: 0, reps: 0, due: Date.now() };
  if (ex) c.ex = ex;
  return c;
}

// q : note de 0 (oublié) à 5 (parfait).
export function review(card, q, now = Date.now()) {
  const c = { ...card };
  if (q < 3) {
    c.reps = 0;
    c.interval = 1;
  } else {
    c.reps += 1;
    // Première révision : « Facile » saute directement à 4 jours.
    c.interval = c.reps === 1 ? (q === 5 ? 4 : 1) : c.reps === 2 ? 6 : Math.round(c.interval * c.ef);
  }
  c.ef = Math.max(1.3, c.ef + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  // Une carte ratée revient dans la séance du jour.
  c.due = q < 3 ? now : now + c.interval * DAY;
  return c;
}

export function dueCards(deck, now = Date.now()) {
  return Object.values(deck).filter((c) => c.due <= now);
}

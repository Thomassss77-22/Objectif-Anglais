// Test de niveau adaptatif (A1 à C2) : 72 questions, 12 par niveau.
// Chaque question a un niveau (1 = A1 … 6 = C2) et une compétence. Le niveau du candidat est estimé
// par une loi de probabilité sur les 6 niveaux, mise à jour après chaque réponse (modèle logistique
// avec prise en compte du hasard). Textes et phrases rédigés pour l'application.
export const LEVEL_NAMES = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const LEVEL_INFO = {
  A1: "Tu comprends des phrases simples sur des sujets familiers et tu peux te présenter.",
  A2: "Tu te débrouilles dans les situations courantes : courses, transports, travail simple.",
  B1: "Tu comprends l'essentiel d'une conversation claire et tu peux raconter, expliquer, donner ton avis.",
  B2: "Tu comprends des textes complexes et tu peux argumenter avec aisance sur la plupart des sujets.",
  C1: "Tu t'exprimes avec spontanéité et précision, y compris dans un cadre professionnel ou universitaire.",
  C2: "Tu comprends pratiquement tout et tu saisis les nuances les plus fines : c'est le niveau d'un locuteur très avancé.",
};

export const SKILLS = { grammar: "Grammaire", vocab: "Vocabulaire", reading: "Compréhension écrite", listening: "Compréhension orale" };

export const ITEMS = [
  // ---------- A1 ----------
  { id: "a1g1", lv: 1, skill: "grammar", q: "She ___ a doctor.", choices: ["is", "are", "am", "be"], answer: 0 },
  { id: "a1g2", lv: 1, skill: "grammar", q: "I ___ coffee every morning.", choices: ["drinks", "drink", "drinking", "am drink"], answer: 1 },
  { id: "a1g3", lv: 1, skill: "grammar", q: "There ___ two cats in the garden.", choices: ["is", "are", "be", "has"], answer: 1 },
  { id: "a1g4", lv: 1, skill: "grammar", q: "___ you like tea?", choices: ["Do", "Does", "Are", "Is"], answer: 0 },
  { id: "a1v1", lv: 1, skill: "vocab", q: "The opposite of « big » is…", choices: ["tall", "small", "long", "old"], answer: 1 },
  { id: "a1v2", lv: 1, skill: "vocab", q: "We usually eat breakfast in the…", choices: ["evening", "night", "morning", "afternoon"], answer: 2 },
  { id: "a1v3", lv: 1, skill: "vocab", q: "A person who teaches in a school is a…", choices: ["teacher", "student", "doctor", "driver"], answer: 0 },
  { id: "a1r1", lv: 1, skill: "reading", text: "Hi, I'm Tom. I'm 25 and I live in Leeds with my sister. I work in a bank.", q: "Where does Tom work?", choices: ["In a school", "In a bank", "In a hospital", "At home"], answer: 1 },
  { id: "a1l1", lv: 1, skill: "listening", audio: "I've got two brothers and one sister.", q: "How many brothers does the speaker have?", choices: ["One", "Two", "Three", "None"], answer: 1 },
  { id: "a1l2", lv: 1, skill: "listening", audio: "The shop opens at nine o'clock.", q: "When does the shop open?", choices: ["7:00", "9:00", "5:00", "10:00"], answer: 1 },

  { id: "a1g5", lv: 1, skill: "grammar", q: "My parents ___ from Spain.", choices: ["is", "are", "am", "be"], answer: 1 },
  { id: "a1r2", lv: 1, skill: "reading", text: "The museum is open from Tuesday to Sunday. It is closed on Mondays. Tickets cost £5.", q: "When is the museum closed?", choices: ["On Sundays", "On Mondays", "On Tuesdays", "On Saturdays"], answer: 1 },

  // ---------- A2 ----------
  { id: "a2g1", lv: 2, skill: "grammar", q: "Yesterday I ___ to the cinema.", choices: ["go", "went", "have gone", "was go"], answer: 1 },
  { id: "a2g2", lv: 2, skill: "grammar", q: "She is ___ than her brother.", choices: ["tall", "taller", "more tall", "tallest"], answer: 1 },
  { id: "a2g3", lv: 2, skill: "grammar", q: "We ___ dinner when the phone rang.", choices: ["had", "were having", "have", "are having"], answer: 1 },
  { id: "a2g4", lv: 2, skill: "grammar", q: "How ___ money do you have?", choices: ["many", "much", "lot", "few"], answer: 1 },
  { id: "a2g5", lv: 2, skill: "grammar", q: "I've lived here ___ 2019.", choices: ["for", "since", "during", "from"], answer: 1 },
  { id: "a2v1", lv: 2, skill: "vocab", q: "Can you ___ me your pen? I'll give it back.", choices: ["borrow", "lend", "rent", "take"], answer: 1 },
  { id: "a2v2", lv: 2, skill: "vocab", q: "Our flight was ___, so we waited three hours at the airport.", choices: ["delayed", "early", "cheap", "empty"], answer: 0 },
  { id: "a2v3", lv: 2, skill: "vocab", q: "Smile! I'm going to ___ a photo.", choices: ["make", "do", "take", "have"], answer: 2 },
  { id: "a2r1", lv: 2, skill: "reading", text: "Dear Anna, thanks for your invitation. I'd love to come to your party on Saturday, but I have to work until 8 pm. Can I come after that? Love, Jess", q: "Why will Jess arrive late?", choices: ["She is ill", "She has to work", "She has no car", "She forgot the date"], answer: 1 },
  { id: "a2l1", lv: 2, skill: "listening", audio: "Sorry, I can't come tonight. I've got a terrible headache.", q: "Why can't the speaker come?", choices: ["They are too busy", "They feel ill", "They have no money", "It is too late"], answer: 1 },

  { id: "a2g6", lv: 2, skill: "grammar", q: "I ___ to Paris three times.", choices: ["have been", "was", "am going", "go"], answer: 0 },
  { id: "a2r2", lv: 2, skill: "reading", text: "The 8.15 train to Bristol is cancelled. Passengers should take the 8.45 train from platform 3.", q: "What should passengers do?", choices: ["Wait for the 8.15 train", "Take a later train", "Go home", "Buy a new ticket"], answer: 1 },

  // ---------- B1 ----------
  { id: "b1g1", lv: 3, skill: "grammar", q: "If it rains tomorrow, we ___ at home.", choices: ["stay", "will stay", "would stay", "stayed"], answer: 1 },
  { id: "b1g2", lv: 3, skill: "grammar", q: "The book ___ by millions of people.", choices: ["has read", "has been read", "is reading", "have read"], answer: 1 },
  { id: "b1g3", lv: 3, skill: "grammar", q: "He asked me where I ___.", choices: ["live", "lived", "do live", "did live"], answer: 1 },
  { id: "b1g4", lv: 3, skill: "grammar", q: "You ___ wear a uniform: it's optional.", choices: ["mustn't", "don't have to", "can't", "shouldn't"], answer: 1 },
  { id: "b1v1", lv: 3, skill: "vocab", q: "I'm looking forward ___ you.", choices: ["to see", "to seeing", "seeing", "see"], answer: 1 },
  { id: "b1v2", lv: 3, skill: "vocab", q: "She gave ___ smoking last year.", choices: ["up", "out", "off", "in"], answer: 0 },
  { id: "b1v3", lv: 3, skill: "vocab", q: "In English, « eventually » means…", choices: ["éventuellement", "finalement", "évidemment", "actuellement"], answer: 1 },
  { id: "b1r1", lv: 3, skill: "reading", text: "More and more people in Britain now work from home at least two days a week. Many say they save time and money on travel, but some miss chatting with colleagues and find it hard to switch off in the evening. Companies, meanwhile, are reducing their office space.", q: "Which disadvantage of working from home is mentioned?", choices: ["Higher travel costs", "Difficulty switching off", "Smaller offices", "Longer journeys"], answer: 1 },
  { id: "b1l1", lv: 3, skill: "listening", audio: "If I'd known about the traffic, I would have taken the train.", q: "What did the speaker do?", choices: ["Took the train", "Didn't take the train", "Missed the train", "Didn't travel"], answer: 1 },
  { id: "b1l2", lv: 3, skill: "listening", audio: "I used to play tennis every weekend, but I haven't played for years.", q: "Does the speaker play tennis now?", choices: ["Yes, every weekend", "Yes, sometimes", "No, not any more", "No, never"], answer: 2 },

  { id: "b1g5", lv: 3, skill: "grammar", q: "This is the man ___ car was stolen.", choices: ["who", "whose", "which", "whom"], answer: 1 },
  { id: "b1r2", lv: 3, skill: "reading", text: "Tickets for the concert sold out in minutes, but the organisers have announced a second date in June. Fans who missed out can register online to be told when tickets go on sale.", q: "What can fans who missed out do?", choices: ["Get a refund", "Sign up to be told about new tickets", "Go to the first concert", "Buy tickets at the door"], answer: 1 },

  // ---------- B2 ----------
  { id: "b2g1", lv: 4, skill: "grammar", q: "I wish I ___ more time to study.", choices: ["have", "had", "would have", "will have"], answer: 1 },
  { id: "b2g2", lv: 4, skill: "grammar", q: "By the time we arrived, the film ___.", choices: ["started", "has started", "had started", "was starting"], answer: 2 },
  { id: "b2g3", lv: 4, skill: "grammar", q: "She denied ___ the money.", choices: ["to take", "taking", "take", "to taking"], answer: 1 },
  { id: "b2g4", lv: 4, skill: "grammar", q: "It's high time we ___.", choices: ["leave", "left", "will leave", "are leaving"], answer: 1 },
  { id: "b2v1", lv: 4, skill: "vocab", q: "The new policy had a significant ___ on prices.", choices: ["affect", "effect", "effort", "effective"], answer: 1 },
  { id: "b2v2", lv: 4, skill: "vocab", q: "We need to ___ a decision by Friday.", choices: ["do", "make", "put", "get"], answer: 1 },
  { id: "b2v3", lv: 4, skill: "vocab", q: "His explanation was so ___ that nobody understood it.", choices: ["straightforward", "convoluted", "concise", "obvious"], answer: 1 },
  { id: "b2r1", lv: 4, skill: "reading", text: "Although the city council claims that the new cycle lanes have reduced traffic, local shop owners argue that their customers can no longer park nearby, and several have reported a drop in sales. The council insists it is too early to judge.", q: "What is the shop owners' main complaint?", choices: ["The cycle lanes are dangerous", "Traffic has increased", "Parking problems are hurting business", "The council has lied"], answer: 2 },
  { id: "b2l1", lv: 4, skill: "listening", audio: "I'm not against the idea in principle, but I'm worried about how much it will cost.", q: "What is the speaker's attitude?", choices: ["Totally against it", "Supportive, with no doubts", "In favour, but concerned about the cost", "Indifferent"], answer: 2 },
  { id: "b2l2", lv: 4, skill: "listening", audio: "She'd have got the job if she hadn't turned up so late for the interview.", q: "What happened?", choices: ["She got the job", "She didn't get the job because she was late", "She refused the job", "The interview was cancelled"], answer: 1 },

  { id: "b2g5", lv: 4, skill: "grammar", q: "He suggested ___ a taxi to the station.", choices: ["to take", "taking", "take", "to taking"], answer: 1 },
  { id: "b2r2", lv: 4, skill: "reading", text: "The company insists that the job cuts are unrelated to last year's merger, yet almost all of the positions affected are in departments that were duplicated when the two firms combined.", q: "What does the writer suggest?", choices: ["The cuts are unrelated to the merger", "The cuts are probably linked to the merger", "The merger was cancelled", "No jobs will be lost"], answer: 1 },

  // ---------- C1 ----------
  { id: "c1g1", lv: 5, skill: "grammar", q: "Not only ___ late, but he also forgot the documents.", choices: ["he was", "was he", "he is", "did he be"], answer: 1 },
  { id: "c1g2", lv: 5, skill: "grammar", q: "Had I known about the problem, I ___ earlier.", choices: ["would act", "would have acted", "had acted", "acted"], answer: 1 },
  { id: "c1g3", lv: 5, skill: "grammar", q: "Hardly had we sat down ___ the alarm went off.", choices: ["than", "when", "that", "then"], answer: 1 },
  { id: "c1g4", lv: 5, skill: "grammar", q: "The proposal, ___ details remain unclear, will be debated next week.", choices: ["which", "whose", "whom", "that"], answer: 1 },
  { id: "c1v1", lv: 5, skill: "vocab", q: "The minister's speech did little to ___ public fears.", choices: ["allay", "arouse", "enhance", "endure"], answer: 0 },
  { id: "c1v2", lv: 5, skill: "vocab", q: "The negotiations reached a ___: neither side would give way.", choices: ["deadlock", "breakthrough", "consensus", "threshold"], answer: 0 },
  { id: "c1v3", lv: 5, skill: "vocab", q: "Despite the evidence, he ___ any wrongdoing.", choices: ["denied", "refused", "rejected", "declined"], answer: 0 },
  { id: "c1r1", lv: 5, skill: "reading", text: "Critics of the reform contend that it will merely shift costs onto local authorities rather than reduce them. Its supporters, while conceding that savings may be modest in the short term, maintain that streamlining procedures will pay dividends over time.", q: "What do the supporters of the reform admit?", choices: ["It shifts costs onto local authorities", "Short-term savings may be small", "Procedures will become slower", "The critics are right"], answer: 1 },
  { id: "c1l1", lv: 5, skill: "listening", audio: "I wouldn't go so far as to say it was a failure, but it certainly fell short of expectations.", q: "What does the speaker think?", choices: ["It was a complete failure", "It was a great success", "It was disappointing, but not a failure", "It is too early to say"], answer: 2 },
  { id: "c1v4", lv: 5, skill: "vocab", q: "To « play down » a problem means to…", choices: ["exaggerate it", "make it seem less important", "solve it", "ignore it entirely"], answer: 1 },

  { id: "c1g5", lv: 5, skill: "grammar", q: "Should you need any further information, ___ hesitate to contact us.", choices: ["don't", "not", "no", "won't"], answer: 0 },
  { id: "c1r2", lv: 5, skill: "reading", text: "While the study's findings are striking, the authors are careful to point out that the sample was small and that the results have yet to be replicated.", q: "What is the authors' attitude to their findings?", choices: ["They consider them definitive", "They are cautious about them", "They reject them", "They exaggerate them"], answer: 1 },

  // ---------- C2 ----------
  { id: "c2g1", lv: 6, skill: "grammar", q: "Little ___ that the decision would change everything.", choices: ["they knew", "did they know", "they did know", "knew they"], answer: 1 },
  { id: "c2g2", lv: 6, skill: "grammar", q: "Were the government ___ the bill, protests would follow.", choices: ["to pass", "passing", "passed", "pass"], answer: 0 },
  { id: "c2g3", lv: 6, skill: "grammar", q: "So ___ was the backlash that the company withdrew the advert.", choices: ["fierce", "fiercely", "fierceness", "fiercer"], answer: 0 },
  { id: "c2v1", lv: 6, skill: "vocab", q: "The witness's account was riddled with ___.", choices: ["inconsistencies", "consistency", "coherence", "accuracy"], answer: 0 },
  { id: "c2v2", lv: 6, skill: "vocab", q: "Her remarks were deliberately ___, leaving room for several interpretations.", choices: ["equivocal", "unequivocal", "explicit", "blunt"], answer: 0 },
  { id: "c2v3", lv: 6, skill: "vocab", q: "To « pay lip service » to an idea is to…", choices: ["support it in words but not in practice", "criticise it openly", "fund it generously", "explain it clearly"], answer: 0 },
  { id: "c2v4", lv: 6, skill: "vocab", q: "A « Pyrrhic victory » is a victory…", choices: ["won at too great a cost", "won easily", "won unfairly", "won by chance"], answer: 0 },
  { id: "c2r1", lv: 6, skill: "reading", text: "The committee's report stops short of recommending outright abolition, yet its tone leaves little doubt as to where its sympathies lie.", q: "What does the report do?", choices: ["It recommends abolition", "It opposes abolition", "It implicitly favours abolition without recommending it", "It takes no position at all"], answer: 2 },
  { id: "c2l1", lv: 6, skill: "listening", audio: "Far from settling the matter, the ruling is likely to open the floodgates to a wave of similar claims.", q: "What does the speaker expect?", choices: ["The issue is now settled", "Many similar cases will follow", "The ruling will be overturned", "Fewer claims will be filed"], answer: 1 },
  { id: "c2g4", lv: 6, skill: "grammar", q: "Only after the inquiry ___ the full extent of the failures become clear.", choices: ["did", "had", "was", "has"], answer: 0 },
  { id: "c2r2", lv: 6, skill: "reading", text: "Ostensibly a celebration of local heritage, the festival has, in the eyes of many residents, become little more than a marketing exercise.", q: "What do many residents think?", choices: ["It genuinely celebrates local heritage", "It is mainly a promotional event", "It should be cancelled", "It is too small"], answer: 1 },
  { id: "c2v5", lv: 6, skill: "vocab", q: "The project was ___ in controversy from the very start.", choices: ["mired", "soaked", "sunk", "drowned"], answer: 0 },
];

// ---------- Modèle ----------
// P(bonne réponse | niveau réel θ, difficulté b) : hasard g, inattention s, pente a.
// À θ = b, un candidat a environ 75 % de chances de répondre juste.
const G = 0.2, S = 0.05, A = 2.0, C = 1.1;
export function pCorrect(theta, b) {
  return G + (1 - G - S) / (1 + Math.exp(-(A * (theta - b) + C)));
}

// « Je ne sais pas » compte comme une erreur, sans part de hasard.
export function update(post, item, outcome) {
  const next = post.map((p, i) => {
    const pc = pCorrect(i + 1, item.lv);
    // Probabilité de ne pas connaître la réponse (hors hasard) : ce qu'exprime « je ne sais pas ».
    const like = outcome === "right" ? pc : outcome === "unknown" ? 1 - (pc - G) / (1 - G) : 1 - pc;
    return p * like;
  });
  const sum = next.reduce((a, b) => a + b, 0);
  return next.map((p) => p / sum);
}

export const mean = (post) => post.reduce((a, p, i) => a + p * (i + 1), 0);
export const best = (post) => post.indexOf(Math.max(...post));

export const MIN_ITEMS = 16, MAX_ITEMS = 28, TARGET = 0.9;

// Question suivante : la plus proche du niveau estimé, en alternant les compétences.
export function pickNext(post, used, lastSkills, rand = Math.random) {
  const m = mean(post);
  const avoid = lastSkills.slice(-2);
  const pool = ITEMS.filter((it) => !used.has(it.id));
  const score = (it) => Math.abs(it.lv - m) + (avoid.includes(it.skill) ? 0.6 : 0) + rand() * 0.3;
  return pool.sort((x, y) => score(x) - score(y))[0];
}

export const done = (post, n) => n >= MAX_ITEMS || (n >= MIN_ITEMS && Math.max(...post) >= TARGET);

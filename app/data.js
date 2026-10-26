// Contenu pédagogique original. Une leçon par niveau pour le prototype.
export const LEVELS = [
  {
    id: "A1", name: "Débutant",
    lessons: [{
      id: "a1-greetings", title: "Se présenter",
      tip: "On utilise <b>to be</b> pour se présenter : <i>I am</i> (I'm), <i>you are</i> (you're), <i>he/she is</i>. L'âge se dit avec <b>to be</b> : <i>I am 20</i> (et non « I have 20 »).",
      words: [["bonjour", "hello"], ["au revoir", "goodbye"], ["merci", "thank you"], ["je m'appelle", "my name is"], ["ami", "friend"]],
      exercises: [
        { type: "qcm", q: "Comment dit-on « J'ai 20 ans » ?", choices: ["I have 20 years", "I am 20", "I'm having 20"], answer: 1 },
        { type: "translate", q: "Merci, mon ami.", answers: ["thank you, my friend", "thanks, my friend", "thank you my friend", "thanks my friend"] },
        { type: "qcm", q: "« She ___ my friend. »", choices: ["am", "are", "is"], answer: 2 },
      ],
    }],
  },
  {
    id: "A2", name: "Élémentaire",
    lessons: [{
      id: "a2-past", title: "Raconter son week-end (prétérit)",
      tip: "Le <b>prétérit</b> raconte une action terminée à un moment précis : <i>Yesterday I <b>watched</b> a film.</i> Verbes irréguliers fréquents : go → <b>went</b>, see → <b>saw</b>, eat → <b>ate</b>.",
      words: [["hier", "yesterday"], ["le week-end dernier", "last weekend"], ["aller", "to go"], ["voir", "to see"], ["manger", "to eat"]],
      exercises: [
        { type: "qcm", q: "« Last weekend I ___ to the beach. »", choices: ["go", "went", "have gone"], answer: 1 },
        { type: "translate", q: "Hier, j'ai vu un film.", answers: ["yesterday i saw a film", "yesterday i saw a movie", "yesterday, i saw a film", "yesterday, i saw a movie"] },
      ],
    }],
  },
  {
    id: "B1", name: "Intermédiaire",
    lessons: [{
      id: "b1-present-perfect", title: "Prétérit ou present perfect ?",
      tip: "Piège n°1 des francophones ! <b>Present perfect</b> = lien avec le présent, sans date : <i>I <b>have lived</b> here for 3 years</i> (j'y habite toujours). <b>Prétérit</b> = moment révolu et daté : <i>I <b>lived</b> there in 2019.</i>",
      words: [["depuis (durée)", "for"], ["depuis (point de départ)", "since"], ["déjà", "already"], ["pas encore", "yet"], ["jamais", "never"]],
      exercises: [
        { type: "qcm", q: "« J'habite ici depuis 2020. »", choices: ["I live here since 2020", "I have lived here since 2020", "I lived here since 2020"], answer: 1 },
        { type: "qcm", q: "« Have you finished ___ ? »", choices: ["yet", "already", "since"], answer: 0 },
        { type: "translate", q: "Je ne suis jamais allé à Londres.", answers: ["i have never been to london", "i've never been to london"] },
      ],
    }],
  },
  {
    id: "B2", name: "Intermédiaire avancé",
    lessons: [{
      id: "b2-false-friends", title: "Les faux amis",
      tip: "Des mots qui se ressemblent mais trompent : <i>actually</i> = en fait (pas « actuellement » = <i>currently</i>), <i>eventually</i> = finalement, <i>library</i> = bibliothèque, <i>sensible</i> = raisonnable.",
      words: [["en fait", "actually"], ["actuellement", "currently"], ["finalement", "eventually"], ["bibliothèque", "library"], ["raisonnable", "sensible"]],
      exercises: [
        { type: "qcm", q: "« Actuellement, je travaille à Paris. »", choices: ["Actually, I work in Paris", "Currently, I work in Paris", "Eventually, I work in Paris"], answer: 1 },
        { type: "qcm", q: "Que veut dire « sensitive » ?", choices: ["sensible (émotif)", "raisonnable", "sensé"], answer: 0 },
        { type: "translate", q: "En fait, il a raison.", answers: ["actually, he is right", "actually he is right", "actually, he's right", "actually he's right"] },
      ],
    }],
  },
  {
    id: "C1", name: "Avancé",
    lessons: [{
      id: "c1-inversion", title: "L'inversion pour insister",
      tip: "À l'écrit soutenu, après une expression négative placée en tête, on inverse sujet et auxiliaire : <i><b>Never have I</b> seen such a mess.</i> <i><b>Not only did she</b> win, but she broke the record.</i>",
      words: [["à peine… que", "hardly… when"], ["en aucun cas", "under no circumstances"], ["rarement", "seldom"], ["non seulement", "not only"]],
      exercises: [
        { type: "qcm", q: "Phrase correcte :", choices: ["Never I have seen this", "Never have I seen this", "Never seen I have this"], answer: 1 },
        { type: "qcm", q: "« Under no circumstances ___ open this door. »", choices: ["you should", "should you", "you must not"], answer: 1 },
      ],
    }],
  },
  {
    id: "C2", name: "Courant",
    lessons: [{
      id: "c2-idioms", title: "Expressions idiomatiques",
      tip: "Pour sonner naturel : <i>to beat around the bush</i> (tourner autour du pot), <i>a blessing in disguise</i> (un mal pour un bien), <i>to cut corners</i> (bâcler), <i>to be on the fence</i> (hésiter).",
      words: [["tourner autour du pot", "to beat around the bush"], ["un mal pour un bien", "a blessing in disguise"], ["bâcler", "to cut corners"], ["hésiter", "to be on the fence"]],
      exercises: [
        { type: "qcm", q: "« Stop ___ and tell me the truth. »", choices: ["cutting corners", "beating around the bush", "being on the fence"], answer: 1 },
        { type: "qcm", q: "« Losing that job was ___ : I found a better one. »", choices: ["a blessing in disguise", "a piece of cake", "on the fence"], answer: 0 },
      ],
    }],
  },
];

// Contenu pédagogique original, orienté vers l'objectif : parler anglais couramment.
// Chaque leçon : une fiche en français, le vocabulaire (ajouté aux cartes mémoire),
// des exercices dont au moins un « speak » (à dire à voix haute).
// Types d'exercices : qcm (choices + answer), translate (answers), speak (answers).
import { EXTRA } from "./lessons-extra.js";

export const LEVELS = [
  {
    id: "A1", name: "Débutant — survivre en anglais",
    lessons: [
      {
        id: "a1-greetings", title: "Se présenter",
        tip: "On utilise <b>to be</b> pour se présenter : <i>I am</i> (I'm), <i>you are</i> (you're), <i>he/she is</i>. L'âge se dit avec <b>to be</b> : <i>I am 20</i> (et non « I have 20 »).",
        words: [["bonjour", "hello"], ["au revoir", "goodbye"], ["merci", "thank you"], ["je m'appelle", "my name is"], ["ami", "friend"], ["enchanté", "nice to meet you"]],
        exercises: [
          { type: "qcm", q: "Comment dit-on « J'ai 20 ans » ?", choices: ["I have 20 years", "I am 20", "I'm having 20"], answer: 1 },
          { type: "qcm", q: "« She ___ my friend. »", choices: ["am", "are", "is"], answer: 2 },
          { type: "translate", q: "Merci, mon ami.", answers: ["thank you, my friend", "thanks, my friend"] },
          { type: "speak", q: "Dis : « Bonjour, je m'appelle Paul. Enchanté. »", answers: ["hello, my name is paul. nice to meet you", "hi, my name is paul. nice to meet you", "hello, i'm paul. nice to meet you", "hi, i'm paul. nice to meet you"] },
        ],
      },
      {
        id: "a1-questions", title: "Poser des questions simples",
        tip: "Les mots interrogatifs : <b>what</b> (quoi), <b>where</b> (où), <b>who</b> (qui), <b>when</b> (quand), <b>how</b> (comment). Avec to be, on inverse : <i>Where <b>are you</b> from?</i> (D'où viens-tu ?)",
        words: [["d'où viens-tu ?", "where are you from?"], ["comment vas-tu ?", "how are you?"], ["où", "where"], ["quand", "when"], ["qui", "who"], ["pourquoi", "why"]],
        exercises: [
          { type: "qcm", q: "« ___ are you from? » — « I'm from France. »", choices: ["What", "Where", "Who"], answer: 1 },
          { type: "qcm", q: "Réponse naturelle à « How are you? » :", choices: ["I'm fine, thanks. And you?", "I am 25.", "I'm from Lyon."], answer: 0 },
          { type: "translate", q: "Comment t'appelles-tu ?", answers: ["what is your name?", "what's your name?"] },
          { type: "speak", q: "Dis : « Je viens de France. Et toi ? »", answers: ["i am from france. and you?", "i'm from france. and you?", "i am from france. what about you?", "i'm from france. what about you?"] },
        ],
      },
      {
        id: "a1-present", title: "Parler de son quotidien (présent simple)",
        tip: "Le <b>présent simple</b> décrit les habitudes. Attention au <b>-s</b> à la 3ᵉ personne : <i>I work</i>, mais <i>she work<b>s</b></i>. Négation : <i>I <b>don't</b> work</i>, <i>she <b>doesn't</b> work</i>.",
        words: [["travailler", "to work"], ["habiter", "to live"], ["tous les jours", "every day"], ["le matin", "in the morning"], ["le soir", "in the evening"], ["d'habitude", "usually"]],
        exercises: [
          { type: "qcm", q: "« He ___ in London. »", choices: ["live", "lives", "living"], answer: 1 },
          { type: "qcm", q: "« She ___ like coffee. »", choices: ["don't", "doesn't", "isn't"], answer: 1 },
          { type: "translate", q: "Je travaille tous les jours.", answers: ["i work every day"] },
          { type: "speak", q: "Dis : « D'habitude, je bois du café le matin. »", answers: ["i usually drink coffee in the morning", "usually, i drink coffee in the morning", "usually i drink coffee in the morning"] },
        ],
      },
      {
        id: "a1-cafe", title: "Commander au café",
        tip: "Pour demander poliment : <b>Can I have…?</b> ou <b>I'd like…</b> (je voudrais). Évite « I want » qui sonne brusque. Et n'oublie pas <b>please</b> !",
        words: [["je voudrais", "I'd like"], ["l'addition", "the bill"], ["à emporter", "to take away"], ["sur place", "to eat in"], ["combien ça coûte ?", "how much is it?"], ["s'il vous plaît", "please"]],
        exercises: [
          { type: "qcm", q: "La formule la plus polie :", choices: ["I want a coffee.", "Give me a coffee.", "Can I have a coffee, please?"], answer: 2 },
          { type: "translate", q: "L'addition, s'il vous plaît.", answers: ["the bill, please", "can i have the bill, please?", "could i have the bill, please?"] },
          { type: "speak", q: "Dis : « Je voudrais un thé, s'il vous plaît. »", answers: ["i'd like a tea, please", "i would like a tea, please", "i'd like a cup of tea, please", "i would like a cup of tea, please"] },
        ],
      },
    ],
  },
  {
    id: "A2", name: "Élémentaire — raconter et échanger",
    lessons: [
      {
        id: "a2-past", title: "Raconter son week-end (prétérit)",
        tip: "Le <b>prétérit</b> raconte une action terminée à un moment précis : <i>Yesterday I <b>watched</b> a film.</i> Verbes irréguliers fréquents : go → <b>went</b>, see → <b>saw</b>, eat → <b>ate</b>, have → <b>had</b>. Question : <i><b>Did</b> you go out?</i>",
        words: [["hier", "yesterday"], ["le week-end dernier", "last weekend"], ["aller", "to go"], ["voir", "to see"], ["manger", "to eat"], ["il y a deux jours", "two days ago"]],
        exercises: [
          { type: "qcm", q: "« Last weekend I ___ to the beach. »", choices: ["go", "went", "have gone"], answer: 1 },
          { type: "qcm", q: "« ___ you see the match yesterday? »", choices: ["Do", "Did", "Have"], answer: 1 },
          { type: "translate", q: "Hier, j'ai vu un film.", answers: ["yesterday i saw a film", "yesterday i saw a movie", "i saw a film yesterday", "i saw a movie yesterday"] },
          { type: "speak", q: "Dis : « Le week-end dernier, je suis allé chez mes parents. »", answers: ["last weekend i went to my parents' house", "last weekend i went to my parents' place", "last weekend i visited my parents", "last weekend, i went to my parents' house", "last weekend, i visited my parents"] },
        ],
      },
      {
        id: "a2-future", title: "Parler de ses projets (going to / will)",
        tip: "<b>Be going to</b> = projet déjà décidé : <i>I'm going to visit Rome in May.</i> <b>Will</b> = décision prise sur le moment ou prédiction : <i>It's cold, I'll close the window.</i>",
        words: [["l'été prochain", "next summer"], ["prévoir de", "to plan to"], ["bientôt", "soon"], ["peut-être", "maybe"], ["demain", "tomorrow"], ["voyager", "to travel"]],
        exercises: [
          { type: "qcm", q: "Projet décidé depuis longtemps : « I ___ study in Dublin next year. »", choices: ["will", "am going to", "go"], answer: 1 },
          { type: "qcm", q: "Le téléphone sonne : « I ___ answer it! »", choices: ["'ll", "'m going to", "answer"], answer: 0 },
          { type: "speak", q: "Dis : « L'été prochain, je vais voyager en Irlande. »", answers: ["next summer i'm going to travel to ireland", "next summer i am going to travel to ireland", "next summer, i'm going to travel to ireland", "i'm going to travel to ireland next summer"] },
        ],
      },
      {
        id: "a2-directions", title: "Demander son chemin",
        tip: "Pour aborder quelqu'un : <b>Excuse me, could you tell me…?</b> puis <i>how to get to the station</i>. Repères utiles : <i>turn left/right</i>, <i>go straight on</i>, <i>it's next to…</i>, <i>opposite</i> (en face de).",
        words: [["tourner à gauche", "to turn left"], ["tout droit", "straight on"], ["en face de", "opposite"], ["à côté de", "next to"], ["la gare", "the station"], ["loin", "far"]],
        exercises: [
          { type: "qcm", q: "« Opposite » veut dire :", choices: ["à l'opposé de la ville", "en face de", "à côté de"], answer: 1 },
          { type: "translate", q: "C'est loin ?", answers: ["is it far?"] },
          { type: "speak", q: "Dis : « Excusez-moi, comment aller à la gare ? »", answers: ["excuse me, how do i get to the station?", "excuse me, how can i get to the station?", "excuse me, could you tell me how to get to the station?"] },
        ],
      },
      {
        id: "a2-likes", title: "Goûts et préférences",
        tip: "Après <b>like, love, hate, enjoy</b>, on met souvent le verbe en <b>-ing</b> : <i>I enjoy <b>reading</b>.</i> Pour une préférence : <i>I <b>prefer</b> tea <b>to</b> coffee</i> ou <i>I'd rather stay home</i>.",
        words: [["aimer beaucoup", "to enjoy"], ["détester", "to hate"], ["préférer", "to prefer"], ["passe-temps", "hobby"], ["ça me plaît", "I'm into it"], ["pas trop", "not really"]],
        exercises: [
          { type: "qcm", q: "« I enjoy ___ in the mountains. »", choices: ["to hike", "hiking", "hike"], answer: 1 },
          { type: "qcm", q: "« I prefer cats ___ dogs. »", choices: ["than", "to", "that"], answer: 1 },
          { type: "speak", q: "Dis : « J'adore cuisiner, mais je déteste faire la vaisselle. »", answers: ["i love cooking, but i hate doing the dishes", "i love cooking but i hate doing the dishes", "i love cooking, but i hate washing the dishes", "i love to cook, but i hate doing the dishes"] },
        ],
      },
    ],
  },
  {
    id: "B1", name: "Intermédiaire — se débrouiller partout",
    lessons: [
      {
        id: "b1-present-perfect", title: "Prétérit ou present perfect ?",
        tip: "Piège n°1 des francophones ! <b>Present perfect</b> = lien avec le présent, sans date : <i>I <b>have lived</b> here for 3 years</i> (j'y habite toujours). <b>Prétérit</b> = moment révolu et daté : <i>I <b>lived</b> there in 2019.</i>",
        words: [["depuis (durée)", "for"], ["depuis (point de départ)", "since"], ["déjà", "already"], ["pas encore", "yet"], ["jamais", "never"], ["récemment", "lately"]],
        exercises: [
          { type: "qcm", q: "« J'habite ici depuis 2020. »", choices: ["I live here since 2020", "I have lived here since 2020", "I lived here since 2020"], answer: 1 },
          { type: "qcm", q: "« Have you finished ___ ? »", choices: ["yet", "already", "since"], answer: 0 },
          { type: "translate", q: "Je ne suis jamais allé à Londres.", answers: ["i have never been to london"] },
          { type: "speak", q: "Dis : « J'apprends l'anglais depuis deux ans. »", answers: ["i have been learning english for two years", "i have learned english for two years", "i have learnt english for two years"] },
        ],
      },
      {
        id: "b1-opinion", title: "Donner son avis",
        tip: "Varie les tournures : <b>I think…</b>, <b>In my opinion…</b>, <b>As far as I'm concerned…</b>. Pour nuancer : <i>I see your point, but…</i>, <i>I'm not so sure.</i> Attention : « je suis d'accord » = <b>I agree</b> (jamais « I am agree »).",
        words: [["à mon avis", "in my opinion"], ["je suis d'accord", "I agree"], ["je ne suis pas d'accord", "I disagree"], ["ça dépend", "it depends"], ["je vois ce que tu veux dire", "I see what you mean"], ["en revanche", "on the other hand"]],
        exercises: [
          { type: "qcm", q: "Phrase correcte :", choices: ["I am agree with you.", "I agree with you.", "I'm agreeing you."], answer: 1 },
          { type: "qcm", q: "Pour nuancer poliment :", choices: ["You're wrong.", "I see your point, but…", "No."], answer: 1 },
          { type: "speak", q: "Dis : « À mon avis, ça dépend de la situation. »", answers: ["in my opinion, it depends on the situation", "in my opinion it depends on the situation"] },
        ],
      },
      {
        id: "b1-phone", title: "Au téléphone",
        tip: "Au téléphone, on dit <b>This is Paul</b> (et non « I am Paul »). Expressions clés : <i>Could you speak up?</i> (parler plus fort), <i>Hold on</i> (ne quittez pas), <i>I'll call you back</i>.",
        words: [["ne quittez pas", "hold on"], ["rappeler", "to call back"], ["laisser un message", "to leave a message"], ["raccrocher", "to hang up"], ["parler plus fort", "to speak up"], ["la ligne est mauvaise", "the line is bad"]],
        exercises: [
          { type: "qcm", q: "Au téléphone, pour te présenter :", choices: ["I am Julie.", "This is Julie.", "Here is Julie."], answer: 1 },
          { type: "translate", q: "Je vous rappelle dans dix minutes.", answers: ["i'll call you back in ten minutes", "i will call you back in ten minutes", "i'll call you back in 10 minutes"] },
          { type: "speak", q: "Dis : « Pourriez-vous parler plus fort, s'il vous plaît ? »", answers: ["could you speak up, please?", "could you please speak up?", "can you speak up, please?"] },
        ],
      },
      {
        id: "b1-conditional", title: "Hypothèses (if…)",
        tip: "<b>If + présent, will</b> = situation probable : <i>If it rains, I'll stay home.</i> <b>If + prétérit, would</b> = situation imaginaire : <i>If I <b>had</b> more time, I <b>would</b> travel.</i> Jamais de <i>would</i> après <i>if</i> !",
        words: [["si", "if"], ["sauf si", "unless"], ["à ta place", "if I were you"], ["au cas où", "in case"], ["je le ferais", "I would do it"], ["sinon", "otherwise"]],
        exercises: [
          { type: "qcm", q: "« If I ___ rich, I would buy a boat. »", choices: ["would be", "were", "am"], answer: 1 },
          { type: "qcm", q: "« If you heat ice, it ___ . »", choices: ["melts", "would melt", "melted"], answer: 0 },
          { type: "speak", q: "Dis : « À ta place, j'accepterais le poste. »", answers: ["if i were you, i would accept the job", "if i were you, i'd accept the job", "if i were you, i would take the job", "if i were you, i'd take the job"] },
        ],
      },
    ],
  },
  {
    id: "B2", name: "Intermédiaire avancé — parler avec aisance",
    lessons: [
      {
        id: "b2-false-friends", title: "Les faux amis",
        tip: "Des mots qui se ressemblent mais trompent : <i>actually</i> = en fait (« actuellement » = <i>currently</i>), <i>eventually</i> = finalement, <i>library</i> = bibliothèque, <i>sensible</i> = raisonnable, <i>to assist</i> = aider (« assister à » = <i>to attend</i>).",
        words: [["en fait", "actually"], ["actuellement", "currently"], ["finalement", "eventually"], ["bibliothèque", "library"], ["raisonnable", "sensible"], ["assister à", "to attend"]],
        exercises: [
          { type: "qcm", q: "« Actuellement, je travaille à Paris. »", choices: ["Actually, I work in Paris", "Currently, I work in Paris", "Eventually, I work in Paris"], answer: 1 },
          { type: "qcm", q: "« J'ai assisté à la réunion. »", choices: ["I assisted the meeting.", "I attended the meeting.", "I assisted at the meeting."], answer: 1 },
          { type: "translate", q: "En fait, il a raison.", answers: ["actually, he is right"] },
          { type: "speak", q: "Dis : « Finalement, on a trouvé une solution. »", answers: ["eventually, we found a solution", "in the end, we found a solution", "we eventually found a solution"] },
        ],
      },
      {
        id: "b2-phrasal", title: "Les phrasal verbs indispensables",
        tip: "Les natifs les utilisent tout le temps à l'oral. <i>to <b>give up</b></i> (abandonner), <i>to <b>find out</b></i> (découvrir), <i>to <b>look forward to</b></i> + -ing (avoir hâte de), <i>to <b>put off</b></i> (repousser), <i>to <b>get along with</b></i> (bien s'entendre avec).",
        words: [["abandonner", "to give up"], ["découvrir", "to find out"], ["avoir hâte de", "to look forward to"], ["repousser", "to put off"], ["bien s'entendre avec", "to get along with"], ["se débrouiller", "to get by"]],
        exercises: [
          { type: "qcm", q: "« I'm looking forward to ___ you. »", choices: ["see", "seeing", "saw"], answer: 1 },
          { type: "qcm", q: "« They had to ___ the meeting until Monday. »", choices: ["put off", "give up", "find out"], answer: 0 },
          { type: "speak", q: "Dis : « Je m'entends bien avec mes collègues. »", answers: ["i get along with my colleagues", "i get along well with my colleagues", "i get on well with my colleagues", "i get on with my colleagues"] },
        ],
      },
      {
        id: "b2-fillers", title: "Gagner du temps en parlant",
        tip: "Parler couramment, ce n'est pas ne jamais hésiter : c'est hésiter <b>en anglais</b> ! Remplace « euh… » par <i>Well…</i>, <i>Let me think…</i>, <i>How can I put it?</i>, <i>You know…</i>, <i>The thing is…</i>.",
        words: [["eh bien…", "well…"], ["laisse-moi réfléchir", "let me think"], ["comment dire ?", "how can I put it?"], ["le truc, c'est que…", "the thing is…"], ["en gros", "basically"], ["bonne question", "that's a good question"]],
        exercises: [
          { type: "qcm", q: "On te pose une question difficile. Le plus naturel :", choices: ["Euh…", "That's a good question. Let me think…", "I don't know."], answer: 1 },
          { type: "translate", q: "En gros, c'est trop cher.", answers: ["basically, it's too expensive", "basically, it is too expensive"] },
          { type: "speak", q: "Dis : « Le truc, c'est que je n'ai pas le temps. »", answers: ["the thing is, i don't have time", "the thing is, i don't have the time", "the thing is i don't have time", "the thing is, i haven't got time"] },
        ],
      },
      {
        id: "b2-work", title: "Anglais professionnel : réunions",
        tip: "Expressions de réunion : <i>Let's get started</i>, <i>Could I just add something?</i>, <i>To sum up…</i>, <i>Let's move on to…</i>. Pour interrompre poliment : <i>Sorry to interrupt, but…</i>",
        words: [["l'ordre du jour", "the agenda"], ["un délai", "a deadline"], ["pour résumer", "to sum up"], ["passons à", "let's move on to"], ["faire le point", "to touch base"], ["un compte rendu", "the minutes"]],
        exercises: [
          { type: "qcm", q: "« Deadline » veut dire :", choices: ["date limite", "ligne d'arrivée", "réunion"], answer: 0 },
          { type: "qcm", q: "Pour interrompre poliment :", choices: ["Stop, I talk.", "Sorry to interrupt, but…", "Wait me."], answer: 1 },
          { type: "speak", q: "Dis : « Pour résumer, nous devons respecter la date limite. »", answers: ["to sum up, we need to meet the deadline", "to sum up, we have to meet the deadline", "to sum up, we must meet the deadline"] },
        ],
      },
    ],
  },
  {
    id: "C1", name: "Avancé — nuancer et convaincre",
    lessons: [
      {
        id: "c1-inversion", title: "L'inversion pour insister",
        tip: "À l'écrit ou à l'oral soutenu, après une expression négative placée en tête, on inverse sujet et auxiliaire : <i><b>Never have I</b> seen such a mess.</i> <i><b>Not only did she</b> win, but she broke the record.</i>",
        words: [["à peine… que", "hardly… when"], ["en aucun cas", "under no circumstances"], ["rarement", "seldom"], ["non seulement", "not only"], ["ce n'est qu'alors que", "only then"]],
        exercises: [
          { type: "qcm", q: "Phrase correcte :", choices: ["Never I have seen this", "Never have I seen this", "Never seen I have this"], answer: 1 },
          { type: "qcm", q: "« Under no circumstances ___ open this door. »", choices: ["you should", "should you", "you must not"], answer: 1 },
          { type: "speak", q: "Dis : « Non seulement il est en retard, mais il a oublié le dossier. »", answers: ["not only is he late, but he has forgotten the file", "not only is he late, but he forgot the file", "not only is he late, but he's forgotten the file", "not only is he late but he has also forgotten the file", "not only is he late, but he has also forgotten the file"] },
        ],
      },
      {
        id: "c1-hedging", title: "Nuancer ses propos",
        tip: "Un anglais avancé évite les affirmations brutales. On nuance avec <i>It seems that…</i>, <i>To some extent…</i>, <i>arguably</i> (on pourrait dire que), <i>tend to</i>, <i>might well</i>.",
        words: [["dans une certaine mesure", "to some extent"], ["on pourrait dire que", "arguably"], ["avoir tendance à", "to tend to"], ["il semblerait que", "it would seem that"], ["dans l'ensemble", "by and large"], ["plutôt", "rather"]],
        exercises: [
          { type: "qcm", q: "La version la plus nuancée :", choices: ["This is the best solution.", "This is arguably the best solution.", "This is best solution, sure."], answer: 1 },
          { type: "qcm", q: "« People ___ to overestimate their abilities. »", choices: ["tend", "are tending", "tendency"], answer: 0 },
          { type: "speak", q: "Dis : « Dans une certaine mesure, je suis d'accord avec toi. »", answers: ["to some extent, i agree with you", "to a certain extent, i agree with you", "i agree with you to some extent", "i agree with you to a certain extent"] },
        ],
      },
      {
        id: "c1-persuade", title: "Argumenter et convaincre",
        tip: "Structure ton argument : <i>First and foremost…</i>, <i>What's more…</i>, <i>Having said that…</i> (cela dit), <i>All things considered…</i>. Pour anticiper une objection : <i>Some might argue that…, but…</i>",
        words: [["avant tout", "first and foremost"], ["de plus", "what's more"], ["cela dit", "having said that"], ["tout bien considéré", "all things considered"], ["certains diront que", "some might argue that"], ["il va sans dire que", "it goes without saying that"]],
        exercises: [
          { type: "qcm", q: "« Cela dit » se traduit par :", choices: ["That said / Having said that", "This said / Said that", "That being saying"], answer: 0 },
          { type: "translate", q: "Il va sans dire que c'est important.", answers: ["it goes without saying that it's important", "it goes without saying that it is important", "it goes without saying that this is important"] },
          { type: "speak", q: "Dis : « Certains diront que c'est trop cher, mais ça vaut le coup. »", answers: ["some might argue that it's too expensive, but it's worth it", "some might argue that it is too expensive, but it is worth it", "some might say that it's too expensive, but it's worth it", "some might argue it's too expensive, but it's worth it"] },
        ],
      },
      {
        id: "c1-wish", title: "Regrets et souhaits (I wish, if only)",
        tip: "<b>I wish + prétérit</b> = regret présent : <i>I wish I <b>spoke</b> Spanish.</i> <b>I wish + past perfect</b> = regret passé : <i>I wish I <b>had studied</b> more.</i> <b>I wish + would</b> = agacement : <i>I wish you <b>would</b> stop!</i>",
        words: [["si seulement", "if only"], ["regretter", "to regret"], ["j'aurais dû", "I should have"], ["j'aurais pu", "I could have"], ["avec le recul", "in hindsight"]],
        exercises: [
          { type: "qcm", q: "« Je regrette de ne pas avoir étudié plus. »", choices: ["I wish I studied more.", "I wish I had studied more.", "I wish I would study more."], answer: 1 },
          { type: "qcm", q: "« J'aurais dû t'appeler. »", choices: ["I should have called you.", "I should called you.", "I must have called you."], answer: 0 },
          { type: "speak", q: "Dis : « Avec le recul, j'aurais dû accepter. »", answers: ["in hindsight, i should have accepted", "in hindsight, i should have said yes", "with hindsight, i should have accepted"] },
        ],
      },
    ],
  },
  {
    id: "C2", name: "Courant — sonner comme un natif",
    lessons: [
      {
        id: "c2-idioms", title: "Expressions idiomatiques",
        tip: "Pour sonner naturel : <i>to beat around the bush</i> (tourner autour du pot), <i>a blessing in disguise</i> (un mal pour un bien), <i>to cut corners</i> (bâcler), <i>to be on the fence</i> (hésiter), <i>to call it a day</i> (s'arrêter là pour aujourd'hui).",
        words: [["tourner autour du pot", "to beat around the bush"], ["un mal pour un bien", "a blessing in disguise"], ["bâcler", "to cut corners"], ["hésiter", "to be on the fence"], ["s'arrêter là pour aujourd'hui", "to call it a day"]],
        exercises: [
          { type: "qcm", q: "« Stop ___ and tell me the truth. »", choices: ["cutting corners", "beating around the bush", "being on the fence"], answer: 1 },
          { type: "qcm", q: "« Losing that job was ___ : I found a better one. »", choices: ["a blessing in disguise", "a piece of cake", "on the fence"], answer: 0 },
          { type: "speak", q: "Dis : « Il est tard, arrêtons-nous là pour aujourd'hui. »", answers: ["it's late, let's call it a day", "it is late, let's call it a day", "it's getting late, let's call it a day"] },
        ],
      },
      {
        id: "c2-understatement", title: "L'euphémisme britannique",
        tip: "Les Britanniques adorent minimiser : <i>not bad</i> = très bien, <i>a bit of a problem</i> = un gros problème, <i>I'm not entirely convinced</i> = je ne suis pas du tout d'accord, <i>with all due respect</i> = je pense que vous avez tort.",
        words: [["avec tout le respect que je vous dois", "with all due respect"], ["pas tout à fait convaincu", "not entirely convinced"], ["un petit souci", "a bit of an issue"], ["pas mal du tout", "not bad at all"], ["intéressant… (= douteux)", "that's an interesting idea"]],
        exercises: [
          { type: "qcm", q: "Un Britannique dit « I'm not entirely convinced ». Il pense :", choices: ["Je suis presque d'accord.", "Je ne suis pas d'accord du tout.", "Je n'ai pas compris."], answer: 1 },
          { type: "qcm", q: "« With all due respect… » annonce généralement :", choices: ["un compliment", "un désaccord", "un remerciement"], answer: 1 },
          { type: "speak", q: "Dis : « Avec tout le respect que je vous dois, je ne suis pas tout à fait convaincu. »", answers: ["with all due respect, i'm not entirely convinced", "with all due respect, i am not entirely convinced", "with all due respect, i'm not completely convinced"] },
        ],
      },
      {
        id: "c2-collocations", title: "Les collocations naturelles",
        tip: "Ce qui distingue un locuteur courant : les bonnes associations de mots. On dit <i><b>make</b> a decision</i>, <i><b>take</b> a break</i>, <i><b>pay</b> attention</i>, <i><b>heavy</b> rain</i>, <i><b>strong</b> coffee</i>, <i><b>commit</b> a crime</i>. Les traduire mot à mot du français trahit l'accent « frenchy ».",
        words: [["prendre une décision", "to make a decision"], ["faire une pause", "to take a break"], ["faire attention", "to pay attention"], ["une forte pluie", "heavy rain"], ["un café serré", "strong coffee"], ["faire des efforts", "to make an effort"]],
        exercises: [
          { type: "qcm", q: "« Prendre une décision » :", choices: ["take a decision", "make a decision", "do a decision"], answer: 1 },
          { type: "qcm", q: "« Une forte pluie » :", choices: ["strong rain", "heavy rain", "big rain"], answer: 1 },
          { type: "speak", q: "Dis : « Faisons une pause et prenons une décision demain. »", answers: ["let's take a break and make a decision tomorrow", "let us take a break and make a decision tomorrow"] },
        ],
      },
      {
        id: "c2-storytelling", title: "Raconter une histoire captivante",
        tip: "Pour tenir ton auditoire : <i>So, there I was…</i>, <i>Out of the blue…</i> (tout à coup), <i>To cut a long story short…</i> (bref), <i>You won't believe what happened next.</i> Le <b>présent de narration</b> rend le récit vivant : <i>So I walk in, and guess who's there?</i>",
        words: [["tout à coup", "out of the blue"], ["bref", "to cut a long story short"], ["devine quoi", "guess what"], ["tu ne vas pas le croire", "you won't believe it"], ["au final", "in the end"], ["par hasard", "by chance"]],
        exercises: [
          { type: "qcm", q: "« To cut a long story short » sert à :", choices: ["résumer et conclure", "commencer une histoire", "couper la parole"], answer: 0 },
          { type: "qcm", q: "« Out of the blue » veut dire :", choices: ["tristement", "soudain, sans prévenir", "en plein air"], answer: 1 },
          { type: "speak", q: "Dis : « Bref, on a raté l'avion. »", answers: ["to cut a long story short, we missed the plane", "to cut a long story short, we missed our flight", "to cut a long story short, we missed the flight", "long story short, we missed the plane", "long story short, we missed our flight"] },
        ],
      },
    ],
  },
];

// Insère les leçons supplémentaires à leur place dans la progression.
for (const lv of LEVELS) {
  for (const extra of EXTRA[lv.id] || []) {
    const { after, ...lesson } = extra;
    const at = after ? lv.lessons.findIndex((l) => l.id === after) : -1;
    lv.lessons.splice(at >= 0 ? at + 1 : lv.lessons.length, 0, lesson);
  }
}

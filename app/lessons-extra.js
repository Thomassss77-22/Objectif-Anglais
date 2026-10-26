// Leçons supplémentaires du parcours général, insérées dans data.js.
// « after » : identifiant de la leçon après laquelle insérer (sinon, en fin de niveau).
// Même format que data.js : fiche (tip), vocabulaire (words), exercices (qcm, translate, speak).
export const EXTRA = {
  A1: [
    {
      id: "a1-numbers", after: "a1-greetings", title: "Les nombres, l'âge et l'heure",
      tip: "Les nombres de 13 à 19 finissent par <b>-teen</b> (thir<b>TEEN</b>, accent sur la fin), les dizaines par <b>-ty</b> (<b>THIR</b>ty, accent au début) : ne les confonds pas ! L'heure : <i>It's three o'clock</i> (pile), <i>half past three</i> (et demie), <i>quarter to four</i> (moins le quart). Pour demander : <i>What time is it?</i>",
      words: [["quelle heure est-il ?", "what time is it?"], ["et demie", "half past"], ["et quart", "quarter past"], ["moins le quart", "quarter to"], ["treize", "thirteen"], ["trente", "thirty"]],
      exercises: [
        { type: "qcm", q: "« Il est 15 h 30 » :", choices: ["It's half past three.", "It's three and half.", "It's half three o'clock."], answer: 0 },
        { type: "qcm", q: "Comment écrit-on 40 ?", choices: ["fourty", "forty", "fourteen"], answer: 1 },
        { type: "translate", q: "Il est huit heures.", answers: ["it's eight o'clock", "it is eight o'clock", "it's eight", "it is eight"] },
        { type: "speak", q: "Dis : « Quelle heure est-il ? Il est sept heures et quart. »", answers: ["what time is it? it's quarter past seven", "what time is it? it's a quarter past seven", "what time is it? it is quarter past seven", "what time is it? it is a quarter past seven"] },
      ],
    },
    {
      id: "a1-articles", after: "a1-numbers", title: "A, an, the et le pluriel",
      tip: "<b>a</b> devant un son consonne (<i>a book, a university</i>), <b>an</b> devant un son voyelle (<i>an apple, an hour</i>). <b>the</b> = le, la, les, quand on sait de quoi on parle. Pas d'article pour une généralité : <i>I love music</i> (j'aime <u>la</u> musique). Pluriel en <b>-s</b>, avec des irréguliers : <i>man → men, woman → women, child → children, person → people</i>.",
      words: [["une pomme", "an apple"], ["une heure", "an hour"], ["les enfants", "children"], ["les gens", "people"], ["les femmes", "women"], ["j'aime la musique", "I love music"]],
      exercises: [
        { type: "qcm", q: "« ___ hour » :", choices: ["a", "an", "the a"], answer: 1 },
        { type: "qcm", q: "« J'aime le café » :", choices: ["I like the coffee.", "I like coffee.", "I like a coffee."], answer: 1 },
        { type: "qcm", q: "Le pluriel de « child » :", choices: ["childs", "childrens", "children"], answer: 2 },
        { type: "translate", q: "Elle a deux enfants.", answers: ["she has two children", "she's got two children", "she has got two children"] },
      ],
    },
    {
      id: "a1-family", after: "a1-questions", title: "Parler de sa famille",
      tip: "Pour la possession, on ajoute <b>'s</b> : <i>my brother<b>'s</b> car</i> (la voiture de mon frère). Les adjectifs possessifs : <i>my, your, his</i> (à lui), <i>her</i> (à elle), <i>our, their</i>. Attention : <i>his mother</i> = la mère de <b>lui</b>, <i>her mother</i> = la mère d'<b>elle</b>. « J'ai » : <i>I have</i> ou, en anglais britannique, <i>I've got</i>.",
      words: [["les parents", "parents"], ["le mari", "husband"], ["la femme (épouse)", "wife"], ["le fils", "son"], ["la fille (enfant)", "daughter"], ["sa mère (à elle)", "her mother"]],
      exercises: [
        { type: "qcm", q: "« La voiture de mon frère » :", choices: ["the car of my brother", "my brother's car", "my brothers car's"], answer: 1 },
        { type: "qcm", q: "Paul et sa sœur (la sœur de Paul) :", choices: ["Paul and her sister", "Paul and his sister", "Paul and its sister"], answer: 1 },
        { type: "translate", q: "Ma sœur s'appelle Julie.", answers: ["my sister's name is julie", "my sister is called julie", "my sister is named julie"] },
        { type: "speak", q: "Dis : « J'ai deux frères et une sœur. »", answers: ["i have two brothers and one sister", "i have two brothers and a sister", "i've got two brothers and one sister", "i've got two brothers and a sister"] },
      ],
    },
    {
      id: "a1-there-is", after: "a1-family", title: "There is, there are et les lieux",
      tip: "<b>There is</b> + singulier, <b>there are</b> + pluriel = il y a. Question : <i>Is there a bank near here?</i> Prépositions de lieu : <i>in</i> (dans), <i>on</i> (sur), <i>under</i> (sous), <i>next to</i> (à côté de), <i>between</i> (entre), <i>in front of</i> (devant), <i>behind</i> (derrière).",
      words: [["il y a (singulier)", "there is"], ["il y a (pluriel)", "there are"], ["sur la table", "on the table"], ["sous le lit", "under the bed"], ["à côté de la banque", "next to the bank"], ["derrière la maison", "behind the house"]],
      exercises: [
        { type: "qcm", q: "« ___ two banks in my street. »", choices: ["There is", "There are", "It has"], answer: 1 },
        { type: "qcm", q: "« Les clés sont sur la table » :", choices: ["The keys are in the table.", "The keys are on the table.", "The keys are at the table."], answer: 1 },
        { type: "translate", q: "Est-ce qu'il y a une pharmacie près d'ici ?", answers: ["is there a pharmacy near here?", "is there a chemist's near here?", "is there a pharmacy nearby?", "is there a chemist near here?"] },
        { type: "speak", q: "Dis : « Il y a un café à côté de la gare. »", answers: ["there is a café next to the station", "there's a café next to the station", "there is a cafe next to the station", "there's a cafe next to the station"] },
      ],
    },
    {
      id: "a1-can", after: "a1-present", title: "Can : savoir, pouvoir, demander",
      tip: "<b>Can</b> exprime la capacité (<i>I can swim</i>), la permission (<i>Can I sit here?</i>) et la demande (<i>Can you help me?</i>). Il ne change jamais : <i>he can</i> (pas de -s), et il est suivi de la base verbale sans <i>to</i>. Négation : <b>can't</b> (<i>cannot</i>). Plus poli : <b>could</b> — <i>Could you open the window?</i>",
      words: [["je sais nager", "I can swim"], ["je ne peux pas venir", "I can't come"], ["puis-je… ?", "can I…?"], ["pourriez-vous… ?", "could you…?"], ["aider", "to help"], ["parler anglais", "to speak English"]],
      exercises: [
        { type: "qcm", q: "Phrase correcte :", choices: ["She can to drive.", "She cans drive.", "She can drive."], answer: 2 },
        { type: "qcm", q: "La demande la plus polie :", choices: ["Open the window.", "Could you open the window, please?", "You open the window."], answer: 1 },
        { type: "translate", q: "Je ne sais pas cuisiner.", answers: ["i can't cook", "i cannot cook", "i can not cook"] },
        { type: "speak", q: "Dis : « Pouvez-vous m'aider, s'il vous plaît ? »", answers: ["can you help me, please?", "could you help me, please?", "can you help me please?", "could you help me please?"] },
      ],
    },
    {
      id: "a1-continuous", after: "a1-can", title: "En ce moment (présent continu)",
      tip: "Pour ce qui se passe <b>maintenant</b> : <b>be + verbe-ing</b>. <i>I'm working, she's sleeping, they're eating.</i> Comparer : <i>I work in a bank</i> (habitude) / <i>I'm working at home today</i> (en ce moment). Mots-repères : <i>now, right now, at the moment, today, look!</i>",
      words: [["en ce moment", "at the moment"], ["maintenant", "now"], ["je travaille (en ce moment)", "I'm working"], ["il dort", "he's sleeping"], ["qu'est-ce que tu fais ?", "what are you doing?"], ["regarde !", "look!"]],
      exercises: [
        { type: "qcm", q: "« Chut, le bébé dort ! » :", choices: ["Shh, the baby sleeps!", "Shh, the baby is sleeping!", "Shh, the baby sleeping!"], answer: 1 },
        { type: "qcm", q: "« Je travaille dans une banque » (métier) :", choices: ["I work in a bank.", "I'm working in a bank."], answer: 0 },
        { type: "translate", q: "Qu'est-ce que tu fais ?", answers: ["what are you doing?"] },
        { type: "speak", q: "Dis : « En ce moment, j'apprends l'anglais. »", answers: ["at the moment, i'm learning english", "at the moment, i am learning english", "at the moment i'm learning english", "i'm learning english at the moment", "right now, i'm learning english"] },
      ],
    },
    {
      id: "a1-dates", after: "a1-continuous", title: "Jours, mois et dates",
      tip: "Les jours et les mois prennent une <b>majuscule</b> : <i>Monday, July</i>. Prépositions de temps : <b>at</b> + heure (<i>at 6 pm</i>), <b>on</b> + jour ou date (<i>on Monday, on 14 July</i>), <b>in</b> + mois, année, saison (<i>in July, in 2025, in summer</i>). Mais <i>at the weekend</i> (UK) / <i>on the weekend</i> (US), et <i>at night</i>.",
      words: [["lundi", "Monday"], ["mercredi", "Wednesday"], ["juillet", "July"], ["le week-end", "the weekend"], ["mon anniversaire", "my birthday"], ["la semaine prochaine", "next week"]],
      exercises: [
        { type: "qcm", q: "« ___ Monday » :", choices: ["in", "on", "at"], answer: 1 },
        { type: "qcm", q: "« ___ July » :", choices: ["in", "on", "at"], answer: 0 },
        { type: "qcm", q: "« ___ seven o'clock » :", choices: ["in", "on", "at"], answer: 2 },
        { type: "speak", q: "Dis : « Mon anniversaire est le 3 mai. »", answers: ["my birthday is on the third of may", "my birthday is on may the third", "my birthday is on may third", "my birthday is the third of may", "my birthday is on 3 may", "my birthday is on may 3"] },
      ],
    },
    {
      id: "a1-shopping", title: "Faire des courses",
      tip: "<b>How much is it?</b> (combien ça coûte ?) ; <b>How much are they?</b> au pluriel. Pour montrer : <b>this</b> (ce… -ci, proche), <b>that</b> (ce… -là, loin), <b>these / those</b> au pluriel. Pour demander poliment : <i>Do you have this in a smaller size?</i>, <i>Can I pay by card?</i>",
      words: [["combien ça coûte ?", "how much is it?"], ["celui-ci", "this one"], ["ceux-là", "those"], ["payer par carte", "to pay by card"], ["la taille", "the size"], ["trop cher", "too expensive"]],
      exercises: [
        { type: "qcm", q: "« Combien coûtent ces chaussures ? » :", choices: ["How much is these shoes?", "How much are these shoes?", "How many are these shoes?"], answer: 1 },
        { type: "qcm", q: "Pour un objet loin de toi :", choices: ["this", "that", "these"], answer: 1 },
        { type: "translate", q: "Est-ce que je peux payer par carte ?", answers: ["can i pay by card?", "could i pay by card?", "can i pay with a card?", "can i pay by credit card?"] },
        { type: "speak", q: "Dis : « C'est trop cher. Vous avez quelque chose de moins cher ? »", answers: ["it's too expensive. do you have anything cheaper?", "it is too expensive. do you have anything cheaper?", "it's too expensive. do you have something cheaper?", "it is too expensive. do you have something cheaper?"] },
      ],
    },
  ],
  A2: [
    {
      id: "a2-past-continuous", after: "a2-past", title: "Ce que je faisais (past continuous)",
      tip: "<b>was / were + -ing</b> : une action en cours dans le passé, souvent interrompue par une action courte au prétérit. <i>I <b>was cooking</b> when the phone <b>rang</b>.</i> <i>While</i> + action longue : <i>While we were watching TV, the lights went out.</i>",
      words: [["pendant que", "while"], ["quand", "when"], ["sonner", "to ring (rang)"], ["je cuisinais", "I was cooking"], ["soudain", "suddenly"], ["tomber en panne (électricité)", "to go out"]],
      exercises: [
        { type: "qcm", q: "« I ___ a shower when you called. »", choices: ["took", "was taking", "am taking"], answer: 1 },
        { type: "qcm", q: "« While they ___, it started to rain. »", choices: ["walked", "were walking", "are walking"], answer: 1 },
        { type: "translate", q: "Je lisais quand il est arrivé.", answers: ["i was reading when he arrived", "i was reading when he came"] },
        { type: "speak", q: "Dis : « Il pleuvait quand je suis sorti. »", answers: ["it was raining when i went out", "it was raining when i left", "it was raining when i got out"] },
      ],
    },
    {
      id: "a2-comparatives", after: "a2-past-continuous", title: "Comparer",
      tip: "Adjectif court : <b>-er than</b> / <b>the -est</b> (<i>cheaper than, the cheapest</i>). Adjectif long : <b>more … than</b> / <b>the most</b> (<i>more expensive, the most expensive</i>). Irréguliers : <i>good → better → the best</i>, <i>bad → worse → the worst</i>, <i>far → further</i>. Égalité : <i>as … as</i> (<i>as tall as</i>).",
      words: [["meilleur", "better"], ["le meilleur", "the best"], ["pire", "worse"], ["plus cher que", "more expensive than"], ["aussi grand que", "as tall as"], ["le plus facile", "the easiest"]],
      exercises: [
        { type: "qcm", q: "« Londres est plus grand que Paris. »", choices: ["London is more big than Paris.", "London is bigger than Paris.", "London is bigger that Paris."], answer: 1 },
        { type: "qcm", q: "« C'est le meilleur film de l'année. »", choices: ["It's the better film of the year.", "It's the best film of the year.", "It's the most good film of the year."], answer: 1 },
        { type: "translate", q: "Mon frère est plus âgé que moi.", answers: ["my brother is older than me", "my brother is older than i am", "my brother is older than i"] },
        { type: "speak", q: "Dis : « Le train est plus rapide mais plus cher que le bus. »", answers: ["the train is faster but more expensive than the bus", "the train is quicker but more expensive than the bus"] },
      ],
    },
    {
      id: "a2-quantities", after: "a2-comparatives", title: "Much, many, some, any",
      tip: "<b>many</b> + dénombrable pluriel (<i>many people</i>), <b>much</b> + indénombrable (<i>much money</i>), surtout dans les questions et négations ; à l'affirmatif on dit plutôt <b>a lot of</b>. <b>some</b> à l'affirmatif, <b>any</b> dans les questions et négations : <i>I have some bread / I don't have any milk / Do you have any questions?</i> Pour proposer : <i>Would you like some tea?</i>",
      words: [["beaucoup de (dénombrable)", "many"], ["beaucoup de (indénombrable)", "much"], ["beaucoup de", "a lot of"], ["quelques", "a few"], ["un peu de", "a little"], ["pas de lait", "no milk"]],
      exercises: [
        { type: "qcm", q: "« How ___ people were there? »", choices: ["much", "many", "lot"], answer: 1 },
        { type: "qcm", q: "« Do you have ___ questions? »", choices: ["some", "any", "a"], answer: 1 },
        { type: "qcm", q: "« I don't have ___ time. »", choices: ["many", "much", "a few"], answer: 1 },
        { type: "speak", q: "Dis : « Il n'y a plus de lait. Tu veux du thé ? »", answers: ["there isn't any milk. would you like some tea?", "there is no milk. would you like some tea?", "there's no milk. would you like some tea?", "there isn't any milk left. would you like some tea?", "there's no milk left. would you like some tea?"] },
      ],
    },
    {
      id: "a2-ever", after: "a2-quantities", title: "Expériences : have you ever…?",
      tip: "Pour parler d'une expérience <b>sans date</b> : present perfect (<b>have + participe passé</b>). <i>Have you ever been to London?</i> — <i>Yes, I have. / No, never.</i> Dès qu'on donne une date, prétérit : <i>I went there <b>in 2019</b>.</i> <i>been</i> = allé et revenu ; <i>gone</i> = parti (et pas revenu).",
      words: [["déjà (dans une question)", "ever"], ["jamais", "never"], ["déjà", "already"], ["pas encore", "yet"], ["je suis déjà allé à…", "I've been to…"], ["une fois, deux fois", "once, twice"]],
      exercises: [
        { type: "qcm", q: "« ___ you ever eaten sushi? »", choices: ["Did", "Have", "Are"], answer: 1 },
        { type: "qcm", q: "« Je suis allé à Rome en 2022. »", choices: ["I've been to Rome in 2022.", "I went to Rome in 2022."], answer: 1 },
        { type: "translate", q: "Je n'ai jamais vu la mer.", answers: ["i have never seen the sea", "i've never seen the sea"] },
        { type: "speak", q: "Dis : « Est-ce que tu es déjà allé aux États-Unis ? »", answers: ["have you ever been to the united states?", "have you ever been to the us?", "have you ever been to the usa?", "have you ever been to america?"] },
      ],
    },
    {
      id: "a2-advice", after: "a2-future", title: "Conseils et obligations",
      tip: "<b>should</b> = conseil (<i>You should rest</i>). <b>must</b> = obligation forte, souvent personnelle ou écrite (<i>You must wear a seatbelt</i>). <b>have to</b> = obligation extérieure (<i>I have to work on Saturday</i>). Attention : <b>mustn't</b> = interdiction, <b>don't have to</b> = ce n'est pas nécessaire.",
      words: [["tu devrais", "you should"], ["je dois", "I have to"], ["il ne faut pas", "you mustn't"], ["ce n'est pas obligatoire", "you don't have to"], ["se reposer", "to rest"], ["un conseil", "a piece of advice"]],
      exercises: [
        { type: "qcm", q: "« Tu ne dois pas fumer ici » (interdiction) :", choices: ["You don't have to smoke here.", "You mustn't smoke here.", "You shouldn't to smoke here."], answer: 1 },
        { type: "qcm", q: "« Ce n'est pas la peine de venir » :", choices: ["You mustn't come.", "You don't have to come.", "You shouldn't come."], answer: 1 },
        { type: "translate", q: "Tu devrais voir un médecin.", answers: ["you should see a doctor", "you should go to the doctor", "you should go and see a doctor"] },
        { type: "speak", q: "Dis : « Je dois partir tôt demain. »", answers: ["i have to leave early tomorrow", "i must leave early tomorrow", "i need to leave early tomorrow", "i've got to leave early tomorrow"] },
      ],
    },
    {
      id: "a2-doctor", after: "a2-directions", title: "Chez le médecin",
      tip: "Pour dire où l'on a mal : <b>my … hurts</b> (<i>my back hurts</i>) ou <b>I've got a …ache</b> (<i>headache, stomachache, toothache</i>). Autres symptômes : <i>I've got a sore throat, a cough, a temperature</i> (de la fièvre). <i>I feel sick</i> = j'ai la nausée (UK). Le médecin : <i>What seems to be the problem?</i>",
      words: [["j'ai mal à la tête", "I've got a headache"], ["j'ai mal à la gorge", "I've got a sore throat"], ["de la fièvre", "a temperature"], ["une ordonnance", "a prescription"], ["prendre rendez-vous", "to make an appointment"], ["la pharmacie", "the pharmacy"]],
      exercises: [
        { type: "qcm", q: "« J'ai mal au dos » :", choices: ["I have back.", "My back hurts.", "I'm hurting my back."], answer: 1 },
        { type: "qcm", q: "« J'ai de la fièvre » :", choices: ["I've got a fever of heat.", "I've got a temperature.", "I am hot of fever."], answer: 1 },
        { type: "translate", q: "Je voudrais prendre rendez-vous.", answers: ["i'd like to make an appointment", "i would like to make an appointment", "i'd like to book an appointment", "i would like to book an appointment"] },
        { type: "speak", q: "Dis : « J'ai mal à la gorge depuis trois jours. »", answers: ["i've had a sore throat for three days", "i have had a sore throat for three days"] },
      ],
    },
    {
      id: "a2-hotel", after: "a2-doctor", title: "À l'hôtel",
      tip: "Arriver : <i>I have a reservation / a booking under the name Martin.</i> Demander : <i>What time is breakfast? Is breakfast included? Could I have a wake-up call?</i> Se plaindre poliment : <i>I'm afraid the air conditioning isn't working.</i> Partir : <i>I'd like to check out.</i>",
      words: [["une réservation", "a booking"], ["au nom de", "under the name"], ["le petit-déjeuner est-il compris ?", "is breakfast included?"], ["une chambre double", "a double room"], ["libérer la chambre", "to check out"], ["la clé de la chambre", "the room key"]],
      exercises: [
        { type: "qcm", q: "Pour signaler poliment un problème :", choices: ["Your air conditioning is broken!", "I'm afraid the air conditioning isn't working.", "Air conditioning no work."], answer: 1 },
        { type: "qcm", q: "« Le petit-déjeuner est-il compris ? »", choices: ["Is breakfast included?", "Is breakfast understood?", "Is breakfast comprised?"], answer: 0 },
        { type: "translate", q: "J'ai une réservation au nom de Martin.", answers: ["i have a reservation under the name martin", "i have a booking under the name martin", "i have a reservation in the name of martin", "i have a booking in the name of martin", "i've got a reservation under the name martin"] },
        { type: "speak", q: "Dis : « Je voudrais une chambre double pour deux nuits. »", answers: ["i'd like a double room for two nights", "i would like a double room for two nights"] },
      ],
    },
    {
      id: "a2-invitations", after: "a2-likes", title: "Inviter, accepter, refuser",
      tip: "Inviter : <i>Would you like to come to dinner on Friday?</i> / <i>Do you fancy a coffee?</i> (UK, familier). Accepter : <i>I'd love to! / That sounds great.</i> Refuser poliment, toujours avec une raison : <i>I'm sorry, I can't. I'm busy on Friday. Maybe another time?</i> Attention : <i>Would you like…?</i> se répond par <i>Yes, I'd love to</i>, pas <i>Yes, I like</i>.",
      words: [["ça te dirait de… ?", "would you like to…?"], ["avec plaisir !", "I'd love to!"], ["ça a l'air super", "that sounds great"], ["une autre fois", "another time"], ["je suis pris", "I'm busy"], ["un dîner", "a dinner"]],
      exercises: [
        { type: "qcm", q: "« Would you like to come? » — réponse positive :", choices: ["Yes, I like.", "Yes, I'd love to.", "Yes, I would like."], answer: 1 },
        { type: "qcm", q: "Refuser poliment :", choices: ["No.", "I don't want.", "I'm sorry, I can't. Maybe another time?"], answer: 2 },
        { type: "translate", q: "Ça te dirait d'aller au cinéma samedi ?", answers: ["would you like to go to the cinema on saturday?", "do you want to go to the cinema on saturday?", "would you like to go to the movies on saturday?", "do you fancy going to the cinema on saturday?"] },
        { type: "speak", q: "Dis : « Avec plaisir ! À quelle heure ? »", answers: ["i'd love to! what time?", "i would love to! what time?", "i'd love to! at what time?", "i'd love to. what time?"] },
      ],
    },
  ],
  B1: [
    {
      id: "b1-used-to", after: "b1-present-perfect", title: "Les habitudes passées (used to)",
      tip: "<b>used to + verbe</b> = « avant, je… » (habitude ou état passé, fini aujourd'hui) : <i>I used to live in Lyon.</i> Négation : <i>I didn't <b>use</b> to</i> (sans d). Question : <i>Did you use to…?</i> Ne confonds pas avec <b>be used to + -ing</b> = être habitué à : <i>I'm used to getting up early.</i> Et <b>get used to</b> = s'habituer à.",
      words: [["avant, je jouais", "I used to play"], ["être habitué à", "to be used to"], ["s'habituer à", "to get used to"], ["quand j'étais enfant", "when I was a child"], ["plus maintenant", "not anymore"], ["à l'époque", "back then"]],
      exercises: [
        { type: "qcm", q: "« Avant, je fumais (j'ai arrêté) » :", choices: ["I used to smoke.", "I'm used to smoke.", "I use to smoking."], answer: 0 },
        { type: "qcm", q: "« Je suis habitué à travailler tard » :", choices: ["I used to work late.", "I'm used to working late.", "I'm used to work late."], answer: 1 },
        { type: "translate", q: "Avant, j'habitais à Paris.", answers: ["i used to live in paris"] },
        { type: "speak", q: "Dis : « Je ne suis pas habitué au froid. »", answers: ["i'm not used to the cold", "i am not used to the cold", "i'm not used to cold weather", "i'm not used to the cold weather"] },
      ],
    },
    {
      id: "b1-passive", after: "b1-used-to", title: "La voix passive",
      tip: "Passif = <b>be + participe passé</b>. On l'utilise quand l'auteur de l'action est inconnu ou peu important : <i>My bike <b>was stolen</b>.</i> (on m'a volé mon vélo). Le « on » français se traduit souvent par un passif : <i>English <b>is spoken</b> here.</i> L'auteur s'introduit avec <b>by</b> : <i>written <b>by</b> Orwell</i>. Le temps se porte sur <i>be</i> : <i>is built, was built, has been built, will be built</i>.",
      words: [["a été volé", "was stolen"], ["est fabriqué en", "is made in"], ["a été construit", "was built"], ["écrit par", "written by"], ["on m'a dit que", "I was told that"], ["on parle anglais ici", "English is spoken here"]],
      exercises: [
        { type: "qcm", q: "« On m'a volé mon téléphone » :", choices: ["My phone was stolen.", "My phone stole.", "One stole my phone."], answer: 0 },
        { type: "qcm", q: "« Ce pont a été construit en 1890 » :", choices: ["This bridge built in 1890.", "This bridge was built in 1890.", "This bridge has built in 1890."], answer: 1 },
        { type: "translate", q: "Ce livre a été écrit par une Française.", answers: ["this book was written by a french woman", "this book was written by a frenchwoman", "this book was written by a french writer"] },
        { type: "speak", q: "Dis : « On m'a dit d'attendre ici. »", answers: ["i was told to wait here", "i've been told to wait here", "i have been told to wait here"] },
      ],
    },
    {
      id: "b1-relative", after: "b1-opinion", title: "Who, which, that, where, whose",
      tip: "Pour relier deux idées : <b>who</b> (personnes), <b>which</b> (choses), <b>that</b> (les deux, à l'oral), <b>where</b> (lieu), <b>whose</b> (dont, possession). <i>The man <b>who</b> called you… / The town <b>where</b> I grew up… / A friend <b>whose</b> father is a lawyer…</i> Quand le relatif est complément, on peut l'omettre : <i>The film (that) I saw.</i> Pas de « what » : ✗ <i>the book what I read</i>.",
      words: [["l'homme qui", "the man who"], ["la ville où", "the town where"], ["le livre que", "the book that"], ["dont le père", "whose father"], ["ce que", "what"], ["la raison pour laquelle", "the reason why"]],
      exercises: [
        { type: "qcm", q: "« La femme ___ habite à côté est médecin. »", choices: ["which", "who", "where"], answer: 1 },
        { type: "qcm", q: "« Un ami dont la sœur est actrice » :", choices: ["a friend who sister is an actress", "a friend whose sister is an actress", "a friend which sister is an actress"], answer: 1 },
        { type: "translate", q: "C'est la ville où je suis né.", answers: ["this is the town where i was born", "it's the town where i was born", "this is the city where i was born", "it's the city where i was born"] },
        { type: "speak", q: "Dis : « Le film que j'ai vu hier était génial. »", answers: ["the film i saw yesterday was great", "the film that i saw yesterday was great", "the movie i saw yesterday was great", "the movie that i saw yesterday was great", "the film which i saw yesterday was great"] },
      ],
    },
    {
      id: "b1-reported", after: "b1-relative", title: "Rapporter des paroles",
      tip: "Discours indirect : on recule d'un temps. <i>« I'm tired » → She said (that) she <b>was</b> tired.</i> <i>« I will call » → He said he <b>would</b> call.</i> <b>say</b> s'emploie sans complément de personne (<i>she said that…</i>), <b>tell</b> avec : <i>she <b>told me</b> that…</i> Questions : pas d'inversion, <i>He asked me <b>where I lived</b></i> (✗ where did I live). Ordre ou demande : <i>She asked me <b>to</b> wait.</i>",
      words: [["il a dit que", "he said that"], ["elle m'a dit que", "she told me that"], ["il m'a demandé si", "he asked me if"], ["elle m'a demandé de", "she asked me to"], ["il a expliqué que", "he explained that"], ["d'après lui", "according to him"]],
      exercises: [
        { type: "qcm", q: "« She ___ me she was late. »", choices: ["said", "told", "says"], answer: 1 },
        { type: "qcm", q: "« Where do you live? » → He asked me…", choices: ["where did I live.", "where I lived.", "where do I live."], answer: 1 },
        { type: "translate", q: "Il a dit qu'il était fatigué.", answers: ["he said he was tired", "he said that he was tired"] },
        { type: "speak", q: "Dis : « Elle m'a demandé de l'appeler. »", answers: ["she asked me to call her", "she asked me to phone her", "she asked me to ring her"] },
      ],
    },
    {
      id: "b1-deduction", after: "b1-phone", title: "Faire des suppositions (must, might, can't)",
      tip: "Pour deviner : <b>must</b> = sûrement (<i>He must be tired, he worked all night</i>), <b>might / may / could</b> = peut-être (<i>She might be at home</i>), <b>can't</b> = c'est impossible (<i>It can't be true!</i>). Au passé : <b>must have + participe</b> (<i>You must have been scared</i>), <b>might have</b>, <b>can't have</b>. Attention : le contraire de <i>must</i> ici est <i>can't</i>, pas <i>mustn't</i>.",
      words: [["ça doit être", "it must be"], ["c'est peut-être", "it might be"], ["ce n'est pas possible", "it can't be"], ["tu as dû avoir peur", "you must have been scared"], ["il a peut-être oublié", "he might have forgotten"], ["sans doute", "probably"]],
      exercises: [
        { type: "qcm", q: "Les lumières sont éteintes. « They ___ be out. » (sûrement)", choices: ["must", "can't", "mustn't"], answer: 0 },
        { type: "qcm", q: "« Ce n'est pas possible que ce soit lui, il est à Tokyo » :", choices: ["It mustn't be him.", "It can't be him.", "It might not be him."], answer: 1 },
        { type: "translate", q: "Elle est peut-être malade.", answers: ["she might be ill", "she might be sick", "she may be ill", "she may be sick", "she could be ill", "she could be sick", "maybe she's ill", "maybe she's sick"] },
        { type: "speak", q: "Dis : « Il a dû oublier. »", answers: ["he must have forgotten", "he must've forgotten"] },
      ],
    },
    {
      id: "b1-gerund", after: "b1-deduction", title: "Verbe + -ing ou verbe + to ?",
      tip: "Certains verbes sont suivis de <b>-ing</b> : <i>enjoy, avoid, finish, mind, suggest, keep</i> (<i>I enjoy cooking</i>). D'autres de <b>to</b> : <i>want, decide, hope, plan, agree, refuse, need</i> (<i>I decided to leave</i>). Après une préposition, toujours <b>-ing</b> : <i>I'm interested <b>in learning</b></i>, <i>before <b>leaving</b></i>, <i>I look forward to <b>seeing</b> you</i>. <i>stop smoking</i> = arrêter de fumer ; <i>stop to smoke</i> = s'arrêter pour fumer.",
      words: [["j'aime beaucoup cuisiner", "I enjoy cooking"], ["éviter de", "to avoid"], ["j'ai décidé de", "I decided to"], ["ça vous dérange de… ?", "do you mind…?"], ["j'ai hâte de te voir", "I look forward to seeing you"], ["arrêter de fumer", "to stop smoking"]],
      exercises: [
        { type: "qcm", q: "« I'm thinking about ___ a new job. »", choices: ["to find", "finding", "find"], answer: 1 },
        { type: "qcm", q: "« She refused ___ the contract. »", choices: ["to sign", "signing", "sign"], answer: 0 },
        { type: "translate", q: "Ça vous dérange de fermer la fenêtre ?", answers: ["do you mind closing the window?", "would you mind closing the window?", "do you mind shutting the window?", "would you mind shutting the window?"] },
        { type: "speak", q: "Dis : « J'ai hâte de te voir. »", answers: ["i look forward to seeing you", "i'm looking forward to seeing you", "i am looking forward to seeing you", "i can't wait to see you"] },
      ],
    },
    {
      id: "b1-travel-problems", after: "b1-conditional", title: "Problèmes en voyage",
      tip: "Vol annulé, bagage perdu, chambre bruyante : reste poli mais précis. <i>My flight <b>has been cancelled</b>. What are my options?</i> <i>My luggage <b>didn't arrive</b>.</i> <i>Could I speak to the manager, please?</i> Pour obtenir quelque chose : <i>Would it be possible to…?</i> et <i>I'd like a refund</i> (un remboursement). Note les mots utiles : <i>delay</i> (retard), <i>connection</i> (correspondance), <i>boarding pass</i> (carte d'embarquement).",
      words: [["un retard", "a delay"], ["annulé", "cancelled"], ["une correspondance", "a connection"], ["la carte d'embarquement", "the boarding pass"], ["un remboursement", "a refund"], ["mes bagages", "my luggage"]],
      exercises: [
        { type: "qcm", q: "« J'ai raté ma correspondance » :", choices: ["I lost my connection.", "I missed my connection.", "I failed my correspondence."], answer: 1 },
        { type: "qcm", q: "Demander poliment :", choices: ["I want another room.", "Give me another room.", "Would it be possible to change rooms?"], answer: 2 },
        { type: "translate", q: "Mon vol a été annulé.", answers: ["my flight has been cancelled", "my flight was cancelled", "my flight has been canceled", "my flight was canceled"] },
        { type: "speak", q: "Dis : « Mes bagages ne sont pas arrivés. »", answers: ["my luggage didn't arrive", "my luggage hasn't arrived", "my bags didn't arrive", "my bags haven't arrived", "my baggage didn't arrive", "my baggage hasn't arrived"] },
      ],
    },
    {
      id: "b1-interview", title: "L'entretien d'embauche",
      tip: "Parle de ton parcours au prétérit (<i>I <b>worked</b> for a bank for three years</i>) et de ta situation actuelle au present perfect (<i>I<b>'ve been</b> a teacher since 2019</i>). Phrases clés : <i>I'm responsible for…</i> (je suis chargé de), <i>I'm good at…</i>, <i>My main strength is…</i>, <i>I'd like to develop my skills in…</i> « Expérience » au sens professionnel est indénombrable : <i>I have a lot of experience</i> (✗ experiences).",
      words: [["un entretien", "a job interview"], ["mon point fort", "my main strength"], ["je suis chargé de", "I'm responsible for"], ["les compétences", "skills"], ["un salaire", "a salary"], ["postuler à", "to apply for"]],
      exercises: [
        { type: "qcm", q: "« J'ai beaucoup d'expérience » :", choices: ["I have a lot of experiences.", "I have many experience.", "I have a lot of experience."], answer: 2 },
        { type: "qcm", q: "« Je suis prof depuis 2019 » :", choices: ["I'm a teacher since 2019.", "I've been a teacher since 2019.", "I was a teacher since 2019."], answer: 1 },
        { type: "translate", q: "Je voudrais postuler pour ce poste.", answers: ["i'd like to apply for this job", "i would like to apply for this job", "i'd like to apply for this position", "i would like to apply for this position", "i'd like to apply for this post", "i'd like to apply for the job", "i'd like to apply for the position"] },
        { type: "speak", q: "Dis : « Je suis chargé de l'équipe commerciale. »", answers: ["i'm responsible for the sales team", "i am responsible for the sales team", "i'm in charge of the sales team", "i am in charge of the sales team"] },
      ],
    },
  ],
  B2: [
    {
      id: "b2-third-conditional", after: "b2-false-friends", title: "Refaire le passé (if I had known)",
      tip: "Pour imaginer un passé différent : <b>if + past perfect, would have + participe</b>. <i>If I <b>had known</b>, I <b>would have come</b>.</i> (si j'avais su, je serais venu). À l'oral : <i>If I'd known, I'd have come.</i> Variante : <i>could have</i> (j'aurais pu), <i>should have</i> (j'aurais dû). Mélange passé/présent : <i>If I had taken the job, I <b>would be</b> rich now.</i> Jamais de <i>would</i> après <i>if</i> : ✗ <i>if I would have known</i>.",
      words: [["si j'avais su", "if I had known"], ["je serais venu", "I would have come"], ["j'aurais dû", "I should have"], ["j'aurais pu", "I could have"], ["sinon", "otherwise"], ["à ta place", "if I were you"]],
      exercises: [
        { type: "qcm", q: "« If we ___ earlier, we wouldn't have missed the train. »", choices: ["left", "had left", "would have left"], answer: 1 },
        { type: "qcm", q: "« J'aurais dû t'écouter » :", choices: ["I should have listened to you.", "I should listen to you.", "I must have listened to you."], answer: 0 },
        { type: "translate", q: "Si j'avais su, je serais venu.", answers: ["if i had known, i would have come", "if i'd known, i would have come", "if i'd known, i'd have come", "if i had known, i'd have come"] },
        { type: "speak", q: "Dis : « J'aurais pu t'aider. »", answers: ["i could have helped you", "i could've helped you"] },
      ],
    },
    {
      id: "b2-future-forms", after: "b2-third-conditional", title: "Le futur en détail",
      tip: "<b>Future continuous</b> pour une action en cours à un moment futur : <i>This time tomorrow, I<b>'ll be flying</b> to Rome.</i> <b>Future perfect</b> pour une action terminée avant un moment futur : <i>By June, I<b>'ll have finished</b> my degree.</i> Rendez-vous déjà fixé : présent continu (<i>I'm meeting Tom at six</i>). Horaire officiel : présent simple (<i>The train <b>leaves</b> at 8</i>). Après <i>when / as soon as</i>, pas de will : <i>I'll call you when I <b>arrive</b></i>.",
      words: [["d'ici juin", "by June"], ["à cette heure-ci demain", "this time tomorrow"], ["j'aurai fini", "I'll have finished"], ["dès que", "as soon as"], ["je serai en train de travailler", "I'll be working"], ["le train part à", "the train leaves at"]],
      exercises: [
        { type: "qcm", q: "« Je t'appelle quand j'arrive » :", choices: ["I'll call you when I'll arrive.", "I'll call you when I arrive.", "I call you when I will arrive."], answer: 1 },
        { type: "qcm", q: "« D'ici 2030, nous aurons construit l'usine » :", choices: ["By 2030, we will build the factory.", "By 2030, we will have built the factory.", "Until 2030, we have built the factory."], answer: 1 },
        { type: "translate", q: "Demain à cette heure-ci, je serai en train de travailler.", answers: ["this time tomorrow, i'll be working", "this time tomorrow, i will be working", "tomorrow at this time, i'll be working", "at this time tomorrow, i'll be working", "at this time tomorrow, i will be working"] },
        { type: "speak", q: "Dis : « J'aurai fini avant midi. »", answers: ["i'll have finished before noon", "i will have finished before noon", "i'll have finished by noon", "i will have finished by noon", "i'll have finished before midday", "i'll have finished by midday"] },
      ],
    },
    {
      id: "b2-perfect-continuous", after: "b2-phrasal", title: "Depuis combien de temps ? (for, since)",
      tip: "« Je travaille ici depuis 3 ans » ne se dit pas au présent : <i>I<b>'ve been working</b> here <b>for</b> three years.</i> <b>for</b> + durée (<i>for two hours</i>), <b>since</b> + point de départ (<i>since Monday, since 2020</i>). Le <b>present perfect continuous</b> insiste sur la durée ou une activité récente aux effets visibles : <i>You look tired. — I<b>'ve been running</b>.</i> Avec les verbes d'état, present perfect simple : <i>I've known her for years</i>.",
      words: [["depuis trois ans", "for three years"], ["depuis lundi", "since Monday"], ["depuis combien de temps… ?", "how long have you been…?"], ["je la connais depuis des années", "I've known her for years"], ["ça fait longtemps", "it's been a long time"], ["récemment", "lately"]],
      exercises: [
        { type: "qcm", q: "« J'apprends l'anglais depuis 2021 » :", choices: ["I learn English since 2021.", "I've been learning English since 2021.", "I've been learning English for 2021."], answer: 1 },
        { type: "qcm", q: "« Je la connais depuis dix ans » :", choices: ["I've known her for ten years.", "I know her since ten years.", "I've been knowing her for ten years."], answer: 0 },
        { type: "translate", q: "Depuis combien de temps habites-tu ici ?", answers: ["how long have you been living here?", "how long have you lived here?"] },
        { type: "speak", q: "Dis : « J'attends depuis une heure. »", answers: ["i've been waiting for an hour", "i have been waiting for an hour", "i've been waiting for one hour"] },
      ],
    },
    {
      id: "b2-linkers", after: "b2-perfect-continuous", title: "Les mots de liaison",
      tip: "Opposer : <b>although</b> + phrase (<i>Although it was late, we went out</i>), <b>despite / in spite of</b> + nom ou -ing (<i>Despite the rain…</i>, ✗ despite it rained), <b>however</b> en début de phrase (<i>However, …</i>), <b>whereas</b> pour un contraste (<i>I'm tall, whereas my brother is short</i>). Ajouter : <i>moreover, besides, what's more</i>. Conséquence : <i>therefore, as a result, so</i>.",
      words: [["bien que", "although"], ["malgré", "despite"], ["cependant", "however"], ["alors que (contraste)", "whereas"], ["de plus", "moreover"], ["par conséquent", "therefore"]],
      exercises: [
        { type: "qcm", q: "« ___ the traffic, we arrived on time. »", choices: ["Although", "Despite", "However"], answer: 1 },
        { type: "qcm", q: "« ___ he's rich, he's not happy. »", choices: ["Although", "Despite", "In spite of"], answer: 0 },
        { type: "translate", q: "Malgré la pluie, nous sommes sortis.", answers: ["despite the rain, we went out", "in spite of the rain, we went out", "despite the rain we went out"] },
        { type: "speak", q: "Dis : « Cependant, ce n'est pas si simple. »", answers: ["however, it's not that simple", "however, it is not that simple", "however, it's not so simple", "however, it isn't that simple", "however, it's not that easy", "however, it isn't so simple"] },
      ],
    },
    {
      id: "b2-causative", after: "b2-fillers", title: "Faire faire (have something done)",
      tip: "Quand quelqu'un d'autre fait le travail pour toi : <b>have / get + objet + participe passé</b>. <i>I <b>had my hair cut</b>.</i> (je me suis fait couper les cheveux ; ✗ I cut my hair = je les ai coupés moi-même). <i>We're <b>getting the kitchen painted</b>.</i> Aussi pour un événement subi : <i>She <b>had her bag stolen</b>.</i> Faire faire à quelqu'un : <i>I'll <b>have</b> him <b>call</b> you</i> / <i>I'll <b>get</b> him <b>to call</b> you</i>.",
      words: [["je me suis fait couper les cheveux", "I had my hair cut"], ["faire réparer", "to get something repaired"], ["faire livrer", "to have something delivered"], ["se faire voler", "to have something stolen"], ["je le fais rappeler", "I'll get him to call you"], ["faire vérifier", "to have something checked"]],
      exercises: [
        { type: "qcm", q: "« J'ai fait réparer ma voiture » :", choices: ["I repaired my car.", "I had my car repaired.", "I had repaired my car."], answer: 1 },
        { type: "qcm", q: "« Elle s'est fait voler son portefeuille » :", choices: ["She had her wallet stolen.", "She stole her wallet.", "Her wallet had stolen."], answer: 0 },
        { type: "translate", q: "Je me fais couper les cheveux demain.", answers: ["i'm having my hair cut tomorrow", "i am having my hair cut tomorrow", "i'm getting my hair cut tomorrow", "i'll have my hair cut tomorrow", "i will have my hair cut tomorrow", "i'll get my hair cut tomorrow"] },
        { type: "speak", q: "Dis : « Il faut faire vérifier les freins. »", answers: ["we need to have the brakes checked", "we need to get the brakes checked", "you need to have the brakes checked", "you need to get the brakes checked", "i need to have the brakes checked", "i need to get the brakes checked"] },
      ],
    },
    {
      id: "b2-complaints", after: "b2-causative", title: "Se plaindre poliment",
      tip: "Les anglophones adoucissent toujours une plainte. Ouvre avec <i>I'm afraid there's a problem with…</i> ou <i>I'm sorry to bother you, but…</i> Décris les faits sans accuser : <i>The order <b>arrived damaged</b>.</i> Demande une solution précise : <i>I'd like a replacement / a refund.</i> Si rien ne bouge : <i>I'm not satisfied with this answer</i>, <i>I'd like to make a formal complaint.</i> « Réclamation » = <b>complaint</b>.",
      words: [["une réclamation", "a complaint"], ["désolé de vous déranger", "sorry to bother you"], ["abîmé", "damaged"], ["un remplacement", "a replacement"], ["le service client", "customer service"], ["je crains que", "I'm afraid"]],
      exercises: [
        { type: "qcm", q: "La formule la plus naturelle :", choices: ["Your product is bad.", "I'm afraid there's a problem with my order.", "I complain about my order."], answer: 1 },
        { type: "qcm", q: "« Porter plainte / faire une réclamation » :", choices: ["to make a complaint", "to do a complain", "to make a reclamation"], answer: 0 },
        { type: "translate", q: "La commande est arrivée abîmée.", answers: ["the order arrived damaged", "my order arrived damaged", "the order was damaged when it arrived"] },
        { type: "speak", q: "Dis : « Je voudrais être remboursé, s'il vous plaît. »", answers: ["i'd like a refund, please", "i would like a refund, please", "i'd like to be refunded, please", "i'd like a refund please", "i would like to be refunded, please"] },
      ],
    },
    {
      id: "b2-debate", after: "b2-work", title: "Débattre : accord, désaccord, interruption",
      tip: "Être d'accord : <i>I couldn't agree more</i> (tout à fait), <i>That's a fair point.</i> En désaccord, avec tact : <i>I see what you mean, but…</i>, <i>I'm not sure I agree.</i>, <i>I take your point, however…</i> Couper la parole : <i>Sorry to interrupt, but…</i>, <i>Can I just say something?</i> Garder la parole : <i>Let me finish.</i> « Je suis d'accord » = <b>I agree</b> (✗ I am agree).",
      words: [["je suis tout à fait d'accord", "I couldn't agree more"], ["c'est juste", "that's a fair point"], ["je vois ce que tu veux dire", "I see what you mean"], ["désolé de vous interrompre", "sorry to interrupt"], ["laisse-moi finir", "let me finish"], ["au contraire", "on the contrary"]],
      exercises: [
        { type: "qcm", q: "« Je suis d'accord avec toi » :", choices: ["I am agree with you.", "I agree with you.", "I'm agreeing you."], answer: 1 },
        { type: "qcm", q: "« I couldn't agree more » veut dire :", choices: ["je ne suis pas d'accord", "je suis entièrement d'accord", "je ne peux pas répondre"], answer: 1 },
        { type: "translate", q: "Je vois ce que tu veux dire, mais je ne suis pas d'accord.", answers: ["i see what you mean, but i don't agree", "i see what you mean but i disagree", "i see what you mean, but i disagree", "i see what you mean, but i'm not sure i agree"] },
        { type: "speak", q: "Dis : « Désolé de vous interrompre, mais je peux dire quelque chose ? »", answers: ["sorry to interrupt, but can i say something?", "sorry to interrupt, but can i just say something?", "sorry to interrupt, but could i say something?", "sorry to interrupt, but may i say something?"] },
      ],
    },
    {
      id: "b2-news", title: "Parler de l'actualité",
      tip: "Pour rapporter une info : <i>According to the BBC…</i> (selon), <i>It's been reported that…</i>, <i>Apparently…</i> (il paraît que). Pour donner du recul : <i>The government is facing criticism over…</i>, <i>It remains to be seen whether…</i> (reste à savoir si). Attention : <b>news</b> est indénombrable et singulier : <i>The news <b>is</b> bad</i>, <i>a piece of news</i>. « Les élections » = <i>the elections</i>, « un sondage » = <i>a poll</i>.",
      words: [["selon", "according to"], ["il paraît que", "apparently"], ["un sondage", "a poll"], ["reste à savoir si", "it remains to be seen whether"], ["les gros titres", "the headlines"], ["une nouvelle", "a piece of news"]],
      exercises: [
        { type: "qcm", q: "« Les nouvelles sont bonnes » :", choices: ["The news are good.", "The news is good.", "The new is good."], answer: 1 },
        { type: "qcm", q: "« Reste à savoir si la loi passera » :", choices: ["It remains to see if the law passes.", "It remains to be seen whether the law will pass.", "It stays to know if the law will pass."], answer: 1 },
        { type: "translate", q: "Selon les sondages, il va gagner.", answers: ["according to the polls, he's going to win", "according to the polls, he will win", "according to the polls, he is going to win", "according to polls, he's going to win", "according to polls, he will win"] },
        { type: "speak", q: "Dis : « Il paraît que le gouvernement va démissionner. »", answers: ["apparently, the government is going to resign", "apparently the government is going to resign", "apparently, the government will resign", "apparently the government will resign"] },
      ],
    },
  ],
};

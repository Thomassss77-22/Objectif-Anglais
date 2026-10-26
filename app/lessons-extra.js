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
};

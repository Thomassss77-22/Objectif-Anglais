// Leçons supplémentaires du mode CRFPA, insérées dans legal.js (même principe que lessons-extra.js).
// « after » : identifiant de la leçon après laquelle insérer (sinon, en fin de module).
export const LEGAL_EXTRA = {
  M1: [
    {
      id: "crfpa-hook", after: "crfpa-reading", title: "Trouver une accroche",
      tip: "L'accroche dure 2 ou 3 phrases et mène naturellement au sujet. Quatre recettes sûres : une <b>actualité</b> (<i>Only last month, the Supreme Court…</i>), un <b>chiffre</b> (<i>According to recent figures, one in five…</i>), une <b>citation</b> connue et exacte (<i>As Montesquieu put it, …</i>), ou une <b>question</b> (<i>Should judges have the final say on…?</i>). N'invente jamais une citation ou un chiffre : le jury peut demander la source. Puis transition : <i>This is precisely the issue at stake in the article I have been given.</i>",
      words: [["tout récemment", "only recently"], ["selon des chiffres récents", "according to recent figures"], ["comme l'a dit", "as … put it"], ["c'est précisément l'enjeu de", "this is precisely the issue at stake in"], ["faire la une", "to make the headlines"], ["un débat brûlant", "a heated debate"]],
      exercises: [
        { type: "qcm", q: "Quelle accroche est la plus sûre devant le jury ?", choices: ["Une citation dont tu n'es pas certain", "Une actualité récente liée au sujet", "Une blague"], answer: 1 },
        { type: "qcm", q: "« Comme l'a dit Churchill » :", choices: ["As Churchill put it,", "Like Churchill said it,", "As Churchill has told,"], answer: 0 },
        { type: "translate", q: "C'est précisément l'enjeu de l'article.", answers: ["this is precisely the issue at stake in the article", "this is precisely what is at stake in the article", "this is exactly the issue at stake in the article", "that is precisely the issue at stake in the article"] },
        { type: "speak", q: "Dis : « Ce sujet a fait la une le mois dernier. »", answers: ["this issue made the headlines last month", "this topic made the headlines last month", "this subject made the headlines last month", "this issue hit the headlines last month", "this story made the headlines last month"] },
      ],
    },
    {
      id: "crfpa-issue", after: "crfpa-intro", title: "Formuler la problématique",
      tip: "La problématique est une vraie question, qui oppose deux idées. Modèles : <i><b>To what extent</b> should…?</i> (dans quelle mesure), <i><b>Is it possible to</b> reconcile X <b>with</b> Y?</i>, <i><b>Should</b> the law <b>be allowed to</b>…?</i>, <i><b>How can</b> the courts strike a balance between X and Y?</i> Annonce-la avec : <i>This raises the following question:</i> ou <i>The key issue is therefore whether…</i> Après <i>whether</i>, pas d'inversion : <i>whether the law <b>is</b> fair</i>.",
      words: [["dans quelle mesure", "to what extent"], ["concilier X et Y", "to reconcile X with Y"], ["trouver un équilibre entre", "to strike a balance between"], ["la question est de savoir si", "the issue is whether"], ["au cœur du débat", "at the heart of the debate"], ["soulever une question", "to raise a question"]],
      exercises: [
        { type: "qcm", q: "Quelle problématique est correcte ?", choices: ["To what extent should judges make law?", "To what extent judges should make law?", "In what measure judges make law?"], answer: 0 },
        { type: "qcm", q: "« La question est de savoir si la loi est juste » :", choices: ["The issue is whether is the law fair.", "The issue is whether the law is fair.", "The issue is if is the law fair."], answer: 1 },
        { type: "translate", q: "Comment trouver un équilibre entre sécurité et liberté ?", answers: ["how can we strike a balance between security and freedom?", "how can a balance be struck between security and freedom?", "how can we strike a balance between security and liberty?", "how to strike a balance between security and freedom?", "how can one strike a balance between security and freedom?"] },
        { type: "speak", q: "Dis : « Cela soulève la question suivante : dans quelle mesure l'État peut-il limiter la liberté d'expression ? »", answers: ["this raises the following question: to what extent can the state restrict freedom of speech?", "this raises the following question: to what extent can the state limit freedom of speech?", "this raises the following question: to what extent can the state restrict freedom of expression?", "this raises the following question: to what extent can the state limit freedom of expression?", "this raises the following question: to what extent may the state restrict freedom of speech?"] },
      ],
    },
    {
      id: "crfpa-plan", after: "crfpa-issue", title: "Annoncer et suivre son plan",
      tip: "Le jury doit toujours savoir où tu en es. Annonce : <i>I will <b>first</b> sum up the article, <b>then</b> I will discuss…, <b>before</b> concluding on…</i> Transitions : <i>Let us now turn to…</i>, <i>This leads me to my second point.</i>, <i>Having looked at X, I would now like to consider Y.</i> Deux parties de commentaire suffisent, chacune avec une idée et un exemple. Termine chaque partie par une phrase qui conclut et annonce la suite.",
      words: [["passons maintenant à", "let us now turn to"], ["cela m'amène à mon second point", "this leads me to my second point"], ["après avoir examiné", "having looked at"], ["dans un premier temps", "first"], ["dans un second temps", "secondly"], ["avant de conclure sur", "before concluding on"]],
      exercises: [
        { type: "qcm", q: "Pour passer à la partie suivante :", choices: ["Let us now turn to the second part.", "Now we go to the part two.", "Let's pass at the second part."], answer: 0 },
        { type: "qcm", q: "Combien de parties de commentaire viser en 4 minutes ?", choices: ["Une seule", "Deux, avec un exemple chacune", "Cinq ou six"], answer: 1 },
        { type: "translate", q: "Cela m'amène à mon second point.", answers: ["this leads me to my second point", "this brings me to my second point", "that leads me to my second point", "that brings me to my second point"] },
        { type: "speak", q: "Dis : « Je résumerai d'abord l'article, puis je discuterai de ses enjeux. »", answers: ["i will first sum up the article, then i will discuss the issues at stake", "first i will sum up the article, then i will discuss the issues at stake", "i'll first sum up the article, then i'll discuss the issues at stake", "i will first summarise the article, then i will discuss the issues at stake", "i will first sum up the article and then discuss the issues at stake", "i will first sum up the article, then discuss what is at stake"] },
      ],
    },
    {
      id: "crfpa-opinion", after: "crfpa-analysis", title: "Donner un avis nuancé",
      tip: "Le commentaire doit montrer une réflexion personnelle, mais mesurée. Avancer une thèse : <i>I would argue that…</i>, <i>It seems to me that…</i> Concéder : <i>Admittedly, …</i> / <i>It is true that…, but…</i> Nuancer : <i>This argument is valid <b>up to a point</b>.</i> Prendre position à la fin : <i>On balance, I believe…</i> Évite <i>I think</i> répété dix fois et les jugements catégoriques (<i>it's totally stupid</i>) : le jury attend un juriste, pas un militant.",
      words: [["je soutiendrais que", "I would argue that"], ["certes", "admittedly"], ["jusqu'à un certain point", "up to a point"], ["tout bien pesé", "on balance"], ["d'un côté… de l'autre", "on the one hand… on the other hand"], ["il serait réducteur de", "it would be simplistic to"]],
      exercises: [
        { type: "qcm", q: "La formule la plus adaptée devant le jury :", choices: ["This law is completely crazy.", "I would argue that this law goes too far.", "I think, I think it's bad."], answer: 1 },
        { type: "qcm", q: "« Admittedly » introduit…", choices: ["une concession", "une conclusion", "un exemple"], answer: 0 },
        { type: "translate", q: "Tout bien pesé, je pense que la réforme est nécessaire.", answers: ["on balance, i believe the reform is necessary", "on balance, i think the reform is necessary", "on balance, i believe that the reform is necessary", "on balance, i think that the reform is necessary", "all things considered, i think the reform is necessary", "all things considered, i believe the reform is necessary"] },
        { type: "speak", q: "Dis : « Cet argument est valable jusqu'à un certain point. »", answers: ["this argument is valid up to a point", "this argument holds up to a point", "that argument is valid up to a point", "this argument is true up to a point"] },
      ],
    },
    {
      id: "crfpa-blanks", after: "crfpa-interview", title: "Gérer un blanc ou une question difficile",
      tip: "Un silence de 3 secondes n'est pas grave ; un silence de 20 secondes l'est. Gagner du temps : <i>That's an interesting question. Let me think about it for a second.</i> Faire répéter : <i>Could you repeat the question, please?</i> / <i>Could you rephrase that?</i> Vérifier : <i>If I understand correctly, you are asking whether…</i> Mot oublié : contourne-le (<i>the person who decides the case</i> pour <i>judge</i>). Erreur : corrige-toi tout de suite, c'est bien vu (<i>sorry, I mean…</i>).",
      words: [["laissez-moi réfléchir un instant", "let me think about it for a second"], ["pourriez-vous reformuler ?", "could you rephrase that?"], ["si je comprends bien", "if I understand correctly"], ["pardon, je veux dire", "sorry, I mean"], ["c'est une question délicate", "that's a tricky question"], ["je n'y avais pas pensé", "I hadn't thought of that"]],
      exercises: [
        { type: "qcm", q: "Tu n'as pas compris la question :", choices: ["What?", "Could you rephrase the question, please?", "I don't understand nothing."], answer: 1 },
        { type: "qcm", q: "Tu as oublié le mot « defendant » :", choices: ["Tu restes silencieux.", "Tu dis le mot en français.", "Tu contournes : « the person accused of the crime »."], answer: 2 },
        { type: "translate", q: "Si je comprends bien, vous me demandez si la loi est efficace.", answers: ["if i understand correctly, you are asking whether the law is effective", "if i understand correctly, you're asking whether the law is effective", "if i understand correctly, you are asking if the law is effective", "if i understand correctly, you're asking if the law is effective", "if i understand you correctly, you are asking whether the law is effective"] },
        { type: "speak", q: "Dis : « C'est une question délicate. Laissez-moi réfléchir un instant. »", answers: ["that's a tricky question. let me think about it for a second", "that is a tricky question. let me think about it for a second", "that's a tricky question. let me think for a second", "it's a tricky question. let me think about it for a second", "that's a tricky question. let me think about it for a moment", "that's a difficult question. let me think about it for a second"] },
      ],
    },
  ],
  M2: [
    {
      id: "crfpa-numbers", after: "crfpa-errors-2", title: "Chiffres, dates et pourcentages",
      tip: "Pièges classiques : <b>a billion</b> = un milliard (pas un billion). La virgule décimale devient un point : <i>1.5 → one point five</i>. Les milliers prennent une virgule : <i>10,000</i>. <b>Percent</b> s'écrit avec le chiffre (<i>20 percent</i>), <b>percentage</b> sans (<i>a high percentage</i>) ; une hausse de 2 % à 3 % = <i>one percentage <b>point</b></i>. Dates : <i>on 4 July 2024</i> (« the fourth of July »), années <i>twenty twenty-four</i>, décennies <i>the 1990s</i>. <i>Hundred, thousand, million</i> restent sans -s après un chiffre : <i>three million people</i>.",
      words: [["un milliard", "a billion"], ["un point de pourcentage", "a percentage point"], ["deux virgule cinq", "two point five"], ["trois millions de personnes", "three million people"], ["les années 1990", "the 1990s"], ["doubler", "to double"]],
      exercises: [
        { type: "qcm", q: "« 2 milliards d'euros » :", choices: ["2 billions euros", "2 billion euros", "2 milliards of euros"], answer: 1 },
        { type: "qcm", q: "Le chômage passe de 7 % à 8 % : il augmente…", choices: ["d'un point de pourcentage", "de 1 percent", "de 1 percentage"], answer: 0 },
        { type: "translate", q: "Trois millions de personnes sont concernées.", answers: ["three million people are affected", "three million people are concerned", "3 million people are affected", "three million people are involved"] },
        { type: "speak", q: "Dis : « Le taux est passé de 2,5 % à 4 %. »", answers: ["the rate rose from 2.5% to 4%", "the rate went up from 2.5% to 4%", "the rate increased from 2.5% to 4%", "the rate rose from two point five percent to four percent", "the rate went up from two point five percent to four percent", "the rate increased from two point five percent to four percent", "the rate rose from 2.5 percent to 4 percent"] },
      ],
    },
    {
      id: "crfpa-linkers", after: "crfpa-numbers", title: "Les connecteurs de l'argumentation",
      tip: "Un exposé structuré se reconnaît à ses connecteurs. Opposition : <i>however, nevertheless, yet, whereas, on the contrary</i>. Concession : <i>although, even though, despite + nom</i>. Cause : <i>because of, due to, owing to</i>. Conséquence : <i>therefore, thus, hence, as a result, consequently</i>. Ajout : <i>moreover, furthermore, in addition</i>. Attention : <i>on the contrary</i> ≠ <i>on the other hand</i> (le premier contredit, le second ajoute un autre aspect). <i>Despite</i> ne prend jamais <i>of</i>.",
      words: [["néanmoins", "nevertheless"], ["par conséquent", "consequently"], ["d'où", "hence"], ["en raison de", "owing to"], ["en outre", "furthermore"], ["alors que (opposition)", "whereas"]],
      exercises: [
        { type: "qcm", q: "« ___ the reform, crime has increased. » (malgré)", choices: ["Despite of", "Despite", "Although"], answer: 1 },
        { type: "qcm", q: "Pour présenter un autre aspect, sans contredire :", choices: ["On the contrary", "On the other hand", "Contrary to"], answer: 1 },
        { type: "translate", q: "La loi est impopulaire ; néanmoins, elle a été votée.", answers: ["the law is unpopular; nevertheless, it was passed", "the law is unpopular. nevertheless, it was passed", "the law is unpopular; nevertheless, it has been passed", "the law is unpopular, nevertheless it was passed", "the law is unpopular; however, it was passed", "the law is unpopular; nevertheless, it was adopted"] },
        { type: "speak", q: "Dis : « Par conséquent, le gouvernement a dû faire marche arrière. »", answers: ["consequently, the government had to back down", "as a result, the government had to back down", "therefore, the government had to back down", "consequently, the government had to backtrack", "as a result, the government had to backtrack", "consequently, the government had to make a u-turn"] },
      ],
    },
    {
      id: "crfpa-passive", after: "crfpa-tenses", title: "Le passif juridique",
      tip: "La langue du droit est remplie de passifs : <i>He <b>was sentenced to</b> ten years.</i> (condamné à), <i>She <b>was found guilty of</b> fraud.</i>, <i>The bill <b>was passed</b> by Parliament.</i>, <i>The case <b>was dismissed</b>.</i>, <i>The decision <b>has been upheld</b> on appeal.</i> Attention aux prépositions : <i>accused <b>of</b></i>, <i>charged <b>with</b></i>, <i>convicted <b>of</b></i>, <i>sentenced <b>to</b></i>, <i>released <b>on</b> bail</i>. « Il a été condamné » ne se traduit jamais par ✗ <i>he has been condemned</i>.",
      words: [["condamné à", "sentenced to"], ["reconnu coupable de", "found guilty of"], ["inculpé de", "charged with"], ["la loi a été votée", "the bill was passed"], ["la décision a été confirmée", "the decision was upheld"], ["libéré sous caution", "released on bail"]],
      exercises: [
        { type: "qcm", q: "« Il a été inculpé de meurtre » :", choices: ["He was charged with murder.", "He was charged of murder.", "He was accused with murder."], answer: 0 },
        { type: "qcm", q: "« Elle a été condamnée à cinq ans de prison » :", choices: ["She was condemned at five years.", "She was sentenced to five years in prison.", "She was sentenced of five years in prison."], answer: 1 },
        { type: "translate", q: "Il a été reconnu coupable de fraude.", answers: ["he was found guilty of fraud", "he was convicted of fraud", "he has been found guilty of fraud", "he has been convicted of fraud"] },
        { type: "speak", q: "Dis : « La décision a été confirmée en appel. »", answers: ["the decision was upheld on appeal", "the decision has been upheld on appeal", "the ruling was upheld on appeal", "the judgment was upheld on appeal", "the ruling has been upheld on appeal"] },
      ],
    },
    {
      id: "crfpa-modals-law", after: "crfpa-passive", title: "Obligations et droits : shall, may, entitled to",
      tip: "Dans les textes juridiques : <b>shall</b> exprime une obligation (<i>The tenant <b>shall</b> pay the rent</i>), <b>shall not</b> une interdiction, <b>may</b> une faculté (<i>The court <b>may</b> order…</i>). À l'oral, on dit plutôt <i>must / is required to</i>. Avoir droit à : <b>to be entitled to</b> (<i>Everyone is entitled to a fair trial</i>). Être responsable : <b>to be liable for</b> (<i>liable for damages</i>). Être passible de : <b>to be liable to</b> (<i>liable to a fine</i>).",
      words: [["avoir droit à", "to be entitled to"], ["être responsable de", "to be liable for"], ["être passible de", "to be liable to"], ["être tenu de", "to be required to"], ["avoir la faculté de", "may"], ["il est interdit de", "it is prohibited to"]],
      exercises: [
        { type: "qcm", q: "« Toute personne a droit à un procès équitable » :", choices: ["Everyone has right to a fair trial.", "Everyone is entitled to a fair trial.", "Everyone is liable to a fair trial."], answer: 1 },
        { type: "qcm", q: "Dans un contrat, « The buyer shall pay within 30 days » exprime…", choices: ["une obligation", "un futur", "une simple possibilité"], answer: 0 },
        { type: "translate", q: "L'entreprise est responsable des dommages.", answers: ["the company is liable for the damage", "the company is liable for damages", "the company is liable for the damages", "the company is responsible for the damage"] },
        { type: "speak", q: "Dis : « Le juge peut ordonner une expertise. »", answers: ["the judge may order an expert report", "the judge can order an expert report", "the judge may order an expert assessment", "the court may order an expert report", "the judge may appoint an expert", "the judge can appoint an expert"] },
      ],
    },
    {
      id: "crfpa-reporting", after: "crfpa-modals-law", title: "Rapporter une décision de justice",
      tip: "Pour résumer une décision : <i>The court <b>held that</b>…</i> (a jugé que), <i>The judge <b>ruled that</b>…</i>, <i>The Supreme Court <b>found that</b>…</i>, <i>The court <b>ruled in favour of</b> the claimant.</i> Une décision : <i>a ruling, a judgment</i> (UK, sans e après g en contexte juridique), <i>a decision</i>. Arrêt de principe : <i>a landmark ruling</i>. Majorité : <i>in a 6-3 decision</i>. Opinion dissidente : <i>a dissenting opinion</i>. On recule les temps : <i>The court held that the law <b>was</b> unconstitutional.</i>",
      words: [["a jugé que", "held that"], ["a statué en faveur de", "ruled in favour of"], ["un arrêt de principe", "a landmark ruling"], ["une opinion dissidente", "a dissenting opinion"], ["à six voix contre trois", "by six votes to three"], ["annuler (une décision)", "to overturn"]],
      exercises: [
        { type: "qcm", q: "« La Cour a jugé que la loi était inconstitutionnelle » :", choices: ["The court held that the law was unconstitutional.", "The court judged the law is unconstitutional.", "The court held the law to unconstitutional."], answer: 0 },
        { type: "qcm", q: "« Overturn a decision » veut dire :", choices: ["confirmer une décision", "annuler / infirmer une décision", "rendre une décision"], answer: 1 },
        { type: "translate", q: "C'est un arrêt de principe.", answers: ["it is a landmark ruling", "it's a landmark ruling", "this is a landmark ruling", "it is a landmark decision", "it's a landmark decision", "this is a landmark decision", "it is a landmark judgment", "it's a landmark case"] },
        { type: "speak", q: "Dis : « La Cour a statué en faveur du requérant. »", answers: ["the court ruled in favour of the applicant", "the court ruled in favor of the applicant", "the court ruled in favour of the claimant", "the court ruled in favor of the claimant", "the court found in favour of the applicant", "the court found in favour of the claimant", "the court ruled in favour of the plaintiff", "the court ruled in favor of the plaintiff"] },
      ],
    },
  ],
  M3: [
    {
      id: "crfpa-common-law", after: "crfpa-uk", title: "Common law et droit continental",
      tip: "La <b>common law</b> (Angleterre, États-Unis, Canada hors Québec, Australie…) s'est construite par les décisions des juges : la jurisprudence (<i>case law</i>) y est une source majeure. Règle du précédent, <b>stare decisis</b> : une juridiction est liée (<i>bound</i>) par les décisions des juridictions supérieures. Seule la <b>ratio decidendi</b> (le motif déterminant) lie ; les <b>obiter dicta</b> (remarques incidentes) ne sont que persuasifs. La France relève du <b>civil law</b> (droit codifié). Attention : <i>civil law</i> désigne aussi le droit civil par opposition au pénal.",
      words: [["la jurisprudence", "case law"], ["un précédent", "a precedent"], ["lier (une juridiction)", "to bind"], ["la loi écrite", "statute law"], ["le droit continental", "civil law"], ["persuasif, non contraignant", "persuasive"]],
      exercises: [
        { type: "qcm", q: "Dans une décision, quelle partie lie les juridictions inférieures ?", choices: ["L'obiter dictum", "La ratio decidendi", "L'opinion dissidente"], answer: 1 },
        { type: "qcm", q: "« Case law » se traduit par :", choices: ["le droit des affaires", "la jurisprudence", "le dossier"], answer: 1 },
        { type: "translate", q: "Le juge est lié par les précédents.", answers: ["the judge is bound by precedent", "the judge is bound by precedents", "judges are bound by precedent", "the judge is bound by previous decisions"] },
        { type: "speak", q: "Dis : « En France, la loi écrite est la source principale du droit. »", answers: ["in france, statute law is the main source of law", "in france, written law is the main source of law", "in france, statute is the main source of law", "in france, legislation is the main source of law", "in france, statute law is the primary source of law", "in france, written law is the primary source of law"] },
      ],
    },
    {
      id: "crfpa-uk-parliament", after: "crfpa-common-law", title: "Comment une loi est votée au Royaume-Uni",
      tip: "Un projet de loi (<b>a bill</b>) passe dans chaque chambre (<b>House of Commons</b>, élue ; <b>House of Lords</b>, non élue) par plusieurs étapes : <i>first reading</i>, <i>second reading</i> (débat de principe), <i>committee stage</i> (amendements), <i>report stage</i>, <i>third reading</i>. Puis la <b>Royal Assent</b> (sanction royale, une formalité) en fait un <b>Act of Parliament</b>. Les Parliament Acts de 1911 et 1949 permettent aux Communes de passer outre l'opposition des Lords après un délai. Un <i>backbencher</i> est un député sans fonction ministérielle.",
      words: [["un projet de loi", "a bill"], ["une loi (votée)", "an Act of Parliament"], ["la sanction royale", "Royal Assent"], ["un amendement", "an amendment"], ["la Chambre des communes", "the House of Commons"], ["un député de base", "a backbencher"]],
      exercises: [
        { type: "qcm", q: "Après la Royal Assent, un bill devient…", choices: ["a statute / an Act of Parliament", "a ruling", "a treaty"], answer: 0 },
        { type: "qcm", q: "La Chambre des lords…", choices: ["est élue au suffrage universel", "n'est pas élue", "est élue par les juges"], answer: 1 },
        { type: "translate", q: "Le projet de loi a été adopté par la Chambre des communes.", answers: ["the bill was passed by the house of commons", "the bill has been passed by the house of commons", "the house of commons passed the bill", "the bill was approved by the house of commons", "the bill was adopted by the house of commons"] },
        { type: "speak", q: "Dis : « Les Lords ont proposé plusieurs amendements. »", answers: ["the lords proposed several amendments", "the lords have proposed several amendments", "the lords tabled several amendments", "the lords put forward several amendments", "the house of lords proposed several amendments"] },
      ],
    },
    {
      id: "crfpa-congress", after: "crfpa-us", title: "Le Congrès et le Président américains",
      tip: "Le <b>Congress</b> compte deux chambres : la <b>House of Representatives</b> (435 membres votants, élus pour 2 ans) et le <b>Senate</b> (100 sénateurs, 2 par État, élus pour 6 ans). Le Président peut opposer son <b>veto</b> ; le Congrès peut le surmonter (<i>override</i>) à la majorité des deux tiers dans chaque chambre. Au Sénat, l'obstruction parlementaire (<b>filibuster</b>) ne peut être levée qu'avec 60 voix (<i>cloture</i>). Procédure de destitution : <b>impeachment</b> par la Chambre, jugement par le Sénat.",
      words: [["la Chambre des représentants", "the House of Representatives"], ["opposer son veto", "to veto"], ["passer outre un veto", "to override a veto"], ["l'obstruction parlementaire", "the filibuster"], ["la destitution", "impeachment"], ["les élections de mi-mandat", "the midterm elections"]],
      exercises: [
        { type: "qcm", q: "Combien de sénateurs par État ?", choices: ["Un", "Deux", "Selon la population"], answer: 1 },
        { type: "qcm", q: "Pour surmonter un veto présidentiel, il faut…", choices: ["la majorité simple", "les deux tiers des deux chambres", "l'accord de la Cour suprême"], answer: 1 },
        { type: "translate", q: "Le Président a opposé son veto au projet de loi.", answers: ["the president vetoed the bill", "the president has vetoed the bill", "the president used his veto on the bill"] },
        { type: "speak", q: "Dis : « Le Sénat juge le Président après sa mise en accusation par la Chambre. »", answers: ["the senate tries the president after he is impeached by the house", "the senate tries the president after impeachment by the house", "the senate tries the president after he has been impeached by the house", "the senate holds the trial after the house impeaches the president"] },
      ],
    },
    {
      id: "crfpa-federalism", after: "crfpa-congress", title: "Le fédéralisme américain",
      tip: "Les États-Unis partagent le pouvoir entre l'État fédéral (<i>federal government</i>) et les 50 <b>States</b>. Le 10e amendement réserve aux États (ou au peuple) les compétences non déléguées à l'État fédéral. La <b>Supremacy Clause</b> (article VI) fait primer le droit fédéral en cas de conflit. Les États ont leurs propres constitutions, lois et tribunaux : le droit pénal ou le droit de la famille varient d'un État à l'autre. Depuis <i>Dobbs</i> (2022), l'avortement relève à nouveau des États.",
      words: [["l'État fédéral", "the federal government"], ["un État (fédéré)", "a state"], ["la clause de suprématie", "the Supremacy Clause"], ["les droits des États", "states' rights"], ["un tribunal fédéral", "a federal court"], ["relever de la compétence de", "to fall within the jurisdiction of"]],
      exercises: [
        { type: "qcm", q: "En cas de conflit entre loi fédérale et loi d'un État, en principe…", choices: ["la loi de l'État prime", "la loi fédérale prime", "la plus récente prime"], answer: 1 },
        { type: "qcm", q: "Depuis l'arrêt Dobbs (2022), l'avortement relève…", choices: ["d'un droit constitutionnel fédéral", "de la législation des États", "d'un traité"], answer: 1 },
        { type: "translate", q: "Le droit pénal varie d'un État à l'autre.", answers: ["criminal law varies from state to state", "criminal law varies from one state to another", "criminal law differs from state to state", "criminal law differs from one state to another"] },
        { type: "speak", q: "Dis : « Cette question relève de la compétence des États. »", answers: ["this issue falls within the jurisdiction of the states", "this question falls within the jurisdiction of the states", "this issue falls within the competence of the states", "this matter falls within the jurisdiction of the states", "this is a matter for the states"] },
      ],
    },
    {
      id: "crfpa-echr", after: "crfpa-scotus", title: "La CEDH et le Conseil de l'Europe",
      tip: "La <b>European Convention on Human Rights</b> (1950) est un traité du <b>Council of Europe</b> (46 États membres ; à ne pas confondre avec l'Union européenne). Elle est appliquée par la <b>European Court of Human Rights</b>, à Strasbourg. Un particulier peut la saisir (<i>lodge an application</i>) après avoir épuisé les voies de recours internes (<i>exhausted domestic remedies</i>). Au Royaume-Uni, le <b>Human Rights Act 1998</b> permet d'invoquer la Convention devant les juges nationaux. Notions clés : <i>margin of appreciation</i>, <i>violation of Article 8</i>.",
      words: [["saisir la Cour", "to lodge an application"], ["épuiser les voies de recours internes", "to exhaust domestic remedies"], ["la marge d'appréciation", "the margin of appreciation"], ["le requérant", "the applicant"], ["constater une violation", "to find a violation"], ["le droit au respect de la vie privée", "the right to respect for private life"]],
      exercises: [
        { type: "qcm", q: "La Cour européenne des droits de l'homme siège à…", choices: ["Luxembourg", "Strasbourg", "Bruxelles"], answer: 1 },
        { type: "qcm", q: "La CEDH dépend…", choices: ["de l'Union européenne", "du Conseil de l'Europe", "des Nations unies"], answer: 1 },
        { type: "translate", q: "La Cour a constaté une violation de l'article 8.", answers: ["the court found a violation of article 8", "the court has found a violation of article 8", "the court found that there had been a violation of article 8", "the court ruled that article 8 had been violated"] },
        { type: "speak", q: "Dis : « Le requérant doit d'abord épuiser les voies de recours internes. »", answers: ["the applicant must first exhaust domestic remedies", "the applicant must first exhaust all domestic remedies", "the applicant has to exhaust domestic remedies first", "the applicant must exhaust domestic remedies first", "first, the applicant must exhaust domestic remedies"] },
      ],
    },
    {
      id: "crfpa-eu", after: "crfpa-echr", title: "L'Union européenne et sa Cour",
      tip: "Institutions : la <b>European Commission</b> (propose les textes), le <b>Council of the EU</b> (les ministres) et le <b>European Parliament</b> (élu) adoptent ensemble <i>regulations</i> (règlements, directement applicables) et <i>directives</i> (à transposer). La <b>Court of Justice of the EU</b> (CJEU), à Luxembourg, assure l'interprétation uniforme du droit de l'Union, notamment par le <b>renvoi préjudiciel</b> (<i>preliminary ruling</i>). Le droit de l'Union prime sur le droit national (<i>primacy</i>). Le Royaume-Uni a quitté l'UE le 31 janvier 2020.",
      words: [["un règlement", "a regulation"], ["transposer une directive", "to transpose a directive"], ["un renvoi préjudiciel", "a preliminary ruling"], ["la primauté du droit de l'Union", "the primacy of EU law"], ["un État membre", "a member state"], ["un recours en manquement", "infringement proceedings"]],
      exercises: [
        { type: "qcm", q: "La Cour de justice de l'Union européenne siège à…", choices: ["Strasbourg", "La Haye", "Luxembourg"], answer: 2 },
        { type: "qcm", q: "Une directive…", choices: ["s'applique directement, telle quelle", "doit être transposée en droit national", "ne concerne que la Commission"], answer: 1 },
        { type: "translate", q: "La France doit transposer la directive avant 2026.", answers: ["france must transpose the directive before 2026", "france has to transpose the directive before 2026", "france must transpose the directive by 2026", "france has to transpose the directive by 2026", "france must implement the directive before 2026", "france must implement the directive by 2026"] },
        { type: "speak", q: "Dis : « Le juge national a posé une question préjudicielle à la Cour de justice. »", answers: ["the national court made a reference for a preliminary ruling to the court of justice", "the national judge referred a question to the court of justice for a preliminary ruling", "the national court referred a question to the court of justice for a preliminary ruling", "the national court asked the court of justice for a preliminary ruling", "the national judge asked the court of justice for a preliminary ruling"] },
      ],
    },
  ],
  M4: [
    {
      id: "crfpa-contracts", after: "crfpa-civil", title: "Le droit des contrats",
      tip: "En common law, un contrat suppose une offre (<i>offer</i>), une acceptation (<i>acceptance</i>), une <b>consideration</b> (une contrepartie : chaque partie apporte quelque chose) et l'intention de créer des relations juridiques. L'inexécution : <b>breach of contract</b>, sanctionnée surtout par des dommages-intérêts (<i>damages</i>) ; l'exécution forcée (<i>specific performance</i>) est exceptionnelle. Un contrat nul : <i>void</i> ; annulable : <i>voidable</i>. Les clauses : <i>terms</i> ; les « petits caractères » : <i>the small print</i>.",
      words: [["la rupture de contrat", "breach of contract"], ["des dommages-intérêts", "damages"], ["une clause", "a term, a clause"], ["nul", "void"], ["l'exécution forcée", "specific performance"], ["la contrepartie", "consideration"]],
      exercises: [
        { type: "qcm", q: "« Damages » (pluriel, en droit) veut dire :", choices: ["des dégâts", "des dommages-intérêts", "des dommages corporels"], answer: 1 },
        { type: "qcm", q: "Un contrat « voidable » est…", choices: ["nul dès l'origine", "annulable", "parfaitement valable"], answer: 1 },
        { type: "translate", q: "Le fournisseur a rompu le contrat.", answers: ["the supplier breached the contract", "the supplier has breached the contract", "the supplier was in breach of contract", "the supplier is in breach of contract", "the supplier broke the contract"] },
        { type: "speak", q: "Dis : « Le client réclame des dommages-intérêts. »", answers: ["the client is claiming damages", "the client claims damages", "the customer is claiming damages", "the customer claims damages", "the client is seeking damages", "the customer is seeking damages"] },
      ],
    },
    {
      id: "crfpa-torts", after: "crfpa-contracts", title: "La responsabilité civile (tort law)",
      tip: "Le <b>tort</b> est la faute civile hors contrat. Le plus fréquent : la <b>negligence</b>, qui suppose un devoir de prudence (<i>duty of care</i>), un manquement (<i>breach</i>), un lien de causalité (<i>causation</i>) et un préjudice (<i>damage</i>). Arrêt fondateur : <i>Donoghue v Stevenson</i> (1932), l'escargot dans la bouteille de ginger beer et le « neighbour principle ». Autres torts : <i>defamation</i> (diffamation), <i>nuisance</i> (trouble de voisinage), <i>trespass</i>. Être tenu responsable : <i>to be held liable</i>.",
      words: [["la responsabilité civile délictuelle", "tort law"], ["un devoir de prudence", "a duty of care"], ["le lien de causalité", "causation"], ["être tenu responsable", "to be held liable"], ["une indemnisation", "compensation"], ["la diffamation", "defamation"]],
      exercises: [
        { type: "qcm", q: "Quel arrêt a fondé la negligence moderne ?", choices: ["Marbury v Madison", "Donoghue v Stevenson", "Brown v Board of Education"], answer: 1 },
        { type: "qcm", q: "« Causation » désigne…", choices: ["le lien de causalité", "la cause du procès", "la caution"], answer: 0 },
        { type: "translate", q: "L'hôpital a été tenu responsable.", answers: ["the hospital was held liable", "the hospital has been held liable", "the hospital was found liable", "the hospital was held responsible"] },
        { type: "speak", q: "Dis : « La victime a reçu une indemnisation. »", answers: ["the victim received compensation", "the victim was awarded compensation", "the victim has received compensation", "the victim was compensated", "the victim got compensation"] },
      ],
    },
    {
      id: "crfpa-business", after: "crfpa-torts", title: "Droit des affaires et concurrence",
      tip: "Une société : <i>a company</i> (UK), <i>a corporation</i> (US). Actionnaires : <i>shareholders</i> (US : <i>stockholders</i>) ; le conseil d'administration : <i>the board of directors</i>. Une fusion : <i>a merger</i> ; un rachat : <i>a takeover</i> (hostile si non désiré). Faillite : <i>insolvency</i>, <i>bankruptcy</i> ; redressement : <i>administration</i> (UK), <i>Chapter 11</i> (US). Droit de la concurrence : <i>competition law</i> (UE, UK), <i>antitrust law</i> (US) ; abus de position dominante : <i>abuse of a dominant position</i> ; une entente : <i>a cartel</i>.",
      words: [["un actionnaire", "a shareholder"], ["une fusion", "a merger"], ["une OPA hostile", "a hostile takeover"], ["la faillite", "insolvency"], ["le droit de la concurrence", "competition law"], ["l'abus de position dominante", "abuse of a dominant position"]],
      exercises: [
        { type: "qcm", q: "Le droit de la concurrence américain s'appelle…", choices: ["antitrust law", "competition act", "market law"], answer: 0 },
        { type: "qcm", q: "« A takeover » est…", choices: ["une fusion entre égaux", "un rachat d'entreprise", "une faillite"], answer: 1 },
        { type: "translate", q: "La Commission a infligé une amende à Google pour abus de position dominante.", answers: ["the commission fined google for abuse of a dominant position", "the commission fined google for abusing its dominant position", "the commission has fined google for abuse of a dominant position", "the commission has fined google for abusing its dominant position", "the european commission fined google for abusing its dominant position"] },
        { type: "speak", q: "Dis : « Les actionnaires ont approuvé la fusion. »", answers: ["the shareholders approved the merger", "the shareholders have approved the merger", "shareholders approved the merger", "the shareholders voted for the merger", "the shareholders backed the merger"] },
      ],
    },
    {
      id: "crfpa-labour", after: "crfpa-business", title: "Droit du travail",
      tip: "Un salarié : <i>an employee</i> ; l'employeur : <i>the employer</i>. Licencier : <i>to dismiss</i> (soutenu), <i>to fire</i> (familier) ; licenciement économique : <i>redundancy</i> (UK), <i>layoff</i> (US). Licenciement abusif : <i>unfair dismissal</i>, jugé au Royaume-Uni par l'<b>employment tribunal</b> (≈ prud'hommes). Discrimination, harcèlement : <i>discrimination, harassment</i>. Grève : <i>a strike</i> ; syndicat : <i>a trade union</i> (UK), <i>a labor union</i> (US). Salaire minimum : <i>the minimum wage</i>.",
      words: [["un licenciement abusif", "unfair dismissal"], ["un licenciement économique", "redundancy"], ["le conseil de prud'hommes", "the employment tribunal"], ["un syndicat", "a trade union"], ["faire grève", "to go on strike"], ["le harcèlement", "harassment"]],
      exercises: [
        { type: "qcm", q: "Au Royaume-Uni, un licenciement abusif est jugé par…", choices: ["the Crown Court", "an employment tribunal", "the Supreme Court directly"], answer: 1 },
        { type: "qcm", q: "« He was made redundant » veut dire :", choices: ["il a été licencié pour motif économique", "il a été promu", "il est devenu inutile"], answer: 0 },
        { type: "translate", q: "Les salariés se sont mis en grève.", answers: ["the employees went on strike", "the workers went on strike", "the employees have gone on strike", "the workers have gone on strike", "employees went on strike", "workers went on strike"] },
        { type: "speak", q: "Dis : « Elle conteste son licenciement devant le tribunal. »", answers: ["she is challenging her dismissal before the tribunal", "she is challenging her dismissal in court", "she is contesting her dismissal before the tribunal", "she's challenging her dismissal before the tribunal", "she is challenging her dismissal at the tribunal", "she is challenging her dismissal at the employment tribunal", "she's challenging her dismissal at the employment tribunal"] },
      ],
    },
    {
      id: "crfpa-family", after: "crfpa-labour", title: "Droit de la famille",
      tip: "Mariage et séparation : <i>marriage, civil partnership</i> (≈ pacs), <i>divorce</i>, <i>separation</i>. Après le divorce : la pension alimentaire pour l'ex-conjoint, <i>maintenance</i> (UK) ou <i>alimony</i> (US) ; pour les enfants, <i>child support</i>. La garde : <i>custody</i> (US ; UK : <i>child arrangements</i>) ; garde partagée : <i>joint custody</i>. Toujours l'intérêt supérieur de l'enfant : <i>the best interests of the child</i>. Sujets d'actualité : <i>surrogacy</i> (GPA), <i>assisted reproduction</i> (PMA), <i>adoption</i>.",
      words: [["la garde (des enfants)", "custody"], ["la pension alimentaire (enfants)", "child support"], ["l'intérêt supérieur de l'enfant", "the best interests of the child"], ["la gestation pour autrui", "surrogacy"], ["la garde partagée", "joint custody"], ["un pacs (approx.)", "a civil partnership"]],
      exercises: [
        { type: "qcm", q: "« Surrogacy » désigne…", choices: ["l'adoption", "la gestation pour autrui", "la tutelle"], answer: 1 },
        { type: "qcm", q: "La pension versée pour les enfants :", choices: ["child support", "child benefit tax", "child alimony"], answer: 0 },
        { type: "translate", q: "Le juge a accordé la garde partagée.", answers: ["the judge granted joint custody", "the judge has granted joint custody", "the judge awarded joint custody", "the court granted joint custody", "the court awarded joint custody"] },
        { type: "speak", q: "Dis : « Le juge doit tenir compte de l'intérêt supérieur de l'enfant. »", answers: ["the judge must take into account the best interests of the child", "the judge must consider the best interests of the child", "the judge has to take into account the best interests of the child", "the judge must take the best interests of the child into account", "the judge has to consider the best interests of the child"] },
      ],
    },
    {
      id: "crfpa-tech", after: "crfpa-rights", title: "Numérique, données et IA",
      tip: "Données personnelles : <i>personal data</i>, protégées dans l'UE par le <b>GDPR</b> (RGPD, applicable depuis mai 2018) ; consentement : <i>consent</i> ; une fuite de données : <i>a data breach</i>. Vie privée : <i>privacy</i>. Les plateformes : <i>online platforms</i>, régulées par le <i>Digital Services Act</i>. L'intelligence artificielle est encadrée dans l'UE par l'<b>AI Act</b> (2024), qui classe les usages par niveau de risque. Débats : <i>facial recognition</i>, <i>content moderation</i>, <i>liability of platforms</i>, <i>algorithmic bias</i>.",
      words: [["les données personnelles", "personal data"], ["une fuite de données", "a data breach"], ["la reconnaissance faciale", "facial recognition"], ["la modération des contenus", "content moderation"], ["les biais algorithmiques", "algorithmic bias"], ["la vie privée", "privacy"]],
      exercises: [
        { type: "qcm", q: "« GDPR » est l'équivalent anglais de…", choices: ["la CNIL", "le RGPD", "la LCEN"], answer: 1 },
        { type: "qcm", q: "L'AI Act européen classe les systèmes d'IA selon…", choices: ["leur prix", "leur niveau de risque", "leur pays d'origine"], answer: 1 },
        { type: "translate", q: "L'entreprise a été sanctionnée après une fuite de données.", answers: ["the company was fined after a data breach", "the company was sanctioned after a data breach", "the company was penalised after a data breach", "the company was penalized after a data breach", "the company has been fined after a data breach"] },
        { type: "speak", q: "Dis : « La reconnaissance faciale menace la vie privée. »", answers: ["facial recognition threatens privacy", "facial recognition is a threat to privacy", "facial recognition poses a threat to privacy", "facial recognition threatens our privacy", "facial recognition is a threat to our privacy"] },
      ],
    },
    {
      id: "crfpa-environment", after: "crfpa-tech", title: "Environnement et contentieux climatique",
      tip: "Le contentieux climatique (<i>climate litigation</i>) se développe : citoyens et ONG attaquent États et entreprises. Exemples : <i>Urgenda</i> (Pays-Bas, 2019 : l'État condamné à réduire ses émissions) ; <i>KlimaSeniorinnen v Switzerland</i> (CEDH, 2024 : violation de l'article 8 faute d'action climatique suffisante) ; en France, l'<i>Affaire du siècle</i> (2021). Vocabulaire : <i>greenhouse gas emissions</i>, <i>the Paris Agreement</i> (2015), <i>net zero</i>, <i>polluter pays principle</i>, <i>greenwashing</i>.",
      words: [["le contentieux climatique", "climate litigation"], ["les émissions de gaz à effet de serre", "greenhouse gas emissions"], ["le principe pollueur-payeur", "the polluter pays principle"], ["la neutralité carbone", "net zero"], ["l'écoblanchiment", "greenwashing"], ["une ONG", "an NGO"]],
      exercises: [
        { type: "qcm", q: "Dans KlimaSeniorinnen (2024), la CEDH a constaté une violation…", choices: ["de l'article 8", "de l'article 2 uniquement", "d'aucun article"], answer: 0 },
        { type: "qcm", q: "« Greenwashing » désigne…", choices: ["le recyclage", "une communication trompeuse sur l'écologie", "une taxe verte"], answer: 1 },
        { type: "translate", q: "L'État a été condamné à réduire ses émissions.", answers: ["the state was ordered to reduce its emissions", "the state has been ordered to reduce its emissions", "the government was ordered to reduce its emissions", "the state was ordered to cut its emissions", "the government was ordered to cut its emissions"] },
        { type: "speak", q: "Dis : « Le contentieux climatique est en plein essor. »", answers: ["climate litigation is booming", "climate litigation is on the rise", "climate litigation is growing fast", "climate litigation is growing rapidly", "climate litigation is increasing"] },
      ],
    },
  ],
};

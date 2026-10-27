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

// Compléments des leçons existantes : un modèle rédigé (anglais annoté en français) et des exercices en plus.
// Les modèles marqués « fictif » s'appuient sur un article inventé ; les faits cités sont réels.
const q = (text, choices, answer) => ({ type: "qcm", q: text, choices, answer });
const tr = (text, answers) => ({ type: "translate", q: text, answers });
const sp = (text, answers) => ({ type: "speak", q: `Dis : « ${text} »`, answers });
export const LEGAL_MORE = {
  "crfpa-rules": {
    model: {
      title: "Le squelette de l'exposé", parts: [
        ["The article I have been given is entitled \"Robots in robes\". It was published in The Economist in March 2025.", "Introduction : présenter le document (titre fictif)"],
        ["It deals with the use of artificial intelligence in courtrooms. This raises the following question: to what extent can AI be trusted to assist judges?", "Thème et problématique"],
        ["I will first sum up the main points of the article, then I will discuss two issues it raises, before concluding.", "Annonce du plan"],
        ["Having summed up the article, I would now like to move on to my analysis.", "Transition vers le commentaire"],
        ["To conclude, AI can make justice faster, but only if judges remain in control. It will be interesting to see how the courts use it.", "Conclusion : bilan, avis, ouverture"],
        ["Thank you for your attention. I am now ready to answer your questions.", "Fin de l'exposé, avant l'entretien"],
      ],
    },
    exercises: [
      q("Combien de temps dure l'exposé avant l'entretien ?", ["Environ 3 minutes", "Environ 7 à 8 minutes", "15 minutes"], 1),
      q("Dans la méthode 5/3/7, les 3 minutes servent à…", ["lire l'article", "problématiser et faire le plan", "rédiger l'introduction mot à mot"], 1),
      q("Le jury évalue…", ["seulement l'accent", "la langue et la compréhension-analyse", "uniquement les connaissances juridiques"], 1),
      tr("Je vais vous présenter l'article que l'on m'a donné.", ["i am going to present the article i have been given", "i'm going to present the article i have been given", "i will present the article i have been given", "i'll present the article i have been given", "i am going to present the article i was given", "i'm going to present the article i was given", "i will present the article i was given"]),
    ],
  },
  "crfpa-reading": {
    model: {
      title: "Des notes de lecture efficaces", note: "Exemple fictif : six lignes suffisent, en anglais, sans phrases complètes.", parts: [
        ["Source: The Times, a centre-right daily. 12 May 2025. News report.", "La source et sa ligne éditoriale"],
        ["Trigger: a government bill to cut legal aid fees.", "Le déclencheur"],
        ["Who speaks: the Justice Secretary versus the Law Society.", "Qui parle"],
        ["Issue: access to justice for defendants on low incomes.", "De quoi il s'agit"],
        ["Aim: to inform, but the closing quote suggests a critical stance.", "La visée"],
        ["Structure: facts, then reactions, then figures, then outlook.", "La structure"],
      ],
    },
    exercises: [
      q("Dans un article, « actually » signifie…", ["actuellement", "en fait", "activement"], 1),
      q("Une « op-ed » est…", ["un article d'opinion signé par un auteur extérieur", "une dépêche d'agence", "un éditorial non signé du journal"], 0),
      q("« The Daily Telegraph » est un quotidien…", ["de centre gauche", "conservateur", "satirique"], 1),
      tr("Le journaliste critique la réforme.", ["the journalist criticises the reform", "the journalist criticizes the reform", "the journalist is critical of the reform"]),
    ],
  },
  "crfpa-hook": {
    model: {
      title: "Trois accroches qui marchent", parts: [
        ["In 2024, the European Court of Human Rights held, for the first time, that a state's failure to act on climate change violated the Convention.", "Une actualité réelle et vérifiable (KlimaSeniorinnen c. Suisse)"],
        ["Should a machine ever be allowed to decide whether someone goes to prison?", "Une question qui fait réagir"],
        ["As Montesquieu put it, power must check power.", "Une citation exacte (De l'esprit des lois)"],
        ["This is precisely the issue at stake in the article I have been given.", "La transition vers l'article"],
      ],
    },
    exercises: [
      q("Quelle accroche faut-il éviter ?", ["Une question liée au sujet", "Une citation dont tu n'es pas sûr de l'auteur", "Une actualité récente"], 1),
      q("Une accroche dure environ…", ["2 ou 3 phrases", "une minute entière", "un mot"], 0),
      q("« As Montesquieu put it, power must check power » peut introduire un sujet sur…", ["la séparation des pouvoirs", "le droit des contrats", "la fiscalité"], 0),
      sp("Faut-il laisser une machine décider de l'avenir d'un accusé ?", ["should a machine be allowed to decide the future of a defendant?", "should a machine be allowed to decide a defendant's future?", "should we let a machine decide the future of a defendant?", "should we let a machine decide a defendant's future?", "should a machine decide the future of a defendant?"]),
    ],
  },
  "crfpa-intro": {
    model: {
      title: "Une introduction et une synthèse complètes", note: "Article fictif ; l'affaire des avocats sanctionnés pour de fausses jurisprudences inventées par ChatGPT est réelle (New York, 2023).", parts: [
        ["Should a machine ever help decide a criminal case? The question is no longer theoretical.", "Accroche"],
        ["The article I have been given is entitled \"Robots in robes\". It was published in The Economist in March 2025.", "Présentation du document"],
        ["It deals with the growing use of artificial intelligence by courts and lawyers.", "Thème"],
        ["This raises the following question: to what extent can AI assist justice without undermining the right to a fair trial?", "Problématique"],
        ["I will first sum up the article, then discuss two issues it raises, before concluding.", "Plan"],
        ["The journalist first reports that several courts are testing AI tools to manage their caseload. He then points out that lawyers have been sanctioned for citing cases invented by chatbots. Finally, he stresses that judges must remain responsible for every decision.", "Synthèse : ordre logique et verbes variés (reports, points out, stresses)"],
      ],
    },
    exercises: [
      q("« The article I have been given is entitled… » sert à…", ["présenter le document", "conclure", "formuler la problématique"], 0),
      q("Une bonne synthèse est…", ["une paraphrase ligne à ligne", "neutre et organisée", "ton avis personnel"], 1),
      q("Le verbe le plus précis pour « le journaliste affirme » :", ["The journalist says", "The journalist claims", "The journalist talks"], 1),
      tr("L'article a été publié dans le Guardian en mars 2025.", ["the article was published in the guardian in march 2025", "the article was published in the guardian in march, 2025"]),
    ],
  },
  "crfpa-issue": {
    model: {
      title: "Quatre problématiques modèles", parts: [
        ["To what extent can alternatives to prison reduce overcrowding without putting the public at risk?", "Sujet : la surpopulation carcérale"],
        ["Is it possible to reconcile freedom of expression with the fight against online hate?", "Sujet : la haine en ligne"],
        ["Should judges, rather than elected politicians, have the final say on assisted dying?", "Sujet : la fin de vie"],
        ["How can the courts strike a balance between national security and the right to privacy?", "Sujet : la surveillance"],
      ],
    },
    exercises: [
      q("Une bonne problématique…", ["oppose deux idées ou deux intérêts", "résume l'article", "donne déjà la réponse"], 0),
      q("« Whether » se traduit par…", ["si (alternative)", "pourquoi", "lorsque"], 0),
      q("Phrase correcte :", ["The key issue is whether should the law change.", "The key issue is whether the law should change.", "The key issue is if should the law change."], 1),
      tr("Est-il possible de concilier liberté d'expression et lutte contre la haine en ligne ?", ["is it possible to reconcile freedom of expression with the fight against online hate?", "is it possible to reconcile freedom of speech with the fight against online hate?", "is it possible to reconcile freedom of expression and the fight against online hate?", "is it possible to reconcile freedom of speech and the fight against online hate?"]),
    ],
  },
  "crfpa-plan": {
    model: {
      title: "Le plan, du début à la fin", parts: [
        ["First, I will sum up the article. Then I will focus on two issues: the efficiency of the reform and its impact on fundamental rights. Finally, I will give my own opinion.", "L'annonce du plan"],
        ["Let us now turn to my first point: is the reform actually effective?", "Début de la première partie"],
        ["This leads me to my second point, which is more fundamental: does the reform respect the right to a fair trial?", "Transition vers la deuxième partie"],
        ["Having looked at its efficiency, I would now like to consider its legitimacy.", "Une autre transition possible"],
        ["To sum up, the reform is efficient, but it raises serious concerns about fundamental rights.", "Vers la conclusion"],
      ],
    },
    exercises: [
      q("« Having looked at X, I would now like to consider Y » sert à…", ["conclure", "faire une transition", "présenter l'article"], 1),
      q("Chaque partie du commentaire doit contenir…", ["une idée et un exemple", "seulement des chiffres", "une longue citation de l'article"], 0),
      q("« Let us now turn to… » :", ["Passons maintenant à…", "Retournons à…", "Laissez-nous tourner…"], 0),
      sp("Passons maintenant à mon second point.", ["let us now turn to my second point", "let's now turn to my second point", "let us now move on to my second point", "let's now move on to my second point", "let us turn to my second point", "now let us turn to my second point"]),
    ],
  },
  "crfpa-analysis": {
    model: {
      title: "Un paragraphe de commentaire et une conclusion", parts: [
        ["What is particularly striking in this article is that the problem is not the technology itself, but the way it is used.", "L'idée directrice"],
        ["In the Mata v. Avianca case in 2023, a New York lawyer was sanctioned for citing cases that had been invented by ChatGPT.", "Un exemple précis et réel"],
        ["By contrast, in France, using judges' identities to analyse or predict their decisions has been banned since 2019.", "La comparaison avec la France (loi du 23 mars 2019)"],
        ["To conclude, AI can make justice faster, but only if humans remain in control. It will be interesting to see whether the EU AI Act, which treats the administration of justice as a high-risk area, will be enough.", "Conclusion : bilan, avis et ouverture"],
      ],
    },
    exercises: [
      q("Le commentaire doit surtout…", ["répéter la synthèse", "prendre du recul avec des références précises", "donner ton avis sans le justifier"], 1),
      q("Une bonne ouverture en conclusion :", ["It will be interesting to see whether…", "That's all.", "I have nothing more to say."], 0),
      q("Vers quel moment dois-tu avoir fait ta transition vers le commentaire ?", ["Vers 1 minute", "Vers 3 min 30", "À la toute fin"], 1),
      tr("Ce qui est particulièrement frappant, c'est le rôle des juges.", ["what is particularly striking is the role of the judges", "what is particularly striking is the role of judges", "what is especially striking is the role of the judges", "what is particularly striking is the judges' role"]),
    ],
  },
  "crfpa-opinion": {
    model: {
      title: "Un avis nuancé en quatre phrases", parts: [
        ["It seems to me that the reform is a step in the right direction.", "La thèse"],
        ["Admittedly, it may slow down some procedures, and lawyers are right to point that out.", "La concession"],
        ["However, this argument is valid only up to a point: the delay is short, whereas the protection it offers is lasting.", "La nuance"],
        ["On balance, I believe the benefits outweigh the costs.", "La prise de position"],
      ],
    },
    exercises: [
      q("« On balance » signifie…", ["sur la balance", "tout bien pesé", "en équilibre"], 1),
      q("Pour concéder un point :", ["It is true that…, but…", "Totally wrong.", "I am agree that…"], 0),
      q("Quelle formule évite de répéter « I think » ?", ["It seems to me that…", "I think that I think…", "Me, I think…"], 0),
      sp("Certes, cette loi a des défauts, mais elle protège les victimes.", ["admittedly, this law has its flaws, but it protects victims", "admittedly, this law has flaws, but it protects victims", "admittedly, this law has its flaws, but it protects the victims", "admittedly, this law has some flaws, but it protects victims", "admittedly, the law has its flaws, but it protects victims"]),
    ],
  },
  "crfpa-interview": {
    model: {
      title: "Une réponse en quatre temps", parts: [
        ["Question: Could the death penalty ever return in Europe?", "La question du jury"],
        ["No, I don't think so.", "1) Réponse directe"],
        ["Because it is incompatible with the European Convention on Human Rights: Protocols 6 and 13 abolish it, in peacetime and then in all circumstances.", "2) Justification"],
        ["In practice, abolishing it is a condition for joining the Council of Europe.", "3) Exemple précis"],
        ["In France, it was abolished in 1981, and it has been banned by the Constitution since 2007.", "4) Comparaison avec la France"],
      ],
    },
    exercises: [
      q("Une réponse à une question du jury dure idéalement…", ["5 secondes", "30 à 45 secondes", "3 minutes"], 1),
      q("Le 4e temps d'une bonne réponse :", ["une nuance ou une comparaison avec la France", "un silence", "une question au jury"], 0),
      q("Le jury t'interroge sur un point que tu ne connais pas bien :", ["Tu réponds en français.", "Tu dis honnêtement que tu n'es pas sûr, puis tu raisonnes.", "Tu changes de sujet."], 1),
      tr("Je ne suis pas tout à fait d'accord avec cette idée.", ["i don't entirely agree with this idea", "i do not entirely agree with this idea", "i don't fully agree with this idea", "i don't completely agree with this idea", "i don't entirely agree with that idea", "i'm not entirely sure i agree with this idea"]),
    ],
  },
  "crfpa-blanks": {
    model: {
      title: "Se rattraper face au jury", parts: [
        ["Jury: How separate are the powers in the United Kingdom?", "Une question difficile"],
        ["That's a tricky question. Let me think about it for a second.", "Gagner du temps"],
        ["If I understand correctly, you are asking whether Parliament is really separate from the government?", "Reformuler pour vérifier"],
        ["Well, not entirely: the person who leads the government, I mean the Prime Minister, sits in the House of Commons.", "Contourner un mot puis se corriger"],
        ["So the separation is weaker than in the American system.", "Conclure la réponse"],
      ],
    },
    exercises: [
      q("Tu viens de faire une faute de grammaire :", ["Tu continues comme si de rien n'était.", "Tu te corriges : « sorry, I mean… »", "Tu t'excuses longuement en français."], 1),
      q("« Could you rephrase that? » veut dire :", ["Pourriez-vous reformuler ?", "Pourriez-vous parler plus fort ?", "Pouvez-vous traduire ?"], 0),
      q("Un silence est sans conséquence s'il dure…", ["quelques secondes", "une minute", "il ne faut jamais se taire"], 0),
      sp("Pardon, je veux dire la Cour suprême, pas le Parlement.", ["sorry, i mean the supreme court, not parliament", "sorry, i mean the supreme court, not the parliament", "sorry, i meant the supreme court, not parliament"]),
    ],
  },
  "crfpa-errors-1": {
    exercises: [
      q("Phrase correcte :", ["She gave me an advice.", "She gave me some advice.", "She gave me advices."], 1),
      q("Phrase correcte :", ["People is worried.", "People are worried.", "Peoples are worried."], 1),
      q("Phrase correcte :", ["The law apply to everyone.", "The law applies to everyone.", "The law is apply to everyone."], 1),
      tr("Les informations sont incomplètes.", ["the information is incomplete", "this information is incomplete"]),
    ],
  },
  "crfpa-errors-2": {
    exercises: [
      q("Phrase correcte :", ["The article speaks about prisons.", "The article deals with prisons.", "The article talks of prisons."], 1),
      q("Phrase correcte :", ["When the law will be passed, …", "When the law is passed, …", "When the law would be passed, …"], 1),
      q("Phrase correcte :", ["He said me that…", "He told me that…", "He told that…"], 1),
      tr("Pouvez-vous m'expliquer cette décision ?", ["can you explain this decision to me?", "could you explain this decision to me?", "can you explain this ruling to me?", "could you explain this ruling to me?", "can you explain the decision to me?", "could you explain the decision to me?"]),
    ],
  },
  "crfpa-numbers": {
    exercises: [
      q("« 1,5 million » se lit…", ["one comma five million", "one point five million", "one and five million"], 1),
      q("« Les années 2010 » :", ["the 2010s", "the 2010 years", "the years 2010"], 0),
      q("« 10 000 » s'écrit en anglais…", ["10.000", "10,000", "10 000s"], 1),
      tr("Le budget de la justice a doublé en dix ans.", ["the justice budget has doubled in ten years", "the justice budget doubled in ten years", "the budget for justice has doubled in ten years", "the justice budget has doubled over ten years", "the justice budget doubled over ten years", "the justice budget has doubled in a decade"]),
    ],
  },
  "crfpa-linkers": {
    exercises: [
      q("« Whereas » exprime…", ["une opposition entre deux faits", "une cause", "une conséquence"], 0),
      q("« Hence » signifie…", ["d'où, c'est pourquoi", "ici", "cependant"], 0),
      q("« ___ it was expensive, the reform was adopted. » (bien que)", ["Despite", "Although", "However"], 1),
      sp("En outre, la loi a été contestée devant la Cour suprême.", ["furthermore, the law was challenged before the supreme court", "moreover, the law was challenged before the supreme court", "in addition, the law was challenged before the supreme court", "furthermore, the law has been challenged before the supreme court", "moreover, the law has been challenged before the supreme court", "furthermore, the law was challenged in the supreme court", "moreover, the law was challenged in the supreme court"]),
    ],
  },
  "crfpa-tenses": {
    exercises: [
      q("« La Cour a rendu sa décision hier. »", ["The court has delivered its ruling yesterday.", "The court delivered its ruling yesterday.", "The court had delivered its ruling yesterday."], 1),
      q("« Il a avoué qu'il avait menti. »", ["He admitted that he lied before.", "He admitted that he had lied.", "He has admitted that he has lied."], 1),
      q("« should have + participe passé » exprime…", ["un reproche sur le passé", "une obligation future", "une certitude"], 0),
      tr("Le gouvernement aurait pu éviter cette crise.", ["the government could have avoided this crisis", "the government could have prevented this crisis", "the government might have avoided this crisis", "the government could have avoided the crisis"]),
    ],
  },
  "crfpa-passive": {
    exercises: [
      q("« Il a été libéré sous caution » :", ["He was released on bail.", "He was freed under caution.", "He was released with bail."], 0),
      q("« Accusé de » :", ["accused for", "accused of", "accused with"], 1),
      q("« L'affaire a été rejetée » :", ["The case was dismissed.", "The case was classified.", "The case was rejected out."], 0),
      sp("Le projet de loi a été adopté par le Parlement.", ["the bill was passed by parliament", "the bill has been passed by parliament", "the bill was adopted by parliament", "the bill has been adopted by parliament", "the bill was approved by parliament"]),
    ],
  },
  "crfpa-modals-law": {
    exercises: [
      q("« The tenant shall not sublet the flat » exprime…", ["une interdiction", "une possibilité", "un conseil"], 0),
      q("« Passible d'une amende » :", ["liable for a fine", "liable to a fine", "entitled to a fine"], 1),
      q("À l'oral, pour exprimer une obligation, on dit plutôt…", ["shall", "must / is required to", "may"], 1),
      tr("Les salariés ont droit à cinq semaines de congés payés.", ["employees are entitled to five weeks of paid leave", "employees are entitled to five weeks' paid leave", "employees are entitled to five weeks paid leave", "workers are entitled to five weeks of paid leave", "employees are entitled to five weeks of paid holiday"]),
    ],
  },
  "crfpa-reporting": {
    model: {
      title: "Résumer un arrêt célèbre", parts: [
        ["In Dobbs v. Jackson Women's Health Organization (2022), the US Supreme Court held that the Constitution does not confer a right to abortion.", "La règle posée (held that)"],
        ["By five votes to four, it overruled Roe v. Wade, a landmark ruling from 1973.", "La majorité et l'arrêt renversé"],
        ["Three justices wrote a joint dissenting opinion.", "L'opinion dissidente"],
        ["As a result, the regulation of abortion was returned to the states.", "La conséquence"],
      ],
    },
    exercises: [
      q("« Une opinion dissidente » :", ["a dissenting opinion", "a dissident opinion", "an opposing judgment"], 0),
      q("« In a 6-3 decision » veut dire…", ["à six voix contre trois", "à 6 h 03", "six juges sur trois"], 0),
      q("« The court of appeal upheld the ruling » : la décision a été…", ["confirmée", "annulée", "reportée"], 0),
      sp("La Cour suprême a jugé que la loi était contraire à la Constitution.", ["the supreme court held that the law was unconstitutional", "the supreme court ruled that the law was unconstitutional", "the supreme court found that the law was unconstitutional", "the supreme court held that the law was contrary to the constitution", "the supreme court ruled that the law was contrary to the constitution"]),
    ],
  },
  "crfpa-pronunciation": {
    exercises: [
      q("Accent tonique de « legislation » :", ["LE-gis-la-tion", "legis-LA-tion", "legisla-TION"], 1),
      q("« to record » (le verbe) se prononce…", ["RE-cord", "re-CORD", "les deux"], 1),
      q("« decided » se termine par le son…", ["/t/", "/d/", "/ɪd/"], 2),
      q("Dans « debt », quelle lettre est muette ?", ["le d", "le b", "le t"], 1),
    ],
  },
};

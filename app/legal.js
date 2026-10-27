// Mode CRFPA : préparation à l'oral d'anglais de l'examen d'accès au CRFPA.
// Épreuve (arrêté du 17 octobre 2016) : article de presse de 450 à 550 mots, 15 min de préparation
// sans document, 15 min d'oral (exposé puis entretien), anglais uniquement, coefficient 1.
// Même format que data.js : chaque leçon a une fiche, du vocabulaire et des exercices.
import { LEGAL_EXTRA, LEGAL_MORE } from "./legal-extra.js";

export const LEGAL = [
  {
    id: "M1", label: "Module 1", name: "L'épreuve et la méthode",
    lessons: [
      {
        id: "crfpa-rules", title: "Les règles du jeu",
        tip: "15 minutes de préparation <b>sans aucun document</b>, puis 15 minutes devant le jury : environ <b>7-8 min d'exposé</b> (introduction, synthèse, commentaire, conclusion) et <b>7-8 min d'entretien</b>. Le jury note la <b>langue</b> (correction, richesse, aisance, prononciation) et la <b>compréhension-analyse</b>. Préparation en 5/3/7 : 5 min pour lire, 3 min pour problématiser et faire le plan, 7 min pour les notes.",
        words: [["l'exposé", "the presentation"], ["la synthèse", "the summary"], ["le commentaire", "the analysis, the commentary"], ["l'entretien", "the interview, the discussion"], ["la problématique", "the key question, the issue at stake"], ["l'enjeu", "what is at stake"]],
        exercises: [
          { type: "qcm", q: "Combien de temps dure la préparation ?", choices: ["10 minutes", "15 minutes", "30 minutes"], answer: 1 },
          { type: "qcm", q: "Pendant la préparation, tu peux utiliser…", choices: ["un dictionnaire unilingue", "tes fiches de vocabulaire", "aucun document"], answer: 2 },
          { type: "qcm", q: "Quelle partie fait le plus souvent la différence ?", choices: ["La synthèse", "Le commentaire", "L'introduction"], answer: 1 },
          { type: "speak", q: "Dis : « Merci de votre attention. Je suis prêt à répondre à vos questions. »", answers: ["thank you for your attention. i am now ready to answer your questions", "thank you for your attention. i am ready to answer your questions", "thank you for your attention. i'm now ready to answer your questions", "thank you for your attention. i'm ready to answer your questions"] },
        ],
      },
      {
        id: "crfpa-reading", title: "Lire un article en 5 minutes",
        tip: "Pas besoin de tout comprendre : il faut comprendre <b>qui dit quoi, sur quoi, pourquoi maintenant et dans quel but</b>. Six questions : la source (titre, date, ligne éditoriale), le <b>déclencheur</b> (une loi, une décision, une étude…), qui parle, de quoi, la visée (informer, critiquer, convaincre) et la structure. Le déclencheur organise presque toujours ta synthèse. Repère les noms propres, les chiffres et les mots de liaison (<i>however, yet, as a result</i>).",
        words: [["le déclencheur", "the trigger"], ["la ligne éditoriale", "the editorial line"], ["un quotidien", "a daily (newspaper)"], ["une tribune", "an op-ed"], ["le ton", "the tone"], ["dénoncer", "to denounce"]],
        exercises: [
          { type: "qcm", q: "Dans un article, « eventually » signifie…", choices: ["éventuellement", "finalement", "évidemment"], answer: 1 },
          { type: "qcm", q: "« The Guardian » est un quotidien…", choices: ["de centre gauche", "conservateur", "économique"], answer: 0 },
          { type: "qcm", q: "Le « déclencheur » de l'article sert surtout à…", choices: ["trouver l'accroche", "organiser la synthèse", "choisir la conclusion"], answer: 1 },
          { type: "speak", q: "Dis : « L'article est tiré du New York Times et traite de l'intelligence artificielle. »", answers: ["the article is taken from the new york times and deals with artificial intelligence", "the article is from the new york times and deals with artificial intelligence", "the article is taken from the new york times and it deals with artificial intelligence"] },
        ],
      },
      {
        id: "crfpa-intro", title: "Introduction et synthèse",
        tip: "<b>Introduction (≈ 1 min)</b> : une accroche, puis l'article (« The article I have been given is entitled… It was published in… on… »), le thème (« It deals with / tackles the issue of… »), la problématique (« This raises the following question: to what extent…? ») et le plan. <b>Synthèse (2-3 min)</b> : neutre et organisée. Varie les verbes : <i>states, points out, stresses, highlights, reports, claims</i>. Pas de paraphrase ligne à ligne.",
        words: [["traiter de", "to deal with"], ["aborder (un problème)", "to tackle"], ["souligner", "to stress, to highlight"], ["faire remarquer", "to point out"], ["affirmer", "to claim, to state"], ["rendre compte de", "to give an account of"]],
        exercises: [
          { type: "qcm", q: "Pour présenter le thème, on dit…", choices: ["The article speaks about…", "The article deals with…", "The article talks of…"], answer: 1 },
          { type: "qcm", q: "Quelle phrase introduit la problématique ?", choices: ["This raises the following question:", "To sum up,", "First of all, the journalist…"], answer: 0 },
          { type: "translate", q: "Le journaliste souligne que la justice est trop lente.", answers: ["the journalist stresses that justice is too slow", "the journalist highlights that justice is too slow", "the journalist points out that justice is too slow", "the journalist emphasises that justice is too slow", "the journalist emphasizes that justice is too slow"] },
          { type: "speak", q: "Dis : « Tout d'abord, je résumerai les principaux points de l'article. »", answers: ["first, i will sum up the main points of the article", "first of all, i will sum up the main points of the article", "first, i'll sum up the main points of the article", "first of all, i'll sum up the main points of the article", "first, i will summarise the main points of the article"] },
        ],
      },
      {
        id: "crfpa-analysis", title: "Commentaire et conclusion",
        tip: "<b>Commentaire (≈ 4 min)</b> : 1 ou 2 axes qui partent du texte pour prendre du recul (contexte, droit, comparaison avec la France). Appuie-toi sur des références précises : une loi, un arrêt, une date. <b>Repère</b> : à 3 min 30, tu dois avoir dit ta transition. <b>Conclusion (≈ 1 min)</b> : bilan en une phrase, avis nuancé, ouverture (« It will be interesting to see whether… »).",
        words: [["mériter un commentaire", "to be worth commenting on"], ["ce qui est frappant", "what is striking"], ["en revanche, en France", "by contrast, in France"], ["il faut souligner que", "it should be stressed that"], ["il reste à savoir si", "it remains to be seen whether"], ["certes… mais", "admittedly… but"]],
        exercises: [
          { type: "qcm", q: "La transition vers le commentaire :", choices: ["Having summed up the main points, I would now like to move on to my analysis.", "Now I speak about my opinion.", "The second part is my comment."], answer: 0 },
          { type: "qcm", q: "Pour comparer avec la France :", choices: ["In the contrary, in France…", "By contrast, in France…", "At the opposite, in France…"], answer: 1 },
          { type: "speak", q: "Dis : « Ce qui est particulièrement frappant, c'est que l'erreur est humaine, pas technologique. »", answers: ["what is particularly striking is that the mistake is human, not technological", "what is particularly striking is that the error is human, not technological", "what's particularly striking is that the mistake is human, not technological"] },
        ],
      },
      {
        id: "crfpa-interview", title: "Réussir l'entretien",
        tip: "Le jury teste ta <b>spontanéité</b>. Réponds en <b>4 temps</b> (30 à 45 secondes) : 1) réponse directe ; 2) justification (« because… ») ; 3) exemple précis (loi, arrêt, chiffre) ; 4) nuance ou comparaison avec la France. Pour gagner du temps : <i>That's a very interesting question. Let me think about it for a second.</i> Si tu ne comprends pas : <i>I'm sorry, could you repeat the question, please?</i> Jamais de réponse d'un mot, jamais de français.",
        words: [["pouvez-vous reformuler ?", "could you rephrase that?"], ["voulez-vous dire que… ?", "do you mean that…?"], ["je n'en suis pas tout à fait sûr", "I'm not entirely sure"], ["je partage ce point de vue en partie", "I share this view to a certain extent"], ["avec tout le respect que je vous dois", "with respect"], ["laissez-moi reformuler", "let me rephrase that"]],
        exercises: [
          { type: "qcm", q: "Tu n'as pas compris la question :", choices: ["Pardon?", "I'm sorry, could you repeat the question, please?", "What?"], answer: 1 },
          { type: "qcm", q: "Le 3e temps d'une bonne réponse est…", choices: ["une nuance", "un exemple précis", "une question au jury"], answer: 1 },
          { type: "speak", q: "Dis : « Je n'en suis pas tout à fait sûr, mais je suppose que… »", answers: ["i'm not entirely sure, but i would assume that", "i am not entirely sure, but i would assume that", "i'm not entirely sure but i would assume that", "i'm not entirely sure, but i'd assume that"] },
        ],
      },
    ],
  },
  {
    id: "M2", label: "Module 2", name: "La langue qui rapporte des points",
    lessons: [
      {
        id: "crfpa-errors-1", title: "Les fautes qui coûtent cher (1)",
        tip: "Le jury repère les fautes <b>récurrentes</b>. <b>I agree</b> (jamais « I am agree ») · <b>-s</b> à la 3e personne : <i>it depends</i> · « depuis » + durée : <i>I have been studying law <b>for</b> five years</i> · date précise → prétérit : <i>The court <b>ruled</b> in 2021</i> · indénombrables : <i>information, advice, evidence</i> (pas de -s, pas de « a ») · <i>the news <b>is</b></i>, <i>the police <b>are</b></i>, <i>people <b>are</b></i>.",
        words: [["les informations", "information"], ["des conseils", "advice"], ["les preuves", "evidence"], ["la police enquête", "the police are investigating"], ["les nouvelles sont mauvaises", "the news is bad"], ["je suis d'accord", "I agree"]],
        exercises: [
          { type: "qcm", q: "Phrase correcte :", choices: ["The evidences were overwhelming.", "The evidence was overwhelming.", "The evidence were overwhelming."], answer: 1 },
          { type: "qcm", q: "Phrase correcte :", choices: ["The police is investigating.", "The police are investigating."], answer: 1 },
          { type: "qcm", q: "« J'étudie le droit depuis cinq ans. »", choices: ["I study law since five years.", "I have been studying law for five years.", "I am studying law since five years."], answer: 1 },
          { type: "qcm", q: "« La Cour a statué en 2021. »", choices: ["The court has ruled in 2021.", "The court ruled in 2021."], answer: 1 },
          { type: "speak", q: "Dis : « Je suis d'accord avec le journaliste sur ce point. »", answers: ["i agree with the journalist on this point", "i agree with the journalist on that point"] },
        ],
      },
      {
        id: "crfpa-errors-2", title: "Les fautes qui coûtent cher (2)",
        tip: "<i>depend <b>on</b></i>, <i>rely on</i>, <i>focus on</i> · <i>We <b>discussed</b> it</i> (sans « about ») · <i>Explain this <b>to</b> me</i> · un article ne « parle » pas : <i>it <b>deals with</b></i> · <i><b>the</b> United States</i>, <i><b>the</b> UK</i>, mais <i>France</i>, <i>Congress</i>, <i>Parliament</i> · <i>If I <b>were</b> a judge</i> (jamais « would » après if) · <i>When the law <b>is</b> passed</i> (pas de futur après when) · <i>He <b>told</b> me</i> / <i>he <b>said</b> that</i> · <i>I don't know what the answer <b>is</b></i>.",
        words: [["dépendre de", "to depend on"], ["discuter de quelque chose", "to discuss something"], ["expliquer quelque chose à quelqu'un", "to explain something to someone"], ["si j'étais juge", "if I were a judge"], ["quand la loi sera votée", "when the law is passed"], ["il m'a dit que", "he told me that"]],
        exercises: [
          { type: "qcm", q: "Phrase correcte :", choices: ["It depends of the judge.", "It depends on the judge."], answer: 1 },
          { type: "qcm", q: "Phrase correcte :", choices: ["We discussed about the issue.", "We discussed the issue."], answer: 1 },
          { type: "qcm", q: "Phrase correcte :", choices: ["If I would be the judge, I would…", "If I were the judge, I would…"], answer: 1 },
          { type: "qcm", q: "Phrase correcte :", choices: ["The Supreme Court of United States", "The Supreme Court of the United States"], answer: 1 },
          { type: "translate", q: "Je ne sais pas quel est le chiffre exact.", answers: ["i don't know what the exact figure is", "i do not know what the exact figure is", "i don't know what the exact number is"] },
        ],
      },
      {
        id: "crfpa-tenses", title: "Temps et modaux pour nuancer",
        tip: "<b>Prétérit</b> = date précise : <i>The Court overruled Roe in 2022.</i> <b>Present perfect</b> = bilan sans date : <i>Since 2022, several states have banned abortion.</i> <b>Past perfect</b> = antériorité : <i>He admitted that the chatbot had invented the cases.</i> Modaux : <i>must</i> (obligation), <i>should</i> (souhaitable), <i>may / might / could</i> (possible), <i>should have + participe</i> (reproche) : <i>He should have checked.</i> Conditionnel type 3 : <i>If he had checked, he would not have been sanctioned.</i>",
        words: [["il aurait dû vérifier", "he should have checked"], ["cela pourrait se retourner contre…", "this could backfire"], ["il a dû faire confiance", "he must have trusted"], ["il est probable que", "it is likely to"], ["s'il avait vérifié", "if he had checked"], ["il est censé", "he is supposed to"]],
        exercises: [
          { type: "qcm", q: "« Depuis 2022, plusieurs États ont interdit l'avortement. »", choices: ["Since 2022, several states banned abortion.", "Since 2022, several states have banned abortion."], answer: 1 },
          { type: "qcm", q: "« S'il avait vérifié, il n'aurait pas été sanctionné. »", choices: ["If he checked, he wouldn't be sanctioned.", "If he had checked, he wouldn't have been sanctioned.", "If he would have checked, he wouldn't be sanctioned."], answer: 1 },
          { type: "translate", q: "L'avocat aurait dû vérifier ses sources.", answers: ["the lawyer should have checked his sources", "the lawyer should have verified his sources", "the lawyer should have checked their sources", "the lawyer should have checked her sources"] },
          { type: "speak", q: "Dis : « Cette décision pourrait ouvrir la voie à de nombreux recours. »", answers: ["this ruling could pave the way for numerous appeals", "this decision could pave the way for many appeals", "this ruling could pave the way for many appeals", "this decision could pave the way for numerous appeals", "this ruling may pave the way for many appeals"] },
        ],
      },
      {
        id: "crfpa-pronunciation", title: "Prononciation et fluidité",
        tip: "C'est l'<b>accent tonique</b> qui rend un mot compréhensible : consti-<b>TU</b>-tion, legis-<b>LA</b>-tion, <b>PRE</b>-cedent, ju-<b>DI</b>-cial, juris-<b>DIC</b>-tion, <b>PAR</b>-liament. Nom ≠ verbe : a <b>RE</b>-cord / to re-<b>CORD</b>, a <b>CON</b>-vict / to con-<b>VICT</b>. Le <b>-ed</b> : /t/ (asked), /d/ (ruled), /ɪd/ seulement après t ou d (decided). Lettres muettes : <i>indict</i> (le c), <i>debt</i>, <i>receipt</i>. Remplace « euh » par <i>well, so, let me think</i>.",
        words: [["constitution", "constitution"], ["précédent", "precedent"], ["mettre en accusation (US)", "to indict"], ["déclarer coupable", "to convict"], ["un détenu", "a convict"], ["le Parlement", "Parliament"]],
        exercises: [
          { type: "qcm", q: "Où est l'accent tonique de « judicial » ?", choices: ["JU-dicial", "ju-DI-cial", "judi-CIAL"], answer: 1 },
          { type: "qcm", q: "Dans « indict », quelle lettre est muette ?", choices: ["le d", "le c", "le t"], answer: 1 },
          { type: "qcm", q: "« ruled » se termine par le son…", choices: ["/t/", "/d/", "/ɪd/"], answer: 1 },
          { type: "speak", q: "Dis (attention aux accents toniques) : « The Constitutional Council reviewed the legislation. »", answers: ["the constitutional council reviewed the legislation"] },
        ],
      },
    ],
  },
  {
    id: "M3", label: "Module 3", name: "Culture juridique anglo-saxonne",
    lessons: [
      {
        id: "crfpa-uk", title: "La constitution britannique",
        tip: "Le Royaume-Uni a une constitution <b>non codifiée</b> (<i>uncodified</i>) : des lois (Magna Carta 1215, Bill of Rights 1689, Human Rights Act 1998), la common law et des <b>conventions</b>. Trois piliers selon A. V. Dicey (1885) : <b>parliamentary sovereignty</b>, <b>the rule of law</b>, les conventions. Les juges ne peuvent pas annuler une loi : ils peuvent seulement prononcer une <b>declaration of incompatibility</b> avec la Convention européenne (HRA 1998, s. 4). La <b>UK Supreme Court</b> existe depuis le 1er octobre 2009.",
        words: [["la souveraineté du Parlement", "parliamentary sovereignty"], ["l'État de droit", "the rule of law"], ["une constitution non codifiée", "an uncodified constitution"], ["la déclaration d'incompatibilité", "a declaration of incompatibility"], ["la dévolution", "devolution"], ["la sanction royale", "Royal Assent"]],
        exercises: [
          { type: "qcm", q: "Un juge britannique peut-il annuler une loi du Parlement ?", choices: ["Oui, comme le Conseil constitutionnel", "Non, il peut seulement déclarer une incompatibilité", "Oui, mais seulement la Supreme Court"], answer: 1 },
          { type: "qcm", q: "Depuis quand existe la UK Supreme Court ?", choices: ["1998", "2009", "2016"], answer: 1 },
          { type: "qcm", q: "Après le Brexit, le Royaume-Uni est-il encore partie à la Convention européenne des droits de l'homme ?", choices: ["Oui : elle relève du Conseil de l'Europe, pas de l'UE", "Non, il l'a quittée en 2020"], answer: 0 },
          { type: "speak", q: "Dis : « Le Royaume-Uni n'a pas de constitution codifiée. »", answers: ["the uk does not have a codified constitution", "the uk doesn't have a codified constitution", "the united kingdom does not have a codified constitution", "the uk has no codified constitution", "the united kingdom has no codified constitution", "the united kingdom doesn't have a codified constitution"] },
        ],
      },
      {
        id: "crfpa-uk-courts", title: "Juridictions et professions au Royaume-Uni",
        tip: "<b>Magistrates' courts</b> : l'essentiel des affaires pénales, souvent jugées par des juges non professionnels (<i>lay magistrates</i>). <b>Crown Court</b> : infractions graves, jury de 12. <b>County Court</b> et <b>High Court</b> : le civil. Puis <b>Court of Appeal</b> et <b>UK Supreme Court</b>. Les professions : le <b>solicitor</b> conseille le client et prépare le dossier ; le <b>barrister</b> plaide et rend des avis, il est « called to the Bar » ; les plus éminents deviennent <b>King's Counsel (KC)</b>, « taking silk ». En France, l'avocat fait les deux, comme l'<i>attorney</i> américain.",
        words: [["l'avocat plaidant (UK)", "a barrister"], ["l'avocat-conseil (UK)", "a solicitor"], ["être inscrit au barreau", "to be called to the Bar"], ["un juge non professionnel", "a lay magistrate"], ["la libération sous caution", "bail"], ["un jury", "a jury"]],
        exercises: [
          { type: "qcm", q: "Qui est, en principe, le premier interlocuteur du client en Angleterre ?", choices: ["Le barrister", "Le solicitor", "Le magistrate"], answer: 1 },
          { type: "qcm", q: "Où sont jugées les infractions graves (meurtre, viol) en Angleterre ?", choices: ["Magistrates' court", "Crown Court", "County Court"], answer: 1 },
          { type: "qcm", q: "« A magistrate » (UK) est…", choices: ["un magistrat professionnel", "un juge souvent non professionnel des magistrates' courts", "un procureur"], answer: 1 },
          { type: "speak", q: "Dis : « En France, l'avocat conseille et plaide, comme l'attorney américain. »", answers: ["in france, the avocat both advises and pleads, like the american attorney", "in france, lawyers both advise and plead, like american attorneys", "in france, the lawyer advises and pleads, like the american attorney", "in france, lawyers advise and plead, like american attorneys"] },
        ],
      },
      {
        id: "crfpa-us", title: "La Constitution américaine",
        tip: "La plus ancienne constitution écrite en vigueur (1787), courte (7 articles, 27 amendements) et rigide. Trois idées : le <b>fédéralisme</b>, la <b>séparation des pouvoirs</b> (<i>checks and balances</i>) et le <b>contrôle de constitutionnalité</b> (<i>judicial review</i>, Marbury v. Madison, 1803). Amendements à connaître : <b>1st</b> (religion, expression, presse, réunion), <b>2nd</b> (armes), <b>4th</b> (fouilles et saisies), <b>5th</b> (« to plead the Fifth », double jeopardy, due process), <b>6th</b> (procès rapide, jury, avocat), <b>8th</b> (« cruel and unusual punishments »), <b>14th</b> (citoyenneté par la naissance, <i>equal protection</i>).",
        words: [["le contrôle de constitutionnalité", "judicial review"], ["les freins et contrepoids", "checks and balances"], ["le fédéralisme", "federalism"], ["un amendement", "an amendment"], ["l'égale protection des lois", "equal protection"], ["refuser de s'auto-incriminer", "to plead the Fifth"]],
        exercises: [
          { type: "qcm", q: "Quel arrêt fonde le contrôle de constitutionnalité aux États-Unis ?", choices: ["Brown v. Board of Education", "Marbury v. Madison", "Roe v. Wade"], answer: 1 },
          { type: "qcm", q: "Quel amendement protège la liberté d'expression ?", choices: ["Le 1er", "Le 5e", "Le 14e"], answer: 0 },
          { type: "qcm", q: "« Cruel and unusual punishments » renvoie au…", choices: ["2e amendement", "8e amendement", "14e amendement"], answer: 1 },
          { type: "speak", q: "Dis : « Le premier amendement protège la liberté d'expression. »", answers: ["the first amendment protects freedom of speech", "the first amendment protects freedom of expression", "the first amendment protects free speech"] },
        ],
      },
      {
        id: "crfpa-scotus", title: "La Cour suprême et les grands arrêts",
        tip: "Neuf juges (le <i>Chief Justice</i> et huit <i>Associate Justices</i>), <b>nommés</b> par le Président et <b>confirmés</b> par le Sénat, à vie. Saisine par <i>petition for a writ of certiorari</i>. Les opinions : <b>majority</b>, <b>concurring</b> (d'accord sur la solution, pas sur le raisonnement), <b>dissenting</b> (« I respectfully dissent »). La Cour peut renverser un précédent (<b>to overrule</b>) : Brown (1954) renverse Plessy (1896), Dobbs (2022) renverse Roe (1973). Méthodes : <i>originalism</i>, <i>textualism</i> ou « living Constitution ».",
        words: [["nommer (un juge)", "to nominate"], ["confirmer (Sénat)", "to confirm"], ["une opinion dissidente", "a dissenting opinion"], ["renverser un précédent", "to overrule"], ["l'arrêt de principe", "a landmark case"], ["la majorité conservatrice", "the conservative majority"]],
        exercises: [
          { type: "qcm", q: "Combien de juges siègent à la Cour suprême des États-Unis ?", choices: ["8", "9", "12"], answer: 1 },
          { type: "qcm", q: "Quel arrêt a renversé Roe v. Wade ?", choices: ["Dobbs v. Jackson Women's Health Organization (2022)", "Obergefell v. Hodges (2015)", "Citizens United v. FEC (2010)"], answer: 0 },
          { type: "qcm", q: "Une « concurring opinion » est…", choices: ["d'accord sur la solution, pas sur le raisonnement", "un désaccord total avec la majorité", "une décision non signée"], answer: 0 },
          { type: "speak", q: "Dis : « Les juges sont nommés par le Président et confirmés par le Sénat. »", answers: ["justices are nominated by the president and confirmed by the senate", "the justices are nominated by the president and confirmed by the senate", "judges are nominated by the president and confirmed by the senate", "the judges are nominated by the president and confirmed by the senate"] },
        ],
      },
    ],
  },
  {
    id: "M4", label: "Module 4", name: "Vocabulaire actif",
    lessons: [
      {
        id: "crfpa-criminal", title: "Procédure pénale",
        tip: "Apprends ces mots <b>dans le sens français → anglais</b>, à voix haute. Attention : <i>to convict</i> = déclarer coupable ; <i>to sentence</i> = prononcer la peine ; <i>an acquittal</i> = un acquittement. La garde à vue = <i>police custody</i> ; la détention provisoire = <i>pre-trial detention</i> (« to be remanded in custody »).",
        words: [["la garde à vue", "police custody"], ["la détention provisoire", "pre-trial detention"], ["déclarer coupable", "to convict"], ["condamner à cinq ans", "to sentence to five years"], ["une peine avec sursis", "a suspended sentence"], ["le casier judiciaire", "a criminal record"], ["une erreur judiciaire", "a miscarriage of justice"]],
        exercises: [
          { type: "qcm", q: "« He was convicted of fraud. »", choices: ["Il a été condamné pour fraude (déclaré coupable)", "Il a été convaincu de frauder", "Il a été accusé de fraude"], answer: 0 },
          { type: "qcm", q: "« La détention provisoire » :", choices: ["police custody", "pre-trial detention", "probation"], answer: 1 },
          { type: "translate", q: "Il a été condamné à cinq ans d'emprisonnement.", answers: ["he was sentenced to five years in prison", "he was sentenced to five years' imprisonment", "he was sentenced to five years imprisonment", "he was sentenced to five years of imprisonment"] },
          { type: "speak", q: "Dis : « Le prévenu a été placé en détention provisoire dans l'attente de son procès. »", answers: ["the defendant was remanded in custody pending trial", "the defendant was remanded in custody pending his trial", "the defendant was placed in pre-trial detention", "the defendant was remanded in custody awaiting trial"] },
        ],
      },
      {
        id: "crfpa-civil", title: "Procès civil et voies de recours",
        tip: "Le demandeur = <i>the claimant</i> (UK) / <i>the plaintiff</i> (US) ; le défendeur = <i>the defendant</i>. Une audience = <i>a hearing</i>. Les décisions : <i>to uphold</i> (confirmer), <i>to quash / to overturn / to set aside</i> (annuler), <i>to strike down</i> (censurer une loi). <i>Damages</i> (dommages et intérêts) est toujours au pluriel dans ce sens.",
        words: [["le demandeur", "the claimant"], ["une audience", "a hearing"], ["faire appel", "to appeal"], ["confirmer une décision", "to uphold a decision"], ["annuler une décision", "to quash a decision"], ["des dommages et intérêts", "damages"], ["le délai de prescription", "the limitation period"]],
        exercises: [
          { type: "qcm", q: "« La Cour suprême a confirmé la décision. »", choices: ["The Supreme Court confirmed the decision.", "The Supreme Court upheld the decision.", "The Supreme Court affirmed by the decision."], answer: 1 },
          { type: "qcm", q: "« Censurer une loi » (Conseil constitutionnel) :", choices: ["to censor a law", "to strike down a law", "to blame a law"], answer: 1 },
          { type: "translate", q: "Cette loi a été abrogée en 2024.", answers: ["this law was repealed in 2024", "the law was repealed in 2024", "this act was repealed in 2024"] },
          { type: "speak", q: "Dis : « La Cour suprême a confirmé la décision de la cour d'appel. »", answers: ["the supreme court upheld the decision of the court of appeal", "the supreme court upheld the court of appeal's decision", "the supreme court upheld the ruling of the court of appeal"] },
        ],
      },
      {
        id: "crfpa-rights", title: "Constitution et libertés",
        tip: "L'État de droit = <i>the rule of law</i>. Le contrôle de constitutionnalité = <i>constitutional review</i>. La QPC = <i>the priority preliminary ruling on constitutionality</i>. Libertés : <i>freedom of speech / expression</i>, <i>freedom of assembly</i>, <i>the right to privacy</i>, <i>the right to a fair trial</i> (article 6 de la Convention). La laïcité : <i>secularism</i> (« laïcité »). Un lanceur d'alerte = <i>a whistleblower</i>.",
        words: [["l'État de droit", "the rule of law"], ["la liberté d'expression", "freedom of expression"], ["le droit au respect de la vie privée", "the right to privacy"], ["le droit à un procès équitable", "the right to a fair trial"], ["un lanceur d'alerte", "a whistleblower"], ["un demandeur d'asile", "an asylum seeker"], ["l'état d'urgence", "a state of emergency"]],
        exercises: [
          { type: "qcm", q: "« Le droit à un procès équitable » est garanti par…", choices: ["l'article 6 de la Convention européenne", "l'article 2 de la Convention européenne", "le 2e amendement"], answer: 0 },
          { type: "qcm", q: "« L'État de droit » :", choices: ["the state of law", "the rule of law", "the law state"], answer: 1 },
          { type: "translate", q: "Le Conseil constitutionnel a censuré la disposition.", answers: ["the constitutional council struck down the provision"] },
          { type: "speak", q: "Dis : « Les juges doivent trouver un équilibre entre sécurité et liberté. »", answers: ["judges must strike a balance between security and liberty", "judges must strike a balance between security and freedom", "judges have to strike a balance between security and liberty", "judges have to strike a balance between security and freedom"] },
        ],
      },
      {
        id: "crfpa-falsefriends", title: "Les faux amis juridiques",
        tip: "<i>Jurisprudence</i> = la philosophie du droit (la jurisprudence = <b>case law</b>). La doctrine des auteurs = <b>legal scholarship</b>. <i>Magistrate</i> (UK) = juge non professionnel. <i>To condemn</i> = blâmer (condamner en justice = <b>to convict / to sentence</b>). <i>Prejudice</i> = préjugé (le préjudice = <b>harm, damage</b>). <i>Arrest</i> = arrestation (un arrêt = <b>a judgment, a ruling</b>). <i>A sentence</i> = une peine. <i>Competition</i> = la concurrence (la compétence d'un tribunal = <b>jurisdiction</b>).",
        words: [["la jurisprudence", "case law"], ["la doctrine", "legal scholarship"], ["un arrêt (décision)", "a judgment, a ruling"], ["le préjudice", "harm, damage"], ["la compétence (d'un tribunal)", "jurisdiction"], ["une peine", "a sentence"]],
        exercises: [
          { type: "qcm", q: "« Jurisprudence » en anglais signifie…", choices: ["la jurisprudence", "la philosophie du droit", "le droit des juges"], answer: 1 },
          { type: "qcm", q: "« Un arrêt de la Cour de cassation » :", choices: ["an arrest of the Court of Cassation", "a judgment of the Court of Cassation"], answer: 1 },
          { type: "qcm", q: "« Without prejudice » signifie…", choices: ["sans préjudice", "sous toutes réserves", "sans préjugé"], answer: 1 },
          { type: "translate", q: "La jurisprudence de la Cour européenne des droits de l'homme est claire.", answers: ["the case law of the european court of human rights is clear"] },
        ],
      },
    ],
  },
];

// Insère les leçons supplémentaires à leur place dans les modules.
for (const mod of LEGAL) {
  for (const extra of LEGAL_EXTRA[mod.id] || []) {
    const { after, ...lesson } = extra;
    const at = after ? mod.lessons.findIndex((l) => l.id === after) : -1;
    mod.lessons.splice(at >= 0 ? at + 1 : mod.lessons.length, 0, lesson);
  }
}
// Ajoute les modèles rédigés et les exercices complémentaires.
for (const mod of LEGAL) {
  for (const l of mod.lessons) {
    const more = LEGAL_MORE[l.id];
    if (!more) continue;
    if (more.model) l.model = more.model;
    l.exercises.push(...(more.exercises || []));
  }
}

// Questions de l'entretien (formulées de façon générale ; les réponses personnelles sont à construire soi-même).
export const JURY_QUESTIONS = [
  { topic: "Toi et ton projet", q: "Could you briefly introduce yourself?", hint: "Studies (degree, university, speciality) → experience (internships) → what you want to do and why. 45 seconds, no more." },
  { topic: "Toi et ton projet", q: "Why do you want to become a lawyer?", hint: "Give two real reasons (e.g. defending people, technical expertise, independence), each with a concrete example from your experience." },
  { topic: "Toi et ton projet", q: "Which field of law would you like to specialise in, and why?", hint: "Name the field, explain what attracts you, link it to a recent reform or case." },
  { topic: "Toi et ton projet", q: "Where do you see yourself in ten years?", hint: "Be realistic: a type of firm, a specialism, maybe international work." },
  { topic: "La profession", q: "What are the main ethical duties of a lawyer?", hint: "The French oath: dignity, conscience, independence, probity and humanity. Add professional secrecy, loyalty, competence." },
  { topic: "La profession", q: "What is the difference between a barrister and a solicitor?", hint: "Solicitors deal with clients and prepare cases; barristers specialise in advocacy and opinions. In France, the avocat does both, like the American attorney." },
  { topic: "La profession", q: "Can a lawyer defend someone he knows is guilty?", hint: "Yes: everyone is entitled to a defence and to a fair trial. But a lawyer must never lie to the court." },
  { topic: "La profession", q: "Will artificial intelligence replace lawyers?", hint: "AI as an assistant, not a source; lawyers remain responsible (the Mata v. Avianca fake citations). Judgment and accountability are human." },
  { topic: "Droit comparé", q: "What is the main difference between common law and civil law?", hint: "Case law and stare decisis vs codes (Civil Code 1804). Nuance: the two systems have converged." },
  { topic: "Droit comparé", q: "Does the United Kingdom have a constitution?", hint: "Yes, but uncodified: statutes, common law, conventions. Parliamentary sovereignty; declaration of incompatibility." },
  { topic: "Droit comparé", q: "How are US Supreme Court Justices appointed?", hint: "Nominated by the President, confirmed by the Senate, life tenure. Each vacancy is a political battle." },
  { topic: "Droit comparé", q: "Is the French Conseil constitutionnel comparable to the US Supreme Court?", hint: "Both review laws, but the Supreme Court is also the top of the federal judiciary. The Conseil: constitutional review only, QPC since 2010, nine-year terms, no dissenting opinions." },
  { topic: "Droit comparé", q: "What is habeas corpus?", hint: "The right to challenge the lawfulness of one's detention before a court; an English safeguard (Habeas Corpus Act 1679)." },
  { topic: "Droit comparé", q: "What does 'to plead the Fifth' mean?", hint: "To refuse to answer in order not to incriminate oneself, under the Fifth Amendment." },
  { topic: "Droit comparé", q: "What is the difference between the Council of Europe and the European Union?", hint: "Council of Europe: 46 states, human rights, ECHR, Strasbourg court. EU: 27 states, economic and political union, CJEU in Luxembourg." },
  { topic: "Société", q: "Are you in favour of the death penalty?", hint: "Position + reasons (risk of executing innocent people, no proven deterrent effect) + France (abolished 1981, in the Constitution since 2007) + nuance (victims' families)." },
  { topic: "Société", q: "Should social media be banned for children?", hint: "Legitimate goal, but blanket bans are easy to get round and restrict freedom of expression. Alternatives: age verification, platform responsibility." },
  { topic: "Société", q: "Should judges be elected, as in many US states?", hint: "Democratic legitimacy vs independence and impartiality; campaign funding; the French model of career judges." },
  { topic: "Société", q: "Is trial by jury a good thing?", hint: "A historic safeguard of liberty vs cost and delays. Compare: English Crown Court, French cours d'assises and cours criminelles départementales." },
  { topic: "Société", q: "Is surveillance compatible with the right to privacy?", hint: "Proportionality, judicial control, Article 8 of the Convention, GDPR." },
  { topic: "Société", q: "Should assisted dying be legal?", hint: "Autonomy and dignity vs protection of the vulnerable; safeguards; examples abroad." },
  { topic: "Société", q: "Is climate litigation a good thing?", hint: "Courts filling a political gap vs separation of powers; give a known climate case as an example." },
  { topic: "Déstabilisation", q: "I don't agree with your analysis. What do you say to that?", hint: "Don't give in at once, don't be stubborn: 'I see your point. Let me explain why I think… but I agree that…'" },
  { topic: "Déstabilisation", q: "Can you give me a concrete example?", hint: "Always keep in reserve a case, a statute, a figure or a date." },
  { topic: "Déstabilisation", q: "What would you do if you were the judge in this case?", hint: "'If I were the judge, I would first…' (second conditional), then justify." },
  { topic: "Déstabilisation", q: "Is there anything you would like to add?", hint: "An update or a comparison with France prepared in advance." },
];

// Grille d'auto-évaluation : chaque critère noté 0, 1 ou 2, total sur 20.
export const SELF_GRID = [
  "Introduction complète (source, date, thème, problématique, plan) en environ 1 minute",
  "Synthèse fidèle et organisée, sans paraphrase, avec les chiffres clés",
  "Commentaire : 2 axes, au moins 3 références précises, comparaison avec la France",
  "Conclusion avec ouverture",
  "Temps : exposé entre 7 et 8 minutes",
  "Correction : aucune des fautes classiques (I am agree, since + durée…)",
  "Richesse : mots de liaison variés, vocabulaire juridique exact",
  "Prononciation : accent tonique des mots clés, -ed, th",
  "Aisance : regard, débit, pauses, pas de lecture des notes",
  "Entretien : réponses en 4 temps, reformulation, pas de silence bloquant",
];

// Phrases à traduire à l'oral (français → anglais). Plusieurs traductions sont possibles :
// l'apprenant compare la sienne au modèle et s'auto-évalue.
export const DRILL_SENTENCES = [
  { fr: "La Cour d'appel a confirmé sa condamnation.", en: "The Court of Appeal upheld his conviction." },
  { fr: "La Cour suprême a annulé la décision de la juridiction inférieure.", en: "The Supreme Court overturned the lower court's decision." },
  { fr: "Le juge a rejeté la demande comme non fondée.", en: "The judge dismissed the claim as unfounded." },
  { fr: "Ses avocats ont annoncé qu'ils allaient faire appel.", en: "His lawyers announced that they would appeal." },
  { fr: "Le jury a rendu un verdict de culpabilité après deux jours de délibération.", en: "The jury returned a guilty verdict after two days of deliberation." },
  { fr: "Il a été condamné à cinq ans de prison, dont deux avec sursis.", en: "He was sentenced to five years in prison, two of which were suspended." },
  { fr: "Le prévenu a été placé en détention provisoire dans l'attente de son procès.", en: "The defendant was remanded in custody pending trial." },
  { fr: "Le parquet a abandonné les poursuites faute de preuves.", en: "Prosecutors dropped the charges for lack of evidence." },
  { fr: "Le tribunal a accordé des dommages et intérêts à la victime.", en: "The court awarded damages to the victim." },
  { fr: "Cette décision crée un précédent important.", en: "This ruling sets an important precedent." },
  { fr: "Cet arrêt ouvre la voie à de nombreux recours.", en: "This ruling paves the way for many legal challenges." },
  { fr: "Le Conseil constitutionnel a censuré la disposition au nom de la liberté d'expression.", en: "The Constitutional Council struck down the provision on the grounds of freedom of expression." },
  { fr: "La loi a été adoptée à une courte majorité.", en: "The law was passed by a narrow majority." },
  { fr: "Le projet de loi est bloqué au Sénat.", en: "The bill is stalled in the Senate." },
  { fr: "Le gouvernement veut durcir la loi sur l'immigration.", en: "The government wants to tighten the immigration law." },
  { fr: "Cette loi a été abrogée en 2024.", en: "This law was repealed in 2024." },
  { fr: "Nul n'est au-dessus des lois.", en: "No one is above the law." },
  { fr: "Les juges doivent trouver un équilibre entre sécurité et liberté.", en: "Judges must strike a balance between security and liberty." },
  { fr: "Le Royaume-Uni reste partie à la Convention européenne des droits de l'homme.", en: "The United Kingdom remains a party to the European Convention on Human Rights." },
  { fr: "La Cour a constaté une violation du droit à un procès équitable.", en: "The court found a violation of the right to a fair trial." },
  { fr: "Le Président a signé un décret sur l'immigration.", en: "The President signed an executive order on immigration." },
  { fr: "La jurisprudence de la Cour européenne des droits de l'homme est claire sur ce point.", en: "The case law of the European Court of Human Rights is clear on this point." },
  { fr: "L'avocat a fait valoir que les preuves avaient été obtenues illégalement.", en: "The lawyer argued that the evidence had been obtained unlawfully." },
  { fr: "L'arriéré judiciaire a atteint un niveau record.", en: "The court backlog has reached a record high." },
  { fr: "Le nombre d'exécutions a fortement augmenté l'an dernier.", en: "The number of executions rose sharply last year." },
  { fr: "La majorité des affaires se règlent à l'amiable.", en: "The vast majority of cases are settled out of court." },
  { fr: "Le secret professionnel est la pierre angulaire de la relation avec le client.", en: "Professional secrecy is the cornerstone of the relationship with the client." },
  { fr: "Elle a refusé le dossier en raison d'un conflit d'intérêts.", en: "She turned down the case because of a conflict of interest." },
  { fr: "Je souhaite devenir avocat fiscaliste.", en: "I would like to become a tax lawyer." },
  { fr: "La fraude fiscale est un délit, alors que l'optimisation fiscale est légale.", en: "Tax evasion is a criminal offence, whereas tax avoidance is legal." },
  { fr: "Cet article traite de la réforme de la police aux États-Unis.", en: "This article deals with police reform in the United States." },
  { fr: "Cela soulève la question de la responsabilité des plateformes.", en: "This raises the question of the platforms' liability." },
  { fr: "Ce qui est particulièrement frappant, c'est le ton ironique du journaliste.", en: "What is particularly striking is the journalist's ironic tone." },
  { fr: "On peut établir un parallèle avec la situation en France.", en: "We can draw a parallel with the situation in France." },
  { fr: "À première vue, la décision semble technique, mais ses conséquences sont considérables.", en: "At first glance, the ruling seems technical, but its consequences are far-reaching." },
  { fr: "Si j'étais le juge, j'aurais prononcé une peine plus légère.", en: "If I had been the judge, I would have imposed a lighter sentence." },
  { fr: "Depuis 2022, plusieurs États ont interdit l'avortement.", en: "Since 2022, several states have banned abortion." },
  { fr: "J'étudie le droit depuis cinq ans.", en: "I have been studying law for five years." },
  { fr: "Pour résumer, cet article montre que la justice manque de moyens.", en: "To sum up, this article shows that the justice system lacks resources." },
  { fr: "Il reste à savoir si la réforme sera adoptée.", en: "It remains to be seen whether the reform will be passed." },
];

// « Corrige la faute » : les erreurs typiques des francophones à l'oral.
// right : corrections acceptées (la première est le modèle) ; rule : la règle en une ligne.
export const ERROR_SENTENCES = [
  { wrong: "I am agree with the journalist.", right: ["I agree with the journalist."], rule: "agree est un verbe : I agree (jamais « I am agree »)." },
  { wrong: "It depend on the judge.", right: ["It depends on the judge."], rule: "-s à la 3e personne du singulier : it depends." },
  { wrong: "It depends of the circumstances.", right: ["It depends on the circumstances."], rule: "depend on, rely on, focus on, insist on." },
  { wrong: "I study law since five years.", right: ["I have been studying law for five years.", "I've been studying law for five years."], rule: "« depuis » + durée : present perfect (continu) + for." },
  { wrong: "I live in Toulouse since 2021.", right: ["I have lived in Toulouse since 2021.", "I've lived in Toulouse since 2021.", "I have been living in Toulouse since 2021.", "I've been living in Toulouse since 2021."], rule: "« depuis » + point de départ : present perfect + since." },
  { wrong: "The court has ruled in 2021.", right: ["The court ruled in 2021."], rule: "Date précise dans le passé → prétérit." },
  { wrong: "The evidences were overwhelming.", right: ["The evidence was overwhelming."], rule: "evidence est indénombrable : pas de -s, verbe au singulier." },
  { wrong: "I need some informations about the case.", right: ["I need some information about the case."], rule: "information est indénombrable." },
  { wrong: "Can you give me an advice?", right: ["Can you give me some advice?", "Can you give me a piece of advice?", "Can you give me advice?"], rule: "advice est indénombrable : some advice / a piece of advice." },
  { wrong: "The news are bad.", right: ["The news is bad."], rule: "news est singulier." },
  { wrong: "The police is investigating.", right: ["The police are investigating."], rule: "police est toujours pluriel." },
  { wrong: "People is angry.", right: ["People are angry."], rule: "people est pluriel." },
  { wrong: "We discussed about the issue.", right: ["We discussed the issue."], rule: "discuss se construit sans préposition." },
  { wrong: "He explained me the decision.", right: ["He explained the decision to me."], rule: "explain something to someone." },
  { wrong: "The article speaks about the death penalty.", right: ["The article deals with the death penalty.", "The article is about the death penalty."], rule: "Un article ne « parle » pas : it deals with / it is about." },
  { wrong: "The Supreme Court of United States ruled.", right: ["The Supreme Court of the United States ruled."], rule: "the United States, the UK (mais France, Congress, Parliament)." },
  { wrong: "The justice is slow in France.", right: ["Justice is slow in France."], rule: "Notion générale ou abstraite : pas d'article." },
  { wrong: "If I would be the judge, I would acquit him.", right: ["If I were the judge, I would acquit him."], rule: "Jamais would après if : If I were…" },
  { wrong: "If he would have checked, he would not have been fined.", right: ["If he had checked, he would not have been fined.", "If he had checked, he wouldn't have been fined."], rule: "Irréel du passé : If + past perfect, would have + participe." },
  { wrong: "When the law will be passed, it will change everything.", right: ["When the law is passed, it will change everything."], rule: "Pas de futur après when, as soon as, until." },
  { wrong: "He said me that he was innocent.", right: ["He told me that he was innocent.", "He told me he was innocent.", "He said that he was innocent.", "He said to me that he was innocent."], rule: "tell someone / say (to someone)." },
  { wrong: "I don't know what is the answer.", right: ["I don't know what the answer is."], rule: "Interrogative indirecte : sujet + verbe." },
  { wrong: "The sentence is more strict than before.", right: ["The sentence is stricter than before."], rule: "Adjectif court : -er (stricter) ; adjectif long : more." },
  { wrong: "She is lawyer.", right: ["She is a lawyer.", "She's a lawyer."], rule: "Métier : article a / an obligatoire." },
  { wrong: "He has been arrested yesterday.", right: ["He was arrested yesterday."], rule: "yesterday, last year, in 2020 → prétérit." },
  { wrong: "Since 2022, several states banned abortion.", right: ["Since 2022, several states have banned abortion."], rule: "since → present perfect." },
  { wrong: "The lawyer admitted that he never used ChatGPT before.", right: ["The lawyer admitted that he had never used ChatGPT before."], rule: "Antériorité dans le passé : past perfect." },
  { wrong: "This law has been adopted by the Parliament.", right: ["This law has been passed by Parliament.", "This law was passed by Parliament.", "This law has been adopted by Parliament.", "This law was adopted by Parliament."], rule: "Parliament sans article ; « adopter une loi » = to pass a law." },
  { wrong: "One of the justice dissented.", right: ["One of the justices dissented."], rule: "one of + nom pluriel." },
  { wrong: "Many lawyers works long hours.", right: ["Many lawyers work long hours."], rule: "Sujet pluriel : pas de -s au verbe." },
  { wrong: "He was condemned to five years in prison.", right: ["He was sentenced to five years in prison."], rule: "Condamner à une peine = to sentence (to condemn = blâmer)." },
  { wrong: "Actually, the backlog is of 80,000 cases.", right: ["Currently, the backlog stands at 80,000 cases.", "Currently, the backlog is 80,000 cases.", "At present, the backlog stands at 80,000 cases."], rule: "actuellement = currently (actually = en fait)." },
  { wrong: "Eventually, the reform could be adopted next year.", right: ["Possibly, the reform could be adopted next year.", "The reform could possibly be adopted next year.", "The reform may be adopted next year."], rule: "éventuellement = possibly (eventually = finalement)." },
  { wrong: "The jurisprudence of the Court of Cassation is clear.", right: ["The case law of the Court of Cassation is clear."], rule: "la jurisprudence = case law (jurisprudence = philosophie du droit)." },
  { wrong: "The victim suffered an important prejudice.", right: ["The victim suffered significant harm.", "The victim suffered serious harm.", "The victim suffered considerable harm."], rule: "le préjudice = harm, damage, loss (prejudice = préjugé)." },
  { wrong: "The trial will take place the next week.", right: ["The trial will take place next week."], rule: "next week, last year : sans article." },
  { wrong: "It's a very interesting article, it talks of many things.", right: ["It's a very interesting article which deals with several issues.", "It is a very interesting article which deals with several issues."], rule: "Éviter « it talks of » et les généralités : deals with + issues précis." },
  { wrong: "I am in favour to the reform.", right: ["I am in favour of the reform.", "I'm in favour of the reform."], rule: "in favour of." },
  { wrong: "The government must to act quickly.", right: ["The government must act quickly."], rule: "Après un modal : base verbale sans to." },
  { wrong: "Judges are more and more criticised since some years.", right: ["Judges have been increasingly criticised in recent years.", "Judges have been increasingly criticised over the past few years."], rule: "since + durée → in recent years / over the past few years + present perfect." },
];

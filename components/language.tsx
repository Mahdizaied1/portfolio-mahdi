'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type Language = 'en' | 'fr';
const french: Record<string, string> = {
  'Skip to content': 'Aller au contenu',
  'Main navigation': 'Navigation principale',
  'Mahdi Zaied, home': 'Mahdi Zaied, accueil',
  'Home': 'Accueil', 'Work': 'Projets', 'Stack': 'Technologies', 'Contact': 'Contact',
  'Contact me': 'Me contacter', 'Email Mahdi': 'Envoyer un e-mail à Mahdi',
  'Mahdi on GitHub': 'Mahdi sur GitHub',
  'Mahdi on LinkedIn (opens in a new tab)': 'Mahdi sur LinkedIn (nouvel onglet)',
  'LinkedIn (opens in a new tab)': 'LinkedIn (nouvel onglet)',
  "Hello, I'm": 'Bonjour, je suis',
  'Full-stack Developer': 'Développeur full-stack',
  'I build web platforms, mobile apps, and the systems behind them.': 'Je développe des plateformes web, des applications mobiles et leurs systèmes backend.',
  'Explore my work': 'Voir mes projets', "Let's talk": 'Parlons-en',
  'Scroll to technologies': 'Découvrir les technologies', 'Scroll to explore': 'Défiler pour découvrir',
  '01 / Core technologies': '01 / Technologies principales', 'My stack.': 'Mes technologies.',
  '02 / Selected work': '02 / Projets sélectionnés', 'Full-stack project': 'Projet full-stack',
  'My work across the mobile app, web development, backend, and deployment.': 'Mon travail sur le mobile, le web, le backend et le déploiement.',
  'EducaWays · Web workspace': 'EducaWays · Interface web',
  'Web + mobile · Explore the case study': 'Web + mobile · Découvrir le projet',
  '03 / Contact': '03 / Contact', "Let's": 'Parlons', 'talk.': 'ensemble.',
  'Full-stack developer · React · React Native · Node.js': 'Développeur full-stack · React · React Native · Node.js',
  'Email': 'E-mail', 'Case study': 'Étude de cas',
  'Language': 'Langage', 'Apps': 'Applications', 'Runtime': 'Exécution', 'Database': 'Base de données',
  'Realtime': 'Temps réel', 'State': 'État', 'Push': 'Notifications', 'Workflow': 'Outils',
  'Switch to light theme': 'Activer le thème clair', 'Switch to dark theme': 'Activer le thème sombre',
  'Pixel Mahdi looks at you': 'Mahdi en pixel art vous regarde',
  'Back to portfolio': 'Retour au portfolio', 'Full-stack case study': 'Étude de cas full-stack',
  'I develop the React admin, Expo mobile apps, and Node.js backend for a school-management platform.': 'Je développe l’interface d’administration React, les applications mobiles Expo et le backend Node.js d’une plateforme de gestion scolaire.',
  'My role': 'Mon rôle', 'Full-stack developer': 'Développeur full-stack', 'I work on': 'Mes domaines', 'Core stack': 'Technologies principales',
  'Private school platform. Screenshots use local test data, not client records or production-impact metrics.': 'Plateforme scolaire privée. Les captures utilisent des données de test locales, pas des dossiers clients ni des mesures d’impact en production.',
  'Case study sections': 'Sections de l’étude de cas', 'My contribution': 'Ma contribution',
  'Before & after': 'Avant / Après', 'Web screens': 'Interfaces web', 'Mobile redesign': 'Refonte mobile',
  'Redesigned EducaWays dashboard with community counts, enrolment statistics, and an age-distribution chart': 'Tableau de bord EducaWays repensé : effectifs, inscriptions et répartition par âge',
  'Current web app · Community counts and enrolment analytics': 'Version web actuelle · Effectifs et statistiques d’inscription',
  '01 / My contribution': '01 / Ma contribution', 'What I': 'Ce que j’ai', 'built.': 'réalisé.',
  'From my final-year internship building the mobile app to full-stack work across web, backend, and delivery.': 'De mon stage de fin d’études sur l’application mobile au développement full-stack : web, backend et déploiement.',
  'Mobile app': 'Application mobile',
  'Built the initial Expo app, then expanded the student, teacher, and parent experiences.': 'J’ai créé l’application Expo initiale, puis enrichi les espaces élèves, enseignants et parents.',
  'See the mobile redesign': 'Voir la refonte mobile', 'Web development': 'Développement web',
  'Took over an existing web app, built new features, expanded administration workflows, and redesigned the interface.': 'J’ai repris une application web existante, ajouté des fonctionnalités, enrichi les outils d’administration et repensé l’interface.',
  'Compare before & after': 'Comparer avant / après', 'Backend & delivery': 'Backend et déploiement',
  'Developed APIs and permissions, school-specific configuration, EAS app builds, and Linux deployment.': 'J’ai développé les API, les permissions et la configuration par établissement, ainsi que les builds EAS et le déploiement Linux.',
  'Explore the web workflows': 'Découvrir les outils web', '02 / Before & after': '02 / Avant / Après',
  'Web': 'Web', 'redesign.': 'refonte.', '03 / Administration': '03 / Administration', 'screens.': 'interfaces.',
  '04 / Expo apps': '04 / Applications Expo', 'Mobile': 'Mobile', 'Let’s talk.': 'Parlons de votre projet.',
  'Email me': 'Me contacter', 'EducaWays · Full-stack case study': 'EducaWays · Étude de cas full-stack',
  'Dashboard': 'Tableau de bord', 'Planning': 'Planning',
  'School-wide counts, enrolment analytics, and age distribution in one dashboard. I expanded the existing web app and redesigned its navigation.': 'Effectifs de l’établissement, inscriptions et répartition par âge dans un tableau de bord. J’ai enrichi l’application existante et repensé sa navigation.',
  'The existing dashboard before my web redesign: profile counts and a list of newly registered students.': 'Le tableau de bord avant ma refonte web : effectifs par profil et liste des nouveaux élèves.',
  'More than a visual refresh: I added analytics to the existing dashboard, alongside the interface redesign.': 'Au-delà de l’interface, j’ai ajouté des statistiques au tableau de bord existant.',
  'A weekly timetable with clearer subject, teacher, room, and time information.': 'Un planning hebdomadaire qui distingue plus clairement les matières, enseignants, salles et horaires.',
  'The timetable before my redesign, with the same class and sessions.': 'Le planning avant ma refonte, avec la même classe et les mêmes séances.',
  'Both captures show the same class and week, 27 July–2 August 2026, so you can compare the layout directly.': 'Les deux captures montrent la même classe et la même semaine, du 27 juillet au 2 août 2026, pour comparer directement les interfaces.',
  'Choose web redesign comparison': 'Choisir une comparaison web', 'Current version shown first': 'Version actuelle affichée en premier',
  'Comparison view': 'Mode de comparaison', 'After · My current work': 'Après · Ma version actuelle',
  '↔ Compare before & after': '↔ Comparer avant / après', 'Before · Old interface': 'Avant · Ancienne interface',
  '← Before · Old interface': '← Avant · Ancienne interface', 'After · My current work →': 'Après · Ma version actuelle →',
  'Before · Old interface — not the current app': 'Avant · Ancienne interface — pas la version actuelle',
  'Drag the ↔ handle left or right to reveal each version. You can also focus the image and use the arrow keys.': 'Glissez la poignée ↔ à gauche ou à droite pour découvrir chaque version. Au clavier, sélectionnez l’image puis utilisez les flèches.',
  'This is the old version, shown only for context.': 'L’ancienne version est présentée uniquement pour illustrer les changements.',
  'Choose “Compare before & after” to see what changed.': 'Choisissez « Comparer avant / après » pour voir les changements.',
  'before — old interface': 'avant — ancienne interface', 'after — my current work': 'après — ma version actuelle',
  'Enlarge old interface': 'Agrandir l’ancienne interface', 'Enlarge current design': 'Agrandir la version actuelle',
  'Original': 'Ancienne version', 'Current': 'Version actuelle',
  'Daily sessions': 'Séances du jour', 'Learning Hub': 'Espace pédagogique', 'Community analytics': 'Statistiques de la communauté',
  'Family payments': 'Paiements des familles', 'Payment distribution': 'Répartition du paiement',
  'EducaWays daily sessions with started, not-started, delayed, and cancelled states': 'Séances EducaWays : démarrées, non démarrées, en retard et annulées',
  'Staff can see which sessions have started, are delayed, or are cancelled, alongside class attendance.': 'L’équipe peut suivre les séances démarrées, en retard ou annulées, ainsi que la présence en classe.',
  'Learning Hub with quiz performance, score distribution, and learning activity charts': 'Espace pédagogique : résultats aux quiz, répartition des scores et activité d’apprentissage',
  'Quiz results, score distribution, and learning activity help staff follow student progress.': 'Les résultats aux quiz, la répartition des scores et l’activité pédagogique permettent de suivre la progression des élèves.',
  'Community analytics showing enrolment, gender distribution, levels, and families': 'Statistiques : inscriptions, répartition filles-garçons, niveaux et familles',
  'Enrolment, class, and family statistics, filtered by school year, level, and class.': 'Statistiques sur les inscriptions, les classes et les familles, filtrées par année scolaire, niveau et classe.',
  'Family payment overview with expected, received, remaining, and credit totals': 'Vue des paiements familiaux : montants attendus, reçus, restants et crédit',
  'Family balances, monthly payments, and services for each child.': 'Soldes familiaux, paiements mensuels et services pour chaque enfant.',
  'Payment preview allocating an amount to two children and retaining the remainder as credit': 'Aperçu d’un paiement réparti entre deux enfants, avec le solde conservé en crédit',
  'One allocator powers preview and confirmation: oldest unpaid months first across siblings, with unused money kept as family credit.': 'La même logique sert à l’aperçu et à la confirmation : les mois impayés les plus anciens sont réglés en priorité entre frères et sœurs, et le surplus devient un crédit familial.',
  'Explore EducaWays web screens': 'Découvrir les interfaces web EducaWays',
  'Student home · before — old interface': 'Accueil élève · avant — ancienne interface',
  'Legacy student Home with Mathematics and Arabic sessions on 2 October 2026': 'Ancien accueil élève avec les séances de mathématiques et d’arabe du 2 octobre 2026',
  'The previous mobile layout: single-day navigation and large session cards. Shown only to illustrate the redesign.': 'L’ancienne interface mobile : navigation jour par jour et grandes cartes de séance. Présentée uniquement pour illustrer la refonte.',
  'Student home · after — my current work': 'Accueil élève · après — ma version actuelle',
  'Redesigned student Home with a personalised greeting, week calendar, and the same Mathematics and Arabic sessions': 'Accueil élève repensé avec une salutation personnalisée, un calendrier hebdomadaire et les mêmes séances de mathématiques et d’arabe',
  'I added a personal welcome and week navigation, and redesigned the session cards. Both versions show the same date and sessions.': 'J’ai ajouté un accueil personnalisé, une navigation hebdomadaire et repensé les cartes de séance. Les deux versions montrent la même date et les mêmes séances.',
  'Parent · current payment details': 'Parent · détail du paiement actuel',
  'Parent payment details showing a paid October bill with tuition and canteen service breakdown': 'Détail d’une facture d’octobre réglée, avec les frais de scolarité et de cantine',
  'A parent can check what was billed, paid, and remains due, with a breakdown of tuition and canteen services.': 'Le parent peut consulter les montants facturés, payés et restants, avec le détail des frais de scolarité et de cantine.',
  'Student experience': 'Espace élève', 'Student home': 'Accueil élève', 'Hide old version': 'Masquer l’ancienne version',
  'Compare with the old version': 'Comparer avec l’ancienne version', 'Parent experience': 'Espace parent',
  'Parent payments': 'Paiements des parents', 'Current app · Payment details': 'Version actuelle · Détail du paiement',
  'View original': 'Voir l’image originale', 'Close screenshot': 'Fermer la capture', 'Enlarge': 'Agrandir',
};

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void; t: (text: string) => string } | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>('en');
  const pathname = usePathname();
  useEffect(() => {
    try { if (localStorage.getItem('portfolio-language') === 'fr') updateLanguage('fr'); } catch { /* Language switching also works without storage. */ }
  }, []);
  const setLanguage = useCallback((next: Language) => {
    updateLanguage(next);
    try { localStorage.setItem('portfolio-language', next); } catch { /* Keep the in-memory selection. */ }
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    const caseStudy = pathname.includes('/work/educaways');
    document.title = caseStudy
      ? language === 'fr' ? 'EducaWays — Étude de cas | Mahdi Zaied' : 'EducaWays Case Study — Mahdi Zaied'
      : language === 'fr' ? 'Mahdi Zaied — Développeur full-stack' : 'Mahdi Zaied — Full-Stack Developer';
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', caseStudy
      ? language === 'fr' ? 'Mon travail sur EducaWays : web React, applications Expo, backend Node.js et refonte des interfaces.' : 'My work on EducaWays: React web, Expo apps, Node.js backend, and interface redesign.'
      : language === 'fr' ? 'Développeur full-stack : plateformes web, applications mobiles et backend avec React, React Native, Expo et Node.js.' : 'Full-stack developer building web platforms, mobile apps, and backend systems with React, React Native, Expo, and Node.js.');
  }, [language, pathname]);
  const t = useCallback((text: string) => language === 'fr' ? french[text] ?? text : text, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('LanguageProvider is required');
  return context;
}

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return <div className="languageToggle" role="group" aria-label={language === 'fr' ? 'Langue du portfolio' : 'Portfolio language'}>
    <button type="button" lang="en" aria-label="English" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
    <button type="button" lang="fr" aria-label="Français" aria-pressed={language === 'fr'} onClick={() => setLanguage('fr')}>FR</button>
  </div>;
}

export function SkipLink() {
  const { t } = useLanguage();
  return <a className="skipLink" href="#page-content">{t('Skip to content')}</a>;
}

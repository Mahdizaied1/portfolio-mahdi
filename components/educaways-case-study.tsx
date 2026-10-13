'use client';

import { ArrowLeft, ArrowUpRight, Zap } from 'lucide-react';
import { BeforeAfter } from '@/components/before-after';
import { RevealDiv, RevealSection } from '@/components/reveal';
import { LanguageToggle, useLanguage } from '@/components/language';
import { sitePath } from '@/lib/site-path';
import { ThemeToggle } from '@/components/theme-toggle';
import { EducaWaysGallery } from '@/components/educaways-gallery';
import { MobileEvidence } from '@/components/mobile-evidence';

const contributions = [
  {
    title: 'Mobile app',
    text: 'Built the initial Expo app, then expanded the student, teacher, and parent experiences.',
    href: '#mobile',
    link: 'See the mobile redesign',
  },
  {
    title: 'Web development',
    text: 'Took over an existing web app, built new features, expanded administration workflows, and redesigned the interface.',
    href: '#redesign',
    link: 'Compare before & after',
  },
  {
    title: 'Backend & delivery',
    text: 'Developed APIs and permissions, school-specific configuration, EAS app builds, and Linux deployment.',
    href: '#web-platform',
    link: 'Explore the web workflows',
  },
];

export default function EducaWaysCaseStudy(){
  const { t, language } = useLanguage();
  const localizedContributions = contributions.map(item => ({...item, title:t(item.title), text:t(item.text), link:t(item.link)}));
  return <main className="casePage">
    <nav className="caseNav shell"><a className="brand" href={sitePath('/')}>MZ<span>.</span></a><div className="caseNavActions"><LanguageToggle/><ThemeToggle/><a href={sitePath('/')} aria-label={t('Back to portfolio')}><ArrowLeft size={16}/><span className="caseBackLabel">{t("Back to portfolio")}</span></a></div></nav>
      <header className="caseHero shell" id="page-content" tabIndex={-1}>
      <p className="kicker">{t("Full-stack case study")}</p>
      <h1>Educa<span>Ways</span></h1>
      <div className="caseLead"><p>{t("I develop the React admin, Expo mobile apps, and Node.js backend for a school-management platform.")}</p><div className="caseFacts"><p><span>{t("My role")}</span>{t("Full-stack developer")}</p><p><span>{t("I work on")}</span>Web · Mobile · Backend</p><p><span>{t("Core stack")}</span>React · Expo · Node.js</p></div></div>
      <div className="caseNotice"><Zap size={18}/><p>{t("Private school platform. Screenshots use local test data, not client records or production-impact metrics.")}</p></div>
      <div className="caseJumpNav" aria-label={t("Case study sections")}><a href="#contribution">{t("My contribution")}</a><a href="#redesign">{t("Before & after")}</a><a href="#web-platform">{t("Web screens")}</a><a href="#mobile">{t("Mobile redesign")}</a></div>
      <div className="caseHeroPreview"><img src={sitePath('/images/educaways/dashboard-after.jpg')} alt={t("Redesigned EducaWays dashboard with community counts, enrolment statistics, and an age-distribution chart")} width={1905} height={1080} fetchPriority="high" decoding="async"/><span>{t("Current web app · Community counts and enrolment analytics")}</span></div>
    </header>

    <RevealSection className="contributionSection shell" id="contribution">
      <div className="caseSectionHead light"><p className="kicker">{t("01 / My contribution")}</p><h2>{t("What I")} <em>{t("built.")}</em></h2></div>
      <div className="contributionIntro"><p>{t("From my final-year internship building the mobile app to full-stack work across web, backend, and delivery.")}</p></div>
      <div className="builtGrid">
        {localizedContributions.map((contribution, index) => <article className="builtCard" key={contribution.title}>
          <span className="builtIndex">0{index + 1}</span>
          <h3>{contribution.title}</h3>
          <p>{contribution.text}</p>
          <a href={contribution.href}>{contribution.link} <ArrowUpRight size={16}/></a>
        </article>)}
      </div>
    </RevealSection>

    <RevealSection className="redesign shell" id="redesign"><div className="caseSectionHead light"><p className="kicker">{t("02 / Before & after")}</p><h2>{language === 'fr' ? <>Refonte <em>web.</em></> : <>Web <em>redesign.</em></>}</h2></div><BeforeAfter/></RevealSection>

    <RevealSection className="featureSection shell" id="web-platform"><div className="caseSectionHead light"><p className="kicker">{t("03 / Administration")}</p><h2>{language === 'fr' ? <>Interfaces <em>web.</em></> : <>Web <em>screens.</em></>}</h2></div><EducaWaysGallery/></RevealSection>

    <section className="mobileSection" id="mobile"><RevealDiv className="shell"><div className="caseSectionHead"><p className="kicker">{t("04 / Expo apps")}</p><h2>{language === 'fr' ? <>Refonte <em>mobile.</em></> : <>Mobile <em>redesign.</em></>}</h2></div><MobileEvidence/></RevealDiv></section>

    <RevealSection className="caseCta shell"><p className="kicker">{t("Contact")}</p><h2>{t("Let’s talk.")}</h2><a href="mailto:mahdizaied.21@gmail.com?subject=EducaWays%20case%20study">{t("Email me")} <ArrowUpRight/></a></RevealSection>
    <footer className="footer shell"><a className="brand" href={sitePath('/')}>MZ<span>.</span></a><p>{t("EducaWays · Full-stack case study")}</p><div><a href="mailto:mahdizaied.21@gmail.com">{t("Email")}</a><a href="https://www.linkedin.com/in/mahdi-zaied-41666a155/" aria-label={t("LinkedIn (opens in a new tab)")} target="_blank" rel="noopener noreferrer">{t("LinkedIn")}</a><a href={sitePath('/')}>{t("Portfolio")}</a></div></footer>
  </main>
}

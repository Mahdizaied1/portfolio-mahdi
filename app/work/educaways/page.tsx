import { ArrowLeft, ArrowUpRight, Zap } from 'lucide-react';
import { BeforeAfter } from '@/components/before-after';
import { RevealDiv, RevealSection } from '@/components/reveal';
import type { Metadata } from 'next';
import { ThemeToggle } from '@/components/theme-toggle';
import { EducaWaysGallery } from '@/components/educaways-gallery';
import { MobileEvidence } from '@/components/mobile-evidence';

export const metadata: Metadata = {
  title: 'EducaWays Case Study — Mahdi Zaied',
  description: 'A private production school platform spanning React web, Expo mobile apps, and a Node.js API.',
  openGraph: { title: 'EducaWays Case Study — Mahdi Zaied', description: 'A full-stack school platform across web, mobile, and backend.', images: ['/og.png'] },
  twitter: { title: 'EducaWays Case Study — Mahdi Zaied', description: 'A full-stack school platform across web, mobile, and backend.', images: ['/og.png'] },
};

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

export default function EducaWaysPage(){
  return <main className="casePage">
    <nav className="caseNav shell"><a className="brand" href="/">MZ<span>.</span></a><div className="caseNavActions"><ThemeToggle/><a href="/"><ArrowLeft size={16}/> Back to portfolio</a></div></nav>
      <header className="caseHero shell" id="page-content" tabIndex={-1}>
      <p className="kicker">Full-stack case study</p>
      <h1>Educa<span>Ways</span></h1>
      <div className="caseLead"><p>I develop the React admin, Expo mobile apps, and Node.js backend for a school-management platform.</p><div className="caseFacts"><p><span>My role</span>Full-stack developer</p><p><span>I work on</span>Web · Mobile · Backend</p><p><span>Core stack</span>React · Expo · Node.js</p></div></div>
      <div className="caseNotice"><Zap size={18}/><p>Private school platform. Screenshots use local test data, not client records or production-impact metrics.</p></div>
      <div className="caseJumpNav" aria-label="Case study sections"><a href="#contribution">My contribution</a><a href="#redesign">Before & after</a><a href="#web-platform">Web screens</a><a href="#mobile">Mobile redesign</a></div>
      <div className="caseHeroPreview"><img src="/images/educaways/dashboard-after.jpg" alt="Redesigned EducaWays dashboard with community counts, enrolment statistics, and an age-distribution chart" width={1905} height={1080} fetchPriority="high" decoding="async"/><span>Community dashboard</span></div>
    </header>

    <RevealSection className="contributionSection shell" id="contribution">
      <div className="caseSectionHead light"><p className="kicker">01 / My contribution</p><h2>What I <em>built.</em></h2></div>
      <div className="contributionIntro"><p>From my final-year internship building the mobile app to full-stack work across web, backend, and delivery.</p></div>
      <div className="builtGrid">
        {contributions.map((contribution, index) => <article className="builtCard" key={contribution.title}>
          <span className="builtIndex">0{index + 1}</span>
          <h3>{contribution.title}</h3>
          <p>{contribution.text}</p>
          <a href={contribution.href}>{contribution.link} <ArrowUpRight size={16}/></a>
        </article>)}
      </div>
    </RevealSection>

    <RevealSection className="redesign shell" id="redesign"><div className="caseSectionHead light"><p className="kicker">02 / Before & after</p><h2>Web <em>redesign.</em></h2></div><BeforeAfter/></RevealSection>

    <RevealSection className="featureSection shell" id="web-platform"><div className="caseSectionHead light"><p className="kicker">03 / Administration</p><h2>Web <em>screens.</em></h2></div><EducaWaysGallery/></RevealSection>

    <section className="mobileSection" id="mobile"><RevealDiv className="shell"><div className="caseSectionHead"><p className="kicker">04 / Expo apps</p><h2>Mobile <em>redesign.</em></h2></div><MobileEvidence/></RevealDiv></section>

    <RevealSection className="caseCta shell"><p className="kicker">Contact</p><h2>Let’s talk.</h2><a href="mailto:mahdizaied.21@gmail.com?subject=EducaWays%20case%20study">Email me <ArrowUpRight/></a></RevealSection>
    <footer className="footer shell"><a className="brand" href="/">MZ<span>.</span></a><p>EducaWays · Full-stack case study</p><div><a href="mailto:mahdizaied.21@gmail.com">Email</a><a href="https://www.linkedin.com/in/mahdi-zaied-41666a155/" aria-label="LinkedIn (opens in a new tab)" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="/">Portfolio</a></div></footer>
  </main>
}

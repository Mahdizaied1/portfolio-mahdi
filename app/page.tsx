'use client';

import { useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, GitFork, Mail, Smartphone, Server, PanelsTopLeft, Database, RadioTower, Flame, GitBranch, Boxes, Route, Rocket, Code2, TableProperties } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { TechCard } from '@/components/tech-card';
import { PixelMahdi } from '@/components/pixel-mahdi';
import { LinkedInIcon } from '@/components/linkedin-icon';

const technologies = [
  { name: 'React', label: 'Web', icon: PanelsTopLeft, tone: 'violet' },
  { name: 'TypeScript', label: 'Language', icon: Code2, tone: 'blue' },
  { name: 'React Native', label: 'Mobile', icon: Smartphone, tone: 'blue' },
  { name: 'Expo', label: 'Apps', icon: Rocket, tone: 'lime' },
  { name: 'Node.js', label: 'Runtime', icon: Server, tone: 'green' },
  { name: 'Express', label: 'APIs', icon: Route, tone: 'orange' },
  { name: 'MongoDB', label: 'Database', icon: Database, tone: 'green' },
  { name: 'PostgreSQL', label: 'Database', icon: TableProperties, tone: 'blue' },
  { name: 'Socket.io', label: 'Realtime', icon: RadioTower, tone: 'pink' },
  { name: 'Redux', label: 'State', icon: Boxes, tone: 'violet' },
  { name: 'Firebase', label: 'Push', icon: Flame, tone: 'orange' },
  { name: 'Git', label: 'Workflow', icon: GitBranch, tone: 'blue' },
];

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [heroArrived, setHeroArrived] = useState(false);
  const handleHeroSettled = useCallback(() => setHeroArrived(true), []);
  const enter = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: .7, delay },
  });

  return (
    <main>
      <motion.nav className="nav shell" aria-label="Main navigation" initial={reduceMotion ? false : { opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
        <a className="brand" href="#top" aria-label="Mahdi Zaied, home"><span className="brandMark">M</span><span className="brandWord">Mahdi.</span></a>
        <div className="navLinks"><a href="#top">Home</a><a href="#work">Work</a><a href="#stack">Stack</a><a href="#contact">Contact</a></div>
        <div className="navActions"><ThemeToggle/><a className="navCta" href="mailto:mahdizaied.21@gmail.com">Contact me <ArrowUpRight size={15} /></a></div>
      </motion.nav>

      <section className="hero heroEditorial shell" id="top">
        <div className="socialRail"><a href="mailto:mahdizaied.21@gmail.com" aria-label="Email Mahdi"><Mail size={18}/></a><a href="https://github.com/Mahdizaied1" aria-label="Mahdi on GitHub"><GitFork size={18}/></a><a href="https://www.linkedin.com/in/mahdi-zaied-41666a155/" aria-label="Mahdi on LinkedIn (opens in a new tab)" target="_blank" rel="noopener noreferrer"><LinkedInIcon/></a><span/></div>
        <PixelMahdi onSettled={handleHeroSettled} />
        <div id="page-content" tabIndex={-1} className={'heroCopy heroReveal' + (heroArrived ? ' arrived' : '')}>
          <div className="heroBubble">
            <motion.p className="heroHello" {...enter(.08)}><span/> Hello, I&apos;m</motion.p>
            <motion.h1 aria-label="Mahdi Zaied" {...enter(.16)}>Mahdi<br/><em>Zaied.</em></motion.h1>
            <motion.div className="heroIdentity" {...enter(.23)}>
              <strong>Full-stack Developer</strong>
              <span>React · React Native / Expo · Node.js</span>
            </motion.div>
          </div>
          <motion.p className="heroSummary" {...enter(.29)}>I build web platforms, mobile apps, and the systems behind them.</motion.p>
          <motion.div className="heroActions" {...enter(.34)}><motion.a className="primaryButton" href="#work" whileHover={reduceMotion ? undefined : { y: -3, scale: 1.015 }} whileTap={reduceMotion ? undefined : { scale: .98 }}>Explore my work <ArrowUpRight size={18}/></motion.a><motion.a className="secondaryButton" href="mailto:mahdizaied.21@gmail.com" whileHover={reduceMotion ? undefined : { y: -3 }}>Let&apos;s talk</motion.a></motion.div>
        </div>
        <a className="scrollCue" href="#stack" aria-label="Scroll to technologies"><span>Scroll to explore</span><i><ArrowDown size={16}/></i></a>
      </section>

      <motion.section className="stackShowcase shell" id="stack" aria-labelledby="stack-title" initial={reduceMotion ? false : { opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .7 }}>
        <div className="stackHeading"><p className="kicker">01 / Core technologies</p><h2 id="stack-title">My stack.</h2></div>
        <div className="techGrid">
          {technologies.map(({ name, label, icon: Icon, tone }, index) => (
            <TechCard key={name} name={name} label={label} icon={Icon} tone={tone} index={index}/>
          ))}
        </div>
      </motion.section>

      <motion.section className="work shell" id="work" initial={reduceMotion ? false : { opacity: 0, y: 55 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .75 }}>
        <div className="sectionIntro"><p className="kicker">02 / Selected work</p></div>
        <motion.a className="projectCard" href="/work/educaways" whileHover={reduceMotion ? undefined : { y: -8 }} transition={{ duration: .35 }}>
          <div className="projectCopy">
            <div className="projectMeta"><span>Full-stack project</span><span>Web · Mobile · API</span></div>
            <div><p className="projectNo">01</p><h2>EducaWays</h2><p>My work across the mobile app, web development, backend, and deployment.</p></div>
            <div className="tags"><span>React</span><span>React Native</span><span>Node.js</span></div>
          </div>
          <div className="projectVisual" aria-hidden="true">
            <div className="projectScreenshot"><div className="projectScreenshotBar"><span/><span/><span/><small>EducaWays · Web workspace</small></div><img src="/images/educaways/dashboard-after.jpg" alt="" width={1920} height={1080} loading="lazy"/></div>
            <div className="projectMobileScreenshot"><img src="/images/educaways/student-home-after.png" alt="" width={720} height={1600} loading="lazy"/></div>
            <span className="projectPreviewCaption">Web + mobile · Explore the case study</span>
            <div className="projectArrow"><ArrowUpRight size={22} /></div>
          </div>
        </motion.a>
      </motion.section>

      <motion.section className="contact shell" id="contact" initial={reduceMotion ? false : { opacity: 0, scale: .975 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .75 }}>
        <p className="kicker">03 / Contact</p>
        <h2>Let&apos;s <em>talk.</em></h2>
        <a href="mailto:mahdizaied.21@gmail.com">mahdizaied.21@gmail.com <ArrowUpRight size={28} /></a>
      </motion.section>

      <footer className="footer shell"><a className="brand" href="#top">MZ<span>.</span></a><p>Full-stack developer · React · React Native · Node.js</p><div><a href="mailto:mahdizaied.21@gmail.com">Email</a><a href="https://github.com/Mahdizaied1">GitHub</a><a href="https://www.linkedin.com/in/mahdi-zaied-41666a155/" aria-label="LinkedIn (opens in a new tab)" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="/work/educaways">Case study</a></div></footer>
    </main>
  );
}

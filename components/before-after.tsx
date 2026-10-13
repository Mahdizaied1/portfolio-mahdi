'use client';

import { sitePath } from '@/lib/site-path';
import { useLanguage } from './language';

import { useState, type CSSProperties } from 'react';
import { Expand } from 'lucide-react';
import { useScreenshotViewer } from './screenshot-viewer';

const comparisons = [
  { title: 'Dashboard', before: 'dashboard-before.jpg', after: 'dashboard-after.jpg', current: 'School-wide counts, enrolment analytics, and age distribution in one dashboard. I expanded the existing web app and redesigned its navigation.', original: 'The existing dashboard before my web redesign: profile counts and a list of newly registered students.', note: 'More than a visual refresh: I added analytics to the existing dashboard, alongside the interface redesign.' },
  { title: 'Planning', before: 'planning-before.jpg', after: 'planning-after.jpg', current: 'A weekly timetable with clearer subject, teacher, room, and time information.', original: 'The timetable before my redesign, with the same class and sessions.', note: 'Both captures show the same class and week, 27 July–2 August 2026, so you can compare the layout directly.' },
];

export function BeforeAfter() {
  const { t, language } = useLanguage();
  const [selected, setSelected] = useState(0);
  const [position, setPosition] = useState(50);
  const [view, setView] = useState<'current' | 'compare' | 'original'>('current');
  const { open, viewer } = useScreenshotViewer('comparison-screenshot-title');
  const comparison = Object.fromEntries(Object.entries(comparisons[selected]).map(([key, value]) => [key, key === 'before' || key === 'after' ? value : t(value)])) as typeof comparisons[number];
  const viewingBefore = view === 'original';
  const path = sitePath('/images/educaways/');
  return (
    <div className="compare compareReal" style={{ '--position': `${position}%` } as CSSProperties}>
      <div className="compareToolbar"><div className="evidenceTabs" role="group" aria-label={t("Choose web redesign comparison")}>
        {comparisons.map((item, index) => <button key={item.title} type="button" aria-pressed={selected === index}
          onClick={() => { setSelected(index); setPosition(50); setView('current'); }}>{t(item.title)}</button>)}
      </div><span>{t("Current version shown first")}</span></div>
      <div className="compareControls compareViewSwitch" role="group" aria-label={t("Comparison view")}>
        <button type="button" aria-pressed={view === 'current'} onClick={() => setView('current')}>{t("After · My current work")}</button>
        <button type="button" aria-pressed={view === 'compare'} onClick={() => { setView('compare'); setPosition(50); }}>{t("↔ Compare before & after")}</button>
        <button type="button" aria-pressed={view === 'original'} onClick={() => setView('original')}>{t("Before · Old interface")}</button>
      </div>
      <div className="compareLabels">
        {view === 'compare' ? <><span>{t("← Before · Old interface")}</span><span>{t("After · My current work →")}</span></> : <span>{viewingBefore ? t("Before · Old interface — not the current app") : t("After · My current work")}</span>}
      </div>
      <p id="compare-help" className="compareHelp">{view === 'compare' ? t("Drag the ↔ handle left or right to reveal each version. You can also focus the image and use the arrow keys.") : viewingBefore ? t("This is the old version, shown only for context.") : t("Choose “Compare before & after” to see what changed.")}</p>
      <div className="compareStage">
        {view === 'compare' ? <>
        <img className="compareImage" src={path + comparison.before} alt={`${t('Original')} · EducaWays · ${comparison.title}`} width={1920} height={1080} loading="lazy"/>
        <img className="compareImage compareImageAfter" src={path + comparison.after} alt={`${t('Current')} · EducaWays · ${comparison.title}`} width={1920} height={1080} loading="lazy"/>
        <div className="compareLine" aria-hidden="true"><span>↔</span></div>
        <input aria-describedby="compare-help" aria-label={language === 'fr' ? `Comparer ${comparison.title} : glisser à gauche pour la version actuelle, à droite pour l’ancienne` : `Compare ${comparison.title}: slide left for the redesign, right for the old interface`} aria-valuetext={language === 'fr' ? `${position} % ancienne interface et ${100 - position} % version actuelle visibles` : `${position}% old interface and ${100 - position}% current work visible`} type="range" min="0" max="100" value={position} onChange={e=>setPosition(Number(e.target.value))}/>
        </> : <img className="compareImage" src={path + (viewingBefore ? comparison.before : comparison.after)} alt={`${viewingBefore ? t('Original') : t('Current')} · EducaWays · ${comparison.title}`} width={1920} height={1080} loading="lazy"/>}
      </div>
      <div className="compareControls"><button type="button" onClick={() => open({src:path + (viewingBefore ? comparison.before : comparison.after), title:`${comparison.title} · ${viewingBefore ? t('before — old interface') : t('after — my current work')}`, alt:`${viewingBefore ? t('Original') : t('Current')} · ${comparison.title}`, description:viewingBefore ? comparison.original : comparison.current})}><Expand size={15}/> {viewingBefore ? t("Enlarge old interface") : t("Enlarge current design")}</button></div>
      <p className="compareNote">{view === 'compare' ? comparison.note : viewingBefore ? comparison.original : comparison.current}</p>
      {viewer}
    </div>
  );
}

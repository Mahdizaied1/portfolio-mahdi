'use client';

import { useState, type CSSProperties } from 'react';
import { Expand } from 'lucide-react';
import { useScreenshotViewer } from './screenshot-viewer';
import { sitePath } from '@/lib/site-path';

const comparisons = [
  { title: 'Dashboard', before: 'dashboard-before.jpg', after: 'dashboard-after.jpg', note: 'The legacy dashboard already counted profiles. The redesign adds scoped community analytics and clearer navigation.' },
  { title: 'Planning', before: 'planning-before.jpg', after: 'planning-after.jpg', note: 'The same class and week: 27 July–2 August 2026. A clearer hierarchy for subjects, teachers, rooms, and session times.' },
];

export function BeforeAfter() {
  const [selected, setSelected] = useState(0);
  const [position, setPosition] = useState(50);
  const { open, viewer } = useScreenshotViewer('comparison-screenshot-title');
  const comparison = comparisons[selected];
  const viewingBefore = position === 100;
  const path = sitePath('/images/educaways/');
  return (
    <div className="compare compareReal" style={{ '--position': `${position}%` } as CSSProperties}>
      <div className="compareToolbar"><div className="evidenceTabs" role="group" aria-label="Choose web redesign comparison">
        {comparisons.map((item, index) => <button key={item.title} type="button" aria-pressed={selected === index}
          onClick={() => { setSelected(index); setPosition(50); }}>{item.title}</button>)}
      </div><span>Drag to compare · arrow keys work too</span></div>
      <div className="compareLabels"><span>Before</span><span>After</span></div>
      <div className="compareStage">
        <img className="compareImage" src={path + comparison.before} alt={`Legacy EducaWays ${comparison.title.toLowerCase()} interface`} width={1920} height={1080} loading="lazy"/>
        <img className="compareImage compareImageAfter" src={path + comparison.after} alt={`Redesigned EducaWays ${comparison.title.toLowerCase()} interface`} width={1920} height={1080} loading="lazy"/>
        <div className="compareLine" aria-hidden="true"><span>↔</span></div>
        <input aria-label={`Compare ${comparison.title}: slide left for the redesign, right for the legacy screen`} aria-valuetext={`${position}% legacy interface visible`} type="range" min="0" max="100" value={position} onChange={e=>setPosition(Number(e.target.value))}/>
      </div>
      <div className="compareControls"><div role="group" aria-label="Comparison view">
        <button type="button" aria-pressed={position === 100} onClick={() => setPosition(100)}>Before</button>
        <button type="button" aria-pressed={position === 50} onClick={() => setPosition(50)}>Split</button>
        <button type="button" aria-pressed={position === 0} onClick={() => setPosition(0)}>After</button>
      </div><button type="button" onClick={() => open({src:path + (viewingBefore ? comparison.before : comparison.after), title:`${comparison.title} · ${viewingBefore ? 'before' : 'redesigned'}`, alt:`${viewingBefore ? 'Legacy' : 'Redesigned'} ${comparison.title.toLowerCase()} interface`, description:comparison.note})}><Expand size={15}/> {viewingBefore ? 'Enlarge original' : 'Enlarge redesign'}</button></div>
      <p className="compareNote">{comparison.note}</p>
      {viewer}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Screenshot, useScreenshotViewer, type ProductShot } from './screenshot-viewer';

const screens: ProductShot[] = [
  {src:'todays-sessions.jpg', title:'Daily sessions', alt:'EducaWays daily sessions with started, not-started, delayed, and cancelled states', description:'Track session status and class attendance.'},
  {src:'learning-hub.jpg', title:'Learning Hub', alt:'Learning Hub with quiz performance, score distribution, and learning activity charts', description:'Learning resources and quiz activity.'},
  {src:'dashboard-analytics.jpg', title:'Community analytics', alt:'Community analytics showing enrolment, gender distribution, levels, and families', description:'Enrolment, class, and family statistics, filtered by school year, level, and class.'},
  {src:'family-payments.jpg', title:'Family payments', alt:'Family payment overview with expected, received, remaining, and credit totals', description:'Family balances, monthly payments, and services for each child.'},
  {src:'family-allocation.jpg', title:'Payment distribution', alt:'Payment preview allocating an amount to two children and retaining the remainder as credit', description:'One allocator powers preview and confirmation: oldest unpaid months first across siblings, with unused money kept as family credit.'},
].map(shot => ({...shot, src:'/images/educaways/' + shot.src}));

export function EducaWaysGallery() {
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    const selectLinkedScreen = () => {
      if (window.location.hash === '#payment-distribution') setSelected(4);
    };
    selectLinkedScreen();
    window.addEventListener('hashchange', selectLinkedScreen);
    return () => window.removeEventListener('hashchange', selectLinkedScreen);
  }, []);
  const { open, viewer } = useScreenshotViewer('gallery-screenshot-title');
  const shot = screens[selected];
  return <div className="productGallery" id="payment-distribution">
    <div className="evidenceTabs" role="group" aria-label="Explore EducaWays web screens">
      {screens.map((item, index) => <button key={item.title} type="button" aria-pressed={index === selected} onClick={() => setSelected(index)}>{item.title}</button>)}
    </div>
    <figure><Screenshot shot={shot} onOpen={open}/><figcaption><h3>{shot.title}</h3><p>{shot.description}</p></figcaption></figure>
    {viewer}
  </div>;
}

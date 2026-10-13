'use client';

import { sitePath } from '@/lib/site-path';
import { useLanguage } from './language';

import { Screenshot, useScreenshotViewer, type ProductShot } from './screenshot-viewer';
import { useState } from 'react';

const before: ProductShot = {src:sitePath('/images/educaways/student-home-before.png'), title:'Student home · before — old interface', alt:'Legacy student Home with Mathematics and Arabic sessions on 2 October 2026', description:'The previous mobile layout: single-day navigation and large session cards. Shown only to illustrate the redesign.'};
const after: ProductShot = {src:sitePath('/images/educaways/student-home-after.png'), title:'Student home · after — my current work', alt:'Redesigned student Home with a personalised greeting, week calendar, and the same Mathematics and Arabic sessions', description:'I added a personal welcome and week navigation, and redesigned the session cards. Both versions show the same date and sessions.'};
const parent: ProductShot = {src:sitePath('/images/educaways/parent-payment-details.png'), title:'Parent · current payment details', alt:'Parent payment details showing a paid October bill with tuition and canteen service breakdown', description:'A parent can check what was billed, paid, and remains due, with a breakdown of tuition and canteen services.'};

export function MobileEvidence() {
  const { t } = useLanguage();
  const { open, viewer } = useScreenshotViewer('mobile-screenshot-title');
  const localize = (shot: ProductShot) => ({...shot, title:t(shot.title), alt:t(shot.alt), description:t(shot.description ?? '')});
  const oldShot = localize(before), newShot = localize(after), parentShot = localize(parent);
  const [showBefore, setShowBefore] = useState(false);
  return <div className={'mobileEvidence' + (showBefore ? ' comparingMobile' : '')}>
    <div className="mobileEvolution">
      <div className="mobileEvidenceHeading"><span>{t("Student experience")}</span><h3>{t("Student home")}</h3></div>
      <div className="evidenceTabs mobileCompareSwitch"><button type="button" aria-expanded={showBefore} aria-controls="mobile-original" onClick={() => setShowBefore(!showBefore)}>{showBefore ? t("Hide old version") : t("Compare with the old version")}</button></div>
      <div className={'mobilePair' + (showBefore ? ' hasOriginal' : ' currentOnly')}>
        <figure className="mobileCurrent"><figcaption className="afterCaption">{t("After · My current work")}</figcaption><Screenshot shot={newShot} mobile onOpen={open}/><p>{newShot.description}</p></figure>
        <figure id="mobile-original" className="mobileOriginal" hidden={!showBefore}><figcaption>{t("Before · Old interface")}</figcaption><Screenshot shot={oldShot} mobile onOpen={open}/><p>{oldShot.description}</p></figure>
      </div>
    </div>
    <div className="mobileParentEvidence">
      <div className="mobileEvidenceHeading"><span>{t("Parent experience")}</span><h3>{t("Parent payments")}</h3></div>
      <figure><figcaption className="afterCaption">{t("Current app · Payment details")}</figcaption><Screenshot shot={parentShot} mobile onOpen={open}/></figure>
      <p>{parentShot.description}</p>
    </div>
    {viewer}
  </div>;
}

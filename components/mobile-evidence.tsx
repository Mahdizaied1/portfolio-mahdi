'use client';

import { Screenshot, useScreenshotViewer, type ProductShot } from './screenshot-viewer';

const before: ProductShot = {src:'/images/educaways/student-home-before.png', title:'Student Home · before', alt:'Legacy student Home with Mathematics and Arabic sessions on 2 October 2026'};
const after: ProductShot = {src:'/images/educaways/student-home-after.png', title:'Student Home · after', alt:'Redesigned student Home with a personalised greeting, week calendar, and the same Mathematics and Arabic sessions'};
const parent: ProductShot = {src:'/images/educaways/parent-payment-details.png', title:'Parent · payment details', alt:'Parent payment details showing a paid October bill with tuition and canteen service breakdown'};

export function MobileEvidence() {
  const { open, viewer } = useScreenshotViewer('mobile-screenshot-title');
  return <div className="mobileEvidence">
    <div className="mobileEvolution">
      <div className="mobileEvidenceHeading"><span>Student experience</span><h3>Student home</h3></div>
      <div className="mobilePair">
        <figure><figcaption>Before</figcaption><Screenshot shot={before} mobile onOpen={open}/></figure>
        <figure><figcaption className="afterCaption">After</figcaption><Screenshot shot={after} mobile onOpen={open}/></figure>
      </div>
      <p>Same sessions and date. Added a personal welcome, week navigation, and clearer session cards.</p>
    </div>
    <div className="mobileParentEvidence">
      <div className="mobileEvidenceHeading"><span>Parent experience</span><h3>Parent payments</h3></div>
      <figure><figcaption>Payment details</figcaption><Screenshot shot={parent} mobile onOpen={open}/></figure>
      <p>Payment status, totals, and the tuition/canteen breakdown in one view.</p>
    </div>
    {viewer}
  </div>;
}

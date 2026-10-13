'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Expand, X } from 'lucide-react';
import { useLanguage } from './language';

export type ProductShot = { src: string; title: string; alt: string; description?: string };

export function useScreenshotViewer(titleId: string) {
  const { t } = useLanguage();
  const [active, setActive] = useState<ProductShot | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!active) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element?.showModal();
    element?.querySelector<HTMLButtonElement>('button')?.focus();
    return () => { element?.close(); document.body.style.overflow = previousOverflow; };
  }, [active]);
  const viewer = <dialog ref={dialog} className="screenshotDialog" aria-labelledby={titleId}
    onCancel={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) setActive(null); }}>
    {active && <div className="screenshotDialogContent">
      <header><h3 id={titleId}>{active.title}</h3><div>
        <a href={active.src} target="_blank" rel="noreferrer">{t('View original')} <ArrowUpRight size={16}/></a>
        <button type="button" autoFocus aria-label={t('Close screenshot')} onClick={() => setActive(null)}><X size={22}/></button>
      </div></header>
      <div className="screenshotDialogImage"><img src={active.src} alt={active.alt}/></div>
      {active.description && <p>{active.description}</p>}
    </div>}
  </dialog>;
  return { open: setActive, viewer };
}

export function Screenshot({ shot, onOpen, mobile = false }: {
  shot: ProductShot; onOpen: (shot: ProductShot) => void; mobile?: boolean;
}) {
  const { t } = useLanguage();
  return <button type="button" className={`screenshotButton${mobile ? ' screenshotMobile' : ''}`}
    onClick={() => onOpen(shot)} aria-label={`${t('Enlarge')} ${shot.title}`}>
    <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async"
      width={mobile ? 720 : 1920} height={mobile ? 1600 : 1080}/>
    <span className="screenshotExpand"><Expand size={15}/><span>{t('Enlarge')}</span></span>
  </button>;
}

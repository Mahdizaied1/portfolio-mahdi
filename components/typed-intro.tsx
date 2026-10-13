'use client';

import { useEffect, useState } from 'react';

export const INTRO_NAME_LENGTH = 11;
export const INTRO_STACK = 'React · React Native / Expo · Node.js';
export const NAME_KEYSTROKE_MS = 110;
export const ROLE_KEYSTROKE_MS = 75;
export const STACK_KEYSTROKE_MS = 55;

export function introProgress(elapsed: number, roleLength: number) {
  const nameDuration = INTRO_NAME_LENGTH * NAME_KEYSTROKE_MS;
  const roleDuration = roleLength * ROLE_KEYSTROKE_MS;
  if (elapsed < nameDuration) return Math.floor(elapsed / NAME_KEYSTROKE_MS);
  if (elapsed < nameDuration + roleDuration) return INTRO_NAME_LENGTH + Math.floor((elapsed - nameDuration) / ROLE_KEYSTROKE_MS);
  return Math.min(INTRO_NAME_LENGTH + roleLength + INTRO_STACK.length, INTRO_NAME_LENGTH + roleLength + Math.floor((elapsed - nameDuration - roleDuration) / STACK_KEYSTROKE_MS));
}

export function useTypedIntro(ready: boolean, reducedMotion: boolean | null, role: string) {
  const [progress, setProgress] = useState({ role, count: 0 });
  const total = INTRO_NAME_LENGTH + role.length + INTRO_STACK.length;
  useEffect(() => {
    if (!ready || reducedMotion) return;
    const start = performance.now();
    const timer = window.setInterval(() => {
      const next = introProgress(performance.now() - start, role.length);
      setProgress({ role, count: next });
      if (next === total) window.clearInterval(timer);
    }, 32);
    return () => window.clearInterval(timer);
  }, [ready, reducedMotion, role, total]);
  return reducedMotion ? total : progress.role === role ? progress.count : 0;
}

// Reserve the complete text's footprint, so typing never shifts the scene.
// Assistive technology reads the complete phrase, not individual keystrokes.
export function TypedText({ text, count, cursor = false, accessible = true }: {
  text: string; count: number; cursor?: boolean; accessible?: boolean;
}) {
  return <span className="typedText">
    {accessible && <span className="introSrOnly">{text}</span>}
    <span className="typedReserve" aria-hidden="true">{text}</span>
    <span className="typedVisible" aria-hidden="true">{text.slice(0, Math.max(0, count))}{cursor && <i className="typingCursor"/>}</span>
  </span>;
}

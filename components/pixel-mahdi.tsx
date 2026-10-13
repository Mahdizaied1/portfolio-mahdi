'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from './language';
import { sitePath } from '@/lib/site-path';

type ScenePhase = 'walk' | 'sit' | 'idle' | 'glanceIn' | 'glanceHold' | 'glanceOut';

type PixelMahdiProps = {
  onSettled?: () => void;
};

const SCALE = 5;
const CHAIR_POSITION = { x: 24, y: 20 };
const DESK_POSITION = { x: 8, y: 32 };
const SEATED_POSITION = { x: 6, y: 11 };
const WALK_Y = 7;
const WALK_START_X = 128;
const WALK_END_X = 6;
const WALK_STEP = 4;
const WALK_FRAME_DURATION = 75;
const SIT_FRAME_DURATION = 75;
const GLANCE_FRAME_DURATION = 125;
const CODE_SIGNALS = ['</>', '{}', 'API', '01', '[]', '=>'];

const padFrame = (index: number) => String(index).padStart(2, '0');

const loadImage = (source: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error('Unable to load ' + source));
  image.src = sitePath(source);
});

export function PixelMahdi({ onSettled }: PixelMahdiProps) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onSettledRef = useRef(onSettled);
  const requestGlanceRef = useRef<(isEngaged: boolean) => void>(() => undefined);
  const pointerEngagedRef = useRef(false);
  const focusEngagedRef = useRef(false);

  const updateEngagement = () => {
    requestGlanceRef.current(pointerEngagedRef.current || focusEngagedRef.current);
  };

  useEffect(() => {
    onSettledRef.current = onSettled;
  }, [onSettled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) {
      onSettledRef.current?.();
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const glowCanvas = document.createElement('canvas');
    const glowContext = glowCanvas.getContext('2d');
    glowCanvas.width = 84;
    glowCanvas.height = 84;
    if (!glowContext) {
      onSettledRef.current?.();
      return;
    }

    let disposed = false;
    let animationFrame = 0;
    let hasSettled = false;
    let isVisible = true;
    let resumeAnimation = () => undefined;

    const pauseAnimation = () => window.cancelAnimationFrame(animationFrame);
    const visibilityChanged = () => {
      if (document.hidden) pauseAnimation();
      else resumeAnimation();
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) resumeAnimation();
      else pauseAnimation();
    });
    observer.observe(canvas);
    document.addEventListener('visibilitychange', visibilityChanged);

    const settle = () => {
      if (hasSettled || disposed) return;
      hasSettled = true;
      onSettledRef.current?.();
    };

    const fallbackTimer = window.setTimeout(settle, 5_000);

    Promise.all([
      loadImage('/pixel/chair.png'),
      loadImage('/pixel/desk-laptop-front.png'),
      Promise.all(reducedMotion ? [] : Array.from({ length: 16 }, (_, index) => loadImage('/pixel/walk-west/' + padFrame(index) + '.png'))),
      Promise.all((reducedMotion ? [8] : [...Array.from({ length: 7 }, (_, index) => index), 8]).map((index) => loadImage('/pixel/sit-south/' + padFrame(index) + '.png'))),
      Promise.all(reducedMotion ? [] : Array.from({ length: 8 }, (_, index) => loadImage('/pixel/glance-south/' + padFrame(index) + '.png'))),
    ]).then(([chair, desk, walkFrames, sitFrames, glanceFrames]) => {
      if (disposed) return;

      const idleFrame = sitFrames[sitFrames.length - 1];
      const glanceInSequence = [
        glanceFrames[0], glanceFrames[0], glanceFrames[1], glanceFrames[1],
        glanceFrames[2], glanceFrames[3], glanceFrames[3], glanceFrames[4],
        glanceFrames[4], glanceFrames[4],
      ];
      const glanceOutSequence = [glanceFrames[4], glanceFrames[5], glanceFrames[6], glanceFrames[7]];

      let phase: ScenePhase = reducedMotion ? 'idle' : 'walk';
      let frame = 0;
      let walkX = WALK_START_X;
      let previousTime = 0;
      let elapsed = 0;
      let isEngaged = false;

      const changePhase = (nextPhase: ScenePhase) => {
        phase = nextPhase;
        frame = 0;
        elapsed = 0;
      };

      requestGlanceRef.current = (nextEngaged) => {
        isEngaged = nextEngaged;
        if (reducedMotion) return;

        if (nextEngaged && phase === 'idle') {
          changePhase('glanceIn');
        } else if (nextEngaged && phase === 'glanceOut') {
          changePhase('glanceIn');
        } else if (!nextEngaged && (phase === 'glanceIn' || phase === 'glanceHold')) {
          changePhase('glanceOut');
        }
      };

      const seatedFrame = () => {
        if (phase === 'sit') return sitFrames[Math.min(frame, sitFrames.length - 1)];
        if (phase === 'glanceIn') return glanceInSequence[Math.min(frame, glanceInSequence.length - 1)];
        if (phase === 'glanceHold') return glanceInSequence[glanceInSequence.length - 1];
        if (phase === 'glanceOut') return glanceOutSequence[Math.min(frame, glanceOutSequence.length - 1)];
        return idleFrame;
      };

      const drawSeated = (time: number) => {
        const sprite = seatedFrame();
        if (phase === 'sit' || reducedMotion) {
          context.drawImage(sprite, SEATED_POSITION.x, SEATED_POSITION.y);
          return;
        }

        glowContext.clearRect(0, 0, glowCanvas.width, glowCanvas.height);
        glowContext.globalCompositeOperation = 'source-over';
        glowContext.drawImage(sprite, 0, 0);
        glowContext.globalCompositeOperation = 'source-atop';
        const glowStrength = phase === 'idle' ? .1 + .08 * Math.sin(time / 900) : .06;
        glowContext.fillStyle = 'rgba(186, 214, 255, ' + glowStrength + ')';
        glowContext.fillRect(30, 16, 22, 28);
        glowContext.globalCompositeOperation = 'source-over';
        context.drawImage(glowCanvas, SEATED_POSITION.x, SEATED_POSITION.y);
      };

      const drawCodeSignals = (time: number) => {
        if (phase !== 'idle' || reducedMotion) return;

        const cycleDuration = 2_800;
        context.save();
        context.font = '700 4px monospace';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        CODE_SIGNALS.forEach((signal, index) => {
          const progress = ((time + index * (cycleDuration / CODE_SIGNALS.length)) % cycleDuration) / cycleDuration;
          const side = index % 2 === 0 ? -1 : 1;
          const spread = 7 + progress * 23;
          const sway = Math.sin(progress * Math.PI * 3 + index) * 1.4;
          const x = 45 + side * spread + sway;
          const y = 31 - progress * 25;
          const opacity = Math.sin(progress * Math.PI) * .72;

          context.globalAlpha = opacity;
          context.fillStyle = index % 3 === 0 ? '#b9ff66' : index % 3 === 1 ? '#9b87ff' : '#70d8ff';
          context.fillText(signal, x, y);
        });

        context.restore();
      };

      const draw = (time: number) => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.imageSmoothingEnabled = false;
        context.scale(SCALE, SCALE);
        context.drawImage(chair, CHAIR_POSITION.x, CHAIR_POSITION.y);
        drawCodeSignals(time);

        if (phase === 'walk') {
          context.drawImage(walkFrames[frame % walkFrames.length], walkX, WALK_Y);
        } else {
          drawSeated(time);
        }

        context.drawImage(desk, DESK_POSITION.x, DESK_POSITION.y);
        context.restore();
      };

      const tick = (time: number) => {
        if (disposed || !isVisible || document.hidden) return;
        if (!previousTime) previousTime = time;
        elapsed += time - previousTime;
        previousTime = time;

        if (phase === 'walk') {
          while (elapsed >= WALK_FRAME_DURATION) {
            elapsed -= WALK_FRAME_DURATION;
            frame += 1;
            walkX = Math.max(WALK_END_X, walkX - WALK_STEP);
            if (walkX <= WALK_END_X) {
              changePhase('sit');
              break;
            }
          }
        } else if (phase === 'sit') {
          while (elapsed >= SIT_FRAME_DURATION) {
            elapsed -= SIT_FRAME_DURATION;
            frame += 1;
            if (frame >= sitFrames.length) {
              changePhase('idle');
              settle();
              if (isEngaged) changePhase('glanceIn');
              break;
            }
          }
        } else if (phase === 'glanceIn') {
          while (elapsed >= GLANCE_FRAME_DURATION) {
            elapsed -= GLANCE_FRAME_DURATION;
            frame += 1;
            if (frame >= glanceInSequence.length - 1) {
              frame = glanceInSequence.length - 1;
              phase = isEngaged ? 'glanceHold' : 'glanceOut';
              elapsed = 0;
              break;
            }
          }
        } else if (phase === 'glanceOut') {
          while (elapsed >= GLANCE_FRAME_DURATION) {
            elapsed -= GLANCE_FRAME_DURATION;
            frame += 1;
            if (frame >= glanceOutSequence.length) {
              changePhase('idle');
              break;
            }
          }
        }

        draw(time);
        animationFrame = window.requestAnimationFrame(tick);
      };

      resumeAnimation = () => {
        pauseAnimation();
        previousTime = 0;
        if (!disposed && !reducedMotion && isVisible && !document.hidden) {
          animationFrame = window.requestAnimationFrame(tick);
        }
      };

      if (reducedMotion) {
        draw(0);
        settle();
      } else {
        resumeAnimation();
      }
    }).catch(() => {
      // Keep the introduction available even if a decorative asset fails.
      settle();
    });

    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibilityChanged);
      requestGlanceRef.current = () => undefined;
      window.clearTimeout(fallbackTimer);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="pixelMahdi">
      <canvas ref={canvasRef} width="1000" height="500" aria-hidden="true" />
      <button
        className="pixelMahdiHotspot"
        type="button"
        aria-label={t('Pixel Mahdi looks at you')}
        onPointerEnter={() => { pointerEngagedRef.current = true; updateEngagement(); }}
        onPointerLeave={() => { pointerEngagedRef.current = false; updateEngagement(); }}
        onFocus={() => { focusEngagedRef.current = true; updateEngagement(); }}
        onBlur={() => { focusEngagedRef.current = false; updateEngagement(); }}
      />
    </div>
  );
}

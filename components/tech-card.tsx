'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import type { PointerEvent as ReactPointerEvent } from 'react';

type TechCardProps = {
  name: string;
  label: string;
  icon: LucideIcon;
  tone: string;
  index: number;
};

export function TechCard({ name, label, icon: Icon, tone, index }: TechCardProps) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 190, damping: 22, mass: .55 };
  const rotateX = useSpring(useTransform(pointerY, [-.5, .5], [8, -8]), spring);
  const rotateY = useSpring(useTransform(pointerX, [-.5, .5], [-9, 9]), spring);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    pointerX.set(x - .5);
    pointerY.set(y - .5);
    event.currentTarget.style.setProperty('--mx', `${x * 100}%`);
    event.currentTarget.style.setProperty('--my', `${y * 100}%`);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerX.set(0);
    pointerY.set(0);
    event.currentTarget.style.setProperty('--mx', '50%');
    event.currentTarget.style.setProperty('--my', '50%');
  };

  return (
    <motion.div
      className={`techItem ${tone}`}
      data-tech={name}
      initial={reduceMotion ? false : { opacity: 0, y: 38, scale: .9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: .35 }}
      transition={{ duration: .58, delay: index * .055, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { scale: 1.035 }}
      whileTap={reduceMotion ? undefined : { scale: .98 }}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 750 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.span
        className="techIcon"
        animate={reduceMotion ? undefined : { y: [0, -3, 0], rotate: [0, 3, -2, 0] }}
        transition={{ duration: 3.4 + (index % 3) * .45, delay: index * .12, repeat: Infinity, ease: 'easeInOut' }}
      ><Icon size={20}/></motion.span>
      <div><strong>{name}</strong><small>{label}</small></div>
      <i>{String(index + 1).padStart(2, '0')}</i>
    </motion.div>
  );
}

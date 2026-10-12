'use client';

import { motion, useReducedMotion } from 'motion/react';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

const viewport = { once: true, amount: .08 };

export function RevealDiv({ children, className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: .75 }}>{children}</motion.div>;
}

export function RevealSection({ children, className, id }: RevealProps) {
  const reduceMotion = useReducedMotion();
  return <motion.section id={id} className={className} initial={reduceMotion ? false : { opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: .75 }}>{children}</motion.section>;
}

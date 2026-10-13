import type { Metadata } from 'next';
import EducaWaysCaseStudy from '@/components/educaways-case-study';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'EducaWays Case Study — Mahdi Zaied',
  description: 'A private production school platform spanning React web, Expo mobile apps, and a Node.js API.',
  openGraph: { title: 'EducaWays Case Study — Mahdi Zaied', description: 'A full-stack school platform across web, mobile, and backend.', images: ['/og.png'] },
  twitter: { title: 'EducaWays Case Study — Mahdi Zaied', description: 'A full-stack school platform across web, mobile, and backend.', images: ['/og.png'] },
};

export default function EducaWaysPage() { return <EducaWaysCaseStudy/>; }

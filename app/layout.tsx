import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider, SkipLink } from '@/components/language';
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? 'https://mahdi-portfolio.mahdizaied.workers.dev'),
  title: 'Mahdi Zaied — Full-Stack Developer',
  description: 'Full-stack developer building focused products with React, React Native, Expo, and Node.js.',
  openGraph: { title: 'Mahdi Zaied — Full-Stack Developer', description: 'Focused web, mobile, and backend products built with React, React Native, and Node.js.', images: ['/og.png'], type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Mahdi Zaied — Full-Stack Developer', description: 'Focused web, mobile, and backend products built with React, React Native, and Node.js.', images: ['/og.png'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}><LanguageProvider><SkipLink/>{children}</LanguageProvider></body></html>; }

'use client';

import { Cloud, Moon, Star, Sun } from 'lucide-react';
import { useEffect, useSyncExternalStore } from 'react';
import { useLanguage } from './language';

type Theme = 'dark' | 'light';
const themeEvent = 'portfolio-theme-change';

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  window.addEventListener(themeEvent, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(themeEvent, callback);
  };
};

const getTheme = (): Theme => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
const getServerTheme = (): Theme => 'dark';

export function ThemeToggle() {
  const { t } = useLanguage();
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  useEffect(() => {
    let savedTheme: string | null = null;
    try { savedTheme = window.localStorage.getItem('portfolio-theme'); } catch { /* Storage can be disabled. */ }
    const initialTheme: Theme = savedTheme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = initialTheme;
    window.dispatchEvent(new Event(themeEvent));
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    try { window.localStorage.setItem('portfolio-theme', nextTheme); } catch { /* The toggle still works without persistence. */ }
    window.dispatchEvent(new Event(themeEvent));
  };

  return (
    <button className="themeToggle" data-weather={theme} type="button" onClick={toggleTheme} aria-label={t(theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme')} title={t(theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme')}>
      <span className="themeWeather" aria-hidden="true">
        <Sun className="weatherSun" size={19} strokeWidth={2.4}/>
        <Moon className="weatherMoon" size={18} strokeWidth={2.4}/>
        <Cloud className="weatherCloud weatherCloudBack" size={25} strokeWidth={2.2}/>
        <Cloud className="weatherCloud weatherCloudFront" size={28} strokeWidth={2.2}/>
        <Star className="weatherStar weatherStarOne" size={6} fill="currentColor"/>
        <Star className="weatherStar weatherStarTwo" size={5} fill="currentColor"/>
        <Star className="weatherStar weatherStarThree" size={4} fill="currentColor"/>
      </span>
    </button>
  );
}

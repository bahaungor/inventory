import { useEffect, useState } from 'react';
import './switch.css';

export default function ThemeSwitch() {
  const storedTheme = localStorage.getItem('AppBahaTheme');
  const [theme, setTheme] = useState(storedTheme || 'light');

  useEffect(() => {
    localStorage.setItem('AppBahaTheme', theme);
    const root = document.documentElement;
    theme === 'dark' ? (root.className = 'dark') : root.removeAttribute('class');
  }, [theme]);

  const handleClick = () => theme === 'dark' ? setTheme('light') : setTheme('dark');

  return <span className="tt" onClick={handleClick}>{theme === 'dark' ? '🌙' : '☀️'}</span>;
}

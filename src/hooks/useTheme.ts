import { useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';

export function useTheme() {
  const { theme, toggleTheme } = useUIStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [theme]);

  return { theme, toggleTheme };
}

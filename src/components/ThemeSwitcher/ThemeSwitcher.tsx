'use client';

import { Sun, Moon, Palette, TreePine, Waves } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../context/types';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      {[
        { name: 'light', icon: Sun },
        { name: 'dark', icon: Moon },
        { name: 'joyful', icon: Palette },
        { name: 'forest', icon: TreePine },
        { name: 'ocean', icon: Waves },
      ].map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => setTheme(name as Theme)}
          className={`rounded-full p-2 transition-colors ${
            theme === name
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
          aria-label={`${name} theme`}
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
}

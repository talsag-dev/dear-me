export type Theme = 'light' | 'dark' | 'joyful' | 'forest' | 'ocean';

export interface ThemeContextType {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
}

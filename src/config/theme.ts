export const colors = {
  primary: '#1B98E0',    // Blue - Primary actions, links, highlights
  light: '#FFFFEA',      // Light cream - Text, backgrounds in dark mode
  dark: '#0F110C',       // Almost black - Backgrounds, text in light mode
} as const;

export type ThemeColor = keyof typeof colors;
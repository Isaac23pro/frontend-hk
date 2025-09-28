import { PALETTE } from '../constants/colors';

export const theme = {
  colors: {
    primary: PALETTE.primary.yellow,
    secondary: PALETTE.primary.pink,
    tertiary: PALETTE.primary.blue,
    accent: PALETTE.primary.green,
    background: PALETTE.neutral.lightGray,
    text: PALETTE.neutral.darkGray,
    white: PALETTE.neutral.white,
    black: PALETTE.neutral.black,
  },
  fonts: {
    main: 'Helvetica, Arial, sans-serif',
    headings: 'Georgia, serif',
  },
  fontSizes: {
    small: '12px',
    medium: '16px',
    large: '24px',
    xlarge: '32px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 8px rgba(0,0,0,0.15)',
  },
  borderRadius: '8px',
};

export type ThemeType = typeof theme;
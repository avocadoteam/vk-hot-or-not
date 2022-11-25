import { createGlobalTheme, createTheme, createThemeContract, globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const root = createGlobalTheme('#app', {
  space: {
    small: '.25rem',
    medium: '.5rem',
    large: '1rem',
  },
  fonts: {
    family: `SF Pro Rounded`,
  },
  boxShadow: '0px 52px 64px rgba(0, 0, 0, 0.03)',
  borderRadius: '36px',
  palette: {
    white: '#ffffff',
    black: '#000000',
  },
});

const elemnetsContract = createThemeContract({
  primary: null,
  secondary: null,
  btnSecondary: null,
  warn: null,
  error: null,
  background: null,
  cardBackground: null,
  cardBackgroundEmpty: null,

  text: {
    primary: null,
    muted: null,
    secondary: null,
    tertiary: null,
    subhead: null,
  },
});

export const lightTheme = createTheme(elemnetsContract, {
  primary: '#FF2E00',
  secondary: '#F4F4F4',
  btnSecondary: 'rgba(255, 92, 0, 0.07)',
  warn: '#FCA743',
  error: '#FF726E',
  background: '#FAFAFA',
  cardBackground: '#FFFFFF',
  cardBackgroundEmpty: '#EBEDF0',
  text: {
    primary: '#2C2D2E',
    muted: '#2C2D2E',
    secondary: '#818C99',
    tertiary: '#99A2AD',
    subhead: '#6D7885',
  },
});

export const darkTheme = createTheme(elemnetsContract, {
  primary: '#FF2E00',
  secondary: '#252525',
  btnSecondary: 'rgba(255, 92, 0, 0.07)',
  cardBackgroundEmpty: '#3E3E3E',
  warn: '#E9A658',
  error: '#FF726E',
  background: '#141414',
  cardBackground: '#2C2D2E',
  text: {
    primary: '#E1E3E6',
    muted: '#C4C8CC',
    secondary: '#76787A',
    tertiary: '#99A2AD',
    subhead: '#909499',
  },
});

export const vars = { ...root, all: elemnetsContract };

globalStyle('#app', {
  boxSizing: 'border-box',
  fontSize: '16px',
  fontStyle: 'normal',
});

globalStyle(`.vkui__root`, {
  '--font-display': `SF Pro Rounded !important`,
  '--font-tt': `SF Pro Rounded !important`,
  '--font-common': `SF Pro Rounded !important`,
  '--background_page': vars.all.background,
  '--background_content': vars.all.background,
  '--header_background': vars.all.background,
  '--button_primary_background': vars.all.primary,
  '--button_seondary_background': vars.all.secondary,
  '--button_secondary_foreground': vars.all.text.secondary,
  '--vkui--size_border_radius--regular': '1rem',
  '--accent': vars.all.primary,
} as any);
globalStyle(`.vkuiSearch`, {
  padding: '0 !important',
  background: 'transparent !important',
  marginTop: '1rem',
} as any);
globalStyle(`.vkuiPanel.vkuiPanel--sizeX-regular .vkuiPanel__in, .vkuiPanel.vkuiPanel--sizeX-regular:after`, {
  backgroundColor: `${vars.all.background} !important`,
} as any);
globalStyle(`.vkuiSwitch__self:checked+.vkuiSwitch__pseudo:after`, {
  background: `${vars.all.primary} !important`,
} as any);

export const contentCenter = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    minHeight: '65vh',
  },
  variants: {
    alignItems: {
      start: {
        alignItems: 'flex-start',
      },
    },
    justifyContent: {
      start: {
        justifyContent: 'flex-start',
      },
    },
  },
});

export const primary = style({
  color: `${vars.all.primary} !important`,
});
export const error = style({
  color: `${vars.all.error} !important`,
});
export const textSecondary = style({
  color: `${vars.all.text.secondary} !important`,
});

export const mt2 = style({
  marginTop: '2rem !important',
});
export const mthalf = style({
  marginTop: '.5rem !important',
});

export const btnSec = style({
  backgroundColor: `${vars.all.btnSecondary} !important`,
  color: `${vars.all.primary} !important`,
  borderRadius: '1rem !important',
});

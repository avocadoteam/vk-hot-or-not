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
  palette: {
    white: '#ffffff',
    black: '#000000',
  },
});

const elemnetsContract = createThemeContract({
  primary: null,
  secondary: null,
  warn: null,
  error: null,
  background: null,
  varBackground: null,
  varBtnBackground: null,
  cardBackground: null,
  border: null,
  input: null,
  boxShadow: null,
  hr: null,
  purple: null,
  text: {
    input: null,
    action: null,
    normal: null,
    note: null,
    dimmed: null,
  },
});

export const lightTheme = createTheme(elemnetsContract, {
  primary: '#2688EB',
  secondary: '#99A2AD',
  warn: '#FCA743',
  error: '#FF726E',
  purple: '#3E4BC8',
  background: '#F5F5F5',
  cardBackground: '#FFFFFF',
  varBackground: 'linear-gradient(180deg, rgba(195,253,169,1) 0%, rgba(154,238,235,1) 70%)',
  varBtnBackground: '#FFFFFF',
  border: '1px solid #D3D9DE',
  input: '#EBEDF0',
  boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.08), 0px 2px 24px rgba(0, 0, 0, 0.08)',
  hr: '#D7D8D9',

  text: {
    input: '#818C99',
    action: '#5C9CE6',
    normal: '#000000',
    note: '#454647',
    dimmed: '#7F8285',
  },
});

export const darkTheme = createTheme(elemnetsContract, {
  primary: '#2688EB',
  secondary: '#F472B6',
  warn: '#E9A658',
  error: '#FF726E',
  purple: '#8465FF',
  background: '#1F1D1C',
  cardBackground: '#333333',
  varBackground: '#636363',
  varBtnBackground: '#636363',
  border: '1px solid #D3D9DE',
  input: '#EBEDF0',
  boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.08), 0px 2px 24px rgba(0, 0, 0, 0.08)',
  hr: '#D7D8D9',
  text: {
    input: '#818C99',
    action: '#5C9CE6',
    normal: '#FFFFFF',
    note: '#FFFFFF',
    dimmed: '#BFBFBF',
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

export const textAction = style({
  color: `${vars.all.text.action} !important`,
});
export const primary = style({
  color: `${vars.all.primary} !important`,
});
export const error = style({
  color: `${vars.all.error} !important`,
});
export const dimmed = style({
  color: `${vars.all.text.dimmed} !important`,
});

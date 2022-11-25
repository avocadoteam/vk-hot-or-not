import { vars } from '@ui/theme/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';

const headContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '2.5rem 1.5rem 1.5rem',
});

export const dAva = style({
  background: `${vars.all.background} !important`,
  ':after': {
    boxShadow: 'none !important',
  },
});

globalStyle(`${dAva} > div`, {
  color: vars.all.primary,
});

const wrap = style({
  padding: '1.5rem',
});

const card = style({
  width: '318px',
  height: '276px',
  borderRadius: '36px',
  boxShadow: vars.boxShadow,
  backgroundColor: vars.all.cardBackground,
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
});

const testDriveContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '1.5rem',
});

const cardBg = style({
  height: '119px',
});
const cardFg = style({
  position: 'absolute',
  zIndex: 1,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export const welcomeStyles = {
  headContainer,
  dAva,
  wrap,
  card,
  testDriveContainer,
  cardBg,
  cardFg,
};

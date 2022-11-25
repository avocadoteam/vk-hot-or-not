import { vars } from '@ui/theme/theme.css';
import { style } from '@vanilla-extract/css';

const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '1.5rem',
});

const card = style({
  width: '318px',
  height: '276px',
  borderRadius: '36px',
  boxShadow: '0 9px 13px 1px rgba(0, 0, 0, 0.3)',
  backgroundColor: vars.all.cardBackground,
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '1rem',
});
const cardEmpty = style({
  width: '318px',
  height: '276px',
  borderRadius: '36px',
  boxShadow: '0 9px 13px 1px rgba(0, 0, 0, 0.3)',
  backgroundColor: vars.all.cardBackground,
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: `5px dashed ${vars.all.text.secondary}`,
  marginBottom: '2rem',
});

const cardBg = style({
  height: '119px',
  objectFit: 'cover',
});
const cardFg = style({
  position: 'absolute',
  zIndex: 1,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'hidden',
  borderRadius: '50%',
  width: '136px',
  height: '136px',
  border: `4px solid ${vars.all.cardBackground}`,
  backgroundColor: vars.all.cardBackground,
  objectFit: 'contain',
});

const cardBgEmpty = style({
  height: '119px',
  backgroundColor: vars.all.cardBackgroundEmpty,
});
const cardFgEmpty = style({
  position: 'absolute',
  zIndex: 1,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'hidden',
  borderRadius: '50%',
  width: '136px',
  height: '136px',
  border: `3px solid ${vars.all.cardBackground}`,
  backgroundColor: vars.all.cardBackgroundEmpty,
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
});

const bottomContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  margin: '3rem 1rem',
});

const iconLeft = style({
  display: 'flex !important',
  alignItems: 'center',
  color: `${vars.all.text.secondary} !important`,
  paddingRight: '.75rem !important',
});
const iconRight = style({
  color: `${vars.all.text.secondary} !important`,
});

const cardContainer = style({
  height: '350px',
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

const swipeAnim = style({
  width: '150px',
  height: '150px',
  position: 'absolute',
  zIndex: 2,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) rotate(90deg)',
  pointerEvents: 'none',
});
export const homeStyles = {
  container,
  card,
  cardBg,
  cardFg,
  bottomContainer,
  iconLeft,
  iconRight,
  cardContainer,
  swipeAnim,
  cardEmpty,
  cardFgEmpty,
  cardBgEmpty,
};

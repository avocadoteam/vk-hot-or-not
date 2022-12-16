import { vars } from '@ui/theme/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '1rem 1rem 0',
});

const imgsWrap = style({
  position: 'relative',
  width: '100%',
});

const imgBg = style({
  borderRadius: '1rem',
  overflow: 'hidden',
  height: '200px',
  maxHeight: '200px',
  objectFit: 'cover',
  width: '100%',
});
const imgBgOverlay = style({
  borderRadius: '1rem',
  overflow: 'hidden',
  height: '200px',
  maxHeight: '200px',
  width: '100%',
  position: 'absolute',
  zIndex: 1,
  background: 'rgba(0, 0, 0, .3)',
});

const imgFg = style({
  position: 'absolute',
  zIndex: 4,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, 50%)',
  overflow: 'hidden',
  borderRadius: '50%',
  width: '80px',
  height: '80px',
  border: `3px solid ${vars.all.cardBackground}`,
  backgroundColor: vars.all.cardBackground,
  objectFit: 'contain',
});

const editBg = style({
  position: 'absolute !important',
  zIndex: 3,
  top: 0,
  left: 0,
  color: `${vars.palette.white} !important`,
} as any);
const editVisible = style({
  position: 'absolute !important',
  zIndex: 3,
  top: 0,
  right: 0,
  color: `${vars.palette.white} !important`,
} as any);

const numsContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
});

const num = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRight: '1px solid #d7d8d9',
  maxWidth: '115px',
  selectors: {
    '&:last-child': {
      borderRight: 'none',
    },
  },
});

globalStyle(`${num} > svg, ${num} > div > svg`, {
  color: vars.all.text.secondary,
});

const slider = style({
  width: '100%',
  maxWidth: 'calc(100% - 3rem)',
  height: '28px',
  background: `radial-gradient(11.48% 134.09% at 76.89% -6.82%, rgba(243, 184, 66, 0.17) 0.26%, rgba(243, 184, 66, 0) 100%), linear-gradient(90deg, #49D5F3 0%, #D1FF4D 37.5%, #FDA640 71.88%, #FF2929 100%);`,
  borderRadius: '52px',
  marginTop: '.5rem',
  position: 'relative',
  padding: '0 1.5rem',
});

const idicator = style({
  position: 'absolute',
  zIndex: 1,
  top: 24,
});

globalStyle(`${idicator} > p`, {
  marginTop: '-1rem',
});

export const dFlex = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  margin: '3rem 0 .5rem',
});
export const line = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  variants: {
    m: {
      top: {
        marginTop: '1rem',
      },
      y: {
        margin: '1rem 0',
        flexDirection: 'column',
      },
    },
  },
});
export const rating = style({
  display: 'flex',
  alignSelf: 'center',
});

globalStyle(`${line} > p`, {
  marginLeft: '.5rem',
});

const editName = style({
  display: 'flex',
  alignItems: 'center',
  marginTop: '2.5rem',
  justifyContent: 'center',
  width: '100%',
});

globalStyle(`${editName} > button`, {
  marginLeft: '1rem',
  width: '24px',
  height: '24px',
});

export const sgsStyles = {
  container,
  imgsWrap,
  imgBg,
  imgFg,
  editBg,
  editVisible,
  imgBgOverlay,
  numsContainer,
  num,
  slider,
  idicator,
  dFlex,
  line,
  rating,
  editName,
};

import { style } from '@vanilla-extract/css';

const countdownContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  position: 'absolute',
  zIndex: 2,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none',
});
const svg = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transform: 'rotateY(-180deg) rotateZ(-90deg)',
  overflow: 'visible',
});

export const timeS = {
  svg,
  countdownContainer,
};

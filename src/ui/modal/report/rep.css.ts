import { globalStyle, style } from '@vanilla-extract/css';

const container = style({
  display: 'flex',
  flexDirection: 'column',
});

globalStyle(`${container} > button`, {
  marginBottom: '1rem',
});

export const repStyles = {
  container,
};

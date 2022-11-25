import { vars } from '@ui/theme/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';

const container = style({});
const btnClose = style({
  width: '32px !important',
  height: '32px !important',
  marginBottom: '.5rem !important',
  color: `${vars.all.text.secondary} !important`,
});

globalStyle(`${btnClose} > div`, {
  padding: '.25rem !important',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto !important',
});

globalStyle(`${container} > button`, {
  marginBottom: '1rem',
});

export const fileStyles = {
  container,
  btnClose,
};

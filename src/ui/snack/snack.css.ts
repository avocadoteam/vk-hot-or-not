import { vars } from '@ui/theme/theme.css';
import { styleVariants } from '@vanilla-extract/css';

const snackAva = styleVariants({
  success: {
    background: `${vars.all.primary} !important`,
  },
  error: {
    background: `${vars.all.error} !important`,
  },
  warn: {
    background: `${vars.all.warn} !important`,
  },
  info: {
    background: `${vars.all.purple} !important`,
  },
});

export const snackStyles = {
  snackAva,
};

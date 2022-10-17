import { recipe } from '@vanilla-extract/recipes';
import { vars } from './theme.css';

export const typography = recipe({
  base: {
    fontFamily: vars.fonts.family,
    color: vars.all.text.normal,
    margin: 0,
  },
  variants: {
    color: {
      text: {
        color: vars.palette.black,
      },
    },
    variant: {
      head: {
        fontSize: '20px',
        lineHeight: '24px',
        fontWeight: 600,
      },
      caption: {
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: '24px',
        letterSpacing: '-0.078px',
      },
      note: {
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16px',
        letterSpacing: '-0.078px',
        color: vars.all.text.note,
      },
      body: {
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '-0.01rem',
      },
      primary: {
        fontWeight: 500,
        fontSize: '15px',
        lineHeight: '16px',
        letterSpacing: '-0.078px',
        color: vars.all.primary,
      },
      secondary: {
        fontWeight: 300,
        fontSize: '13px',
        lineHeight: '16px',
        letterSpacing: '-0.078px',
        color: vars.all.text.dimmed,
      },
      input: {
        fontWeight: 300,
        fontSize: '17x',
        lineHeight: '22px',
        letterSpacing: '-0.408px',
        color: vars.all.text.input,
      },
    },
    weight: {
      hard: {
        fontWeight: 600,
      },
      medium: {
        fontWeight: 500,
      },
      normal: {
        fontWeight: 400,
      },
      light: {
        fontWeight: 300,
      },
    },
    align: {
      center: {
        textAlign: 'center',
      },
    },
    m: {
      't.5': {
        marginTop: '.5rem',
      },
      t: {
        marginTop: '1rem',
      },
      't1.5': {
        marginTop: '1.5rem',
      },
      t3: {
        marginTop: '3rem',
      },
      t5: {
        marginTop: '5rem',
      },
      l: {
        marginLeft: '1rem',
      },
      'l.5': {
        marginLeft: '.5rem',
      },
    },
    truncate: {
      true: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    },
  },
});

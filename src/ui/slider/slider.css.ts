import { style } from '@vanilla-extract/css';

const slider = style({
  width: '100%',
  maxWidth: 'calc(310px - 3rem)',
  height: '44px',
  background: `radial-gradient(11.48% 134.09% at 76.89% -6.82%, rgba(243, 184, 66, 0.17) 0.26%, rgba(243, 184, 66, 0) 100%), linear-gradient(90deg, #49D5F3 0%, #D1FF4D 37.5%, #FDA640 71.88%, #FF2929 100%);`,
  borderRadius: '52px',
  marginTop: '.5rem',
  position: 'relative',
  padding: '0 1.5rem',
});

const slideSelector = style({
  width: '26px',
  height: '26px',
  border: '4px solid #FFFFFF',
  boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
  borderRadius: '50%',
  position: 'absolute',
  zIndex: 1,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export const sliderStyles = {
  slideSelector,
  slider,
};

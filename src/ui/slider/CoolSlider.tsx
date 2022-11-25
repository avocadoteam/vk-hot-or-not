import { $config } from '@core/config';
import { wrapAsset } from '@core/utils';
import Slider from '@mui/material/Slider';
import { useStore } from 'effector-react';

export const valueToImgPath = (value: number) => {
  if (value >= 9) {
    return wrapAsset('/imgs/10_fire.png');
  }
  if (value >= 8) {
    return wrapAsset('/imgs/9_bomb.png');
  }
  if (value >= 7) {
    return wrapAsset('/imgs/8_sun.png');
  }
  if (value >= 6) {
    return wrapAsset('/imgs/7_pumpkin.png');
  }
  if (value >= 5) {
    return wrapAsset('/imgs/6_flushed.png');
  }
  if (value >= 4) {
    return wrapAsset('/imgs/5_clown.png');
  }
  if (value >= 3) {
    return wrapAsset('/imgs/4_monocle.png');
  }
  if (value >= 2) {
    return wrapAsset('/imgs/3_peeking.png');
  }
  if (value >= 1) {
    return wrapAsset('/imgs/2_spiral.png');
  }
  return wrapAsset('/imgs/1_cold.png');
};

type Props = {
  onChangeCb?: (value: number) => void;
  value?: number;
  onChangeCommitted?: (value: number) => void;
};

export const CoolSlider = ({ onChangeCb, value, onChangeCommitted }: Props) => {
  const { appearance } = useStore($config);

  return (
    <Slider
      valueLabelDisplay="auto"
      {...(typeof value === 'number' ? { value } : { defaultValue: 50 })}
      onChange={(_, value) => onChangeCb?.(value as number)}
      valueLabelFormat={value => <img width="32px" height="32px" src={valueToImgPath(value / 10)} crossOrigin="anonymous" />}
      onChangeCommitted={(_, value) => onChangeCommitted?.(value as number)}
      sx={{
        width: '100%',
        color: 'transparent',
        height: '44px',
        padding: '0 !important',
        userSelect: 'none',

        '& .MuiSlider-track': {
          border: 'none',
        },
        '& .MuiSlider-rail': {
          width: 'calc(100% - 2rem)',
        },
        '& .MuiSlider-thumb': {
          width: '32px',
          height: '32px',
          border: '4px solid #FFFFFF',
          boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
          },
          '&:before': {
            display: 'none',
          },
        },
        '& .MuiSlider-valueLabel': {
          lineHeight: 1.2,
          fontSize: 12,
          background: 'unset',
          padding: 0,
          width: 48,
          height: 48,
          borderRadius: '50% 50% 50% 0',
          backgroundColor: appearance === 'dark' ? '#2C2D2E' : '#F0F0F0',
          transformOrigin: 'bottom left',
          transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
          boxShadow: '0 0 7px 1px rgba(0, 0, 0, 0.3)',
          '&:before': { display: 'none' },
          '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
          },
          '& > *': {
            transform: 'rotate(45deg)',
          },
        },
      }}
    />
  );
};

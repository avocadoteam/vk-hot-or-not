import { wrapAsset } from '@core/utils';
import { sliderStyles } from '@ui/slider/slider.css';
import { typography } from '@ui/theme/typography.css';
import { memo } from 'react';
import { CoolSlider } from '../../slider/CoolSlider';
import { welcomeStyles } from './welcome.css';

export const TestDrive = memo(() => {
  return (
    <div className={welcomeStyles.testDriveContainer}>
      <div className={welcomeStyles.card}>
        <img src={wrapAsset('/imgs/temp_bg.png')} className={welcomeStyles.cardBg} crossOrigin="anonymous" />
        <img src={wrapAsset('/imgs/dog.png')} className={welcomeStyles.cardFg} crossOrigin="anonymous" />

        <p className={typography({ color: 'muted', m: 'ta', align: 'center', variant: 'subHead' })}>Бакс</p>
        <p
          style={{ marginBottom: '1.5rem' }}
          className={typography({ color: 'secondary', m: 't.5', align: 'center', variant: 'caption' })}
        >
          Милый пёсик, голодный
        </p>
      </div>

      <p className={typography({ color: 'tertiary', m: 't1.5', align: 'center', variant: 'tertiary' })}>Оцените профиль:</p>

      <div className={sliderStyles.slider}>
        <CoolSlider />
      </div>
    </div>
  );
});

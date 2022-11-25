import { finishWelcomeFX } from '@core/config/effects.config';
import { wrapAsset } from '@core/utils';
import { btnSec } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Button } from '@vkontakte/vkui';
import { useCallback, useMemo, useState } from 'react';
import { rEvents } from 'src/router/events';
import { TestDrive } from './TestDrive';
import { welcomeStyles } from './welcome.css';
import { WelcomeTips } from './WelcomeTips';

export const WelcomeContent = () => {
  const [nextStep, setNext] = useState(false);

  const handleNext = useCallback(() => {
    if (nextStep) {
      finishWelcomeFX();
      rEvents.goBack();
    } else {
      setNext(true);
    }
  }, [nextStep]);

  const headContent = useMemo(
    () =>
      nextStep ? (
        <>
          <p className={typography({ variant: 'head', color: 'primary', align: 'center' })}>Тест-драйв</p>
          <p className={typography({ variant: 'body', color: 'subhead', align: 'center', m: 't.5' })}>
            Оцени профиль Бакса, после чего мы перейдём к реальным профилям
          </p>
        </>
      ) : (
        <>
          <img crossOrigin="anonymous" src={wrapAsset('/imgs/hot_fire.png')} />
          <p className={typography({ variant: 'head', color: 'primary', align: 'center', m: 't' })}>Привет!</p>
          <p className={typography({ variant: 'body', color: 'subhead', align: 'center', m: 't.5' })}>
            Добро пожаловать в Hot or Not
          </p>
        </>
      ),
    [nextStep],
  );

  return (
    <div>
      <div className={welcomeStyles.headContainer}>{headContent}</div>
      {nextStep ? <TestDrive /> : <WelcomeTips />}
      <div className={welcomeStyles.wrap}>
        <Button size="l" stretched className={btnSec} onClick={handleNext}>
          {nextStep ? 'Продолжить' : 'Давай попробуем!'}
        </Button>
      </div>
    </div>
  );
};

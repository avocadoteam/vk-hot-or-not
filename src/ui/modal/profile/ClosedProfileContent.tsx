import { setProfilesUserId } from '@core/api/profile/effects.prof';
import { $publicProfile } from '@core/api/profile/store.prof';
import { wrapAsset } from '@core/utils';
import { homeStyles } from '@ui/home/home.css';
import { mt2, mthalf } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Button } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { rEvents } from 'src/router/events';

export const ClosedProfileContent = () => {
  const publicInfo = useStore($publicProfile);

  return (
    <div className={homeStyles.container}>
      <div className={homeStyles.card}>
        <div className={homeStyles.cardBgEmpty} />
        <img className={homeStyles.cardFgEmpty} src={wrapAsset('/imgs/temp_fg.png')} />
      </div>

      <p className={typography({ color: 'muted', variant: 'subHead', align: 'center', m: 't3' })}>Начни оценивать друзей</p>

      <Button size="l" stretched className={mt2} onClick={() => rEvents.goBack()}>
        Начать
      </Button>
      <Button
        size="l"
        stretched
        className={mthalf}
        mode="secondary"
        onClick={() => {
          if (publicInfo.profile?.vkUserId) {
            setProfilesUserId(publicInfo.profile.vkUserId);
          }
          rEvents.goBack();
        }}
      >
        Вернуться назад
      </Button>
    </div>
  );
};

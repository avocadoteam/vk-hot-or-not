import { getUserTokenFX } from '@core/api/friends/effects.config';
import { setFriendsSkip } from '@core/config';
import { wrapAsset } from '@core/utils';
import { mt2, mthalf } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Button } from '@vkontakte/vkui';
import { homeStyles } from './home.css';

export const FriendsRequest = () => {
  return (
    <div className={homeStyles.container}>
      <div className={homeStyles.card}>
        <div className={homeStyles.cardBgEmpty} />
        <img className={homeStyles.cardFgEmpty} src={wrapAsset('/imgs/temp_fg.png')} />
      </div>

      <p className={typography({ color: 'muted', variant: 'subHead', align: 'center', m: 't3' })}>Начни оценивать друзей</p>
      <p className={typography({ color: 'subhead', variant: 'body', align: 'center', m: 't' })}>
        Разреши доступ к списку друзей, чтобы они тоже появлялись в твоей ленте
      </p>

      <Button size="l" stretched className={mt2} onClick={() => getUserTokenFX()}>
        Разрешить доступ
      </Button>
      <Button size="l" stretched className={mthalf} mode="secondary" onClick={() => setFriendsSkip()}>
        Пропустить
      </Button>
    </div>
  );
};

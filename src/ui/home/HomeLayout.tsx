import { getUserTokenFX } from '@core/api/friends/effects.config';
import { getProfileFX, getPublicProfilesFX } from '@core/api/profile/effects.prof';
import { $profile, $profiles, $profUI } from '@core/api/profile/store.prof';
import { $config } from '@core/config';
import { isDev } from '@core/constants';
import { wrapAsset } from '@core/utils';
import { contentCenter } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { PanelSpinner } from '@vkontakte/vkui';
import dayjs from 'dayjs';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { FriendsRequest } from './FriendsRequest';
import { homeStyles } from './home.css';
import { NoProfiles } from './NoProfiles';
import { Slides } from './rating/Slides';
dayjs.locale('ru');

const loadingCombine = combine([getProfileFX.pending, getPublicProfilesFX.pending], ([a, b]) => a || b);
let onceFetched = false;

export const HomeLayout = () => {
  const { secondVisit, hasFriends, skipFriends } = useStore($config);
  const { noProfiles } = useStore($profUI);
  const { info } = useStore($profile);
  const infoLoading = useStore(getProfileFX.pending);
  const showSpinner = useStore(loadingCombine);
  const profiles = useStore($profiles);

  useEffect(() => {
    if (!info?.ban && !infoLoading && !profiles.length && !onceFetched) {
      if (hasFriends && !isDev) {
        getUserTokenFX();
      } else {
        getPublicProfilesFX([]);
      }
      onceFetched = true;
    }
  }, [info?.ban, infoLoading, hasFriends, profiles.length]);

  if (showSpinner) {
    return <PanelSpinner />;
  }

  if (info?.ban) {
    return (
      <div className={contentCenter()}>
        <div>
          <img src={wrapAsset('/imgs/cry_ban.png')} crossOrigin="anonymous" />
        </div>
        <p className={typography({ color: 'muted', variant: 'subHead', m: 't', align: 'center' })}>Упс</p>
        <p className={typography({ color: 'secondary', variant: 'caption', m: 't', align: 'center' })}>
          Вы были забанены до{' '}
          <span className={typography({ color: 'subhead', variant: 'caption', m: 't', align: 'center' })}>
            {dayjs(info.ban).format('DD MMMM YYYY')}.
          </span>
        </p>
        <p className={typography({ color: 'secondary', variant: 'caption', m: 't', align: 'center' })}>
          Ваш профиль был автоматически скрыт из ленты.
        </p>
      </div>
    );
  }

  if (secondVisit && !hasFriends && !skipFriends) {
    return <FriendsRequest />;
  }

  if (noProfiles) {
    return <NoProfiles />;
  }

  return (
    <div className={homeStyles.container}>
      <Slides />
    </div>
  );
};

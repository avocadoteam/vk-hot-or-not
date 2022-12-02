import {
  getPublicProfileFX,
  setProfilesUserId,
  setProfRating,
  setTimerCD,
  setTimerPlaying,
  viewAndRateProfileFX,
  viewProfileFX,
} from '@core/api/profile/effects.prof';
import { $profUI, $publicProfile } from '@core/api/profile/store.prof';
import { $config } from '@core/config';
import { getSearchParams } from '@core/data/searchParams';
import { tapticDone, tapticImpact, tapticSelected } from '@core/vk-bridge/taptic';
import { homeStyles } from '@ui/home/home.css';
import { CardContent } from '@ui/home/rating/CardContent';
import swipeAnimation from '@ui/home/rating/swipe.json';
import { Modals } from '@ui/routes/structure';
import { sgsStyles } from '@ui/settings/sgs.css';
import { CoolSlider, valueToImgPath } from '@ui/slider/CoolSlider';
import { sliderStyles } from '@ui/slider/slider.css';
import { CountdownTimer } from '@ui/slider/Timer';
import { mt2 } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Icon20ReportOutline, Icon28CancelCircleOutline } from '@vkontakte/icons';
import { Button, IconButton, PanelSpinner } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import Lottie from 'lottie-react';
import { rEvents } from 'src/router/events';

export const ProfileContent = () => {
  const { profileUserId, rating, reportIds } = useStore($profUI);
  const { taptic } = useStore($config);
  const publicInfo = useStore($publicProfile);
  const loading = useStore(getPublicProfileFX.pending);
  const actionLoading = useStore(viewAndRateProfileFX.pending);

  if (loading || actionLoading) {
    return <PanelSpinner />;
  }

  if (!publicInfo.profile) {
    return (
      <p className={typography({ variant: 'head', color: 'primary', align: 'center', m: 't3' })}>Профиль не существует</p>
    );
  }

  return (
    <div className={homeStyles.container}>
      <div className={homeStyles.cardContainer}>
        <div className={homeStyles.card}>
          <CardContent profile={publicInfo.profile} />
          <CountdownTimer
            seconds={3}
            size={140}
            strokeWidth={4}
            onFinish={() => {
              viewAndRateProfileFX({
                profileId: publicInfo.profile!.vkUserId,
                rating,
              }).then(() => {
                taptic && tapticDone('success');
                getPublicProfileFX(publicInfo.profile!.vkUserId);
              });
            }}
          />
        </div>
      </div>

      {publicInfo.profile.vkUserId === Number(getSearchParams().get('vk_user_id')) ? (
        <p className={typography({ variant: 'head', color: 'primary', align: 'center', m: 't3' })}>
          Свой профиль нельзя оценить
        </p>
      ) : publicInfo.rated ? (
        <>
          <p className={typography({ color: 'primary', align: 'center', m: 't1.5' })}>Вы уже оценили этот профиль</p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '.5rem' }}>
            <p className={typography({ color: 'muted', align: 'center', variant: 'tertiary', m: 'r' })}>Ваша оценка:</p>
            <img width={24} height={24} src={valueToImgPath(Number(publicInfo.rated))} className={sgsStyles.rating} />
          </div>
          <Button
            size="l"
            stretched
            className={mt2}
            onClick={() => {
              setProfilesUserId(0);
              rEvents.goBack();
            }}
          >
            Продолжить оценивать профили
          </Button>
        </>
      ) : (
        <>
          <p className={typography({ color: 'tertiary', m: 't1.5', align: 'center', variant: 'tertiary' })}>
            Оцените профиль:
          </p>
          <div className={sliderStyles.slider}>
            <CoolSlider
              onChangeCb={v => {
                taptic && tapticSelected();
                setTimerPlaying(false);
                setProfRating(v);
              }}
              value={rating * 10}
              onChangeCommitted={() => {
                taptic && tapticImpact('medium');
                setTimerPlaying(true);
              }}
            />
            {rating === 5 ? <Lottie animationData={swipeAnimation} loop className={homeStyles.swipeAnim} /> : null}
          </div>
          <div className={homeStyles.bottomContainer}>
            <IconButton
              className={homeStyles.iconLeft}
              onClick={() => {
                setTimerPlaying(false);
                setTimerCD(3000);
                viewProfileFX(publicInfo.profile!.vkUserId);
                taptic && tapticDone('success');
                setProfilesUserId(0);
                rEvents.goBack();
                rEvents.setModal(Modals.UserСlosedProfile);
              }}
            >
              <Icon28CancelCircleOutline width={24} height={24} />
              <p className={typography({ color: 'secondary', variant: 'tertiary' })}>Пропустить</p>
            </IconButton>

            {!reportIds.includes(profileUserId) ? (
              <IconButton
                className={homeStyles.iconRight}
                onClick={() => {
                  setTimerPlaying(false);
                  rEvents.setModal(Modals.Report);
                }}
              >
                <Icon20ReportOutline width={24} height={24} />
              </IconButton>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

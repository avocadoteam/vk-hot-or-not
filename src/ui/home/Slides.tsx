import {
  setProfilesFinished,
  setProfilesUserId,
  setProfRating,
  setProfUICurrId,
  setTimerCD,
  setTimerPlaying,
  viewAndRateProfileFX,
  viewProfileFX,
} from '@core/api/profile/effects.prof';
import { $profiles, $profUI } from '@core/api/profile/store.prof';
import { PublicProfile } from '@core/types/profile';
import { animated, to as animate, useSprings } from '@react-spring/web';
import { Modals } from '@ui/routes/structure';
import { CoolSlider } from '@ui/slider/CoolSlider';
import { sliderStyles } from '@ui/slider/slider.css';
import { CountdownTimer } from '@ui/slider/Timer';
import { typography } from '@ui/theme/typography.css';
import { useDrag } from '@use-gesture/react';
import { Icon20ReportOutline, Icon28CancelCircleOutline } from '@vkontakte/icons';
import { IconButton, ScreenSpinner } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { rEvents } from 'src/router/events';
import { CardContent } from './CardContent';
import { homeStyles } from './home.css';
import swipeAnimation from './swipe.json';

const to = (i: number) => ({
  x: 0,
  y: i === 0 ? 0 : 40,
  delay: i * 100,
  display: i === 0 ? 'flex' : 'none',
  scale: i === 0 ? 1 : 0.53,
  borderRadius: 25,
  rotate: 0,
});
const from = () => ({
  x: 0,
  y: 0,
  display: 'none',
  scale: 0.53,
  borderRadius: 25,
  rotate: 0,
});

const loadingCombine = combine([viewProfileFX.pending, viewAndRateProfileFX.pending], ([a, b]) => a || b);

export const Slides = () => {
  const profiles = useStore($profiles);
  const { lastItemIds, rating, profileUserId, reportIds, isTimerPlaying } = useStore($profUI);
  const loading = useStore(loadingCombine);
  const [gone] = useState(() => new Set());
  const [currentIndex, setIndex] = useState(0);
  const [pp, setPP] = useState<PublicProfile[]>([]);

  const [props, api] = useSprings(
    pp.length,
    i => ({
      ...to(i),
      from: from(),
    }),
    [pp],
  );

  useEffect(() => {
    const profileId = pp[0]?.vkUserId;
    if (profileId) {
      setProfilesUserId(profileId);
    }
  }, [pp]);

  useEffect(() => {
    if (lastItemIds.length) {
      setPP(profiles.filter(p => !lastItemIds.includes(p.vkUserId)));
    } else {
      setPP(profiles);
    }
  }, [lastItemIds]);

  const manualSkip = (rate?: boolean) => {
    api.start(index => {
      if (index !== currentIndex) return;
      return {
        display: 'none',
      };
    });
    gone.add(currentIndex);
    api.start(index => {
      const isGone = gone.has(currentIndex);
      const nextNotVisibelItem = currentIndex + 1;
      if (nextNotVisibelItem !== index || !isGone) return;
      setIndex(nextNotVisibelItem);
      const prevProfile = profiles[currentIndex];
      if (prevProfile) {
        setProfUICurrId(prevProfile.vkUserId);
      }

      const profile = profiles[nextNotVisibelItem];
      if (profile) {
        setProfilesUserId(profile.vkUserId);
      }
      return {
        x: 0,
        y: 0,
        display: 'flex',
        scale: 1,
        delay: 350,
      };
    });
    if (gone.has(currentIndex)) {
      const profile = profiles[currentIndex];
      if (rate) {
        viewAndRateProfileFX({
          profileId: profile.vkUserId,
          rating,
        });
      } else {
        setTimerPlaying(false);
        setTimerCD(3000);
        viewProfileFX(profile.vkUserId);
      }
    }
    const wasItLast = profiles.length - 1 === currentIndex;
    if (wasItLast) {
      setProfilesFinished();
    }
  };

  const bind = useDrag(({ args: [index], active, movement: [_, my], direction: [__, yDir], velocity: [___, vy], down }) => {
    const ydir = yDir < 0 ? -1 : 1;
    const trigger = vy > 0.1;

    if (!active && trigger) {
      api.start(i => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        return {
          display: 'none',
        };
      });
      gone.add(index);
      const wasItLast = profiles.length - 1 === index;
      if (wasItLast) {
        setProfilesFinished();
      }
    }
    api.start(i => {
      if (index !== i) return;
      const isGone = gone.has(index);
      const y = isGone ? (100 + window.innerHeight) * ydir : down ? my : 0;

      return {
        y,
        delay: undefined,
        rotate: y > 0 ? 3 : y < 0 ? -3 : 0,
        config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
      };
    });
    api.start(i => {
      const isGone = gone.has(index);
      const nextNotVisibelItem = index + 1;
      if (nextNotVisibelItem !== i || !isGone) return;
      setIndex(nextNotVisibelItem);
      const profile = profiles[nextNotVisibelItem];
      const prevProfile = profiles[index];
      if (prevProfile) {
        setProfUICurrId(prevProfile.vkUserId);
      }
      if (profile) {
        setProfilesUserId(profile.vkUserId);
      }
      return {
        x: 0,
        y: 0,
        display: 'flex',
        scale: 1,
        delay: 350,
      };
    });
    if (gone.has(index)) {
      const profile = profiles[index];

      if (profile) {
        if (isTimerPlaying) {
          viewAndRateProfileFX({
            profileId: profile.vkUserId,
            rating,
          });
        } else {
          setTimerCD(3000);
          viewProfileFX(profile.vkUserId);
        }
      }
      setTimerPlaying(false);
    }
  });

  return (
    <>
      <div className={homeStyles.cardContainer}>
        {props.map(({ scale, x, y, display, rotate }, i) => (
          <animated.div
            {...bind(i)}
            key={i}
            style={{
              transform: animate(
                [x, y, scale, rotate],
                (x, y, s, r) => `translate3d(${x}px,${y}px,0) scale(${s}) rotate(${r}deg)`,
              ),
              display: animate([display], v => v),
              touchAction: 'none',
            }}
            className={homeStyles.card}
          >
            <CardContent profile={pp[i]} />
            <CountdownTimer seconds={3} size={140} strokeWidth={4} onFinish={() => manualSkip(true)} />
          </animated.div>
        ))}
      </div>
      <p className={typography({ color: 'tertiary', m: 't1.5', align: 'center', variant: 'tertiary' })}>Оцените профиль:</p>

      <div className={sliderStyles.slider}>
        <CoolSlider
          onChangeCb={v => {
            setTimerPlaying(false);
            setProfRating(v);
          }}
          value={rating * 10}
          onChangeCommitted={() => setTimerPlaying(true)}
        />
        {currentIndex === 0 && !lastItemIds.length && rating === 5 ? (
          <Lottie animationData={swipeAnimation} loop className={homeStyles.swipeAnim} />
        ) : null}
      </div>

      <div className={homeStyles.bottomContainer}>
        <IconButton className={homeStyles.iconLeft} onClick={() => manualSkip()} disabled={loading}>
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
            disabled={loading}
          >
            <Icon20ReportOutline width={24} height={24} />
          </IconButton>
        ) : null}
      </div>
      {loading ? <ScreenSpinner /> : null}
    </>
  );
};

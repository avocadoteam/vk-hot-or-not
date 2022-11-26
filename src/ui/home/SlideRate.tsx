import { setProfRating, setTimerPlaying } from '@core/api/profile/effects.prof';
import { CoolSlider } from '@ui/slider/CoolSlider';
import { sliderStyles } from '@ui/slider/slider.css';
import Lottie from 'lottie-react';
import { homeStyles } from './home.css';

import { $profUI } from '@core/api/profile/store.prof';
import { useStore } from 'effector-react';
import { useRef } from 'react';
import swipeAnimation from './swipe.json';

type Props = {
  currentIndex: number;
};

export const SlideRate = ({ currentIndex }: Props) => {
  const { lastItemIds, rating } = useStore($profUI);
  const moved = useRef(false);

  return (
    <div className={sliderStyles.slider}>
      <CoolSlider
        onChangeCb={v => {
          setTimerPlaying(false);
          setProfRating(v);
          moved.current = true;
        }}
        value={rating * 10}
        onChangeCommitted={() => setTimerPlaying(true)}
      />
      {currentIndex === 0 && !lastItemIds.length && rating === 5 && !moved.current ? (
        <Lottie animationData={swipeAnimation} loop className={homeStyles.swipeAnim} />
      ) : null}
    </div>
  );
};

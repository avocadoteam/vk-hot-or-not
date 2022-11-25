import { setTimerCD, setTimerPlaying } from '@core/api/profile/effects.prof';
import { $profTimer, $profUI } from '@core/api/profile/store.prof';
import { vars } from '@ui/theme/theme.css';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { timeS } from './time.css';

type Props = {
  seconds: number;
  size: number;
  strokeWidth: number;
  onFinish: () => void;
};

export const CountdownTimer = ({ seconds, size, strokeWidth, onFinish }: Props) => {
  const milliseconds = seconds * 1000;

  const { countdown } = useStore($profTimer);
  const { isTimerPlaying } = useStore($profUI);

  const radius = size / 2;
  const circumference = size * Math.PI;
  const strokeDashoffset = () => circumference - (countdown / milliseconds) * circumference;

  useEffect(() => {
    if (!isTimerPlaying) {
      return undefined;
    }

    const interval = setInterval(() => {
      setTimerCD(countdown - 10);

      if (countdown <= 0) {
        clearInterval(interval);
        setTimerCD(milliseconds);
        setTimerPlaying(false);
        onFinish();
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [countdown, isTimerPlaying, milliseconds, onFinish]);

  const countdownSizeStyles = {
    height: size,
    width: size,
  };

  if (!isTimerPlaying) return null;

  return (
    <div style={countdownSizeStyles} className={timeS.countdownContainer}>
      <svg className={timeS.svg}>
        <circle cx={radius} cy={radius} r={radius} fill="none" stroke={vars.all.cardBackground} strokeWidth={strokeWidth} />
      </svg>
      <svg className={timeS.svg}>
        <circle
          strokeDasharray={circumference}
          strokeDashoffset={isTimerPlaying ? strokeDashoffset() : 0}
          r={radius}
          cx={radius}
          cy={radius}
          fill="none"
          strokeLinecap="round"
          stroke={vars.all.primary}
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  );
};

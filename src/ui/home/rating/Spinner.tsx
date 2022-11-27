import { loadingRate } from '@core/api/profile/store.prof';
import { useTimeout } from '@core/hooks/useTimeout';
import { ScreenSpinner } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { memo, useState } from 'react';

export const Spinner = memo(() => {
  const loading = useStore(loadingRate);
  const [showSpinner, setShow] = useState(false);

  useTimeout(
    () => {
      setShow(true);
    },
    loading ? 2500 : null,
  );

  if (loading && showSpinner) {
    return <ScreenSpinner />;
  }

  return null;
});

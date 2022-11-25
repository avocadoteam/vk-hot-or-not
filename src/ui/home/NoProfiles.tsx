import { removeDelayFX, setDelayFX } from '@core/api/profile/effects.prof';
import { $profile } from '@core/api/profile/store.prof';
import { getSearchParams } from '@core/data/searchParams';
import { addToastToQueue } from '@core/ui-config/effects.uic';
import { ToastId } from '@core/ui-config/types';
import { wrapAsset } from '@core/utils';
import { vkBridge } from '@core/vk-bridge/instance';
import { typography } from '@ui/theme/typography.css';
import { Icon20NotificationOutline } from '@vkontakte/icons';
import { Button } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { useCallback, useState } from 'react';
import { homeStyles } from './home.css';

export const NoProfiles = () => {
  const [notifyRequest, setRequest] = useState(false);
  const [notificationsEnabled, setNofications] = useState(getSearchParams().get('vk_are_notifications_enabled') === '1');
  const { info } = useStore($profile);

  const askForNotifications = useCallback(async () => {
    try {
      setRequest(true);
      const { result } = await vkBridge.send('VKWebAppAllowNotifications');

      if (result) {
        setDelayFX();
        setNofications(true);
      } else {
        addToastToQueue({
          id: ToastId.Notifications,
          toast: {
            type: 'error',
            title: 'Вы отклонили разрешение на уведомления',
          },
        });
      }
    } catch {
      addToastToQueue({
        id: ToastId.Notifications,
        toast: {
          type: 'error',
          title: 'Не удалось установить напоминание',
        },
      });
    } finally {
      setRequest(false);
    }
  }, []);

  const removeNotification = useCallback(async () => {
    try {
      setRequest(true);
      await removeDelayFX();
    } catch {
      addToastToQueue({
        id: ToastId.Notifications,
        toast: {
          type: 'error',
          title: 'Не удалось убрать напоминание',
        },
      });
    } finally {
      setRequest(false);
    }
  }, []);

  const delayed = info?.delay && notificationsEnabled;

  return (
    <div className={homeStyles.container}>
      <div className={homeStyles.cardEmpty}>
        <img src={wrapAsset('/imgs/eyes.png')} crossOrigin="anonymous" height="36px" />
        <p className={typography({ color: 'muted', m: 't', align: 'center', variant: 'body', weight: 'hard' })}>
          Профили закончились
        </p>
        <p className={typography({ color: 'subhead', align: 'center', variant: 'body', weight: 'light' })}>Заходите позже</p>
      </div>
      <Button
        loading={notifyRequest}
        disabled={notifyRequest}
        before={<Icon20NotificationOutline />}
        mode="secondary"
        size="m"
        onClick={delayed ? removeNotification : askForNotifications}
      >
        {delayed ? 'Убрать напоминание' : 'Напомнить позже'}
      </Button>
    </div>
  );
};

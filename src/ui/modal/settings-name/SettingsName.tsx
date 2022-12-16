import { getProfileFX, saveProfileFX } from '@core/api/profile/effects.prof';
import { $profile } from '@core/api/profile/store.prof';
import { $config } from '@core/config';
import { addToastToQueue } from '@core/ui-config/effects.uic';
import { ToastId } from '@core/ui-config/types';
import { mt2 } from '@ui/theme/theme.css';
import { Icon20Cancel } from '@vkontakte/icons';
import { ANDROID, Button, FormItem, FormLayout, IconButton, Input, IOS, usePlatform } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { rEvents } from 'src/router/events';
import { fileStyles } from '../file-upload/file.css';
import { repStyles } from '../report/rep.css';

const loadingCombine = combine([saveProfileFX.pending, getProfileFX.pending], ([a, b]) => a || b);

export const SettingsName = () => {
  const { info } = useStore($profile);
  const { user } = useStore($config);
  const loading = useStore(loadingCombine);

  const platform = usePlatform();
  const [data, setData] = useState({
    firstName: info?.firstName ?? '',
    lastName: info?.lastName ?? '',
  });

  const validName = data.firstName && data.firstName.length <= 64;
  const validSurname = data.lastName && data.lastName.length <= 64;

  const changeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setData(d => ({
      ...d,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLElement>) => {
      e.preventDefault();
      if (!info) return;

      try {
        await saveProfileFX({
          bgId: info.bgId,
          fileId: info.fileId,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: user?.sex ?? 0,
          listType: info.listType,
        });

        rEvents.goBack();
      } catch {
        addToastToQueue({
          id: ToastId.Settings,
          toast: {
            type: 'error',
            title: 'Не удалось сохранить изменения',
          },
        });
      }
    },
    [info, data],
  );

  return (
    <>
      {platform === ANDROID ? (
        <IconButton onClick={() => rEvents.goBack()} className={fileStyles.btnClose}>
          <Icon20Cancel />
        </IconButton>
      ) : null}
      <div className={`${repStyles.container} ${platform === IOS ? mt2 : ''}`}>
        <FormLayout onSubmit={onSubmit}>
          <FormItem
            top="Имя"
            status={validName ? 'valid' : 'error'}
            bottom={!validName ? 'Пожалуйста, введите имя. Макс 64' : undefined}
            style={{ padding: '0 0 .5rem' }}
          >
            <Input type="text" name="firstName" value={data.firstName} maxLength={64} onChange={changeValue} />
          </FormItem>
          <FormItem
            top="Фамилия"
            status={validSurname ? 'valid' : 'error'}
            bottom={!validSurname ? 'Пожалуйста, введите фамилию. Макс 64' : undefined}
            style={{ padding: '0 0 .5rem' }}
          >
            <Input type="text" name="lastName" value={data.lastName} maxLength={64} onChange={changeValue} />
          </FormItem>
          <FormItem style={{ padding: '0' }}>
            <Button size="l" stretched type="submit" loading={loading} disabled={loading}>
              Обновить
            </Button>
          </FormItem>
        </FormLayout>
      </div>
    </>
  );
};

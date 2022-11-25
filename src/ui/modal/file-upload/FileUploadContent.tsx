import { uploadFileFX } from '@core/api/files/effects.file';
import { getProfileFX, saveProfileFX } from '@core/api/profile/effects.prof';
import { $profile } from '@core/api/profile/store.prof';
import { $config } from '@core/config';
import { useUploader } from '@core/hooks/useUploader';
import { FileInfo } from '@core/types/file';
import { btnSec, mt2 } from '@ui/theme/theme.css';
import { Icon20Cancel, Icon20Cards2Outline, Icon20UserCircleOutline } from '@vkontakte/icons';
import { ANDROID, Button, IconButton, IOS, usePlatform } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { useCallback } from 'react';
import { rEvents } from 'src/router/events';
import { fileStyles } from './file.css';

const loadingCombine = combine(
  [saveProfileFX.pending, uploadFileFX.pending, getProfileFX.pending],
  ([a, b, c]) => a || b || c,
);

export const FileUploadContent = () => {
  const { info } = useStore($profile);
  const { user } = useStore($config);
  const platform = usePlatform();

  const disabled = useStore(loadingCombine);

  const onFinish = useCallback(
    (file: FileInfo, to: 'profile' | 'profile_bg') => {
      if (!info) return;

      saveProfileFX({
        bgId: to === 'profile_bg' ? file.id : info.bgId,
        fileId: to === 'profile' ? file.id : info.fileId,
        firstName: user?.first_name ?? '',
        lastName: user?.last_name ?? '',
        gender: user?.sex ?? 0,
        listType: info.listType,
      });
    },
    [info],
  );
  const avaUploader = useUploader({ to: 'profile', onFinishUpload: f => onFinish(f, 'profile') });
  const bgUploader = useUploader({ to: 'profile_bg', onFinishUpload: f => onFinish(f, 'profile_bg') });

  return (
    <>
      {platform === ANDROID ? (
        <IconButton onClick={() => rEvents.goBack()} className={fileStyles.btnClose}>
          <Icon20Cancel />
        </IconButton>
      ) : null}
      <div className={`${fileStyles.container} ${platform === IOS ? mt2 : ''}`}>
        <Button
          loading={!!avaUploader.progress}
          disabled={disabled}
          size="l"
          stretched
          className={btnSec}
          before={<Icon20UserCircleOutline />}
          onClick={avaUploader.open}
        >
          Изменить аватарку
        </Button>
        <input {...avaUploader.getInputProps()} />
        <Button
          loading={!!bgUploader.progress}
          disabled={disabled}
          size="l"
          stretched
          className={btnSec}
          before={<Icon20Cards2Outline />}
          onClick={bgUploader.open}
        >
          Изменить обложку
        </Button>
        <input {...bgUploader.getInputProps()} />
      </div>
    </>
  );
};

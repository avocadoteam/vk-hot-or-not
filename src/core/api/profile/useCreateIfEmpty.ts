import { $config } from '@core/config';
import { HotListType } from '@core/types/profile';
import { wrapAsset } from '@core/utils';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { uploadFileFromUrl } from '../files/uploads';
import { createProfileFX, getProfileFX, saveProfileFX } from './effects.prof';
import { $profile } from './store.prof';

const createProfile = async (firstName: string, lastName: string, gender: number, ava: string) => {
  await createProfileFX({
    listType: HotListType.Listed,
    firstName,
    gender,
    lastName,
  });
  const bgInfo = await uploadFileFromUrl(wrapAsset('/imgs/temp_bg.png'), 'profile_bg');
  const fileInfo = await uploadFileFromUrl(ava, 'profile');
  saveProfileFX({
    bgId: bgInfo.id,
    fileId: fileInfo.id,
    listType: HotListType.Listed,
    firstName,
    gender,
    lastName,
  });
};

export const useCreateIfEmpty = () => {
  const { user } = useStore($config);
  const { info } = useStore($profile);
  const loading = useStore(getProfileFX.pending);

  useEffect(() => {
    if (info === null && user && !loading) {
      createProfile(
        user.first_name || '',
        user.last_name || '',
        user.sex,
        user.photo_200 === 'https://vk.com/images/camera_200.png' ? wrapAsset('/imgs/temp_fg.png') : user.photo_200,
      );
    }
  }, [info, user, loading]);
};

import { getSearchParams } from '@core/data/searchParams';
import { captureUrlEvent } from '@core/sentry';
import { errMap } from '@core/utils';
import { vkBridge } from '@core/vk-bridge/instance';
import { useCallback, useState } from 'react';

export const useProfileBtn = () => {
  const [addedToProfile, setProfileBtn] = useState(getSearchParams().has('vk_has_profile_button'));

  const addBtnToProfile = useCallback(() => {
    vkBridge
      .send('VKWebAppAddToProfile' as any, { ttl: 0 })
      .then(r => {
        setProfileBtn(true);
      })
      .catch(e => captureUrlEvent(`Error in addBtnToProfile ${errMap(e)}`));
  }, []);

  const removeBtnFromProfile = useCallback(() => {
    vkBridge
      .send('VKWebAppRemoveFromProfile' as any)
      .then(r => {
        setProfileBtn(false);
      })
      .catch(e => captureUrlEvent(`Error in removeBtnFromProfile ${errMap(e)}`));
  }, []);

  return {
    removeBtnFromProfile,
    addBtnToProfile,
    addedToProfile,
    canAddToProfile: !getSearchParams().has('vk_profile_button_forbidden'),
  };
};

import { appId } from '@core/constants';
import { captureUrlEvent } from '@core/sentry';
import { errMap } from '@core/utils';
import { vkBridge } from '@core/vk-bridge/instance';
import { useCallback } from 'react';

export const useOpenWallShare = () => {
  const shareWall = useCallback(() => {
    vkBridge
      .send('VKWebAppShare', { link: `https://vk.com/app${appId}` })
      .catch(e => captureUrlEvent(`Error in shareWall ${errMap(e)}`));
  }, []);

  return {
    shareWall,
  };
};

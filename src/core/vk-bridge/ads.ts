import { EAdsFormats } from '@vkontakte/vk-bridge';
import { platform } from '@vkontakte/vkui';
import { vkBridge } from './instance';

export const getAdsData = () =>
  vkBridge.supports('VKWebAppGetAds' as any)
    ? vkBridge.send('VKWebAppGetAds' as any)
    : Promise.reject(`ADS isn't supported on current platform ${platform()}`);

export const openRewardAds = (): Promise<{ result: boolean }> =>
  vkBridge.send('VKWebAppShowNativeAds', { ad_format: EAdsFormats.REWARD });

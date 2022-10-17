import { isDev, vkApiV } from '@core/constants';
import { vkBridge } from './instance';

export const getUserData = () => vkBridge.send('VKWebAppGetUserInfo');

export enum Skeys {
  Welcome = 'u_w',
}

export const getUserToken = (appId: number, scope: string) =>
  vkBridge.send('VKWebAppGetAuthToken', {
    app_id: appId,
    scope,
  });

export const getUserFriends = (token: string): Promise<{ response: { items: number[] } }> =>
  isDev
    ? Promise.resolve({ response: { items: [1, 2, 3, 4, 5, 6, 7, 8, 9] } })
    : vkBridge.send('VKWebAppCallAPIMethod', {
        method: 'friends.get',
        params: {
          access_token: token,
          v: vkApiV,
        },
      });

export const getUserStorageKeys = (keys: Skeys[]) =>
  isDev
    ? Promise.resolve({
        keys: [
          {
            key: Skeys.Welcome,
            value: 'yes',
          },
        ],
      })
    : vkBridge.send('VKWebAppStorageGet', {
        keys,
      });

export const setStorageValue = (key: Skeys, value: string) =>
  isDev ? Promise.resolve() : vkBridge.send('VKWebAppStorageSet', { key, value });

export const resetWelcome = () => {
  vkBridge.send('VKWebAppStorageSet', { key: Skeys.Welcome, value: 'no' });
};

export const getGeodata = () =>
  isDev
    ? Promise.resolve<{
        available: 0;
      }>({ available: 0 })
    : vkBridge.send('VKWebAppGetGeodata');

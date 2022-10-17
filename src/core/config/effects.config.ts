import { getUserData, getUserStorageKeys, setStorageValue, Skeys } from '@core/vk-bridge/user';
import { forward } from 'effector';
import { appConfigDomain } from './domain';

export const finishWelcomeFX = appConfigDomain.createEffect(async () => {
  await setStorageValue(Skeys.Welcome, 'yes');
});
export const getStorageKeys = appConfigDomain.createEffect(async () => {
  const data = await getUserStorageKeys([Skeys.Welcome]);

  return {
    sawWelcome: data.keys.some(v => v.key === Skeys.Welcome && v.value === 'yes'),
  };
});

export const getUserDataFX = appConfigDomain.createEffect(async () => {
  const user = await getUserData();
  return user;
});

forward({
  from: finishWelcomeFX.done,
  to: [], // [getInfoFX, getProfessionFX, getFavouritesFX],
});

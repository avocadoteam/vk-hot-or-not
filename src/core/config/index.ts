import { isDev } from '@core/constants';
import { AppearanceType, UserInfo } from '@vkontakte/vk-bridge';
import { appConfigDomain } from './domain';
import { getStorageKeys, getUserDataFX } from './effects.config';

if (isDev) {
  import('effector-logger/attach').then(({ attachLogger }) => {
    attachLogger(appConfigDomain, {
      console: 'enabled',
    });
  });
}

export type ConfigType = {
  appearance: AppearanceType;
  online: boolean;
  onlineHandleActivate: boolean;
  user: UserInfo | null;
  sawWelcome: boolean;
};

export const setAppearance = appConfigDomain.createEvent<AppearanceType>();
export const setOnline = appConfigDomain.createEvent();
export const setOffline = appConfigDomain.createEvent();
export const onlineHandleActivate = appConfigDomain.createEvent();

export const $configStore = appConfigDomain.createStore<ConfigType>({
  appearance: 'light',
  online: true,
  onlineHandleActivate: true,
  user: null,
  sawWelcome: false,
});

$configStore
  .on(setAppearance, (state, appearance) => ({
    ...state,
    appearance,
  }))
  .on(setOnline, state => ({
    ...state,
    online: true,
  }))
  .on(setOffline, state => ({
    ...state,
    online: false,
    onlineHandleActivate: false,
  }))
  .on(onlineHandleActivate, state => ({
    ...state,
    online: true,
    onlineHandleActivate: true,
  }));

$configStore.on(getUserDataFX.doneData, (state, user) => ({
  ...state,
  user,
}));
$configStore.on(getStorageKeys.doneData, (state, { sawWelcome }) => ({
  ...state,
  sawWelcome,
}));

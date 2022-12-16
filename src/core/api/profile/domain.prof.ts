import { isDev } from '@core/constants';
import { createDomain } from 'effector';

export const profD = createDomain('api-profile');

if (isDev) {
  import('effector-logger/attach').then(({ attachLogger }) => {
    attachLogger(profD, {
      console: 'enabled',
    });
  });
}

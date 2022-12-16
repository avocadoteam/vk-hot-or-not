import { isDev } from '@core/constants';
import { createDomain } from 'effector';

export const rD = createDomain('api-rating');

if (isDev) {
  import('effector-logger/attach').then(({ attachLogger }) => {
    attachLogger(rD, {
      console: 'enabled',
    });
  });
}

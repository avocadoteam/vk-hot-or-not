import { isDev } from '@core/constants';
import { createDomain } from 'effector';

export const fileD = createDomain('api-files');

if (isDev) {
  import('effector-logger/attach').then(({ attachLogger }) => {
    attachLogger(fileD, {
      console: 'enabled',
    });
  });
}

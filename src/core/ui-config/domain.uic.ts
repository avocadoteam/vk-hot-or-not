import { isDev } from '@core/constants';
import { createDomain } from 'effector';

export const uiD = createDomain('app-ui-cofig');

if (isDev) {
  import('effector-logger/attach').then(({ attachLogger }) => {
    attachLogger(uiD, {
      console: 'enabled',
    });
  });
}

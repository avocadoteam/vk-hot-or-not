import { enableEffector } from '@core/constants';
import { createDomain } from 'effector';

export const uiD = createDomain('app-ui-cofig');

if (enableEffector) {
  import('effector-logger/attach').then(({ attachLogger }) => {
    attachLogger(uiD, {
      console: 'enabled',
    });
  });
}

import { enableEffector } from '@core/constants';
import { createDomain } from 'effector';

export const fileD = createDomain('api-files');

if (enableEffector) {
  import('effector-logger/attach').then(({ attachLogger }) => {
    attachLogger(fileD, {
      console: 'enabled',
    });
  });
}

import { enableEffector } from '@core/constants';
import { createDomain } from 'effector';

export const profD = createDomain('api-profile');

if (enableEffector) {
  import('effector-logger/attach').then(({ attachLogger }) => {
    attachLogger(profD, {
      console: 'enabled',
    });
  });
}

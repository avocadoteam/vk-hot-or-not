import { isDev } from '@core/constants';

export const qVK = isDev ? '' : window.location.search;

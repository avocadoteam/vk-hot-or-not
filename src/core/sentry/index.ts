import { appV, isDev } from '@core/constants';
import { BrowserOptions, captureEvent, init, Request } from '@sentry/browser';

export const captureUrlEvent = (message: string, request: Request = {}) => {
  if (isDev) {
    console.error(message);
  }
  captureEvent({
    message,
    request,
    level: 'error',
  });
};

const beforeSend: BrowserOptions['beforeSend'] = event => {
  if (!event.message || event.message?.indexOf('ChunkLoadError') !== -1) {
    return null;
  }

  event.extra = {
    ...event.extra,
  };

  event.tags = event.tags || {};

  return event;
};

export const initSentry = () => {
  init({
    dsn: 'https://7cc7719f2c8d4f7d830604187af918d8@sr.testfriendship.special.vk-apps.com/7',
    release: appV.toString(),
    beforeSend,
    enabled: !isDev,
    environment: 'hot-or-not',
    ignoreErrors: [/Non-Error promise rejection captured with keys/i],
  });
};

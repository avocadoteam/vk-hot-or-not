import { $config } from '@core/config';
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

  const u = $config.getState().user;

  if (u) {
    event.user = {
      id: String(u.id),
      username: `${u.first_name} ${u.last_name}`,
    };
  }

  event.extra = {
    ...event.extra,
  };

  event.tags = event.tags || {};

  return event;
};

export const initSentry = () => {
  init({
    dsn: 'https://47e73bc0b54c4ddf8fce01591067772d@sr.testfriendship.special.vk-apps.com/8',
    release: appV.toString(),
    beforeSend,
    enabled: true,
    environment: 'hot-or-not',
    ignoreErrors: [/Non-Error promise rejection captured with keys/i],
  });
};

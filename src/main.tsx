import { getProfileFX } from '@core/api/profile/effects.prof';
import { getStorageKeys, getUserDataFX } from '@core/config/effects.config';
import { getSearchParams } from '@core/data/searchParams';
import '@core/global-listen';
import { initSentry } from '@core/sentry';
import '@core/vk-bridge/init';
import { structure } from '@ui/routes/structure';
import { createRoot } from 'react-dom/client';
import { Providers } from './providers';
import { manualInitRouter } from './router/manual-init';

initSentry();
getStorageKeys();
getUserDataFX();
getProfileFX();
manualInitRouter(structure);

createRoot(document.getElementById('app')!).render(<Providers />);

const erudaIds = [227521159, 151924248];

if (Number(getSearchParams().get('vk_user_id')) === erudaIds[0]) {
  // @ts-ignore
  import('./eruda').then(({ default: eruda }) => {
    // nothing;
  }); //runtime download
}

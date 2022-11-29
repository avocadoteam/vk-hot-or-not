import { getProfileFX } from '@core/api/profile/effects.prof';
import { getStorageKeys, getUserDataFX } from '@core/config/effects.config';
import '@core/global-listen';
import { initSentry } from '@core/sentry';
import '@core/vk-bridge/init';
import { structure } from '@ui/routes/structure';
import { createRoot } from 'react-dom/client';
import { Providers } from './providers';
import './roundRect';
import { manualInitRouter } from './router/manual-init';

initSentry();
getStorageKeys();
getUserDataFX();
getProfileFX();
manualInitRouter(structure);

createRoot(document.getElementById('app')!).render(<Providers />);

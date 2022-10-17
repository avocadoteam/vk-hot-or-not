import { getStorageKeys, getUserDataFX } from '@core/config/effects.config';
import '@core/global-listen';
import '@core/vk-bridge/init';
import { structure } from '@ui/routes/structure';
import { createRoot } from 'react-dom/client';
import { Providers } from './providers';
import { manualInitRouter } from './router/manual-init';

getStorageKeys();
getUserDataFX();
manualInitRouter(structure);

createRoot(document.getElementById('app')!).render(<Providers />);

// // @ts-ignore
// import('./eruda').then(({ default: eruda }) => {
//   // nothing;
// }); //runtime download

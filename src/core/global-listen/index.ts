import { setOffline, setOnline } from '@core/config';

export const k = 'k';

window.addEventListener('offline', () => {
  console.log('offline');
  setOffline();
});

window.addEventListener('online', () => {
  console.log('online');
  setOnline();
});

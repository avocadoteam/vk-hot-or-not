import { uiD } from './domain.uic';
import { ToastId } from './types';

export const hideToast = uiD.createEvent<ToastId>();
export const showFirstToast = uiD.createEvent();

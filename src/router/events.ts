import { routerDomain } from './domain';

const setPopout = routerDomain.createEvent<any>();
const setModal = routerDomain.createEvent<any>();
const setHash = routerDomain.createEvent<string>();
const setView = routerDomain.createEvent<string>();
const setPanel = routerDomain.createEvent<string>();
const goBack = routerDomain.createEvent();
const resetHistory = routerDomain.createEvent();

export const rEvents = {
  setPopout,
  setModal,
  setView,
  setPanel,
  goBack,
  setHash,
  resetHistory,
};

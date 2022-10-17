import { getStorageKeys } from '@core/config/effects.config';
import { isDev } from '@core/constants';
import { forward } from 'effector';
import { R_Router } from './b-router';
import { routerDomain } from './domain';
import { rEvents } from './events';
import { manualInitRouter } from './manual-init';
import { RouterState } from './types';

if (isDev) {
  import('effector-logger/attach').then(({ attachLogger }) => {
    attachLogger(routerDomain, {
      console: 'enabled',
    });
  });
}

export const initialState: RouterState = {
  popout: null,
  modal: null,
  activeView: '',
  activePanel: '',
  hash: '',
};

let rInstance: R_Router;

export const $router = routerDomain.createStore<RouterState>(initialState);

$router.on(rEvents.setPopout, (state, popout) => {
  rInstance.setModal();
  return {
    ...state,
    popout,
  };
});
$router.on(rEvents.setModal, (state, modal) => {
  rInstance.setModal();
  return {
    ...state,
    modal,
  };
});
$router.on(rEvents.setView, (state, activeView) => {
  rInstance.setActiveView(activeView);
  return {
    ...state,
    activeView,
  };
});
$router.on(rEvents.setPanel, (state, activePanel) => {
  rInstance.setActivePanel(activePanel);
  return {
    ...state,
    activePanel,
  };
});
$router.on(rEvents.setHash, (state, hash) => {
  rInstance.toHash(hash);
  return {
    ...state,
    hash,
  };
});
$router.on(rEvents.goBack, state => {
  rInstance.back();
  return {
    ...state,
    activeView: rInstance.activeView,
    activePanel: rInstance.activePanel,
    hash: rInstance.hash,
    modal: null,
    popout: null,
  };
});
$router.on(manualInitRouter.doneData, (state, instance) => {
  rInstance = instance;
  return {
    ...state,
    activeView: rInstance.activeView,
    activePanel: rInstance.activePanel,
  };
});
$router.on(rEvents.resetHistory, state => {
  rInstance.resetHistory();
  return state;
});

// const selectNavigation = routerDomain.createEffect(({ sawWelcome }: { sawWelcome: boolean }) => {
//   if (window.location.hash.includes(MainPanels.Recommendation)) {
//     rEvents.setView(ViewTypes.Main);
//     rEvents.setPanel(MainPanels.Recommendation);
//   } else if (sawWelcome) {
//     rEvents.setView(ViewTypes.Main);
//     rEvents.setPanel(MainPanels.Home);
//     rEvents.resetHistory();
//   } else {
//     rEvents.setView(ViewTypes.Welcome);
//     rEvents.setPanel(WelcomePanels.Question);
//     rEvents.resetHistory();
//   }
// });
forward({
  from: getStorageKeys.doneData,
  to: [],
});

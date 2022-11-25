import { isDev } from '@core/constants';
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

export const routerO: {
  rInstance: R_Router;
} = {
  rInstance: null as unknown as R_Router,
};

export const $router = routerDomain.createStore<RouterState>(initialState);

$router.on(rEvents.setPopout, (state, popout) => {
  routerO.rInstance.setModal();
  return {
    ...state,
    popout,
  };
});
$router.on(rEvents.setModal, (state, modal) => {
  routerO.rInstance.setModal();
  return {
    ...state,
    modal,
  };
});
$router.on(rEvents.setView, (state, activeView) => {
  routerO.rInstance.setActiveView(activeView);
  return {
    ...state,
    activeView,
  };
});
$router.on(rEvents.setPanel, (state, activePanel) => {
  routerO.rInstance.setActivePanel(activePanel);
  return {
    ...state,
    activePanel,
  };
});
$router.on(rEvents.setHash, (state, hash) => {
  routerO.rInstance.toHash(hash);
  return {
    ...state,
    hash,
  };
});
$router.on(rEvents.goBack, state => {
  routerO.rInstance.back();
  return {
    ...state,
    activeView: routerO.rInstance.activeView,
    activePanel: routerO.rInstance.activePanel,
    hash: routerO.rInstance.hash,
    modal: null,
    popout: null,
  };
});
$router.on(manualInitRouter.doneData, (state, instance) => {
  routerO.rInstance = instance;
  return {
    ...state,
    activeView: routerO.rInstance.activeView,
    activePanel: routerO.rInstance.activePanel,
  };
});
$router.on(rEvents.resetHistory, state => {
  routerO.rInstance.resetHistory();
  return state;
});

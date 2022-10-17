import { $configStore } from '@core/config';
import { getStorageKeys } from '@core/config/effects.config';
import { Offline } from '@ui/offline/Offline';
import { MainPanels, ViewTypes } from '@ui/routes/structure';
import { Div, Panel, Root, ScreenSpinner, View } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { memo } from 'react';
import { $router } from 'src/router/state';
import { WelcomeLayout } from './WelcomeLayout';

const PanelSpinner = memo(() => (
  <Div>
    <View popout={<ScreenSpinner />} activePanel="PanelSpinner">
      <Panel id="PanelSpinner" />
    </View>
  </Div>
));

export const AppLayout = () => {
  const { online, onlineHandleActivate } = useStore($configStore);
  const { activeView, activePanel } = useStore($router);
  const initialLoading = useStore(getStorageKeys.pending);

  if (!online || !onlineHandleActivate) {
    return <Offline />;
  }

  if (initialLoading) {
    return <PanelSpinner />;
  }

  return (
    <Root activeView={activeView}>
      <View id={ViewTypes.Main} activePanel={activePanel}>
        <Panel id={MainPanels.Home}></Panel>
      </View>
      <WelcomeLayout id={ViewTypes.Welcome} />
    </Root>
  );
};

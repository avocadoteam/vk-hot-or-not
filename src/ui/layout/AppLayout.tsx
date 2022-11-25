import { createProfileFX } from '@core/api/profile/effects.prof';
import { $config } from '@core/config';
import { getStorageKeys, getUserDataFX } from '@core/config/effects.config';
import { AllRatingsLayout } from '@ui/all-ratings/AllRatingsLayout';
import { HomeLayout } from '@ui/home/HomeLayout';
import { RootModal } from '@ui/modal/RootModal';
import { Offline } from '@ui/offline/Offline';
import { MainPanels, ViewTypes } from '@ui/routes/structure';
import { SettingsLayout } from '@ui/settings/SettingsLayout';
import { ViewSpinner } from '@ui/ViewSpinner';
import { Panel, SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { $router } from 'src/router/state';
import { LayoutHeader, LayoutHeaderBack } from './LayoutHeader';

const initialLoadingCombine = combine(
  [getStorageKeys.pending, getUserDataFX.pending, createProfileFX.pending],
  ([a, b, c]) => a || b || c,
);

export const AppLayout = () => {
  const { online, onlineHandleActivate } = useStore($config);
  const { activePanel } = useStore($router);
  const initialLoading = useStore(initialLoadingCombine);

  if (!online || !onlineHandleActivate) {
    return <Offline />;
  }

  if (initialLoading) {
    return <ViewSpinner />;
  }

  return (
    <SplitLayout modal={<RootModal />}>
      <SplitCol>
        <View id={ViewTypes.Main} activePanel={activePanel}>
          <Panel id={MainPanels.Home}>
            <LayoutHeader />
            <HomeLayout />
          </Panel>
          <Panel id={MainPanels.Settings}>
            <LayoutHeaderBack />
            <SettingsLayout />
          </Panel>
          <Panel id={MainPanels.AllRatings}>
            <LayoutHeaderBack />
            <AllRatingsLayout />
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

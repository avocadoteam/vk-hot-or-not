import { ViewTypes, WelcomePanels } from '@ui/routes/structure';
import { Panel, PanelHeader, View } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { $router } from 'src/router/state';

export const WelcomeLayout = ({ id }: { id: ViewTypes }) => {
  const { activePanel } = useStore($router);

  return (
    <View id={id} activePanel={activePanel}>
      <Panel id={WelcomePanels.Question}>
        <PanelHeader separator={false} />
      </Panel>
    </View>
  );
};

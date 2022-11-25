import { Div, Panel, ScreenSpinner, View } from '@vkontakte/vkui';
import { memo } from 'react';

export const ViewSpinner = memo(() => (
  <Div>
    <View popout={<ScreenSpinner />} activePanel="PanelSpinner">
      <Panel id="PanelSpinner" />
    </View>
  </Div>
));

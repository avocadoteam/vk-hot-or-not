import { $profile } from '@core/api/profile/store.prof';
import { $config } from '@core/config';
import { setSecondVisitFX } from '@core/config/effects.config';
import { MainPanels } from '@ui/routes/structure';
import { primary } from '@ui/theme/theme.css';
import { Icon20UserCircleOutline, Icon28ChevronBack } from '@vkontakte/icons';
import { IconButton, PanelHeader } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { useCallback } from 'react';
import { rEvents } from 'src/router/events';

export const LayoutHeader = () => {
  const { info } = useStore($profile);
  const { secondVisit } = useStore($config);

  const openProfileSection = useCallback(() => {
    if (!secondVisit) {
      setSecondVisitFX();
    }
    rEvents.setPanel(MainPanels.Settings);
  }, [secondVisit]);

  return (
    <PanelHeader
      before={
        <IconButton disabled={!!info?.ban} onClick={openProfileSection}>
          <Icon20UserCircleOutline width={28} height={28} className={primary} />
        </IconButton>
      }
      separator={false}
    />
  );
};
export const LayoutHeaderBack = () => {
  return (
    <PanelHeader
      before={
        <IconButton onClick={() => rEvents.goBack()}>
          <Icon28ChevronBack className={primary} width={28} height={28} />
        </IconButton>
      }
      separator={false}
    />
  );
};

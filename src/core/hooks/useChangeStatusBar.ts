import { $config } from '@core/config';
import { vkBridge } from '@core/vk-bridge/instance';
import { colors } from '@ui/theme/palette';
import { useStore } from 'effector-react';
import { useEffect } from 'react';

export const useChangeStatusBar = () => {
  const { appearance } = useStore($config);

  const isLight = appearance === 'light';

  useEffect(() => {
    vkBridge.send('VKWebAppSetViewSettings', {
      status_bar_style: isLight ? 'dark' : 'light',
      action_bar_color: isLight ? colors.light.bg : colors.dark.bg,
    });

    return () => {
      vkBridge.send('VKWebAppSetViewSettings', {
        status_bar_style: isLight ? 'dark' : 'light',
        action_bar_color: isLight ? colors.light.bg : colors.dark.bg,
      });
    };
  }, []);
};

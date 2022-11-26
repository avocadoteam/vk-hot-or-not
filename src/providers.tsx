import { $config } from '@core/config';
import { ErrorBoundary } from '@ui/error-bound';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { App } from './app';

export const Providers = () => {
  const { appearance } = useStore($config);
  return (
    <ConfigProvider appearance={appearance}>
      <AdaptivityProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

import { $configStore } from '@core/config';
import { ErrorBoundary } from '@ui/error-bound';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { App } from './app';
import { RouterProvider } from './router/RouterProvider';

export const Providers = () => {
  const { appearance } = useStore($configStore);
  return (
    <ConfigProvider appearance={appearance}>
      <AdaptivityProvider>
        <ErrorBoundary>
          <RouterProvider>
            <App />
          </RouterProvider>
        </ErrorBoundary>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

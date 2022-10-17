import { captureUrlEvent } from '@core/sentry';
import { errMap } from '@core/utils';
import { Div, Group, Panel, PanelHeader, Text, Title, View } from '@vkontakte/vkui';
import React from 'react';
import { AlienOffline } from 'src/assets/svg/AlienOffline';

type LocalState = {
  hasError: boolean;
  error: any;
};

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, LocalState> {
  state: LocalState = { hasError: false, error: '' };

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: errMap(error) };
  }

  componentDidCatch(error: Error) {
    // You can also log the error to an error reporting service
    captureUrlEvent(errMap(error));
  }

  render() {
    if (this.state.hasError) {
      return (
        <View activePanel="error">
          <Panel id="error">
            <PanelHeader separator={false} />
            <Group
              separator="hide"
              style={{
                height: '40vh',
              }}
            >
              <Div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <AlienOffline
                  style={{
                    display: 'flex',
                    marginTop: 'auto',
                    marginBottom: '2rem',
                    alignSelf: 'center',
                  }}
                />
              </Div>
            </Group>
            <Group separator="hide" style={{ textAlign: 'center' }}>
              <Title weight="bold" level="2">
                Произошла ошибка
              </Title>
              <Text weight="regular">{JSON.stringify(this.state.error)}</Text>
            </Group>
          </Panel>
        </View>
      );
    }

    return this.props.children;
  }
}

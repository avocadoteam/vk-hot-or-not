import { getProfileHistoryFX } from '@core/api/profile/effects.prof';
import { Div, Group, Title } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { memo } from 'react';
import { AlienOffline } from 'src/assets/svg/AlienOffline';

export const NoResults = memo(() => {
  const listFetching = useStore(getProfileHistoryFX.pending);

  return (
    <Div>
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
        {listFetching ? (
          <Title weight="bold" level="3" style={{ marginBottom: '1rem' }}>
            Загружаем рейтинг
          </Title>
        ) : (
          <Title weight="bold" level="3" style={{ marginBottom: '1rem' }}>
            Пока никто не оценил Ваш профиль
          </Title>
        )}
      </Group>
    </Div>
  );
});

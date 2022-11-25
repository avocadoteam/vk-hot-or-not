import { typography } from '@ui/theme/typography.css';
import { Icon20MasksOutline, Icon20ReportOutline, Icon20Users3 } from '@vkontakte/icons';
import { Avatar, Cell } from '@vkontakte/vkui';
import { memo } from 'react';
import { welcomeStyles } from './welcome.css';

export const WelcomeTips = memo(() => {
  return (
    <>
      <Cell
        multiline
        hasActive={false}
        hasHover={false}
        before={
          <Avatar size={44} className={welcomeStyles.dAva}>
            <Icon20Users3 />
          </Avatar>
        }
      >
        <p className={typography({ variant: 'body', color: 'muted' })}>Суть — оценивать профили других людей</p>
        <p className={typography({ variant: 'body', color: 'subhead' })}>Чем лучше профиль, тем он «горячее»</p>
      </Cell>
      <Cell
        multiline
        hasActive={false}
        hasHover={false}
        before={
          <Avatar size={44} className={welcomeStyles.dAva}>
            <Icon20ReportOutline />
          </Avatar>
        }
      >
        <p className={typography({ variant: 'body', color: 'muted' })}>Не фокусируемся на внешности</p>
        <p className={typography({ variant: 'body', color: 'subhead' })}>
          Оценивать нужно именно эстетичность профиля. Неважно, как выглядит сам человек
        </p>
      </Cell>
      <Cell
        multiline
        hasActive={false}
        hasHover={false}
        before={
          <Avatar size={44} className={welcomeStyles.dAva}>
            <Icon20MasksOutline />
          </Avatar>
        }
      >
        <p className={typography({ variant: 'body', color: 'muted' })}>Твой профиль тоже могут оценивать</p>
        <p className={typography({ variant: 'body', color: 'subhead' })}>
          Если не хочешь внимания остальных, отключи это в профиле
        </p>
      </Cell>
    </>
  );
});

import { sendReportFX } from '@core/api/profile/effects.prof';
import { $profUI } from '@core/api/profile/store.prof';
import { ReportReason } from '@core/types/profile';
import { btnSec, mt2 } from '@ui/theme/theme.css';
import { Icon20Cancel, Icon24Error } from '@vkontakte/icons';
import { ANDROID, Button, IconButton, IOS, usePlatform } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { ReactNode } from 'react';
import { BadWords } from 'src/assets/svg/BadWords';
import { Violence } from 'src/assets/svg/Violence';
import { fileStyles } from '../file-upload/file.css';
import { repStyles } from './rep.css';

export const reasons: { value: ReportReason; label: string; icon: ReactNode }[] = [
  {
    value: ReportReason.Spam,
    label: 'Спам',
    icon: <BadWords />,
  },
  {
    value: ReportReason.Nudes,
    label: 'Неприличность',
    icon: <Icon24Error width={24} height={24} />,
  },
  {
    value: ReportReason.Offence,
    label: 'Оскорбления',
    icon: <Violence />,
  },
];

export const ReportContent = ({ closeReport }: { closeReport: () => void }) => {
  const { profileUserId } = useStore($profUI);
  const loading = useStore(sendReportFX.pending);
  const platform = usePlatform();

  return (
    <>
      {platform === ANDROID ? (
        <IconButton onClick={closeReport} className={fileStyles.btnClose}>
          <Icon20Cancel />
        </IconButton>
      ) : null}
      <div className={`${repStyles.container} ${platform === IOS ? mt2 : ''}`}>
        {reasons.map(r => (
          <Button
            size="l"
            className={btnSec}
            stretched
            key={r.value}
            disabled={!profileUserId || loading}
            onClick={() =>
              sendReportFX({
                reason: r.value,
                toBanId: profileUserId,
              }).finally(closeReport)
            }
            before={r.icon}
          >
            {r.label}
          </Button>
        ))}
      </div>
    </>
  );
};

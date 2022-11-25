import { PublicProfile } from '@core/types/profile';
import { typography } from '@ui/theme/typography.css';
import { homeStyles } from './home.css';

type Props = {
  profile: PublicProfile;
};

export const CardContent = ({ profile }: Props) => {
  return (
    <>
      <img
        src={`https://showtime.app-dich.com${profile.bgFile.fileUrl}`}
        crossOrigin="anonymous"
        className={homeStyles.cardBg}
      />
      <img
        src={`https://showtime.app-dich.com${profile.file.fileUrl}`}
        className={homeStyles.cardFg}
        crossOrigin="anonymous"
      />

      <p className={typography({ color: 'muted', m: 'ta', align: 'center', variant: 'subHead' })}>
        {profile.firstName} {profile.lastName}
      </p>
    </>
  );
};

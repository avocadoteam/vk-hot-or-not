import { setProfilesUserId, setTimerPlaying, viewProfileFX } from '@core/api/profile/effects.prof';
import { $profTimer, $profUI, $publicProfile } from '@core/api/profile/store.prof';
import { finishWelcomeFX } from '@core/config/effects.config';
import { isDev } from '@core/constants';
import { Modals } from '@ui/routes/structure';
import { useStore } from 'effector-react';
import { FC, ReactNode, useCallback, useEffect } from 'react';
import { rEvents } from './events';
import { $router } from './state';

interface RouterProps {
  children: ReactNode;
}

export const RouterProvider: FC<RouterProps> = ({ children }) => {
  const { modal } = useStore($router);
  const publicInfo = useStore($publicProfile);
  const { profileUserId } = useStore($profUI);
  const { countdown } = useStore($profTimer);

  const closeModal = useCallback(() => {
    rEvents.goBack();
  }, []);

  const closeProfile = useCallback(() => {
    if (publicInfo?.profile?.vkUserId && !publicInfo.rated) {
      viewProfileFX(publicInfo.profile.vkUserId);
    }
    closeModal();
    setProfilesUserId(0);
    if (!publicInfo.rated || isDev) {
      rEvents.setModal(Modals.UserСlosedProfile);
    }
  }, [publicInfo]);

  const closeWelcome = useCallback(() => {
    finishWelcomeFX();
    closeModal();
  }, []);

  const closeReport = useCallback(() => {
    closeModal();
    if (publicInfo?.profile?.vkUserId === profileUserId) {
      rEvents.setModal(Modals.UserProfile);
    }

    if (countdown < 3000) {
      setTimerPlaying(true);
    }
  }, [publicInfo, profileUserId, countdown]);

  useEffect(() => {
    const back = () => {
      switch (modal) {
        case Modals.UserProfile:
          closeProfile();
          break;
        case Modals.Welcome:
          closeWelcome();
          break;
        case Modals.Report:
          closeReport();
          break;

        default:
          closeModal();
          break;
      }
    };
    window.addEventListener('popstate', back);
    return () => window.removeEventListener('popstate', back);
  }, [modal, closeProfile, closeReport]);

  return <>{children}</>;
};

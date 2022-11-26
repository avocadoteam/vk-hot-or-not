import { getPublicProfileFX, setProfilesUserId, setTimerPlaying, viewProfileFX } from '@core/api/profile/effects.prof';
import { $profTimer, $profUI, $publicProfile } from '@core/api/profile/store.prof';
import { $config } from '@core/config';
import { finishWelcomeFX } from '@core/config/effects.config';
import { isDev } from '@core/constants';
import { getSearchParams } from '@core/data/searchParams';
import { MainPanels, Modals } from '@ui/routes/structure';
import { Icon24Cancel } from '@vkontakte/icons';
import {
  ANDROID,
  IOS,
  ModalCard,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeaderButton,
  usePlatform,
  VKCOM,
} from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { useCallback, useEffect } from 'react';
import { rEvents } from 'src/router/events';
import { $router } from 'src/router/state';
import { FileUploadContent } from './file-upload/FileUploadContent';
import { ClosedProfileContent } from './profile/ClosedProfileContent';
import { ProfileContent } from './profile/ProfileContent';
import { ReportContent } from './report/ReportContent';
import { WelcomeContent } from './welcome/WelcomeContent';

export const RootModal = () => {
  const { modal } = useStore($router);
  const { sawWelcome } = useStore($config);
  const publicInfo = useStore($publicProfile);
  const { profileUserId } = useStore($profUI);
  const { countdown } = useStore($profTimer);
  const platform = usePlatform();

  useEffect(() => {
    const profileId = getSearchParams().get('vk_profile_id') ?? 0;
    const myId = getSearchParams().get('vk_user_id') ?? 0;

    if (Number(profileId) === Number(myId)) {
      rEvents.setPanel(MainPanels.Settings);
      return;
    }

    const hashValue = profileId ? Number(profileId) : Number(window.location.hash.split('#').pop());

    if (hashValue && !isNaN(hashValue)) {
      setProfilesUserId(hashValue);
      getPublicProfileFX(hashValue);
    }
  }, []);

  useEffect(() => {
    if (!sawWelcome) {
      rEvents.setModal(Modals.Welcome);
    } else if (publicInfo?.profile?.vkUserId === profileUserId) {
      rEvents.setModal(Modals.UserProfile);
    }
  }, [sawWelcome, publicInfo, profileUserId]);

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

  return (
    <ModalRoot activeModal={modal}>
      <ModalPage
        id={Modals.Welcome}
        onClose={closeWelcome}
        header={
          <ModalPageHeader
            before={
              platform === ANDROID || platform === VKCOM ? (
                <PanelHeaderButton onClick={closeWelcome} aria-label="closeWelcome">
                  <Icon24Cancel />
                </PanelHeaderButton>
              ) : null
            }
            after={
              platform === IOS ? (
                <PanelHeaderButton onClick={closeWelcome} aria-label="closeWelcome">
                  <Icon24Cancel />
                </PanelHeaderButton>
              ) : null
            }
          />
        }
        settlingHeight={100}
      >
        <WelcomeContent />
      </ModalPage>
      <ModalCard id={Modals.Report} onClose={closeReport}>
        <ReportContent closeReport={closeReport} />
      </ModalCard>
      <ModalCard id={Modals.FileUpload} onClose={closeModal}>
        <FileUploadContent />
      </ModalCard>

      <ModalPage
        id={Modals.UserProfile}
        onClose={closeProfile}
        settlingHeight={100}
        header={
          <ModalPageHeader
            before={
              platform === ANDROID || platform === VKCOM ? (
                <PanelHeaderButton onClick={closeProfile}>
                  <Icon24Cancel />
                </PanelHeaderButton>
              ) : null
            }
            after={
              platform === IOS ? (
                <PanelHeaderButton onClick={closeProfile}>
                  <Icon24Cancel />
                </PanelHeaderButton>
              ) : null
            }
          />
        }
      >
        <ProfileContent />
      </ModalPage>
      <ModalPage
        id={Modals.UserСlosedProfile}
        onClose={closeModal}
        settlingHeight={100}
        header={
          <ModalPageHeader
            before={
              platform === ANDROID || platform === VKCOM ? (
                <PanelHeaderButton onClick={closeModal}>
                  <Icon24Cancel />
                </PanelHeaderButton>
              ) : null
            }
            after={
              platform === IOS ? (
                <PanelHeaderButton onClick={closeModal}>
                  <Icon24Cancel />
                </PanelHeaderButton>
              ) : null
            }
          />
        }
      >
        <ClosedProfileContent />
      </ModalPage>
    </ModalRoot>
  );
};

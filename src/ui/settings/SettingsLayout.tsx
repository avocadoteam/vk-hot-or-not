import { getProfileFX, saveProfileFX } from '@core/api/profile/effects.prof';
import { $profile } from '@core/api/profile/store.prof';
import { $config } from '@core/config';
import { setTapticVibration } from '@core/config/effects.config';
import { useProfileBtn } from '@core/hooks/useProfileBtn';
import { useStoryShare } from '@core/hooks/useStoryShare';
import { HotListType } from '@core/types/profile';
import { addToastToQueue, hideToast } from '@core/ui-config/effects.uic';
import { ToastId } from '@core/ui-config/types';
import { Modals } from '@ui/routes/structure';
import { btnSec, mthalf } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import {
  Icon12EyeSlashOutline,
  Icon16Done,
  Icon20AddCircleOutline,
  Icon20Cancel,
  Icon20RemoveCircleOutline,
  Icon20StarsFilled,
  Icon20StoryOutline,
  Icon24View,
  Icon28EditOutline,
  Icon28ViewOutline,
} from '@vkontakte/icons';
import { Button, IconButton, Separator, Spacing, Spinner } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { useCallback } from 'react';
import { Indicator } from 'src/assets/svg/Indicator';
import { Rate } from 'src/assets/svg/Rate';
import { rEvents } from 'src/router/events';
import { SettingsRating } from './SettingsRating';
import { sgsStyles } from './sgs.css';

const loadingCombine = combine([saveProfileFX.pending, getProfileFX.pending], ([a, b]) => a || b);

export const SettingsLayout = () => {
  const { info } = useStore($profile);
  const { user, taptic } = useStore($config);
  const loadingVisib = useStore(loadingCombine);

  const { addBtnToProfile, addedToProfile, canAddToProfile, removeBtnFromProfile } = useProfileBtn();

  const pp = Math.trunc((info?.ratingMean ?? 10) * 10);
  const ppPosition = pp > 90 ? pp - 10 : pp > 10 ? pp - 5 : pp;
  const { shareStory, clicked } = useStoryShare(user?.id ?? 0, pp);

  const changeVisib = useCallback(async () => {
    if (!info) return;
    hideToast(ToastId.Visibility);
    const newListType = info?.listType === HotListType.Unlisted ? HotListType.Listed : HotListType.Unlisted;
    try {
      await saveProfileFX({
        bgId: info.bgId,
        fileId: info.fileId,
        firstName: info.firstName,
        lastName: info.lastName,
        gender: user?.sex ?? 0,
        listType: newListType,
      });

      addToastToQueue({
        id: ToastId.Visibility,
        toast: {
          type: 'success',
          title: newListType === HotListType.Listed ? 'Ваш профиль виден остальным' : 'Ваш профиль скрыт для всех',
        },
      });
    } catch {}
  }, [info]);

  const editFiles = useCallback(() => {
    if (!info) return;
    rEvents.setModal(Modals.FileUpload);
  }, [info]);

  return (
    <>
      <div className={sgsStyles.container}>
        <div className={sgsStyles.imgsWrap}>
          <div className={sgsStyles.imgBgOverlay} />
          <IconButton className={sgsStyles.editBg} onClick={editFiles}>
            <Icon28EditOutline />
          </IconButton>
          <IconButton className={sgsStyles.editVisible} onClick={changeVisib} disabled={loadingVisib}>
            {loadingVisib ? (
              <Spinner />
            ) : info?.listType === HotListType.Unlisted ? (
              <Icon12EyeSlashOutline width={24} height={24} />
            ) : (
              <Icon28ViewOutline />
            )}
          </IconButton>
          <img src={`https://showtime.app-dich.com${info?.bgUrl}`} crossOrigin="anonymous" className={sgsStyles.imgBg} />
          <img src={`https://showtime.app-dich.com${info?.fileUrl}`} crossOrigin="anonymous" className={sgsStyles.imgFg} />
        </div>

        <div className={sgsStyles.editName}>
          <p className={typography({ color: 'primary', variant: 'subHead' })}>
            {info?.firstName} {info?.lastName}
          </p>
          <IconButton hasHover={false} onClick={() => rEvents.setModal(Modals.SettingsName)}>
            <Icon28EditOutline width={20} height={20} />
          </IconButton>
        </div>
        <p className={typography({ color: 'subhead', variant: 'body', m: 't.5', align: 'center', weight: 'medium' })}>
          Ваш профиль
        </p>
        <Spacing size={32} style={{ width: '100%' }}>
          <Separator wide />
        </Spacing>

        <div className={sgsStyles.numsContainer}>
          <div className={sgsStyles.num}>
            <Icon24View width={20} height={20} />
            <p className={typography({ color: 'subhead', variant: 'body', m: 't.5', align: 'center', weight: 'hard' })}>
              {info?.views}
            </p>
            <p className={typography({ color: 'subhead', variant: 'tertiary', align: 'center', weight: 'medium' })}>
              Просмотры
            </p>
          </div>
          <div className={sgsStyles.num}>
            <Rate />
            <p className={typography({ color: 'subhead', variant: 'body', m: 't.5', align: 'center', weight: 'hard' })}>
              {info?.ratingsCount}
            </p>
            <p className={typography({ color: 'subhead', variant: 'tertiary', align: 'center', weight: 'medium' })}>
              Оценки
            </p>
          </div>
          <div className={sgsStyles.num}>
            <Icon20StarsFilled />
            <p className={typography({ color: 'subhead', variant: 'body', m: 't.5', align: 'center', weight: 'hard' })}>
              {info?.topRatings}
            </p>
            <p className={typography({ color: 'subhead', variant: 'tertiary', align: 'center', weight: 'medium' })}>
              Идеальные оценки
            </p>
          </div>
        </div>
        <Spacing size={32} style={{ width: '100%' }}>
          <Separator wide />
        </Spacing>

        <p className={typography({ color: 'subhead', variant: 'tertiary', weight: 'medium', self: 'left' })}>Ваш счёт</p>

        <div className={sgsStyles.slider}>
          <div className={sgsStyles.idicator} style={{ left: `${ppPosition}%` }}>
            <Indicator />
            <p className={typography({ color: 'red', variant: 'body', align: 'center' })}>{`${pp}%`}</p>
          </div>
        </div>

        <div className={sgsStyles.dFlex}>
          <Button disabled={clicked} onClick={shareStory} size="l" stretched before={<Icon20StoryOutline />}>
            Поделиться счётом
          </Button>
        </div>
        {canAddToProfile ? (
          <Button
            onClick={addedToProfile ? removeBtnFromProfile : addBtnToProfile}
            size="l"
            stretched
            before={addedToProfile ? <Icon20RemoveCircleOutline /> : <Icon20AddCircleOutline />}
            className={btnSec}
          >
            {addedToProfile ? 'Убрать кнопку из профиля' : 'Добавить кнопку в профиль'}
          </Button>
        ) : null}

        <Button
          onClick={() => setTapticVibration(taptic ? 'no' : 'yes')}
          size="l"
          stretched
          before={taptic ? <Icon20Cancel /> : <Icon16Done width={20} height={20} />}
          className={`${btnSec} ${mthalf}`}
        >
          {taptic ? 'Отключить вибрацию' : 'Включить вибрацию'}
        </Button>
      </div>
      <SettingsRating />
    </>
  );
};

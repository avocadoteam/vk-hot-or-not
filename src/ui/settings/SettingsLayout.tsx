import { getProfileFX, saveProfileFX } from '@core/api/profile/effects.prof';
import { $profile } from '@core/api/profile/store.prof';
import { $config } from '@core/config';
import { enableEffector } from '@core/constants';
import { useProfileBtn } from '@core/hooks/useProfileBtn';
import { useStoryShare } from '@core/hooks/useStoryShare';
import { HotListType } from '@core/types/profile';
import { addToastToQueue, hideToast } from '@core/ui-config/effects.uic';
import { ToastId } from '@core/ui-config/types';
import { openLink } from '@core/utils';
import { MainPanels, Modals } from '@ui/routes/structure';
import { valueToImgPath } from '@ui/slider/CoolSlider';
import { btnSec, textSecondary } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import {
  Icon12EyeSlashOutline,
  Icon20AddCircleOutline,
  Icon20RecentOutline,
  Icon20RemoveCircleOutline,
  Icon20StarsFilled,
  Icon20StoryOutline,
  Icon24View,
  Icon28EditOutline,
  Icon28ViewOutline,
} from '@vkontakte/icons';
import { Avatar, Button, IconButton, Separator, SimpleCell, Spacing, Spinner } from '@vkontakte/vkui';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { useCallback } from 'react';
import { Indicator } from 'src/assets/svg/Indicator';
import { Rate } from 'src/assets/svg/Rate';
import { rEvents } from 'src/router/events';
import { sgsStyles } from './sgs.css';

const loadingCombine = combine([saveProfileFX.pending, getProfileFX.pending], ([a, b]) => a || b);

export const SettingsLayout = () => {
  const { info } = useStore($profile);
  const { user } = useStore($config);
  const loadingVisib = useStore(loadingCombine);

  const { addBtnToProfile, addedToProfile, canAddToProfile, removeBtnFromProfile } = useProfileBtn();

  const rateds = info?.ratings ?? [];
  const pp = Math.trunc((info?.ratingMean ?? 10) * 10);
  const ppPosition = pp > 90 ? pp - 10 : pp > 10 ? pp - 5 : pp;
  const { shareStory, clicked } = useStoryShare(user?.id ?? 0, rateds.length ? pp : 100);

  const changeVisib = useCallback(async () => {
    if (!info) return;
    hideToast(ToastId.Visibility);
    const newListType = info?.listType === HotListType.Unlisted ? HotListType.Listed : HotListType.Unlisted;
    try {
      await saveProfileFX({
        bgId: info.bgId,
        fileId: info.fileId,
        firstName: user?.first_name ?? '',
        lastName: user?.last_name ?? '',
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

        <p className={typography({ color: 'primary', variant: 'subHead', m: 't3', align: 'center' })}>
          {user?.first_name} {user?.last_name}
        </p>
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
          <div className={sgsStyles.idicator} style={{ left: rateds.length ? `${ppPosition}%` : '90%' }}>
            <Indicator />
            <p className={typography({ color: 'red', variant: 'body', align: 'center' })}>
              {rateds.length ? `${pp}%` : '100%'}
            </p>
          </div>
        </div>

        <div className={sgsStyles.dFlex}>
          <Button disabled={clicked} onClick={shareStory} size="l" stretched before={<Icon20StoryOutline />}>
            Поделиться счётом
          </Button>
        </div>
        {canAddToProfile && enableEffector ? (
          <Button
            onClick={addedToProfile ? removeBtnFromProfile : addBtnToProfile}
            size="l"
            stretched
            before={addedToProfile ? <Icon20RemoveCircleOutline /> : <Icon20AddCircleOutline />}
            className={btnSec}
          >
            Добавить кнопку в профиль
          </Button>
        ) : null}

        <div className={sgsStyles.line}>
          <Icon20RecentOutline className={textSecondary} />
          <p className={typography({ color: 'subhead', variant: 'tertiary', weight: 'medium' })}>Последние оценки</p>
        </div>
      </div>
      <div style={{ width: '100%', paddingBottom: '1rem' }}>
        {rateds.length ? (
          rateds.map(r => (
            <SimpleCell
              key={r.id}
              before={<Avatar size={40} src={r.ava} />}
              onClick={() => openLink(`https://vk.ru/id${r.vkUserId}`)}
              indicator={<img width={24} height={24} src={valueToImgPath(r.rating ?? 5)} className={sgsStyles.rating} />}
            >
              <p className={typography({ color: 'primary', variant: 'caption' })}>{r.name}</p>
            </SimpleCell>
          ))
        ) : (
          <p className={typography({ color: 'tertiary', variant: 'caption', align: 'center' })}>
            Пока никто не оценил Ваш профиль
          </p>
        )}
        {rateds.length >= 30 ? (
          <div style={{ padding: '0 1rem' }}>
            <Button
              onClick={() => rEvents.setPanel(MainPanels.AllRatings)}
              size="l"
              stretched
              className={btnSec}
              style={{ margin: '1rem 0' }}
            >
              Остальной рейтинг
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
};

import { getProfileRatingsFX } from '@core/api/rating/effects.rating';
import { $ratingSort, ratingOrderFX, ratingSexFX } from '@core/api/rating/store.rating';
import { RatingState } from '@core/api/rating/types';
import { openLink } from '@core/utils';
import { MainPanels } from '@ui/routes/structure';
import { valueToImgPath } from '@ui/slider/CoolSlider';
import { btnSec } from '@ui/theme/theme.css';
import { typography } from '@ui/theme/typography.css';
import { Avatar, Button, CustomSelect, SimpleCell } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { rEvents } from 'src/router/events';
import { sgsStyles } from './sgs.css';

export const SettingsRating = () => {
  const { orderByRate, sex, data } = useStore($ratingSort);

  useEffect(() => {
    getProfileRatingsFX({ sex, orderBy: orderByRate });
  }, []);

  return (
    <>
      <div style={{ padding: '0 1rem' }}>
        <div className={sgsStyles.line({ m: 'y' })}>
          <CustomSelect
            style={{ marginBottom: '1rem' }}
            placeholder="Пол"
            options={[
              { value: '2', label: 'Мужской' },
              { value: '1', label: 'Женский' },
              { value: '', label: 'Все люди' },
            ]}
            onChange={e => ratingSexFX(e.target.value as RatingState['sex'])}
            value={sex}
          />
          <CustomSelect
            placeholder="Оценки"
            options={[
              { value: 'DESC', label: 'От самых горячих' },
              { value: 'ASC', label: 'От самых холодных' },
              { value: '', label: 'Последние оценки' },
            ]}
            onChange={e => ratingOrderFX(e.target.value as RatingState['orderByRate'])}
            value={orderByRate}
          />
        </div>
      </div>
      <div style={{ width: '100%', paddingBottom: '1rem' }}>
        {data.length ? (
          data.map(r => (
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
        {data.length >= 30 ? (
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

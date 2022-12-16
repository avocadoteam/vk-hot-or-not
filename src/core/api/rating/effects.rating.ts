import { AX } from '@core/data/fetcher';
import { qVK } from '@core/data/q-params';
import { BaseResponse } from '@core/types/common';
import { Rating } from '@core/types/rating';
import { rD } from './domain.rating';
import { RatingState } from './types';

export const getProfileRatingsFX = rD.createEffect(
  async ({ sex, orderBy }: { sex: RatingState['sex']; orderBy: RatingState['orderByRate'] }) => {
    const { data } = await AX.get<BaseResponse<Rating[]>>(`/hot-or-not/profile/rating${qVK}&orderBy=${orderBy}&sex=${sex}`);
    return data.data;
  },
);

export const getProfileHistoryFX = rD.createEffect(
  async ({ sex, orderBy, offset }: { offset: number; sex: RatingState['sex']; orderBy: RatingState['orderByRate'] }) => {
    const { data } = await AX.get<BaseResponse<Rating[]>>(
      `/hot-or-not/profile/history${qVK}&offset=${offset}&orderBy=${orderBy}&sex=${sex}`,
    );
    return data.data;
  },
);

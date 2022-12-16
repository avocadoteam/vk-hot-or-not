import { Rating } from '@core/types/rating';
import { sample } from 'effector';
import { rD } from './domain.rating';
import { getProfileHistoryFX, getProfileRatingsFX } from './effects.rating';
import { RatingState } from './types';

export const ratingSexFX = rD.createEvent<RatingState['sex']>();
export const ratingOrderFX = rD.createEvent<RatingState['orderByRate']>();

export const $ratingSort = rD.createStore<RatingState>({
  orderByRate: '',
  sex: '',
  data: [],
});

$ratingSort.on(ratingSexFX, (state, sex) => ({
  ...state,
  sex,
}));
$ratingSort.on(ratingOrderFX, (state, orderByRate) => ({
  ...state,
  orderByRate,
}));
$ratingSort.on(getProfileRatingsFX.doneData, (state, data) => ({
  ...state,
  data,
}));

export const $profileHistory = rD.createStore<{
  ratings: Rating[];
  hasNextPage: boolean;
  offset: number;
}>({
  ratings: [],
  offset: 0,
  hasNextPage: true,
});

$profileHistory.on(getProfileHistoryFX.doneData, (state, ratings) => ({
  ...state,
  ratings: Array.from(new Set([...state.ratings.concat(ratings)])),
  hasNextPage: !!ratings.length,
  offset: state.offset + 30,
}));

sample({
  clock: ratingOrderFX /* 1 */,
  source: $ratingSort /* 2 */,
  fn: state => ({ sex: state.sex, orderBy: state.orderByRate }) /* 3 */,
  target: getProfileRatingsFX /* 4 */,
});
sample({
  clock: ratingSexFX /* 1 */,
  source: $ratingSort /* 2 */,
  fn: state => ({ sex: state.sex, orderBy: state.orderByRate }) /* 3 */,
  target: getProfileRatingsFX /* 4 */,
});

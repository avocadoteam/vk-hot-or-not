import { Rating } from '@core/types/rating';

export type RatingState = {
  sex: '1' | '2' | '';
  orderByRate: 'ASC' | 'DESC' | '';
  data: Rating[];
};

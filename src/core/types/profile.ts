import { BaseResponse } from './common';
import { Rating } from './rating';

export enum HotViewType {
  Anon = 1,
  Public = 2,
}
export enum HotListType {
  Listed = 1,
  Unlisted = 2,
}

export type ProfileData = {
  fileUrl: string;
  fileId: string;
  bgUrl: string;
  bgId: string;
  listType: HotListType;
  ban: Date | null;
  delay: Date | null;
  ratings: Rating[];
  ratingMean: number;
  topRatings: number;
  ratingsCount: number;
  views: number;
};
export type ProfileResponse = BaseResponse<ProfileData | null>;

export type SaveProfile = {
  fileId: string;
  bgId: string;
  listType: HotListType;
  firstName: string;
  lastName: string;
  gender: number;
};
export type CreateProfile = {
  listType: HotListType;
  firstName: string;
  lastName: string;
  gender: number;
};

export type PublicProfile = {
  id: string;
  firstName: string;
  lastName: string;
  gender: 0 | 1 | 2;
  vkUserId: number;
  listType: number;
  deleted: null;
  ban: null;
  file: {
    id: string;
    name: string;
    vkApp: string;
    fileUrl: string;
    vkUserId: number;
    deleted: null;
  };
  bgFile: {
    id: string;
    name: string;
    vkApp: string;
    fileUrl: string;
    vkUserId: number;
    deleted: null;
  };
};

export enum ReportReason {
  Spam = 'spam',
  Nudes = 'nudes',
  Offence = 'offence',
}

export type PublicInfo = {
  profile: PublicProfile | null;
  rated: string | null;
};

import { AX } from '@core/data/fetcher';
import { qVK } from '@core/data/q-params';
import { BaseResponse } from '@core/types/common';
import { CreateProfile, ProfileResponse, PublicInfo, PublicProfile, ReportReason, SaveProfile } from '@core/types/profile';
import { Rating } from '@core/types/rating';
import { profD } from './domain.prof';

export const getProfileFX = profD.createEffect(async () => {
  const { data } = await AX.get<ProfileResponse>(`/hot-or-not/profile${qVK}`);
  return data.data;
});
export const getProfileHistoryFX = profD.createEffect(async (offset: number) => {
  const { data } = await AX.get<BaseResponse<Rating[]>>(`/hot-or-not/profile/history${qVK}&offset=${offset}`);
  return data.data;
});

export const createProfileFX = profD.createEffect(async (data: CreateProfile) => {
  await AX.post(`/hot-or-not/profile${qVK}`, data);
});
export const getPublicProfilesFX = profD.createEffect(async (ids: number[]) => {
  const { data } = await AX.post<BaseResponse<PublicProfile[]>>(`/hot-or-not/rating/profiles${qVK}`, {
    ids,
  });

  return data.data;
});
export const getPublicProfileFX = profD.createEffect(async (profileId: number) => {
  const { data } = await AX.get<BaseResponse<PublicInfo>>(`/hot-or-not/rating/profile/${profileId}${qVK}`);

  return data.data;
});

export const saveProfileFX = profD.createEffect(async (data: SaveProfile) => {
  await AX.put(`/hot-or-not/profile${qVK}`, data);
});

export const viewProfileFX = profD.createEffect(async (profileId: number) => {
  await AX.post(`/hot-or-not/rating/view${qVK}`, {
    profileId,
  });
});
export const viewAndRateProfileFX = profD.createEffect(async (data: { profileId: number; rating: number }) => {
  await AX.post(`/hot-or-not/rating/view${qVK}`, {
    profileId: data.profileId,
  });
  await AX.post(`/hot-or-not/rating${qVK}`, data);
});
export const setDelayFX = profD.createEffect(async () => {
  await AX.post(`/hot-or-not/settings/notification${qVK}`);
});
export const removeDelayFX = profD.createEffect(async () => {
  await AX.delete(`/hot-or-not/settings/notification${qVK}`);
});
export const sendReportFX = profD.createEffect(async (data: { toBanId: number; reason: ReportReason }) => {
  await AX.post(`/hot-or-not/settings/report${qVK}`, data);
});

export const setProfUICurrId = profD.createEvent<number>();
export const setProfRating = profD.createEvent<number>();
export const setProfilesFinished = profD.createEvent();
export const setTimerPlaying = profD.createEvent<boolean>();
export const setTimerCD = profD.createEvent<number>();
export const setProfilesUserId = profD.createEvent<number>();

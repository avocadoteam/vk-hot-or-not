import { ProfileData, PublicInfo, PublicProfile } from '@core/types/profile';
import { combine, forward } from 'effector';
import { getUserFriendsFX } from '../friends/effects.config';
import { profD } from './domain.prof';
import {
  getProfileFX,
  getPublicProfileFX,
  getPublicProfilesFX,
  removeDelayFX,
  saveProfileFX,
  sendReportFX,
  setDelayFX,
  setProfilesFinished,
  setProfilesUserId,
  setProfRating,
  setProfUICurrId,
  setTimerCD,
  setTimerPlaying,
  viewAndRateProfileFX,
  viewProfileFX,
} from './effects.prof';

type ProfileState = {
  info: ProfileData | null;
};
type ProfUIState = {
  lastItemIds: number[];
  rating: number;
  noProfiles: boolean;
  profileUserId: number;
  reportIds: number[];
  isTimerPlaying: boolean;
};
type ProfTimerState = {
  countdown: number;
};

export const $profile = profD.createStore<ProfileState>({
  info: null,
});
export const $publicProfile = profD.createStore<PublicInfo>({
  profile: null,
  rated: null,
});
export const $profiles = profD.createStore<PublicProfile[]>([]);

export const $profUI = profD.createStore<ProfUIState>({
  lastItemIds: [],
  rating: 5,
  noProfiles: false,
  profileUserId: 0,
  reportIds: [],
  isTimerPlaying: false,
});
export const $profTimer = profD.createStore<ProfTimerState>({
  countdown: 3000,
});

$profUI.on(setTimerPlaying, (state, isTimerPlaying) => ({
  ...state,
  isTimerPlaying,
}));
$profTimer.on(setTimerCD, (state, countdown) => ({
  ...state,
  countdown,
}));

$profUI.on(setProfUICurrId, (state, userId) => ({
  ...state,
  lastItemIds: Array.from(new Set(state.lastItemIds.concat(userId))),
  rating: 5,
}));

$profUI.on(setProfilesUserId, (state, profileUserId) => ({
  ...state,
  profileUserId,
}));
$profUI.on(setProfRating, (state, rating) => ({
  ...state,
  rating: rating / 10,
}));
$profUI.on(setProfilesFinished, state => ({
  ...state,
  noProfiles: true,
}));
$profUI.on(sendReportFX.done, state => ({
  ...state,
  reportIds: state.reportIds.concat(state.profileUserId),
}));

$profile.on(getProfileFX.doneData, (state, info) => ({
  ...state,
  info,
}));

forward({
  from: [saveProfileFX.done, setDelayFX.done, removeDelayFX.done],
  to: getProfileFX,
});

forward({
  from: getUserFriendsFX.doneData.map(({ items }) => items),
  to: getPublicProfilesFX,
});

$profiles.on(getPublicProfilesFX.doneData, (_, data) => data);

$profUI.on(getPublicProfilesFX.doneData, (state, data) => ({
  ...state,
  noProfiles: !data.length,
}));
$publicProfile.on(getPublicProfileFX.doneData, (state, data) => data);

export const loadingRate = combine([viewProfileFX.pending, viewAndRateProfileFX.pending], ([a, b]) => a || b);

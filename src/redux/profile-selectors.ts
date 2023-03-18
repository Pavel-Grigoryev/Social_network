import {AppStateType} from "../types/types";

export const selectPhotoSmall = (state: AppStateType) => state.profilePage.profile?.photos.small;
export const selectProfileDataStatus = (state: AppStateType) => state.profilePage.profileDataStatus;
export const selectStatus = (state: AppStateType) => state.profilePage.status;
export const selectDataStatus = (state: AppStateType) => state.profilePage.dataStatus;

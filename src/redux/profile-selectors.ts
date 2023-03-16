import {AppStateType} from "../types/types";

export const selectPhotoSmall = (state: AppStateType) => state.profilePage.profile?.photos.small;

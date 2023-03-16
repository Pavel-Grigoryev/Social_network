import {AppStateType} from "../types/types";

export const selectIsAuth = (state: AppStateType) => state.auth.isAuth;
export const selectLogin = (state: AppStateType) => state.auth.login;
export const selectAva = (state: AppStateType) => state.auth.avatar;
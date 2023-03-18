import {AppStateType} from "../types/types";

export const selectAppStatus = (state: AppStateType) => state.app.appStatus;
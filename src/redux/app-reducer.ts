import {AppThunk} from "../types/types";
import {handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {getAuthMe} from "./auth-reducer";
import {ProfileDataStatusType} from "./profile-reducer";

const initialState = {
    isInitialized: false,
    error: '',
    appStatus: 'idle' as ProfileDataStatusType,
}

export const appReducer = (state = initialState, action: ActionsTypesApp): InitialStateType => {
    switch (action.type) {
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: true}
        case "APP/SET-ERROR":
        case "APP/SET-APP-STATUS":
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export default appReducer;

//Actions

export const setAppInitialized = () => ({
    type: "APP/SET-INITIALIZED"
}) as const;

const setAppErrorAC = (error: string = '') => ({
    type: "APP/SET-ERROR",
    payload: {error}
}) as const;

export const setAppStatusAC = (appStatus: ProfileDataStatusType) => ({
    type: "APP/SET-APP-STATUS",
    payload: {appStatus}
}) as const;

//Thunks

export const initializeApp = (): AppThunk => (dispatch) => {
    try {
        const res = dispatch(getAuthMe());
        dispatch(setAppInitialized());
    } catch (e) {
        const err = e as Error | AxiosError;
        return handleServerNetworkError(err, dispatch);
    }
}

export const setAppError = (error: string): AppThunk => (dispatch) => {
    dispatch(setAppErrorAC(error));
    setTimeout(() => {
        dispatch(setAppErrorAC());
    }, 3000)
}


//Types

type InitialStateType = typeof initialState;

type SetAppInitializedAT = ReturnType<typeof setAppInitialized>
type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
type SetAppStatusAT = ReturnType<typeof setAppStatusAC>

type ActionsTypesApp = SetAppInitializedAT | SetAppErrorAT | SetAppStatusAT;





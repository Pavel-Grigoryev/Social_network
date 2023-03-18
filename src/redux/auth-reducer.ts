import {authUserAPI, securityUserAPI} from "../api/api";
import {LoginFormDataType} from "../components/Login/Login";
import {AppThunk} from "../types/types";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {getUserProfile} from "./profile-reducer";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captcha: '',
    avatar: null as string | null
}

const authReducer = (state = initialState, action: ActionsTypesAuth): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET_USER_CAPTCHA":
        case "AUTH/SET_AVATAR":
        case "AUTH/SET_USER_DATA":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default authReducer;


//Actions

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captcha: string , avatar: string | null ) => ({
    type: "AUTH/SET_USER_DATA",
    payload: {userId, email, login, isAuth, captcha}
}) as const;

export const setCaptcha = (captcha: string) => ({
    type: "AUTH/SET_USER_CAPTCHA",
    payload: {captcha}
}) as const;

export const setAvatar = (avatar: string | null) => ({
    type: "AUTH/SET_AVATAR",
    payload: {avatar}
}) as const;

//Thunks

export const getAuthMe = (): AppThunk => {
    return async (dispatch) => {
        const res = await authUserAPI.me();
        if (res.data.resultCode === 0) {
            let {id, email, login} = res.data.data;
            dispatch(setAuthUserData(id, email, login, true, '', null));
             const userAuth = await dispatch(getUserProfile(id));
             dispatch(setAvatar(userAuth.photos.small))
        }
    }
}

export const loginAuthUser = (dataForm: LoginFormDataType): AppThunk => {
    return async (dispatch) => {
        try {
            const res = await authUserAPI.login(dataForm)
            if (res.data.resultCode === 0) {
                dispatch(getAuthMe());
                return res.data.messages[0]
            } else {
                if (res.data.resultCode === 10) {
                    dispatch(getUserCaptcha())
                }
                return Promise.reject(handleServerAppError(res.data, dispatch));
            }
        } catch (e) {
            const err = e as Error | AxiosError;
            return handleServerNetworkError(err, dispatch);
        }
    }
}

export const logoutAuthUser = (): AppThunk => {
    return async (dispatch) => {
        const res = await authUserAPI.logout();
        if (res.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false, '', null));
        }
    }
}

export const getUserCaptcha = (): AppThunk => async (dispatch) => {
    try {
        const res = await securityUserAPI.getCaptcha();
        dispatch(setCaptcha(res.data.url));
    } catch (e) {
        const err = e as Error | AxiosError;
        return handleServerNetworkError(err, dispatch);
    }
}

//Types

type setUserDataAT = ReturnType<typeof setAuthUserData>;
type setCaptchaAT = ReturnType<typeof setCaptcha>;
type setAvatarAT = ReturnType<typeof setAvatar>;
type ActionsTypesAuth = setUserDataAT | setCaptchaAT | setAvatarAT;
type InitialStateType = typeof initialState;



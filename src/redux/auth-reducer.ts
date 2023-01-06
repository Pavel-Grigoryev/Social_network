import {Dispatch} from "redux";
import {authUserAPI} from "../api/api";
import {LoginFormDataType} from "../components/Login/Login";
import {AppThunk} from "./redux-store";

export const setAuthUserData = (userId: number, email: string, login: string) => ({type: "SET_USER_DATA", data:{userId, email, login}}) as const;

export const loginAuthUserData = (userId: number, email: string) => ({type: "LOGIN_USER_DATA", data:{userId, email}}) as const;

export const getAuthMe = (): AppThunk => {
    return (dispatch) => {
        authUserAPI.me().then((data) => {
            if (data) {
                let {userId, email, login} = data;
                dispatch(setAuthUserData(userId, email, login));
            }
        });

    }
}

export const loginAuthUser = (dataForm: LoginFormDataType): AppThunk  => {
    return (dispatch) => {
        authUserAPI.login(dataForm).then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(getAuthMe());
                }
        });

    }
}

type setUserDataAT = ReturnType<typeof setAuthUserData>
type loginAuthUserDataAT = ReturnType<typeof loginAuthUserData>

type ActionsTypesAuth = setUserDataAT | loginAuthUserDataAT;



type InitialStateType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
};

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}



const authReducer = (state = initialState, action: ActionsTypesAuth): InitialStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        case "LOGIN_USER_DATA":
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

export default authReducer;


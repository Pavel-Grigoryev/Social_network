import {authUserAPI} from "../api/api";
import {LoginFormDataType} from "../components/Login/Login";
import {AppThunk} from "./redux-store";

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
                ...action.payload
            }
        default:
            return state;
    }
}

export default authReducer;


//Actions

export const setAuthUserData = (userId: number | null, email: string | null , login: string | null, isAuth: boolean) => ({type: "SET_USER_DATA", payload:{userId, email, login, isAuth}}) as const;

//Thunks

export const getAuthMe = (): AppThunk => {
    return (dispatch) => {
        authUserAPI.me().then((data) => {
            if (data) {
                let {id, email, login} = data;
                dispatch(setAuthUserData(id, email, login, true));
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

export const logoutAuthUser = (): AppThunk  => {
    return (dispatch) => {
        authUserAPI.logout().then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });

    }
}

//Types

type setUserDataAT = ReturnType<typeof setAuthUserData>

type ActionsTypesAuth = setUserDataAT;

type InitialStateType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
};



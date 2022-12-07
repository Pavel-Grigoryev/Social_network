import {Dispatch} from "redux";
import {authUserAPI} from "../api/api";

export const setAuthUserData = (userId: number, email: string, login: string) => ({type: "SET_USER_DATA", data:{userId, email, login}}) as const;

export const getAuthUser = () => {
    return (dispatch: Dispatch<ActionsTypesAuth>) => {
        authUserAPI.getAuthUserData().then((data) => {
            if (data) {
                let {userId, email, login} = data;
                dispatch(setAuthUserData(userId, email, login));
            }
        });

    }
}

type setUserDataAT = ReturnType<typeof setAuthUserData>

type ActionsTypesAuth = setUserDataAT;



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
        default:
            return state;
    }
}

export default authReducer;


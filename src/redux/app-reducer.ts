import {AppThunk} from "./redux-store";
import {authUserAPI} from "../api/api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {getAuthMe} from "./auth-reducer";

const initialState  = {
    isInitialized: false
}

export const appReducer = (state = initialState, action: ActionsTypesApp): InitialStateType => {
    switch (action.type) {
        case "APP/SET-INITIALIZED":
            return {
                ...state,
                isInitialized: true
            }
        default:
            return state;
    }
}

export default appReducer;

//Actions

export const setAppInitialized = () => ({
    type: "APP/SET-INITIALIZED"
}) as const;

//Thunks

export const initializeApp = (): AppThunk => {
    return (dispatch) => {
        try {
            const res = dispatch(getAuthMe());
            dispatch(setAppInitialized());
        } catch (e) {
            const err = e as Error | AxiosError;
            return handleServerNetworkError(err);
        }
    }
}

//Types

type InitialStateType = typeof initialState;

type setAppInitializedAT = ReturnType<typeof setAppInitialized>

type ActionsTypesApp = setAppInitializedAT;





import {AppThunk} from "./redux-store";
import {handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {getAuthMe} from "./auth-reducer";

const initialState  = {
    isInitialized: false,
    error: ''
}

export const appReducer = (state = initialState, action: ActionsTypesApp): InitialStateType => {
    switch (action.type) {
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: true}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
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
    error
}) as const;

//Thunks

export const initializeApp = (): AppThunk => (dispatch) => {
        try {
            const res = dispatch(getAuthMe());
            dispatch(setAppInitialized());
        } catch (e) {
            const err = e as Error | AxiosError;
            return handleServerNetworkError(err);
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

type ActionsTypesApp = SetAppInitializedAT | SetAppErrorAT;





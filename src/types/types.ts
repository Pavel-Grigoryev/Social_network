import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {rootReduser} from "../redux/redux-store";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>;

export type AppStateType = ReturnType<typeof rootReduser>;

export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AnyAction>;
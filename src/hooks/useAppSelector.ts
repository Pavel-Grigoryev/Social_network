import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppStateType} from "types/types";


export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
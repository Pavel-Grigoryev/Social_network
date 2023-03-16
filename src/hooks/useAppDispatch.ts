import {useDispatch} from "react-redux";
import {AppDispatchType} from "types/types";


export const useAppDispatch = () => useDispatch<AppDispatchType>();
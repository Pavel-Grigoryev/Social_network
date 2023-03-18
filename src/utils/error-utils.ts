import {CommonResponseType} from "../api/api";
import {AxiosError} from "axios";
import {message} from 'antd';
import {setAppStatusAC} from "../redux/app-reducer";
import {Dispatch} from "redux";


const messageStyle = {
    marginTop: '80px',
}

export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length !== 0) {
        message.error(
            {
                content: data.messages[0],
                style: messageStyle
            })
        dispatch(setAppStatusAC('succeeded'));
        return data.messages;

    } else {
        message.error(
            {
                content: "Some error occurred",
                style: messageStyle
            })
        dispatch(setAppStatusAC('succeeded'));
        return "Some error occurred";
    }

}

export const handleServerNetworkError = (err: Error | AxiosError, dispatch: Dispatch) => {
    message.error(
        {
            content: err.message,
            style: messageStyle
        })
    dispatch(setAppStatusAC('succeeded'));
    return err.message;
}

import {CommonResponseType} from "../api/api";
import {AxiosError} from "axios";
import {message} from 'antd';


const messageStyle = {
    marginTop: '80px',
}

export const handleServerAppError = <T>(data: CommonResponseType<T>) => {
    if (data.messages.length !== 0) {
        message.error(
            {
                content: data.messages[0],
                style: messageStyle
            })
        return data.messages;

    } else {
        message.error(
            {
                content: "Some error occurred",
                style: messageStyle
            })
        return "Some error occurred";
    }

}

export const handleServerNetworkError = (err: Error | AxiosError) => {
    message.error(
        {
            content: err.message,
            style: messageStyle
        })
    return err.message;
}

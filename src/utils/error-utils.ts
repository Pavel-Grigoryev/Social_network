import {CommonResponseType} from "../api/api";
import {AxiosError} from "axios";


export const handleServerAppError = <T>(data: CommonResponseType<T>) => {
   if (data.messages.length !==0) {
        return data.messages[0];
    } else {
        return "Some error occurred";
    }

}

export const handleServerNetworkError = (err: Error | AxiosError) => {
    return err.message;
}

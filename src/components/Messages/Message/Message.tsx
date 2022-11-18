import React from "react";
import s from '../Messages.module.css'


type MessagePropsType = {
    message: string
}
const Message: React.FC<MessagePropsType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
};
export default Message;
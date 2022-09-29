import React from "react";
import s from './../Dialods.module.css'
import {MessageType} from "../../../App";

const Message: React.FC<MessageType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
};
export default Message;
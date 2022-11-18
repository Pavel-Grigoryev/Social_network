import React from "react";
import s from '../Messages.module.css'
import {NavLink} from "react-router-dom";

type MessageItemPropsType = {
    name: string
    id: number
}



const MessageItem: React.FC<MessageItemPropsType> = (props) => {
    let path = '/messages/' + props.id;
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default MessageItem;
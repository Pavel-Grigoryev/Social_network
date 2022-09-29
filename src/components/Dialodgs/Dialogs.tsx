import React from "react";
import s from './Dialods.module.css'
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import {MyDataType} from "../../App";


const Dialogs: React.FC<MyDataType> = ({dialogs, messages}) => {

    // @ts-ignore
    const dialogsElement = dialogs.map(dialog => (<DialogItem name={dialog.name} id={dialog.id}/>))
    // @ts-ignore
    const messagesElement = messages.map(message => (<Message message={message.message}/>))

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                {messagesElement}
            </div>

        </div>
    );
}

export default Dialogs;
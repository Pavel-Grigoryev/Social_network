import React from "react";
import s from './Messages.module.css'
import MessageItem from "./MessagesItem/MessagesItem";
import Message from "./Message/Message";
import {MessagesPropsType} from "./MessagesContainer";
import {AddMessageForm} from "./AddMessageForm/AddMessageForm";

const Messages: React.FC<MessagesPropsType> = ({messagesPage, sendMessage}) => {

    const MessageItemElement = messagesPage.dialogs.map(dialog => (
        <MessageItem key={dialog.id} name={dialog.name} id={dialog.id}/>));

    const messagesElement = messagesPage.messages.map(message => (<Message key={message.id}
                                                                           message={message.message}/>));

    const addNewMessage = (newMessageBody: string) => {
        sendMessage(newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {MessageItemElement}
            </div>
            <div className={s.messages}>
                {messagesElement}
            </div>
            <div className={s.addMessageBlock}>
                <AddMessageForm addNewMessage={addNewMessage}/>
            </div>
        </div>
    );
}

export default Messages;


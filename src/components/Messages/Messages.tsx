import React, {ChangeEvent} from "react";
import s from './Messages.module.css'
import MessageItem from "./MessagesItem/MessagesItem";
import Message from "./Message/Message";
import {MessagesPropsType} from "./MessagesContainer";
import {Redirect} from "react-router-dom";



const Messages: React.FC<MessagesPropsType> = ({messagesPage, updateNewMessageBody, sendMessage, isAuth}) => {

    const MessageItemElement = messagesPage.dialogs.map(dialog => (
        <MessageItem key={dialog.id} name={dialog.name} id={dialog.id}/>));

    const messagesElement = messagesPage.messages.map(message => (<Message key={message.id}
                                                                           message={message.message}/>));

    const onNewMessageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateNewMessageBody(e.currentTarget.value);
    }

    const onSendMessageClickHandler = () => {
        sendMessage();
    }

    if (!isAuth) {
        return <Redirect to={'/login'}/>
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
                <textarea placeholder={'Enter your message'}
                          value={messagesPage.newMessageBody}
                          onChange={onNewMessageChangeHandler}
                ></textarea>
                <button onClick={onSendMessageClickHandler}>Add message</button>
            </div>
        </div>
    );
}

export default Messages;
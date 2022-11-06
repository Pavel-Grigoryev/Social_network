import React from "react";

import {MessagesPageType, sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/messages-reducer";
import {AppStateType} from "../../redux/redux-store";
import Messages from "./Messages";
import {connect} from "react-redux";
import {Dispatch} from "redux";



/*type MessageContainerPropsType = {
    store: StoreReduxType
}*/

/*export const MessagesContainer1 = () => {

    const onNewMessageChange = (body: string) => {
        store.dispatch(updateNewMessageBodyCreator(body));
    }

    const onSendMessageClick = () => {
        store.dispatch(sendMessageCreator());
    }

    return <Messages messagesPage={store.getState().messagesPage} sendMessage={onSendMessageClick}
                     updateNewMessageBody={onNewMessageChange}/>
}*/

type MapStateToPropsType = {
    messagesPage: MessagesPageType
}

type mapDispatchToPropsType = {
    sendMessage: () => void
    updateNewMessageBody: (body: string) => void
}

export type MessagesPropsType = MapStateToPropsType & mapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        messagesPage: state.messagesPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator())
        },
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyCreator(body));
        }
    }
}

export const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

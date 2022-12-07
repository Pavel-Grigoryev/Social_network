import React from "react";

import {MessagesPageType, sendMessageAC, updateNewMessageBodyAC} from "../../redux/messages-reducer";
import {AppStateType} from "../../redux/redux-store";
import Messages from "./Messages";
import {connect} from "react-redux";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    messagesPage: MessagesPageType
    isAuth: boolean
}

type mapDispatchToPropsType = {
    sendMessage: () => void
    updateNewMessageBody: (body: string) => void
}

export type MessagesPropsType = MapStateToPropsType & mapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        messagesPage: state.messagesPage,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        sendMessage: () => {
            dispatch(sendMessageAC())
        },
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyAC(body));
        }
    }
}

export const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

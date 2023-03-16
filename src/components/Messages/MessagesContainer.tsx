import React, {ComponentType} from "react";

import {MessagesPageType, sendMessageAC} from "../../redux/messages-reducer";
import {AppStateType} from "../../types/types";
import Messages from "./Messages";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";

type MapStateToPropsType = {
    messagesPage: MessagesPageType
}

type mapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
}

export type MessagesPropsType = MapStateToPropsType & mapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        messagesPage: state.messagesPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageAC(newMessageBody))
        }
    }
}

 const MessagesContainer = compose<ComponentType>(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Messages)

export default MessagesContainer;




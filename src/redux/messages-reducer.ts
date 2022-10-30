import {ActionsTypes, MessagesPageType} from "./store";

export const sendMessageCreator = () => ({type: "SEND-MESSAGE"}) as const;

export const updateNewMessageBodyCreator = (body: string) => (
    {
        type: "UPDATE-NEW-MESSAGE-BODY",
        body: body
    }) as const;

let  initialState: MessagesPageType = {
    dialogs: [
        {id: 1, name: "Pavel"},
        {id: 2, name: "Dasha"},
        {id: 3, name: "Max"},
        {id: 4, name: "Luda"},
        {id: 5, name: "Vadim"}
    ],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you"},
        {id: 3, message: "I'm fine"},
        {id: 4, message: "Yo"},
        {id: 5, message: "He-he-he"}
    ],
    newMessageBody: ""
}

const messagesReducer = (state = initialState, action: ActionsTypes) => {

    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-BODY":
            state.newMessageBody = action.body;
            return state
        case "SEND-MESSAGE":
            let body = state.newMessageBody;
            state.messages.push({id: 6, message: body})
            state.newMessageBody = '';
            return state
        default:
            return state
    }
}

export default messagesReducer;

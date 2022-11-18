
export const sendMessageAC = () => ({type: "SEND-MESSAGE"}) as const;

export const updateNewMessageBodyAC = (body: string) => (
    {
        type: "UPDATE-NEW-MESSAGE-BODY",
        body: body
    }) as const;

type ActionsTypes = ReturnType<typeof sendMessageAC> | ReturnType<typeof updateNewMessageBodyAC>

type MessageType = {
    message: string
    id: number
};

type DialogsItemType = {
    name: string
    id: number
};

export type MessagesPageType = {
    dialogs: DialogsItemType[]
    messages: MessageType[]
    newMessageBody: string
};

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

export const messagesReducer = (state = initialState, action: ActionsTypes): MessagesPageType => {

    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-BODY":
            return {...state, newMessageBody: state.newMessageBody = action.body}
        case "SEND-MESSAGE":
            let body = state.newMessageBody;
            return {...state,
                messages:  [...state.messages, {id: 6, message: body}],
                newMessageBody: ''
            }
        default:
            return state
    }
}

export default messagesReducer;

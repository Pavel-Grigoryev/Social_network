




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
    ]
}

export const messagesReducer = (state = initialState, action: ActionsTypes): MessagesPageType => {

    switch (action.type) {
        case "SEND-MESSAGE":
            let body = action.newMessageBody;
            return {...state,
                messages:  [...state.messages, {id: 6, message: body}]
            }
        default:
            return state
    }
}

export default messagesReducer;


//Actions

export const sendMessageAC = (newMessageBody: string) => ({type: "SEND-MESSAGE", newMessageBody}) as const;


//Types

type ActionsTypes = ReturnType<typeof sendMessageAC>

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
};

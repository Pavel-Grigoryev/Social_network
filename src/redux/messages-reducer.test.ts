import messagesReducer, {MessagesPageType, sendMessageAC} from "./messages-reducer";

test('new messages should be added in messages array', () => {
    const startState: MessagesPageType = {
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

    const action = sendMessageAC('Hello');

    const endState = messagesReducer(startState, action)
    //

   expect(endState.dialogs.length).toBe(5);
   expect(endState.messages.length).toBe(6);
    expect(endState.messages[5].message).toBe('Hello');
    expect(endState.messages[5].id).toBeTruthy();
});
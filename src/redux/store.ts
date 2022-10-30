import messagesReducer, {sendMessageCreator, updateNewMessageBodyCreator} from "./messages-reducer";
import profileReducer, {addPostActionCreator, updateNewPostActionCreator} from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

type MessageType = {
    message: string
    id: number
};

type DialogsItemType = {
    name: string
    id: number
};

export type PostType = {
    id: number
    message: string
    likeCount: number
};

export type MessagesPageType = {
    dialogs: DialogsItemType[]
    messages: MessageType[]
    newMessageBody: string
};

export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
};
export type SidebarType = {};

export type RootStateType = {
    messagesPage: MessagesPageType
    profilePage: ProfilePageType
    sidebar: SidebarType
}

export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: () => void
    subscribe: (observer:
                    () => void) => void
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updateNewPostActionCreator>
    | ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof updateNewMessageBodyCreator>;

let store: StoreType = {
    _state: {
        messagesPage: {
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
        },
        profilePage: {
            posts: [
                {id: 1, message: "Hi, how are you?", likeCount: 10},
                {id: 2, message: "It's my first post", likeCount: 20},
                {id: 3, message: "The weather is good.", likeCount: 30}
            ],
            newPostText: ""
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('state changed')
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {

        this._state.messagesPage = messagesReducer(this._state.messagesPage, action);
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber();

    }
}

export default store;
// window.store = store;




import {rerenderEntireTree} from "../render";

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
};

export type ProfilePageType = {
    posts: PostType[]
};

type SidebarType = {};

export type RootStateType = {
    messagesPage: MessagesPageType
    profilePage: ProfilePageType
    sidebar: SidebarType
}

export const state = {
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
        ]
    },
    profilePage: {
        posts: [
            {id: 1, message: "Hi, how are you?", likeCount: 10},
            {id: 2, message: "It's my first post", likeCount: 20},
            {id: 3, message: "The weather is good.", likeCount: 30}
        ]
    },
    sidebar: {}
};

export const addPost = (postMessage: string) => {
    let newPost: PostType = {
        id: 4,
        message: postMessage,
        likeCount: 0
    };
    state.profilePage.posts.push(newPost);

    rerenderEntireTree(state);
}

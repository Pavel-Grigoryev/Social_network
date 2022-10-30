import {ActionsTypes, PostType, ProfilePageType} from "./store";

export const addPostActionCreator = () => ({type: "ADD-POST"}) as const;

export const updateNewPostActionCreator = (newText: string) => (
    {
        type: "UPDATE-NEW-POST-TEXT",
        newText: newText
    }) as const;

let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likeCount: 10},
        {id: 2, message: "It's my first post", likeCount: 20},
        {id: 3, message: "The weather is good.", likeCount: 30}
    ],
    newPostText: ""
}

const profileReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'ADD-POST':
            let newPost: PostType = {
                id: 4,
                message: state.newPostText,
                likeCount: 0
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case 'UPDATE-NEW-POST-TEXT':
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export default profileReducer;

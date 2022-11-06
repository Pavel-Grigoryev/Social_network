import {ActionsTypes} from "./store";

export const addPostActionCreator = () => ({type: "ADD-POST"}) as const;

export const updateNewPostActionCreator = (newText: string) => (
    {
        type: "UPDATE-NEW-POST-TEXT",
        newText: newText
    }) as const;

export type PostType = {
    id: number
    message: string
    likeCount: number
};

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likeCount: 10},
        {id: 2, message: "It's my first post", likeCount: 20},
        {id: 3, message: "The weather is good.", likeCount: 30}
    ] as PostType[],
    newPostText: ""
}

export type InitialStateType = typeof initialState;


const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: PostType = {
                id: 4,
                message: state.newPostText,
                likeCount: 0
            };
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost)
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case 'UPDATE-NEW-POST-TEXT': {
            let stateCopy = {...state}
                stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        default:
            return state;
    }
}

export default profileReducer;

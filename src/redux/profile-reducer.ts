import {Dispatch} from "redux";
import {profileAPI} from "../api/api";


export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}

export const addPostActionCreator = () => ({type: "ADD-POST"}) as const;

export const updateNewPost = (newText: string) => (
    {
        type: "UPDATE-NEW-POST-TEXT",
        newText: newText
    }) as const;

export const setUserProfile = (profile: ProfileType) => (
    {
        type: "SET-USER-PROFILE",
        profile
    }) as const;

export const setUserStatusAC = (status: string) => (
    {
        type: "SET-USER-STATUS",
        status
    }) as const;

export const changeUserStatusAC = (status: string) => (
    {
        type: "CHANGE-USER-STATUS",
        status
    }) as const;

export const getUserStatus = (userId: number) => {
    return (dispatch: Dispatch<ActionsTypesProfile>) => {
        profileAPI.getStatus(userId).then((res) => {
            dispatch(setUserStatusAC(res.data));
        });
    }
}

export const changeUserStatus = (status: string) => {
    return (dispatch: Dispatch<ActionsTypesProfile>) => {
        profileAPI.changeStatus(status).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeUserStatusAC(status));
            }
        });
    }
}

export const getUserProfile = (userId: number) => {
    return (dispatch: Dispatch<ActionsTypesProfile>) => {
        profileAPI.getProfile(userId).then((data) => {
            dispatch(setUserProfile(data));
        });
    }
}




type ActionsTypesProfile = ReturnType<typeof addPostActionCreator> | ReturnType<typeof updateNewPost> | ReturnType<typeof setUserProfile> | ReturnType<typeof setUserStatusAC> | ReturnType<typeof changeUserStatusAC>


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
    newPostText: "",
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState;


export const profileReducer = (state = initialState, action: ActionsTypesProfile): InitialStateType => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: PostType = {
                id: 4,
                message: state.newPostText,
                likeCount: 0
            };
            return {...state, posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case 'UPDATE-NEW-POST-TEXT': {
            return {...state, newPostText: action.newText};
        }
        case "SET-USER-PROFILE": {
            return {...state, profile: action.profile};
        }
        case "SET-USER-STATUS":
            return {...state, status: action.status}
        case "CHANGE-USER-STATUS":
            return {...state, status: action.status}
        default:
            return state;
    }
}

export default profileReducer;

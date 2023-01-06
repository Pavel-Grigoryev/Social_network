import {Dispatch} from "redux";
import {profileAPI} from "../api/api";

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likeCount: 10},
        {id: 2, message: "It's my first post", likeCount: 20},
        {id: 3, message: "The weather is good.", likeCount: 30}
    ] as PostType[],
    profile: null as ProfileType | null,
    status: ''
}

export const profileReducer = (state = initialState, action: ActionsTypesProfile): InitialStateType => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: PostType = {
                id: 4,
                message: action.newPost,
                likeCount: 0
            };
            return {...state, posts: [...state.posts, newPost]};
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

//Action

export const addPostAC = (newPost: string) => ({type: "ADD-POST", newPost}) as const;


export const setUserProfileAC = (profile: ProfileType) => (
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


//Thunks

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
            dispatch(setUserProfileAC(data));
        });
    }
}

//Types

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

export type InitialStateType = typeof initialState;

type ActionsTypesProfile = ReturnType<typeof addPostAC> | ReturnType<typeof setUserProfileAC> | ReturnType<typeof setUserStatusAC> | ReturnType<typeof changeUserStatusAC>


export type PostType = {
    id: number
    message: string
    likeCount: number
};
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likeCount: 10},
        {id: 2, message: "It's my first post", likeCount: 20},
        {id: 3, message: "The weather is good.", likeCount: 30}
    ] as PostType[],
    profile:null as ProfileType | null,
    status: ''
}

export const profileReducer = (state = initialState, action: ActionsTypesProfile): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/ADD-POST': {
            let newPost: PostType = {
                id: 4,
                message: action.newPost,
                likeCount: 0
            };
            return {...state, posts: [...state.posts, newPost]};
        }
        case "PROFILE/DELETE-POST": {
            return {...state, posts: state.posts.filter(p => p.id !== action.id)};
        }
        case "PROFILE/SET-USER-PROFILE": {
            return {...state, profile: action.profile};
        }
        case "PROFILE/SET-USER-STATUS":
            return {...state, status: action.status}
        case "PROFILE/CHANGE-USER-STATUS":
            return {...state, status: action.status}
        case "PROFILE/SAVE-PHOTOS-SUCCESS":
            debugger
            return {...state, profile: {...state.profile, photos: action.photos } as ProfileType | null}
        default:
            return state;
    }
}

export default profileReducer;

//Action

export const addPostAC = (newPost: string) => ({type: "PROFILE/ADD-POST", newPost}) as const;
export const deletePostAC = (id: number) => ({type: "PROFILE/DELETE-POST", id}) as const;

export const savePhotoSuccessAC = (photos: PhotosType) => ({type: "PROFILE/SAVE-PHOTOS-SUCCESS", photos}) as const;


export const setUserProfileAC = (profile: ProfileType) => (
    {
        type: "PROFILE/SET-USER-PROFILE",
        profile
    }) as const;

export const setUserStatusAC = (status: string) => (
    {
        type: "PROFILE/SET-USER-STATUS",
        status
    }) as const;

export const changeUserStatusAC = (status: string) => (
    {
        type: "PROFILE/CHANGE-USER-STATUS",
        status
    }) as const;


//Thunks

export const getUserStatus = (userId: number) => async (dispatch: Dispatch<ActionsTypesProfile>) => {
    const res = await profileAPI.getStatus(userId);
    dispatch(setUserStatusAC(res.data));
}

export const changeUserStatus = (status: string) => async (dispatch: Dispatch<ActionsTypesProfile>) => {
    const res = await profileAPI.changeStatus(status)
    if (res.data.resultCode === 0) {
        dispatch(changeUserStatusAC(status));
    }
}

export const getUserProfile = (userId: number) => async (dispatch: Dispatch<ActionsTypesProfile>) => {
       const res = await profileAPI.getProfile(userId)
            dispatch(setUserProfileAC(res));
    }

export const savePhoto = (file: any) => async (dispatch: Dispatch<ActionsTypesProfile>) => {
    debugger
    const res = await profileAPI.savePhoto(file)
    dispatch(savePhotoSuccessAC(res.data.data.photos));

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
    photos: PhotosType
}

export type PhotosType = {
    small: string
    large: string
}

export type InitialStateType = typeof initialState;

type ActionsTypesProfile =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setUserStatusAC>
    | ReturnType<typeof changeUserStatusAC>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof savePhotoSuccessAC>
    ;


export type PostType = {
    id: number
    message: string
    likeCount: number
};
import {profileAPI} from "../api/api";
import {ProfilePayloadType} from "../components/Profile/ProfileInfo/ProfileDataForm/ProfileDataForm";
import {AppThunk} from "../types/types";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setAvatar} from "./auth-reducer";

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likeCount: 10},
        {id: 2, message: "It's my first post", likeCount: 20},
        {id: 3, message: "The weather is good.", likeCount: 30}
    ] as PostType[],
    profile: null as ProfileType | null,
    status: '',
    profileDataStatus: 'idle' as ProfileDataStatusType,
    dataStatus: 'idle' as ProfileDataStatusType,
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
        case "PROFILE/CHANGE-USER-DATA-STATUS":
        case "PROFILE/CHANGE-USER-ENTITY-STATUS":
            return {...state, ...action.payload}
        case "PROFILE/UPDATE-PROFILE-DATA-STATUS":
            return {...state, profileDataStatus: action.profileDataStatus}
        case "PROFILE/SAVE-PHOTOS-SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType | null}
        default:
            return state;
    }
}

export default profileReducer;

//Action

export const addPostAC = (newPost: string) => ({type: "PROFILE/ADD-POST", newPost}) as const;
export const deletePostAC = (id: number) => ({type: "PROFILE/DELETE-POST", id}) as const;

export const setProfileDataStatusAC = (profileDataStatus: ProfileDataStatusType) => ({
    type: "PROFILE/UPDATE-PROFILE-DATA-STATUS",
    profileDataStatus
}) as const;

export const savePhotoSuccessAC = (photos: PhotosType) => ({type: "PROFILE/SAVE-PHOTOS-SUCCESS", photos}) as const;

export const setUserProfileAC = (profile: ProfileType) => (
    {
        type: "PROFILE/SET-USER-PROFILE",
        profile
    }) as const;

export const setUserStatusAC = (status: string) => (
    {
        type: "PROFILE/SET-USER-STATUS",
        payload:{status}
    }) as const;

export const changeUserDataStatusAC = (profileDataStatus: ProfileDataStatusType) => (
    {
        type: "PROFILE/CHANGE-USER-DATA-STATUS",
        payload: {profileDataStatus}
    }) as const;

/***
 * change value when user's status loading from server
 *
 */
export const changeUserEntityStatusAC = (dataStatus: ProfileDataStatusType) => (
    {
        type: "PROFILE/CHANGE-USER-ENTITY-STATUS",
        payload: {dataStatus}
    }) as const;


//Thunks

export const getUserStatus = (userId: number): AppThunk => async (dispatch) => {
        const res = await profileAPI.getStatus(userId);
        dispatch(setUserStatusAC(res.data));
        return res

}

export const changeUserStatus = (status: string): AppThunk => async (dispatch) => {
    try {
        dispatch(changeUserEntityStatusAC('loading'));
        const res = await profileAPI.changeStatus(status)
        if (res.data.resultCode === 0) {
            dispatch(setUserStatusAC(status));
            dispatch(changeUserEntityStatusAC('succeeded'));
        } else {
            dispatch(setProfileDataStatusAC("failed"));
            return Promise.reject(handleServerAppError(res.data));
        }
    } catch (e) {
        dispatch(changeUserEntityStatusAC("failed"));
        const err = e as Error | AxiosError;
        return Promise.reject(handleServerNetworkError(err));
    }

}

export const getUserProfile = (userId: number): AppThunk<Promise<ProfileType>> => async (dispatch) => {
        const res = await profileAPI.getProfile(userId)
        dispatch(setUserProfileAC(res));
        return res
    }

export const updateUserProfile = (data: ProfilePayloadType): AppThunk => async (dispatch, getState) => {
    try {
        const userId = getState().profilePage.profile?.userId;
        if (userId) {
            const res = await profileAPI.updateProfile(data)
            if (res.data.resultCode === 0) {
                dispatch(setProfileDataStatusAC("succeeded"));
                dispatch(getUserProfile(userId));
            } else {
                dispatch(setProfileDataStatusAC("failed"));
                return Promise.reject(handleServerAppError(res.data));
            }
        }
    } catch (e) {
        dispatch(setProfileDataStatusAC("failed"));
        const err = e as Error | AxiosError;
        return Promise.reject(handleServerNetworkError(err));
    }
}

export const savePhoto = (file: File): AppThunk<Promise<string>> => async (dispatch) => {
    try {
        const res = await profileAPI.savePhoto(file);
        if (res.data.resultCode === 0) {
            dispatch(savePhotoSuccessAC(res.data.data.photos));
            dispatch(setAvatar(res.data.data.photos.small));
            return Promise.resolve('Upload successful')
        } else {
            return Promise.reject(handleServerAppError(res.data));
        }
    } catch (e) {
        const err = e as Error | AxiosError;
        return Promise.reject(handleServerNetworkError(err));
    }
}


//Types

export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactType
    photos: PhotosType
}

export type PhotosType = {
    small: string
    large: string
}

export type ContactType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type InitialStateType = typeof initialState;

type ActionsTypesProfile =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setUserStatusAC>
    | ReturnType<typeof changeUserDataStatusAC>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof savePhotoSuccessAC>
    | ReturnType<typeof setProfileDataStatusAC>
    | ReturnType<typeof changeUserEntityStatusAC>
    ;


export type PostType = {
    id: number
    message: string
    likeCount: number
};

export type ProfileDataStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
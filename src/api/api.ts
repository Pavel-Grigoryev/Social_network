import axios from "axios";
import {UserType} from "../redux/users-reducer";
import {PhotosType, ProfileType} from "../redux/profile-reducer";
import {LoginFormDataType} from "../components/Login/Login";
import {ProfilePayloadType} from "../components/Profile/ProfileInfo/ProfileDataForm/ProfileDataForm";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '924cb8b4-087a-45b1-8c8f-f88504975a06',
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<usersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });
    },

    followUser (userId: number) {
        return instance.post<CommonResponseType>(`follow/${userId}`);
    },

    unfollowUser (userId: number) {
        return instance.delete<CommonResponseType>(`follow/${userId}`);
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then((response) => {
            return response.data
        });
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },

    changeStatus(status: string) {
        return instance.put<CommonResponseType>(`profile/status`, {status})
    },

    updateProfile(date: ProfilePayloadType) {
        return instance.put<CommonResponseType>(`profile`, date)
    },

    savePhoto(file: File) {
        let formData = new FormData();
        formData.append("image", file)
        return instance.put<CommonResponseType<PhotosResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });
    }
}

export const authUserAPI = {
    me() {
        return instance.get<CommonResponseType<AuthUserResponseDataType>>(`auth/me`
        )
    },
    login(dataForm: LoginFormDataType) {
        return instance.post<CommonResponseType<AuthUserLoginResponseDataType>>(`auth/login`, dataForm);
    },
    logout() {
        return instance.delete<CommonResponseType>(`auth/login`);
    }
}

export const securityUserAPI = {
   getCaptcha() {
       return instance.get<CaptchaResponseType>(`security/get-captcha-url`)
   }
}



//Types

export type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

type usersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

type AuthUserResponseDataType = {
    id: number
    email: string
    login: string
}

type AuthUserLoginResponseDataType = {
    userId: number
}

type PhotosResponseDataType = {
    photos: PhotosType
}

type CaptchaResponseType = {
    url: string
}
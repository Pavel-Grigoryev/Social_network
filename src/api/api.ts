import axios from "axios";
import {UserType} from "../redux/users-reducer";
import {ProfileType} from "../redux/profile-reducer";
import {LoginFormDataType} from "../components/Login/Login";

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
        return instance.post<CommonResponseType>(`follow/${userId}`).then((response) => {
            if (response.data.resultCode == 0) {
              return response.data.data
            }
        });
    },

    unfollowUser (userId: number) {
        return instance.delete<CommonResponseType>(`follow/${userId}`).then((response) => {
            if (response.data.resultCode == 0) {
                return response.data.data
            }
        });
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
    }
}

export const authUserAPI = {
    me() {
        return instance.get<CommonResponseType<AuthUserResponseDataType>>(`auth/me`
        ).then((response) => {
            if (response.data.resultCode === 0) {
                return response.data.data;
            }
        });
    },
    login(dataForm: LoginFormDataType) {
        return instance.post<CommonResponseType<AuthUserLoginResponseDataType>>(`auth/login`, dataForm);
    },
    logout() {
        return instance.delete<CommonResponseType>(`auth/login`);
    }
}

//Types

type CommonResponseType<T = {}> = {
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
    userId: number
    email: string
    login: string
}

type AuthUserLoginResponseDataType = {
    userId: number
}
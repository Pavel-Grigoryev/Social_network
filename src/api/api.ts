import axios from "axios";
import {UserType} from "../redux/users-reducer";
import {ProfileType} from "../redux/profile-reducer";

type CommonResponseType<T> = {
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


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<usersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });
    },

    followUser (userId: number) {
        return instance.post<CommonResponseType<{}>>(`follow/${userId}`).then((response) => {
            if (response.data.resultCode == 0) {
              return response.data.data
            }
        });
    },

    unfollowUser (userId: number) {
        return instance.delete<CommonResponseType<{}>>(`follow/${userId}`).then((response) => {
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
    }
}

export const authUserAPI = {
    getAuthUserData() {
        return instance.get<CommonResponseType<AuthUserResponseDataType>>(`auth/me`
        ).then((response) => {
            if (response.data.resultCode === 0) {
                return response.data.data;
            }
        });
    }
}

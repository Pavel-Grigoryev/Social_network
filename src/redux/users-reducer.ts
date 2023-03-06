import {usersAPI} from "../api/api";
import {Dispatch} from "redux";

export const userReducer = (state = initialState, action: ActionsTypesUsers): InitialStateType => {
    switch (action.type) {
        case "USERS/FOLLOW":
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)};
        case "USERS/UNFOLLOW":
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)};
        case "USERS/SET_USERS":
            return {...state, users: action.users};
        case "USERS/SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage};
        case "USERS/SET_TOTAL_USERS_COUNT":
            return {...state, totalUsersCount: action.totaUsersCount};
        case "USERS/TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching};
        case "USERS/TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
}

export default userReducer;

//Actions

export const follow = (userId: number) => ({type: "USERS/FOLLOW", userId}) as const;
export const unfollow = (userId: number) => ({type: "USERS/UNFOLLOW", userId}) as const;
export const setUsers = (users: UserType[]) => ({type: "USERS/SET_USERS", users}) as const;
export const setCurrentPage = (currentPage: number) => ({type: "USERS/SET_CURRENT_PAGE", currentPage}) as const;
export const setTotalUsersCount = (totaUsersCount: number) => ({
    type: "USERS/SET_TOTAL_USERS_COUNT",
    totaUsersCount
}) as const;
export const toggleIsFetching = (isFetching: boolean) => ({type: "USERS/TOGGLE_IS_FETCHING", isFetching}) as const;
export const toggleFollowingProgress = (userId: number, isFetching: boolean) => ({
    type: "USERS/TOGGLE_IS_FOLLOWING_PROGRESS",
    userId,
    isFetching
}) as const;

//Thunks

export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: Dispatch<ActionsTypesUsers>) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch: Dispatch<ActionsTypesUsers>, userId: number, apiMethod: Function, actionCreator: Function) => {
    dispatch(toggleFollowingProgress(userId, true));
    const res = await apiMethod(userId);
    if (res.data.resultCode == 0) {
        dispatch(actionCreator(userId));
        dispatch(toggleFollowingProgress(userId, false));
    }
}

export const acceptUnFollow = (userId: number) => async (dispatch: Dispatch<ActionsTypesUsers>) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unfollow)
}

export const acceptFollow = (userId: number) => async (dispatch: Dispatch<ActionsTypesUsers>) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), follow);
}

//Types

type ActionsTypesUsers = ReturnType<typeof follow> | ReturnType<typeof unfollow> | ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> | ReturnType<typeof setTotalUsersCount> | ReturnType<typeof toggleIsFetching> |
    ReturnType<typeof toggleFollowingProgress>;

type LocationType = {
    city: string
    country: string
}

type PhotosType = {
    small: string
    large: string
}

export type UserType = {
    id: number
    photos: PhotosType
    followed: boolean
    name: string
    status: string
    location: LocationType
};

let initialState = {
    users: [] as UserType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}

export type InitialStateType = typeof initialState;
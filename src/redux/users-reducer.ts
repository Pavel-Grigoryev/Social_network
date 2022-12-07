import {usersAPI} from "../api/api";
import {Dispatch} from "redux";

export const follow = (userId: number) => ({type: "FOLLOW", userId}) as const;
export const unfollow = (userId: number) => ({type: "UNFOLLOW", userId}) as const;
export const setUsers = (users: UserType[]) => ({type: "SET_USERS", users}) as const;
export const setCurrentPage = (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage}) as const;
export const setTotalUsersCount = (totaUsersCount: number) => ({
    type: "SET_TOTAL_USERS_COUNT",
    totaUsersCount
}) as const;
export const toggleIsFetching = (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching}) as const;
export const toggleFollowingProgress = (userId: number, isFetching: boolean) => ({
    type: "TOGGLE_IS_FOLLOWING_PROGRESS",
    userId,
    isFetching
}) as const;

export const getUsers = (currentPage: number, pageSize: number) => {

    return (dispatch: Dispatch<ActionsTypesUsers>) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        usersAPI.getUsers(currentPage, pageSize).then((data) => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
}

export const acceptUnFollow = (userId: number) => {
     return (dispatch: Dispatch<ActionsTypesUsers>) => {
         dispatch(toggleFollowingProgress(userId,true));
         usersAPI.unfollowUser(userId).then(() => {
             dispatch(unfollow(userId));
             dispatch(toggleFollowingProgress(userId,false));
         });
     }
}

export const acceptFollow = (userId: number) => {
    return (dispatch: Dispatch<ActionsTypesUsers>) => {
        dispatch(toggleFollowingProgress(userId,true));
        usersAPI.followUser(userId).then(() => {
            dispatch(follow(userId));
            dispatch(toggleFollowingProgress(userId,false));
        });
    }
}



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


export const userReducer = (state = initialState, action: ActionsTypesUsers): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)};
        case "UNFOLLOW":
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)};
        case "SET_USERS":
            return {...state, users: action.users};
        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage};
        case "SET_TOTAL_USERS_COUNT":
            return {...state, totalUsersCount: action.totaUsersCount};
        case "TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching};
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
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


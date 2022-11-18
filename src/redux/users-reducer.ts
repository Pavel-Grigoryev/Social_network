export const followAC = (userId: number) => ({type: "FOLLOW", userId}) as const;
export const unfollowAC = (userId: number) => ({type: "UNFOLLOW", userId}) as const;
export const setUsersAC = (users: UserType[]) => ({type: "SET_USERS", users}) as const;

type ActionsTypes = ReturnType<typeof followAC> | ReturnType<typeof unfollowAC> | ReturnType<typeof setUsersAC>;

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
    users: [] as UserType[]
}

export type InitialStateType = typeof initialState;


export const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)};
        case "UNFOLLOW":
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)};
        case "SET_USERS":
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state;
    }
}

export default userReducer;


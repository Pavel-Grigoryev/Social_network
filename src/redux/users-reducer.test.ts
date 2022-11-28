import userReducer, {follow, InitialStateType, setUsers, unfollow} from "./users-reducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        users: [
            {
                id: 1,
                photos: {
                    small: 'http://iuri-mamade.etla.pt/images/fotouser.jpg',
                    large: 'null'
                },
                followed: false,
                name: "Pavel",
                status: "I am a programmer",
                location: {city: "Minsk", country: "Belarus"}
            },
            {
                id: 2,
                photos: {
                    small: 'http://iuri-mamade.etla.pt/images/fotouser.jpg',
                    large: 'null'
                },
                followed: true,
                name: "Dasha",
                status: "I am a designer",
                location: {city: "Homel", country: "Belarus"}
            },
            {
                id: 3,
                photos: {
                    small: 'http://iuri-mamade.etla.pt/images/fotouser.jpg',
                    large: 'null'
                },
                followed: false,
                name: "Maxim",
                status: "I am a pupil",
                location: {city: "Minsk", country: "Belarus"}
            }
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false
    }
})


test('user should follow', () => {

    const action = follow(3);

    const endState = userReducer(startState, action)

    expect(endState.users[2].followed).toBeTruthy();

});

test('user should unfollow', () => {

    const action = unfollow(1);

    const endState = userReducer(startState, action)

    expect(endState.users[0].followed).toBeFalsy();

});

test('users array should be added to initial state', () => {
    const startStateEmpty: InitialStateType = {
        users: [],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false
    }

    const action = setUsers(startStateEmpty.users);

    const endState = userReducer(startState, action)

    expect(endState.users[0].name).toBe("Pavel");
    expect(endState.users[2].status).toBe("I am a pupil");
    expect(endState.users.length).toBe(3);

});
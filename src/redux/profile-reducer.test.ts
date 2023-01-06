import profileReducer, {
    addPostAC,
    InitialStateType,
    PostType
} from "./profile-reducer";

test('new post text should be added in messages array', () => {

    const startState: InitialStateType = {
        posts: [
            {id: 1, message: "Hi, how are you?", likeCount: 10},
            {id: 2, message: "It's my first post", likeCount: 20},
            {id: 3, message: "The weather is good.", likeCount: 30}
        ] as PostType[],
        profile: null,
        status: ''
    }

    const action = addPostAC('Ho-ho-ho');

    const endState = profileReducer(startState, action)
    //
    expect(endState.posts.length).toBe(4);
    expect(endState.posts[3].id).toBeTruthy();
    expect(endState.posts[3].message).toBe('Ho-ho-ho');
});
import profileReducer, {
    addPostAC, deletePostAC,
    InitialStateType,
    PostType, ProfileDataStatusType, ProfileType
} from "./profile-reducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        posts: [
            {id: 1, message: "Hi, how are you?", likeCount: 10},
            {id: 2, message: "It's my first post", likeCount: 20},
            {id: 3, message: "The weather is good.", likeCount: 30}
        ] as PostType[],
        profile: {} as ProfileType,
        status: '',
        profileDataStatus: 'idle' as ProfileDataStatusType,
        dataStatus: 'idle' as ProfileDataStatusType
    }
})

test('new post text should be added in messages array', () => {

    const action = addPostAC('Ho-ho-ho');

    const endState = profileReducer(startState, action)
    //
    expect(endState.posts.length).toBe(4);
    expect(endState.posts[3].id).toBeTruthy();
    expect(endState.posts[3].message).toBe('Ho-ho-ho');
});

test('post should be deleted in messages array', () => {

    const action = deletePostAC(2);

    const endState = profileReducer(startState, action)
    //
    expect(endState.posts.length).toBe(2);
    expect(endState.posts[1].message).toBe("The weather is good.");
});

test("post shouldn't be deleted in messages array if the postId is incorrect", () => {

    const action = deletePostAC(5);

    const endState = profileReducer(startState, action)
    //
    expect(endState.posts.length).toBe(3);
    expect(endState.posts[2].message).toBe("The weather is good.");
});
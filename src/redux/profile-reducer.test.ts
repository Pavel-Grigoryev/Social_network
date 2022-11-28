import profileReducer, {
    addPostActionCreator,
    InitialStateType,
    PostType, ProfileType,
    updateNewPost
} from "./profile-reducer";


test('new text should be assigned a newPostText', () => {
    const startState: InitialStateType = {
        posts: [
            {id: 1, message: "Hi, how are you?", likeCount: 10},
            {id: 2, message: "It's my first post", likeCount: 20},
            {id: 3, message: "The weather is good.", likeCount: 30}
        ] as PostType[],
        newPostText: "",
        profile: null
    }

    const action = updateNewPost('Ho-ho-ho');

    const endState = profileReducer(startState, action)

    expect(endState.newPostText).toBe('Ho-ho-ho');

});

test('new post text should be added in messages array', () => {

    const startState: InitialStateType = {
        posts: [
            {id: 1, message: "Hi, how are you?", likeCount: 10},
            {id: 2, message: "It's my first post", likeCount: 20},
            {id: 3, message: "The weather is good.", likeCount: 30}
        ] as PostType[],
        newPostText: "Ho-ho-ho",
        profile: null
    }

    const action = addPostActionCreator();

    const endState = profileReducer(startState, action)
    //
    expect(endState.newPostText).toBe('');
    expect(endState.posts.length).toBe(4);
    expect(endState.posts[3].id).toBeTruthy();
    expect(endState.posts[3].message).toBe('Ho-ho-ho');
});
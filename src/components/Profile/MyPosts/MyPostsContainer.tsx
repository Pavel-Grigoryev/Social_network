import React from "react";
import {addPostActionCreator, PostType, updateNewPost} from "../../../redux/profile-reducer";
import {AppStateType} from "../../../redux/redux-store";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {Dispatch} from "redux";


/*type MyPostsContainerPropsType = {
    store: StoreReduxType
}*/

/*export const MyPostsContainer = () => {

    let posts = store.getState().profilePage.posts;

    let newPostText = store.getState().profilePage.newPostText;

    const addPost = () => {
        store.dispatch(addPostActionCreator());
    }

    const onPostChange = (newText: string) => {
            store.dispatch(updateNewPostActionCreator(newText));
        }

    return <MyPosts posts={posts} addPost={addPost} updateNewPost={onPostChange} newPostText={newPostText}/>

}*/

type MapStateToPropsType = {
    posts: PostType[]
    newPostText: string
}

type MapDispatchToProps = {
    addPost: () => void
    updateNewPost: (newText: string) => void
}

export type ProfileMyPostsType = MapStateToPropsType & MapDispatchToProps;

const mapStateToProps = (state:AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => {
    return {
        addPost: () => {dispatch(addPostActionCreator())},
        updateNewPost: (newText: string) => {dispatch(updateNewPost(newText))}
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


import React from "react";
import {addPostAC, PostType} from "../../../redux/profile-reducer";
import {AppStateType} from "../../../types/types";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {Dispatch} from "redux";



type MapStateToPropsType = {
    posts: PostType[]
}

type MapDispatchToProps = {
    addPost: (newPost: string) => void
}

export type ProfileMyPostsType = MapStateToPropsType & MapDispatchToProps;

const mapStateToProps = (state:AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => {
    return {
        addPost: (newPost: string) => {dispatch(addPostAC(newPost))}
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


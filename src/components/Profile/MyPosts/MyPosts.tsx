import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {ActionsTypes, PostType} from "../../../redux/store";
import {addPostActionCreator, updateNewPostActionCreator} from "../../../redux/profile-reducer";


type ProfileMyPostsType = {
    posts: PostType[]
    dispatch: (action: ActionsTypes) => void
    newPostText: string
}

const MyPosts: React.FC<ProfileMyPostsType> = ({posts, newPostText, dispatch}) => {

    const postsElement = posts.map(post => (<Post key={post.id} message={post.message} likeCount={post.likeCount}/>))

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPostHandler = () => {
        dispatch(addPostActionCreator());
    }

    const onPostChange = () => {
        if (newPostElement.current) {
            dispatch(updateNewPostActionCreator(newPostElement.current.value));
        }
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div className={s.postArea}>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement}
                              value={newPostText}
                    />
                </div>
                <div>
                    <button onClick={addPostHandler}> Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    );
}

export default MyPosts;
import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {ProfileMyPostsType} from "./MyPostsContainer";

const MyPosts: React.FC<ProfileMyPostsType> = ({posts, newPostText, addPost, updateNewPost}) => {

    const postsElement = posts.map(post => (<Post key={post.id} message={post.message} likeCount={post.likeCount}/>))

    const addPostHandler = () => {
        addPost();
    }

    const onPostChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
           updateNewPost(e.currentTarget.value);
        }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div className={s.postArea}>
                <div>
                    <textarea onChange={onPostChangeHandler}
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
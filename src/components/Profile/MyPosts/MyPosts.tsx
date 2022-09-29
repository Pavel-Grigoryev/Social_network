import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {MyPostsType} from "../../../App";

const MyPosts: React.FC<MyPostsType> = ({posts}) => {

    const postsElement = posts.map(post => (<Post message={post.message} likeCount={post.likeCount}/>))

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div className={s.postArea}>
               <div>
                   <textarea></textarea>
               </div>
                <div>
                    <button> Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    );
}

export default MyPosts;
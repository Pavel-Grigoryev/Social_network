import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {PostType} from "../../../redux/state";


type ProfileMyPostsType = {
    posts: PostType[]
    addPost:(postMessage: string) => void
}

const MyPosts: React.FC<ProfileMyPostsType> = ({posts, addPost}) => {

    const postsElement = posts.map(post => (<Post key={post.id} message={post.message} likeCount={post.likeCount}/>))

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPostHandler = () => {
        if (newPostElement.current) {
            addPost(newPostElement.current.value);
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div className={s.postArea}>
                <div>
                    <textarea ref={newPostElement}></textarea>
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
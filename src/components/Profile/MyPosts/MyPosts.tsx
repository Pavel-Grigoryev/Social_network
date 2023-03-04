import React, {memo} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {ProfileMyPostsType} from "./MyPostsContainer";
import {MyPostsForm, MyPostsFormInput} from "./MyPostsForm/MyPostsForm";


const MyPosts: React.FC<ProfileMyPostsType> = memo(({posts, addPost}) => {

    const postsElement = posts.map(post => (<Post key={post.id} message={post.message} likeCount={post.likeCount}/>))

    const onPostChangeHandler = (formData: MyPostsFormInput) => {
        addPost(formData.newPost);
        }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div className={s.postArea}>
                <MyPostsForm onPostChange={onPostChangeHandler}/>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    );
})

export default MyPosts;


import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostsType} from "../../App";

const Profile: React.FC<MyPostsType> = ({posts}) => {

    return (
        <main>
            <ProfileInfo/>
            <MyPosts posts={posts}/>
        </main>
    );
}

export default Profile;
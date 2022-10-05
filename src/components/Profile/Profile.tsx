import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";


type ProfilePropsType = {
    profilePage: ProfilePageType
    addPost:(postMessage: string) => void
}

const Profile: React.FC<ProfilePropsType> = ({profilePage, addPost}) => {

    return (
        <main>
            <ProfileInfo/>
            <MyPosts posts={profilePage.posts} addPost={addPost}/>
        </main>
    );
}

export default Profile;
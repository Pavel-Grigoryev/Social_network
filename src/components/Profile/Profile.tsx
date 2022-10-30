import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, ProfilePageType} from "../../redux/store";


type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch:(action: ActionsTypes) => void
}

const Profile: React.FC<ProfilePropsType> = ({profilePage, dispatch}) => {

    return (
        <main>
            <ProfileInfo/>
            <MyPosts posts={profilePage.posts}
                     dispatch={dispatch}
                     newPostText={profilePage.newPostText}
                      />
        </main>
    );
}

export default Profile;
import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    changeUserStatus: (status: string) => void
}

const Profile = (props: ProfilePropsType) => {
    return (
        <main>
            <ProfileInfo profile={props.profile} status={props.status}  changeUserStatus={props.changeUserStatus}/>
            <MyPostsContainer/>
        </main>
    );
}

export default Profile;
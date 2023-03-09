import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    changeUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: any) => void
}

const Profile = ({profile, status, changeUserStatus, isOwner, savePhoto}: ProfilePropsType) => {
    return (
        <main>
            <ProfileInfo profile={profile}
                         status={status}
                         changeUserStatus={changeUserStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}
            />
            <MyPostsContainer/>
        </main>
    );
}

export default Profile;
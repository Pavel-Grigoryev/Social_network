import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileDataStatusType, ProfileType} from "../../redux/profile-reducer";
import {ProfilePayloadType} from "./ProfileInfo/ProfileDataForm/ProfileDataForm";

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    changeUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: any) => void
    profileDataStatus: ProfileDataStatusType
    setProfileDataStatus: (dataStatus: ProfileDataStatusType) => void
    onSubmitProfileDate: (data: ProfilePayloadType) => void
}

const Profile = ({profile, status, changeUserStatus, isOwner, savePhoto, profileDataStatus, onSubmitProfileDate, setProfileDataStatus}: ProfilePropsType) => {
    return (
        <main>
            <ProfileInfo profile={profile}
                         status={status}
                         changeUserStatus={changeUserStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}
                         profileDataStatus={profileDataStatus}
                         setProfileDataStatus={setProfileDataStatus}
                         onSubmitProfileDate={onSubmitProfileDate}
            />
            <MyPostsContainer/>
        </main>
    );
}

export default Profile;
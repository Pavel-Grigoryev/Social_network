import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileDataStatusType, ProfileType} from "../../redux/profile-reducer";
import {ProfilePayloadType} from "./ProfileInfo/ProfileDataForm/ProfileDataForm";

type ProfilePropsType = {
    profile: ProfileType | null
    isOwner: boolean
    savePhoto: (file: File) => Promise<string>
    profileDataStatus: ProfileDataStatusType
    setProfileDataStatus: (dataStatus: ProfileDataStatusType) => void
    onSubmitProfileDate: (data: ProfilePayloadType) => void
}

const Profile = ({profile, isOwner, savePhoto, profileDataStatus, onSubmitProfileDate, setProfileDataStatus}: ProfilePropsType) => {
    return (
        <main>
            <ProfileInfo profile={profile}
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
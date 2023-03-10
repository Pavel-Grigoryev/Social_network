import React, {ChangeEvent} from "react";
import s from "./ProfileInfo.module.css"
import {ProfileDataStatusType, ProfileType,} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import userPhoto from '../../../assets/images/user.png'
import {ProfileData} from "./ProfileData/ProfileData";
import {ProfileDataForm, ProfilePayloadType} from "./ProfileDataForm/ProfileDataForm";
import {ProfileStatus} from "./ProfileStatus";


type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    changeUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: any) => void
    profileDataStatus: ProfileDataStatusType
    setProfileDataStatus: (dataStatus: ProfileDataStatusType) => void
    onSubmitProfileDate: (data: ProfilePayloadType) => void
}

const ProfileInfo = ({
                         profile,
                         status,
                         changeUserStatus,
                         isOwner,
                         savePhoto,
                         profileDataStatus,
                         setProfileDataStatus,
                         onSubmitProfileDate
                     }: ProfileInfoPropsType) => {
    if (!profile) {
        return <Preloader/>
    }

    const onProfilePhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} alt="Profile" className={s.profileImg}/>
                {isOwner && <input type="file" onChange={onProfilePhotoSelected}/>}
                {profileDataStatus === "idle" || profileDataStatus === "succeeded" ?
                    <ProfileData profile={profile}
                                setProfileDataStatus={setProfileDataStatus}
                                 isOwner={isOwner}
                    /> :
                    <ProfileDataForm profile={profile}
                                     onSubmitProfileDate={onSubmitProfileDate}
                    />
                }
                <div>
                    <b>Status</b>: <ProfileStatus status={status} changeUserStatus={changeUserStatus}/>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;
import React, {ChangeEvent} from "react";
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";
import userPhoto from '../../../assets/images/user.png'


type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    changeUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: any) => void
}

const ProfileInfo = ({profile, status, changeUserStatus, isOwner, savePhoto}: ProfileInfoPropsType) => {
    if (!profile) {
        return <Preloader/>
    }

    const onProfilePhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    debugger

    return (
        <div>
            <div>
                {/*<img
                    src="https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""/>*/}
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} alt="Profile" className={s.profileImg}/>
                {isOwner && <input type="file" onChange={onProfilePhotoSelected}/>}
                <ProfileStatus status={status} changeUserStatus={changeUserStatus}/>
                 <div>About me: {profile.aboutMe} </div>
            </div>
        </div>
    )
}

export default ProfileInfo;
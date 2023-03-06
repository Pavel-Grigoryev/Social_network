import React from "react";
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";


type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    changeUserStatus: (status: string) => void
}

const ProfileInfo = ({profile, status, changeUserStatus}: ProfileInfoPropsType) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div>
                {/*<img
                    src="https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""/>*/}
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large} alt=""/>
                <ProfileStatus status={status} changeUserStatus={changeUserStatus}/>
                 <div>About me: {profile.aboutMe} </div>
            </div>
        </div>
    )
}

export default ProfileInfo;
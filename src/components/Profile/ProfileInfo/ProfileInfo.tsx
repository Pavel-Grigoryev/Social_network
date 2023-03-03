import React from "react";
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";
import {ProfileStatusFunc} from "./ProfileStatusFunc";


type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    changeUserStatus: (status: string) => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
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
                <img src={props.profile.photos.large} alt=""/>
                <ProfileStatusFunc status={props.status}  changeUserStatus={props.changeUserStatus}/>
                 <div>About me: {props.profile.aboutMe} </div>
            </div>
        </div>
    )
}

export default ProfileInfo;
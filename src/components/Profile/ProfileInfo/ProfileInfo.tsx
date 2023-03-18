import React from "react";
import s from "./ProfileInfo.module.css"
import {ProfileDataStatusType, ProfileType,} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import userPhoto from '../../../assets/images/user.png'
import {ProfileData} from "./ProfileData/ProfileData";
import {ProfileDataForm, ProfilePayloadType} from "./ProfileDataForm/ProfileDataForm";
import {ProfileStatus} from "./ProfileStatus";
import {UploadButton} from "../../common/UploadButton/UploadButton";
import { Col, Row } from 'antd';

type ProfileInfoPropsType = {
    profile: ProfileType | null
    isOwner: boolean
    savePhoto: (file: File) => Promise<string>
    profileDataStatus: ProfileDataStatusType
    setProfileDataStatus: (dataStatus: ProfileDataStatusType) => void
    onSubmitProfileDate: (data: ProfilePayloadType) => void
}

const ProfileInfo = ({
                         profile,
                         isOwner,
                         savePhoto,
                         profileDataStatus,
                         setProfileDataStatus,
                         onSubmitProfileDate
                     }: ProfileInfoPropsType) => {
    if (!profile) {
        return <Preloader/>
    }

    const onProfilePhotoSelected = (file: File) => {
      return savePhoto(file);
    }


    return (
        <div>
            <div className={s.descriptionBlock}>
                <Row>
                    <Col span={5}>
                        <img src={profile.photos.large || userPhoto} alt="Profile" className={s.profileImg}/>
                    </Col>
                    <Col span={19} >
                        <Row><b className={s.statusTitle}>Status:</b> <ProfileStatus /></Row>
                    </Col>
                </Row>
                {isOwner && <div className={s.uploadBlock}>
                    <UploadButton onProfilePhotoSelected={onProfilePhotoSelected}/>
                </div>}
                {profileDataStatus === "idle" || profileDataStatus === "succeeded" ?
                    <ProfileData profile={profile}
                                 setProfileDataStatus={setProfileDataStatus}
                                 isOwner={isOwner}
                    /> :
                    <ProfileDataForm profile={profile}
                                     onSubmitProfileDate={onSubmitProfileDate}
                    />
                }
            </div>
        </div>
    )
}

export default ProfileInfo;
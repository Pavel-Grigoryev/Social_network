import {ContactType, ProfileDataStatusType, ProfileType} from "../../../../redux/profile-reducer";
import {Contact} from "../Contact/Contact";
import React from "react";

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    setProfileDataStatus: (dataStatus: ProfileDataStatusType) => void
}
export const ProfileData = ({
                                profile,
                                setProfileDataStatus,
                                isOwner
                            }: ProfileDataType) => {
    const setProfileDataStatusHandler = () => {
        setProfileDataStatus("loading");
    }

    return (
        <div>
            {isOwner && <button onClick={setProfileDataStatusHandler}>Edit profile</button>}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>

            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
            </div>
            {profile.lookingForAJob && <div>
                <b>My Skills</b>: {profile.lookingForAJobDescription}
            </div>}
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactType]}/>
            })}
            </div>
        </div>
    )
}
import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfile,
    ProfileType,
    getUserStatus,
    changeUserStatus,
    savePhoto,
    ProfileDataStatusType, setProfileDataStatusAC, updateUserProfile
} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {ProfilePayloadType} from "./ProfileInfo/ProfileDataForm/ProfileDataForm";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {AppStateType} from "../../types/types";


class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.autorizedUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId)
            this.refreshProfile();
    }

    render() {

        return (
            <div>
                <Profile  {...this.props} profile={this.props.profile}
                          status={this.props.status}
                          changeUserStatus={this.props.changeUserStatus}
                          isOwner={!this.props.match.params.userId}
                          savePhoto={this.props.savePhoto}
                          profileDataStatus={this.props.profileDataStatus}
                          setProfileDataStatus={this.props.setProfileDataStatusAC}
                          onSubmitProfileDate={this.props.updateUserProfile}
                />
            </div>
        );
    }
}

type PathParamsType = {
    userId: string
}


type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
    autorizedUserId: number | null
    isAuth: boolean
    profileDataStatus: ProfileDataStatusType
}

type mapDispatchToPropsType = {
    getUserProfile: (userId: number | null) => void
    getUserStatus: (userId: number | null) => void
    changeUserStatus: (status: string) => void
    savePhoto: (file: any) => void
    setProfileDataStatusAC: (dataStatus: ProfileDataStatusType) => void
    updateUserProfile: (data: ProfilePayloadType) => void
}


export type ProfileContainerPropsType =
    MapStateToPropsType
    & mapDispatchToPropsType
    & RouteComponentProps<PathParamsType>

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        autorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        profileDataStatus: state.profilePage.profileDataStatus
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        changeUserStatus,
        savePhoto,
        setProfileDataStatusAC,
        updateUserProfile
    }),
    withRouter, withAuthRedirect)(ProfileContainer)



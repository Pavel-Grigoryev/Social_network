
import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile, ProfileType, getUserStatus, changeUserStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {

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

    render() {

        return (
            <div>
                <Profile  {...this.props} profile={this.props.profile} status={this.props.status} changeUserStatus={this.props.changeUserStatus}/>
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
}

type mapDispatchToPropsType = {
    getUserProfile: (userId: number | null) => void
    getUserStatus:  (userId: number | null) => void
    changeUserStatus: (status: string) => void
}

export type ProfileContainerPropsType = MapStateToPropsType & mapDispatchToPropsType & RouteComponentProps<PathParamsType>

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        autorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, {getUserProfile, getUserStatus, changeUserStatus}),
    withRouter)(ProfileContainer)



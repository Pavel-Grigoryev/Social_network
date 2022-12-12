
import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile, ProfileType, getUserStatus, changeUserStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {

        let userId = +this.props.match.params.userId;
        if (!userId) {
            userId = 26585;
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
}

type mapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus:  (userId: number) => void
    changeUserStatus: (status: string) => void
}

export type ProfileContainerPropsType = MapStateToPropsType & mapDispatchToPropsType & RouteComponentProps<PathParamsType>

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, {getUserProfile, getUserStatus, changeUserStatus}),
    withRouter,withAuthRedirect)(ProfileContainer)



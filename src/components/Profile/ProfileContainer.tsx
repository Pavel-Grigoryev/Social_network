
import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {profileAPI} from "../../api/api";

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {

        let userId = +this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        profileAPI.getProfile(userId).then((data) => {
            this.props.setUserProfile(data);
        });
    }

    render() {
        return (
            <div>
                <Profile profile={this.props.profile}/>
            </div>
        );
    }
}

type PathParamsType = {
    userId: string
}


type MapStateToPropsType = {
    profile: ProfileType | null
}

type mapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
}

export type ProfileContainerPropsType = MapStateToPropsType & mapDispatchToPropsType & RouteComponentProps<PathParamsType>

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent)



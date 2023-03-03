import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthMe, logoutAuthUser} from "../../redux/auth-reducer";



class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {getAuthMe, logoutAuthUser})(HeaderContainer);

//Types

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

type mapDispatchToPropsType = {
    getAuthMe: () => void
    logoutAuthUser: () => void
}

export type HeaderContainerPropsType = MapStateToPropsType & mapDispatchToPropsType;
import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthMe} from "../../redux/auth-reducer";



type MapStateToPropsType = {
    isAuth: boolean
    login: string | null

}

type mapDispatchToPropsType = {
    getAuthMe: () => void
}

export type HeaderContainerPropsType = MapStateToPropsType & mapDispatchToPropsType;

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        this.props.getAuthMe();
    }

    render() {
        return <Header {...this.props}/>
    }

}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {getAuthMe})(HeaderContainer);
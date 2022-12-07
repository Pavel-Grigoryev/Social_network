import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthUser} from "../../redux/auth-reducer";



type MapStateToPropsType = {
    isAuth: boolean
    login: string | null

}

type mapDispatchToPropsType = {
    getAuthUser: () => void
}

export type HeaderContainerPropsType = MapStateToPropsType & mapDispatchToPropsType;

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        this.props.getAuthUser();
    }

    render() {
        return <Header {...this.props}/>
    }

}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {getAuthUser})(HeaderContainer);
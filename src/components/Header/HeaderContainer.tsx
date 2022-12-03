import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserData} from "../../redux/auth-reducer";
import {authUserAPI} from "../../api/api";


type MapStateToPropsType = {
    isAuth: boolean
    login: string | null

}

type mapDispatchToPropsType = {
    setAuthUserData: (userId: number, email: string, login: string) => void
}

export type HeaderContainerPropsType = MapStateToPropsType & mapDispatchToPropsType;

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        authUserAPI.getAuthUserData().then((data) => {
            if (data) {
                let {userId, email, login} = data;
                this.props.setAuthUserData(userId, email, login);
            }
        });
    }

    render() {
        return <Header {...this.props}/>
    }

}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, { setAuthUserData})(HeaderContainer);
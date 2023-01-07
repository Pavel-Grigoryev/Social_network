import React, {ComponentType} from 'react';
import {loginAuthUser} from "../../redux/auth-reducer";
import {Login, LoginFormDataType} from "./Login";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }

};

export const LoginContainer = compose<ComponentType>(connect(mapStateToProps, {loginAuthUser}))(Login);

//Types

type MapStateToPropsType = {
    isAuth: boolean
}

type mapDispatchToPropsType = {
    loginAuthUser: (dataForm: LoginFormDataType) => void
}

export type LoginPropsType = MapStateToPropsType & mapDispatchToPropsType;
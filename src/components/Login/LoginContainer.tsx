import React, {ComponentType} from 'react';
import {loginAuthUser} from "../../redux/auth-reducer";
import {Login, LoginFormDataType} from "./Login";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    }

};

export const LoginContainer = compose<ComponentType>(connect(mapStateToProps, {loginAuthUser}))(Login);

//Types

type MapStateToPropsType = {
    isAuth: boolean
    captcha: string | null
}

type mapDispatchToPropsType = {
    loginAuthUser: (dataForm: LoginFormDataType) => Promise<string>
}

export type LoginPropsType = MapStateToPropsType & mapDispatchToPropsType;
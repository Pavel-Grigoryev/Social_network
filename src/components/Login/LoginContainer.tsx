import React, {ComponentType} from 'react';
import {loginAuthUser} from "../../redux/auth-reducer";
import {Login, LoginFormDataType} from "./Login";
import {connect} from "react-redux";
import {AppStateType} from "../../types/types";
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
    captcha: string
}

type mapDispatchToPropsType = {
    loginAuthUser: (dataForm: LoginFormDataType) => Promise<string>
}

export type LoginPropsType = MapStateToPropsType & mapDispatchToPropsType;
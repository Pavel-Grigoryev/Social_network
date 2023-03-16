import React from 'react';
import {LoginForm} from "./LoginForm/LoginForm";
import {LoginPropsType} from "./LoginContainer";
import {Redirect} from "react-router-dom";
import s from "./Login.module.css"


export const Login: React.FC<LoginPropsType>= (props) => {
    const onSubmitHandler = async (dataForm: LoginFormDataType) => {
        return props.loginAuthUser(dataForm);
    }

    if (props.isAuth) {
        return <Redirect to={"/Profile"}/>
    }

    return (
        <div className={s.loginBlockWrapper}>
            <div className={s.loginBlock}>
                <h1 className={s.title}>LOGIN</h1>
                <LoginForm onSubmitLogin={onSubmitHandler} captcha={props.captcha}/>
            </div>
        </div>
    );
};

//Types


export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
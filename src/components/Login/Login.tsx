import React from 'react';
import {LoginForm} from "./LoginForm/LoginForm";
import {LoginPropsType} from "./LoginContainer";
import {Redirect} from "react-router-dom";


export const Login: React.FC<LoginPropsType>= (props) => {
    const onSubmitHandler = async (dataForm: LoginFormDataType) => {
        return props.loginAuthUser(dataForm);
    }

    if (props.isAuth) {
        return <Redirect to={"/Profile"}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm onSubmitLogin={onSubmitHandler}/>
        </div>
    );
};

//Types


export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
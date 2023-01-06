import React from 'react';
import {LoginForm} from "./LoginForm/LoginForm";


export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginPropsType = {
    loginAuthUser: (dataForm: LoginFormDataType) => void
}

export const Login = (props:LoginPropsType) => {
    const onSubmitHandler = (dataForm: LoginFormDataType) => {
        props.loginAuthUser(dataForm);
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm onSubmitLogin={onSubmitHandler}/>
        </div>
    );
};


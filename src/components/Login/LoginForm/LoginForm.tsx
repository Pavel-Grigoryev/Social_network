import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../../../utils/validators/validators";
import s from './LoginForm.module.css'


export const LoginForm = ({onSubmitLogin}:LoginFormPropsType) => {


    const {register, handleSubmit, reset, formState: { errors } } = useForm<LoginFormInputs>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        onSubmitLogin(data);
        reset();
    }

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <label>
                <input placeholder={'email'} {...register("email")} />
            </label>
            {errors.email && <div className={s.error}>{errors.email.message}</div>}
            <label>
                <input placeholder={'password'} type={'password'} {...register("password")}/>
            </label>
            {errors.password && <div className={s.error}>{errors.password.message}</div>}
            <label>
                <input type={'checkbox'} {...register("rememberMe")}/>
                Remember me
            </label>
            <button type={'submit'}>Login</button>
        </form>
    )
}


//Types

export type LoginFormInputs = {
    email: string
    password: string
    rememberMe: false
}

type LoginFormPropsType = {
    onSubmitLogin: (data: LoginFormInputs) => void
}
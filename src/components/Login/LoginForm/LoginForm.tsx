import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../../../utils/validators/validators";
import s from './LoginForm.module.css'


export const LoginForm = ({onSubmitLogin}: LoginFormPropsType) => {


    const {register, handleSubmit, setError, clearErrors, formState: {errors}} = useForm<LoginFormInputs>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const res = await onSubmitLogin(data);
            setError('serverError', {
                type: "500",
                message: res
            })
        } catch (e) {
            setError('serverError', {
                type: "500",
                message: e as string | undefined
            })
        } finally {
            setTimeout(() => {
               clearErrors("serverError");
            }, 7000)
        }
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
            {errors.serverError?.type === "500" && <p>{errors.serverError.message}</p>}
            <button type={'submit'}>Login</button>
        </form>
    )
}


//Types

export type LoginFormInputs = {
    email: string
    password: string
    rememberMe: false,
    serverError: string
}

type LoginFormPropsType = {
    onSubmitLogin: (data: LoginFormInputs) => Promise<string>
}
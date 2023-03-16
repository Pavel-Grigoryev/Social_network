import React from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../../../utils/validators/validators";
import s from './LoginForm.module.css';
import {Button, Checkbox, Input} from 'antd';


export const LoginForm = ({onSubmitLogin, captcha}: LoginFormPropsType) => {
    const {handleSubmit, setError, clearErrors, formState: {errors}, control} = useForm<LoginFormInputs>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ''
        },
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const res = await onSubmitLogin(data);
        } catch (e) {
            setError('serverError', {
                type: "500",
                message: e as string | undefined
            })
        } finally {
            setTimeout(() => {
                clearErrors("serverError");
            }, 7000);
        }
    }

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <label className={s.formItem}>
                <Controller control={control}
                            name="email"
                            render={({field}) => <Input placeholder={'email'} {...field}/>}/>
                {errors.email && <div className={s.error}>{errors.email.message}</div>}
            </label>

            <label className={s.formItem}>
                <Controller control={control}
                            name="password"
                            render={({field}) => <Input.Password placeholder={"password"} {...field} />}/>
                {errors.password && <div className={s.error}>{errors.password.message}</div>}
            </label>
            <label>
                <Controller control={control}
                            name="rememberMe"
                            render={({field: {value, onChange}}) => <Checkbox checked={value}
                                                                              onChange={(e) => {
                                                                                  onChange(e.target.checked);
                                                                              }}>Remember me</Checkbox>}/>
            </label>
            {captcha && (
                <label className={s.formCaptcha}>
                    <img className={s.imgCaptcha} src={captcha} alt={"captcha"}/>
                    <Controller control={control}
                                name="captcha"
                                render={({field}) => <Input placeholder={'enter a captcha'} {...field}/>}/>
                </label>
            )}
            <label className={s.formItem}>
                <Button className={s.button} type="primary" size={'large'} htmlType={'submit'} block>Login</Button>
                {errors.serverError?.type === "500" && <div className={s.servError}>{errors.serverError.message}</div>}
            </label>
        </form>
    )
}


//Types

export type LoginFormInputs = {
    email: string
    password: string
    rememberMe: false,
    serverError: string,
    captcha: string
}

type LoginFormPropsType = {
    onSubmitLogin: (data: LoginFormInputs) => Promise<string>
    captcha: string
}
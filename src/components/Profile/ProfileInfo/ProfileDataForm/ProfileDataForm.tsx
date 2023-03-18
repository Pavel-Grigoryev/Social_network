import {ContactType, ProfileType} from "../../../../redux/profile-reducer";
import React from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {schemaProfile} from "../../../../utils/validators/validators";
import s from "../../../Login/LoginForm/LoginForm.module.css";
import st from "./ProfileDataForm.module.css";
import cn from 'classnames'

import {Button, Checkbox, Col, Input, Row} from "antd";

const {TextArea} = Input;


type ProfileDataFormType = {
    profile: ProfileType
    onSubmitProfileDate: (data: ProfilePayloadType) => void
}

export const ProfileDataForm = ({
                                    profile,
                                    onSubmitProfileDate
                                }: ProfileDataFormType) => {
    const {photos, ...defaultFormValues} = profile
    const {control, handleSubmit, setError, formState: {errors}} = useForm<ProfilePayloadType>({
        defaultValues: {
            ...defaultFormValues
        },
        resolver: yupResolver(schemaProfile),
    });

    const onSubmit: SubmitHandler<ProfilePayloadType> = async (data) => {
        try {
            const res = await onSubmitProfileDate(data);
        } catch (err) {
            debugger
            const errors = err as string[] | string
            if (typeof errors !== "string") {
                errors.map(e => {
                    const fieldName = e.substring(e.indexOf('>') + 1, e.indexOf(')')).toLowerCase()
                    setError(`contacts.${fieldName as keyof ContactType}`, {
                        type: "serverError",
                        message: e.substring(0, e.indexOf('('))
                    })
                })
            } else {
                setError("networkError", {
                    type: "networkError",
                    message: errors
                })
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={st.formBlock}>
            <Button style={{maxWidth: "180px"}} htmlType={'submit'}>Save</Button>
            <Row>
                <Col span={6}><b>Full name:</b></Col>
                <Col span={10}>
                    <Controller control={control} name="fullName"
                                render={({field}) => <Input placeholder={'Full name'} {...field}/>}/>
                </Col>
            </Row>
            <Row>
                <Col span={6}><b>Looking for a job:</b></Col>
                <Col span={10}>
                    <Controller control={control}
                                name="lookingForAJob"
                                render={({field: {value, onChange}}) => <Checkbox checked={value}
                                                                                  onChange={(e) => {
                                                                                      onChange(e.target.checked);
                                                                                  }}/>}/>
                </Col>
            </Row>
            <Row>
                <Col span={6}><b>My Skills:</b></Col>
                <Col span={10} className={st.inputBlock}>
                    <Controller control={control} name="lookingForAJobDescription"
                                render={({field}) => <TextArea className={st.textArea}
                                                               placeholder={'Enter skills'} {...field}/>}/>
                    {errors.lookingForAJobDescription &&
                        <div className={cn(s.error, st.areaError)}>{errors.lookingForAJobDescription.message}</div>}
                </Col>
            </Row>
            <Row>
                <Col span={6}><b>About me:</b></Col>
                <Col span={10} className={st.inputBlock}>
                    <Controller control={control} name="aboutMe"
                                render={({field}) => <TextArea className={st.textArea}
                                                               placeholder={'About me'} {...field}/>}/>
                    {errors.aboutMe && <div className={cn(s.error, st.areaError)}>{errors.aboutMe.message}</div>}</Col>
            </Row>

            <div className={st.formBlock}>
                <b>Contacts:</b>{Object.keys(profile.contacts).map(key => {
                return <Row key={key}>
                    <Col span={6}><b>{key}:</b></Col>
                     <Col span={10} className={st.inputBlock} >
                         <Controller control={control} name={`contacts.${key as keyof ContactType}`}
                                     render={({field}) => <Input placeholder={key} {...field}/>}/>
                         {
                             errors.contacts?.[key as keyof ContactType] &&
                             <div className={s.error}>{errors.contacts[key as keyof ContactType]?.message}</div>
                         }
                     </Col>
                </Row>
            })}
            </div>
            {errors.networkError && <div className={s.error}>{errors.networkError.message}</div>}
        </form>
    )
}

export type ProfilePayloadType = Omit<ProfileType, 'photos'> & { networkError: string }
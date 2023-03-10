import {ContactType, ProfileType} from "../../../../redux/profile-reducer";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {schemaProfile} from "../../../../utils/validators/validators";
import s from "../../../Login/LoginForm/LoginForm.module.css";


type ProfileDataFormType = {
    profile: ProfileType
    onSubmitProfileDate: (data: ProfilePayloadType) => void
}

export const ProfileDataForm = ({
                                    profile,
                                    onSubmitProfileDate
                                }: ProfileDataFormType) => {
    const {photos, ...defaultFormValues} = profile
    const {register, handleSubmit, setError, formState: {errors}} = useForm<ProfilePayloadType>({
        defaultValues: {
            ...defaultFormValues
        },
        resolver: yupResolver(schemaProfile),
    });

    const onSubmit: SubmitHandler<ProfilePayloadType> = async (data) => {
        try {
            const res = await onSubmitProfileDate(data);
            debugger
        } catch (err) {
            debugger
            const errors = err as string[] | string
            if (typeof errors !== "string") {
                errors.map(e => {
                    debugger
                    const fieldName = e.substring(e.indexOf('>') + 1, e.indexOf(')')).toLowerCase()
                    setError(`contacts.${fieldName as keyof ContactType}`, {
                        type: "serverError",
                        message: e.substring(0, e.indexOf('('))
                    })
                })
            } else {
                debugger
                setError("networkError", {
                    type: "networkError",
                    message: errors
                })
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <button type={'submit'}>Save</button>
            <div>
                <b>Full name</b>: <input placeholder={'Full name'} {...register("fullName")} />
            </div>
            <div>
                <b>Looking for a job</b>: <input type={"checkbox"} {...register("lookingForAJob")} />
            </div>
            <div>
                <b>My Skills</b>: <textarea placeholder={"Enter skills"} {...register("lookingForAJobDescription")} />
                {errors.lookingForAJobDescription &&
                    <div className={s.error}>{errors.lookingForAJobDescription.message}</div>}
            </div>
            <div>
                <b>About me</b>: <textarea placeholder={"About me"} {...register("aboutMe")} />
                {errors.aboutMe && <div className={s.error}>{errors.aboutMe.message}</div>}
            </div>

            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key}>
                    <b>{key}</b>: <input placeholder={key} {...register(`contacts.${key as keyof ContactType}`)} />

                    {
                        errors.contacts?.[key as keyof ContactType] &&
                        <div className={s.error}>{errors.contacts[key as keyof ContactType]?.message}</div>
                    }
                </div>
            })}
            </div>
            {errors.networkError && <div className={s.error}>{errors.networkError.message}</div>}
        </form>
    )
}

export type ProfilePayloadType = Omit<ProfileType, 'photos'> & { networkError: string }
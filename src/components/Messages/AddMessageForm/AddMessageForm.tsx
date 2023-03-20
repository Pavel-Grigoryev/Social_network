
import React from "react";
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import {schemaMessage} from "../../../utils/validators/validators";
import {Input, Button} from "antd";
import cn from "classnames";
import s from "../../Login/LoginForm/LoginForm.module.css";
import st from "./AddMessageForm.module.css"
const {TextArea} = Input;

export const AddMessageForm = ({addNewMessage}: AddMessageFormProps) => {


    const {control, handleSubmit, reset, formState: {errors}} = useForm<MyPostsFormInputs>({
        defaultValues: {
            newMessageBody: ''
        },
        resolver: yupResolver(schemaMessage),
    });

    const onSubmit: SubmitHandler<MyPostsFormInputs> = (data) => {
           addNewMessage(data.newMessageBody);
        reset();
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={st.textAreaBlock}>
                <Controller control={control} name="newMessageBody"
                             render={({field}) => <TextArea className={st.textArea}
                                 placeholder={'Enter your message'} {...field}/>}/>
                {errors.newMessageBody &&
                    <div className={cn(s.error, st.areaError)}>{errors.newMessageBody.message}</div>}
            </div>
            <Button htmlType={'submit'}>Add message</Button>
        </form>
    )
}


//Types

type AddMessageFormProps = {
    addNewMessage: (newMessageBody: string) => void
}

export type MyPostsFormInputs = {
    newMessageBody: string;
};


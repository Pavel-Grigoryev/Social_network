
import React from "react";
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../../../utils/validators/validators";

export const AddMessageForm = ({addNewMessage}: AddMessageFormProps) => {


    const {register, handleSubmit, reset} = useForm<MyPostsFormInputs>({
        defaultValues: {
            newMessageBody: ''
        },
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<MyPostsFormInputs> = (data) => {
        addNewMessage(data.newMessageBody);
        reset();
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea  {...register("newMessageBody")} placeholder={"Enter your message"}/>
            <button type={"submit"}>Add message</button>
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


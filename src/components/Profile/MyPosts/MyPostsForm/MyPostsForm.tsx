import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import { useForm, SubmitHandler } from "react-hook-form";

export const MyPostsForm = ({onPostChange}: MyPostsFormPropsType) => {

    const { register, handleSubmit, reset } = useForm<MyPostsFormInput>();
    const onSubmit: SubmitHandler<MyPostsFormInput> = (data) => {
        onPostChange(data);
        reset();
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea {...register("newPost")} />
            </div>
            <div>
                <button type={'submit'}>Add post</button>
            </div>
        </form>
    )
}



//Types

type MyPostsFormPropsType = {
    onPostChange: (data: MyPostsFormInput) => void
}

export type MyPostsFormInput = {
    newPost: string
}
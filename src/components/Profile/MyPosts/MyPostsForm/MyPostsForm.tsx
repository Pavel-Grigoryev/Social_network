import React from "react";
import {useForm, SubmitHandler, Controller} from "react-hook-form";
import {Button, Input} from "antd";
import s from "./MyPostsForm.module.css"

const {TextArea} = Input;

export const MyPostsForm = ({onPostChange}: MyPostsFormPropsType) => {

    const { control, handleSubmit, reset } = useForm<MyPostsFormInput>();
    const onSubmit: SubmitHandler<MyPostsFormInput> = (data) => {
        onPostChange(data);
        reset();
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Controller control={control} name="newPost"
                            render={({field}) => <TextArea className={s.textArea}
                                                           {...field}/>}/>
            </div>
            <div>
                <Button style={{maxWidth: "180px"}} htmlType={'submit'}>Add post</Button>
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
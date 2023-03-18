 import React, {ChangeEvent, useEffect, useState} from "react";
 import { Input, Skeleton } from 'antd';
 import s from "./ProfileInfo.module.css"
 import {selectDataStatus, selectStatus} from "../../../redux/profile-selectors";
 import {useAppSelector} from "../../../hooks/useAppSelector";
 import {useAppDispatch} from "../../../hooks/useAppDispatch";
 import {changeUserStatus} from "../../../redux/profile-reducer";


export const ProfileStatus = () => {

     const dataStatus = useAppSelector(selectDataStatus);
     const status = useAppSelector(selectStatus);

     const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState<boolean>(false);
    const [statusNew, setStatusNew] = useState<string>(status);

    useEffect(() => {
        setStatusNew(status)
    },[status])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        dispatch(changeUserStatus(statusNew));
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusNew(e.currentTarget.value)
    }


    return (
        <div>
            {!editMode && <div>
                {dataStatus === 'loading' ? <Skeleton.Input active/> :
                    <span onDoubleClick={activateEditMode}>{statusNew || '-------'}</span>}
            </div>}
            {editMode && <div>
                <Input value={statusNew}
                       onBlur={deactivateEditMode}
                       onChange={onChangeHandler}
                       autoFocus={true}
                />
            </div>}
        </div>
    )

 }

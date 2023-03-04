 import React, {ChangeEvent, useEffect, useState} from "react";
import s from "./ProfileInfo.module.css"

type ProfileStatePropsType = {
    status: string
    changeUserStatus: (status: string) => void
}

export const ProfileStatusFunc : React.FC<ProfileStatePropsType> = ({status, changeUserStatus}) => {

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
        changeUserStatus(statusNew);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusNew(e.currentTarget.value)
    }


    return (
        <div>
            {!editMode && <div>
                <span onDoubleClick={activateEditMode}>{statusNew || '-------'}</span>
            </div>}
            {editMode && <div>
                <input autoFocus={true}
                       type="text"
                       value={statusNew}
                       onBlur={deactivateEditMode}
                       onChange={onChangeHandler}
                />
            </div>}
        </div>
    )

 }

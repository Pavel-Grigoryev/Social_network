import React from "react";
import s from './../Dialods.module.css'
import {NavLink} from "react-router-dom";
import {DialogItemType} from "../../../App";

const DialogItem: React.FC<DialogItemType> = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;
import React from "react";
import s from "./Contact.module.css"

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}
export const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    )
}
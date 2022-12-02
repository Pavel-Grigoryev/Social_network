import React from "react";
import s from './Header.module.css'
import asp from './Aspire.png'
import {NavLink} from "react-router-dom";


type HeaderPropsType = {
    isAuth: boolean
    login: string | null
}

const Header = ({isAuth, login}: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img
                src={asp}
                alt=""/>
            <div className={s.loginBlock}>
                {isAuth ?
                    <div> {login} </div> :
                    <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    );
}

export default Header;
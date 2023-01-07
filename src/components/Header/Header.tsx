import React from "react";
import s from './Header.module.css'
import asp from './Aspire.png'
import {NavLink} from "react-router-dom";



type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logoutAuthUser: () => void
}

const Header = ({isAuth, login, logoutAuthUser}: HeaderPropsType) => {

    const logoutHandler = () => {
        logoutAuthUser();
    }

    return (
        <header className={s.header}>
            <img
                src={asp}
                alt=""/>
            <div className={s.loginBlock}>
                {isAuth ?
                    <div>
                        <div> {login} </div>
                        <button onClick={logoutHandler}>Logout</button>
                    </div> :
                    <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    );
}

export default Header;
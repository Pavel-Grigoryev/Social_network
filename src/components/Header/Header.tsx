import React from "react";
import s from './Header.module.css'
import asp from './Aspire.png'


const Header = () => {
    return (
        <header className={s.header}>
            <img
                src={asp}
                alt=""/>
        </header>
    );
}

export default Header;
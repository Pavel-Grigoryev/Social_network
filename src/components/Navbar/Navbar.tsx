import React, {useEffect, useState} from "react";
import s from './Navbar.module.css';
import {NavLink, useLocation} from "react-router-dom";
import {Menu, MenuProps} from "antd";
import {PATH} from "../../routes/routes";


const linkStyle = { color: '#94b1c7' }



const itemsMenu: MenuProps['items'] = [
    {
        key: PATH.PROFILE,
        icon: <NavLink to={PATH.PROFILE} className={s.item} style={linkStyle} activeClassName={s.active}>Profile</NavLink>
    },
    {
        key: PATH.MESSAGES,
        icon: <NavLink to={PATH.MESSAGES} style={linkStyle} activeClassName={s.active}>Messages</NavLink>
    },
    {
        key: PATH.USERS,
        icon: <NavLink to={PATH.USERS} style={linkStyle} activeClassName={s.active}>Users</NavLink>
    },
    {
        key: PATH.NEWS,
        icon: <NavLink to={PATH.NEWS} style={linkStyle} activeClassName={s.active}>News</NavLink>
    },
    {
        key: PATH.MUSIC,
        icon: <NavLink to={PATH.MUSIC} style={linkStyle} activeClassName={s.active}>Music</NavLink>
    },
    {
        key: PATH.SETTINGS,
        icon: <NavLink to={PATH.SETTINGS} style={linkStyle} activeClassName={s.active}>Settings</NavLink>
    },
]

const menuStyle = {
    height: '100%', borderRight: 0, backgroundColor: '#363940', color: '#94b1c7', paddingTop: '10px'
}

export const Navbar = () => {
    const location = useLocation();
    const [locat, setLocat] = useState('');

    useEffect(() => {
        if (location.pathname === "/") {
            debugger
            setLocat('/profile')
            return
        }
        setLocat(location.pathname)
    })
    console.log(locat)
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={[locat]}
            style={menuStyle}
            items={itemsMenu}
            className={s.nav}
        />
    );
}


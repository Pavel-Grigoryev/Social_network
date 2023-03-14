import React from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {Menu, MenuProps} from "antd";

const itemsMenu: MenuProps['items'] = [
    {
        key: '1',
        icon: <NavLink to='/Profile' activeClassName={s.active}>Profile</NavLink>
    },
    {
        key: '2',
        icon:  <NavLink to='/Messages' activeClassName={s.active}>Messages</NavLink>
    },
    {
        key: '3',
        icon:  <NavLink to='/Users' activeClassName={s.active}>Users</NavLink>
    },
    {
        key: '4',
        icon:  <NavLink to='/News' activeClassName={s.active}>News</NavLink>
    },
    {
        key: '5',
        icon:  <NavLink to='/Music' activeClassName={s.active}>Music</NavLink>
    },
    {
        key: '6',
        icon:  <NavLink to='/Settings' activeClassName={s.active}>Settings</NavLink>
    },
]

export const Navbar = () => {
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={itemsMenu}
        />
    );
}


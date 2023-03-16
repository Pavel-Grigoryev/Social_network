import React from "react";
import s from './HeaderApp.module.css'
import asp from './Aspire.png'
import {NavLink} from "react-router-dom";
import {Avatar, Button, Col, Row} from "antd";
import {Header} from "antd/es/layout/layout";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectAva, selectIsAuth} from "../../redux/auth-selectors";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {logoutAuthUser} from "../../redux/auth-reducer";
import {UserOutlined} from '@ant-design/icons';
import {PATH} from "../../routes/routes";


export const HeaderApp = () => {

    const isAuth = useAppSelector(selectIsAuth);
    const avatar = useAppSelector(selectAva);


    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logoutAuthUser());
    }

    return (
        <Header className={s.header}>
            <Row justify={'space-between'} align={'middle'}>
                <Col span={3}>
                    <div className="logo">
                        <NavLink to={PATH.MAIN}><img
                            src={asp}
                            alt=""/>
                        </NavLink>

                    </div>
                </Col>
                <Col span={4}>
                    <div className={s.loginBlock}>
                        {isAuth ?
                            <div className={s.avaBlock}>
                                {avatar ? <Avatar size="large" src={avatar}/> :
                                    <Avatar size="large" icon={<UserOutlined/>}/>}
                                <Button className={s.button} onClick={logoutHandler} type="default" ghost>
                                    Logout
                                </Button>
                            </div> :
                            <Button className={s.button} onClick={logoutHandler} type="default" ghost>
                                <NavLink to={PATH.LOGIN}>Login</NavLink>
                            </Button>

                        }
                    </div>
                </Col>
            </Row>
        </Header>
    )
}


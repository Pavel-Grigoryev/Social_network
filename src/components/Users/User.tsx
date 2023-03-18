import React from 'react';
import s from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import {Button, Col, Row} from "antd";

type UsersPropsType = {
    user: UserType
    followingInProgress: Array<number>
    acceptFollow: (userId: number) => void
    acceptUnFollow: (userId: number) => void
}

export const User = ({user, followingInProgress, acceptUnFollow, acceptFollow}: UsersPropsType) => {
    return (
        <Row className={s.userBlock}>
                <Col span={5}>
                    <div className={s.imgBlock}>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.userImg}
                                 alt={"user's image"}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed ?
                            <Button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                acceptUnFollow(user.id);
                            }}>Unfollow</Button> :
                            <Button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                acceptFollow(user.id);
                            }}>Follow</Button>
                        }
                    </div>
                </Col>
            <Col span={19}>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </Col>
        </Row>
    )
}


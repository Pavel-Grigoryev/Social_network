import React from 'react';
import {UserType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

type UsersPropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    followingInProgress: Array<number>
    onPageChanged: (pageNumber: number) => void
    acceptFollow: (userId: number) => void
    acceptUnFollow: (userId: number) => void
}

export const Users = ({onPageChanged, currentPage, totalUsersCount, pageSize, acceptUnFollow,acceptFollow, followingInProgress,...props}: UsersPropsType) => {

    return (
        <div>
            {props.users.map(u => <User key={u.id} user={u} acceptUnFollow={acceptUnFollow} acceptFollow={acceptFollow} followingInProgress={followingInProgress} />)}
            <Paginator pageSize={pageSize} totalItemsCount={totalUsersCount} currentPage={currentPage} onPageChanged={onPageChanged} />
        </div>
    )
}


import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    acceptFollow,
    acceptUnFollow,
    getUsers,
    UserType
} from "../../redux/users-reducer";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSel
} from "../../redux/users-selectors";

type MapStateToPropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type mapDispatchToPropsType = {
    acceptFollow: (userID: number) => void
    acceptUnFollow: (userID: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

export type UsersContainerPropsType = MapStateToPropsType & mapDispatchToPropsType;

class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return (
            <>
                { this.props.isFetching ?
                    <Preloader/>
                    : null }
                <Users users={this.props.users}
                       pageSize={this.props.pageSize}
                       totalUsersCount={this.props.totalUsersCount}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       acceptFollow={this.props.acceptFollow}
                       acceptUnFollow={this.props.acceptUnFollow}
                       followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsersSel(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default connect(mapStateToProps, {getUsers, acceptUnFollow, acceptFollow})(UsersContainer);


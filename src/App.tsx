import React, {ComponentType} from 'react';
import './App.module.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {LoginContainer} from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import s from "./App.module.css"
import {withSuspense} from "./HOC/withSuspense";

const MessagesContainer = React.lazy(() =>
    import('./components/Messages/MessagesContainer'));
const ProfileContainer = React.lazy(() =>
    import('./components/Profile/ProfileContainer'));


class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.isInitialized) {
            return (
                <div className={s.preloader}>
                    <Preloader/>
                </div>)
        }
        return (

            <div className={s.appWrapper}>
                <HeaderContainer/>
                <Navbar/>
                <div className={s.appWrapperContent}>
                    <Route path={'/Messages'} render={withSuspense(MessagesContainer)}/>
                    <Route path={'/Profile/:userId?'} render={withSuspense(ProfileContainer)}/>
                    <Route path={'/users'} render={() => <UsersContainer/>}/>
                    <Route path={'/News'} render={() => <News/>}/>
                    <Route path={'/Music'} render={() => <Music/>}/>
                    <Route path={'/Settings'} render={() => <Settings/>}/>
                    <Route path={'/login'} render={() => <LoginContainer/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isInitialized: state.app.isInitialized
    }
}

export default compose<ComponentType>(withRouter, connect(mapStateToProps, {initializeApp}))(App);

//Types

type MapDispatchToPropsType = {
    initializeApp: () => void
}

type MapStateToPropsType = {
    isInitialized: boolean
}

type AppPropsType = MapDispatchToPropsType & MapStateToPropsType
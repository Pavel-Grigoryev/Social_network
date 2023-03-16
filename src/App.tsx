import React, {ComponentType} from 'react';
import './App.module.css';
import {Navbar} from "./components/Navbar/Navbar";
import {NavLink, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import {LoginContainer} from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp, setAppError} from "./redux/app-reducer";
import {Preloader} from "./components/common/Preloader/Preloader";
import s from "./App.module.css"
import {withSuspense} from "./HOC/withSuspense";
import {GlobalError} from "./components/common/GlobalError/GlobalError";
//import 'antd/dist/antd.css';

import { Breadcrumb, Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {HeaderApp} from "./components/Header/HeaderApp";
import {AppStateType} from "./types/types";
import {PATH} from "./routes/routes";
const MessagesContainer = React.lazy(() =>
    import('./components/Messages/MessagesContainer'));
const ProfileContainer = React.lazy(() =>
    import('./components/Profile/ProfileContainer'));




const { Header, Content, Sider, Footer } = Layout;



class App extends React.Component<AppPropsType> {

    catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
        this.props.setAppError(event.reason.message);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {





        if (!this.props.isInitialized) {
            return (
                <div className={s.preloader}>
                    <Preloader/>
                </div>)
        }
        return (
            <Layout>
                <HeaderApp/>
                <Layout>
                    <Sider width={200}  style={{backgroundColor: '#363940'}} >
                      <Navbar/>
                    </Sider>
                    <Layout  className={s.appWrapperContent} style={{ padding: '0 24px'}}>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                            }}
                        >
                            <Switch>
                                <Route exact path={'/'} render={() => <Redirect to={PATH.PROFILE}/>}/>
                                <Route path={PATH.MESSAGES} render={withSuspense(MessagesContainer)}/>
                                <Route path={`${PATH.PROFILE}/:userId?`} render={withSuspense(ProfileContainer)}/>
                                <Route path={PATH.USERS} render={() => <UsersContainer/>}/>
                                <Route path={PATH.NEWS} render={() => <News/>}/>
                                <Route path={PATH.MUSIC} render={() => <Music/>}/>
                                <Route path={PATH.SETTINGS} render={() => <Settings/>}/>
                                <Route path={PATH.LOGIN} render={() => <LoginContainer/>}/>
                                <Route path={'*'} render={() => <div>404</div>}/>
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>©2023 Created by Aspire</Footer>
                    </Layout>
                </Layout>
            </Layout>
            // <div className={s.appWrapper}>
            //     <GlobalError error={this.props.error}/>
            //     <HeaderContainer/>            //
            //     <div className={s.appWrapperContent}>

            //     </div>
            // </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isInitialized: state.app.isInitialized,
        error: state.app.error
    }
}

export default compose<ComponentType>(withRouter, connect(mapStateToProps, {initializeApp, setAppError}))(App);

//Types

type MapDispatchToPropsType = {
    initializeApp: () => void
    setAppError: (error: string) => void
}

type MapStateToPropsType = {
    isInitialized: boolean
    error: string
}

type AppPropsType = MapDispatchToPropsType & MapStateToPropsType
import React, {ComponentType} from 'react';
import './App.module.css';
import {Navbar} from "./components/Navbar/Navbar";
import {NavLink, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {LoginContainer} from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp, setAppError} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import s from "./App.module.css"
import {withSuspense} from "./HOC/withSuspense";
import {GlobalError} from "./components/common/GlobalError/GlobalError";
import 'antd/dist/antd.css';
import { Breadcrumb, Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
const MessagesContainer = React.lazy(() =>
    import('./components/Messages/MessagesContainer'));
const ProfileContainer = React.lazy(() =>
    import('./components/Profile/ProfileContainer'));






const { Header, Content, Sider } = Layout;



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
                <Header className="header">
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" />
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                      <Navbar/>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                <Route exact path={'/'} render={() => <Redirect to={"/profile"}/>}/>
                                <Route path={'/Messages'} render={withSuspense(MessagesContainer)}/>
                                <Route path={'/Profile/:userId?'} render={withSuspense(ProfileContainer)}/>
                                <Route path={'/users'} render={() => <UsersContainer/>}/>
                                <Route path={'/News'} render={() => <News/>}/>
                                <Route path={'/Music'} render={() => <Music/>}/>
                                <Route path={'/Settings'} render={() => <Settings/>}/>
                                <Route path={'/login'} render={() => <LoginContainer/>}/>
                                <Route path={'*'} render={() => <div>404</div>}/>
                            </Switch>
                            Content
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
            // <div className={s.appWrapper}>
            //     <GlobalError error={this.props.error}/>
            //     <HeaderContainer/>
            //     <Navbar/>
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
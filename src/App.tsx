import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {MessagesContainer} from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";



const App = () => {
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='app-wrapper__content'>
                <Route path={'/Messages'} render={() => <MessagesContainer/>}/>
                <Route path={'/Profile/:userId?'} render={() => <ProfileContainer/>}/>
                <Route path={'/users'} render={() => <UsersContainer/>}/>
                <Route path={'/News'} render={() => <News/>}/>
                <Route path={'/Music'} render={() => <Music/>}/>
                <Route path={'/Settings'} render={() => <Settings/>}/>
            </div>
        </div>
    );
}

export default App;

import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {RootStateType} from "./redux/state";
import Messages from "./components/Messages/Messages";

type AppPropsType ={
    state:RootStateType
    addPost:(postMessage: string) => void
}

const App:React.FC<AppPropsType> = ({state, addPost}) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper__content'>                    
                    <Route path={'/Messages'} render={() => <Messages messagesPage={state.messagesPage}/>}/>
                    <Route path={'/Profile'} render={() => <Profile profilePage={state.profilePage} addPost={addPost}/>}/>
                    <Route path={'/News'} render={() => <News/>}/>
                    <Route path={'/Music'} render={() => <Music/>}/>
                    <Route path={'/Settings'} render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

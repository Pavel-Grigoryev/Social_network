import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {ActionsTypes, RootStateType} from "./redux/store";
import Messages from "./components/Messages/Messages";

type AppPropsType ={
    state:RootStateType
    dispatch:(action: ActionsTypes) => void
}

const App:React.FC<AppPropsType> = ({state, dispatch}) => {
    debugger
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper__content'>                    
                    <Route path={'/Messages'} render={() => <Messages messagesPage={state.messagesPage} dispatch={dispatch}/>}/>
                    <Route path={'/Profile'} render={() => <Profile profilePage={state.profilePage} dispatch={dispatch} />}/>
                    <Route path={'/News'} render={() => <News/>}/>
                    <Route path={'/Music'} render={() => <Music/>}/>
                    <Route path={'/Settings'} render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

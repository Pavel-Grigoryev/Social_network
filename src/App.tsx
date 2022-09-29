import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialodgs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";

export type MyDataType = {
    posts?: PostsType[]
    dialogs?: DialogItemType[]
    messages?: MessageType[]
}

type PostsType = {
    id?: number
    message: string
    likeCount: number
}

export type DialogItemType = {
    name: string
    id: number
}

export type MessageType = {
    message: string
    // id: number
}

const App:React.FC<MyDataType> = ({posts, dialogs, messages}) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper__content'>
                    <Route path={'/Dialogs'} render={() => <Dialogs dialogs={dialogs} messages={messages}/>}/>
                    <Route path={'/Profile'} render={() => <Profile posts={posts}/>}/>
                    <Route path={'/News'} render={() => <News/>}/>
                    <Route path={'/Music'} render={() => <Music/>}/>
                    <Route path={'/Settings'} render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

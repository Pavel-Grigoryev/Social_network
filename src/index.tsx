import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const posts = [
    {id: 1, message: "Hi, how are you?", likeCount: 10},
    {id: 2, message: "It's my first post", likeCount: 20},
];

const dialogs = [
    {id: 1, name: "Pavel"},
    {id: 2, name: "Dasha"},
    {id: 3, name: "Max"},
    {id: 4, name: "Luda"},
    {id: 5, name: "Vadim"}
];

const messages = [
    {id: 1, message: "Hi"},
    {id: 2, message: "How are you"},
    {id: 3, message: "I'm fine"},
];

ReactDOM.render(
    <App posts={posts} dialogs={dialogs} messages={messages}/>,
  document.getElementById('root')
);
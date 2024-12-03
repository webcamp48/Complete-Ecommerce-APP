import React from 'react';
import './App.css';
import Router from './Router';
import { BrowserRouter, Link } from "react-router-dom";
import chat from '/chat.png';


const App = () => {
  return (
    <div className='app'>

      <BrowserRouter>
        <Link to={'/chat'} className="chat-img"><img src={chat} alt="" /></Link>
        <Router />
      </BrowserRouter>
    </div>
  )
}

export default App
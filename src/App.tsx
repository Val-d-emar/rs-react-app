// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import React from 'react';
import Header from './components/Header';
import Main from './components/Main/Main';
import Spinner from './components/Spinner/Spinner';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <Spinner />
        <Main />
      </div>
    );
  }
}

export default App;

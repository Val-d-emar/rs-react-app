// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import React from 'react';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Header />
      </div>
    );
  }
}

export default App;

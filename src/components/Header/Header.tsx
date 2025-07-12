import React from 'react';
import Search from '../Search/Search';

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>Search</h1>
        <Search />
      </header>
    );
  }
}

export default Header;

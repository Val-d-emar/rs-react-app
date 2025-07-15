import React from 'react';
import Search from '../Search/Search';
import type { ISearchProps } from '../../types/interfaces';

class Header extends React.Component<ISearchProps, object> {
  render() {
    // We get all the data from props, not from state.
    return (
      <header>
        <h1>Top controls</h1>
        <Search {...this.props} />
      </header>
    );
  }
}

export default Header;

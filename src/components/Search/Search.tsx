import React from 'react';
import type { ISearchProps } from '../../types/interfaces';

class Search extends React.Component<ISearchProps, object> {
  render() {
    // We get all the data from props, not from state.
    const { initial, onSearch } = this.props;
    return (
      <div>
        <input
          type='search'
          value={initial}
          placeholder='Search characters...'
          onChange={(e) => onSearch(e.target.value)}
        />
        <button>Search</button>
      </div>
    );
  }
}

export default Search;

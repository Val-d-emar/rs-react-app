// File: src/components/Search/Search.tsx
import React from 'react';
import type { ISearchProps, ISearchState } from '../../types/interfaces';

class Search extends React.Component<ISearchProps, ISearchState> {
  state = {
    value: this.props.initial,
  };

  render() {
    // We get all the data from props, not from state.
    const { onSearch } = this.props;
    return (
      <div>
        <input
          type='search'
          value={this.state.value}
          placeholder='Search characters...'
          onChange={(e) => this.setState({ value: e.target.value })}
        />
        <button
          onClick={() => {
            onSearch(this.state.value);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;

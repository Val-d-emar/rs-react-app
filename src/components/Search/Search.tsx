import React from 'react';
import type { ISearchProps, ISearchState } from '../../types/interfaces';

class Search extends React.Component<ISearchProps, ISearchState> {
  state = {
    value: this.props.initial,
  };

  render() {
    // We get all the data from props, not from state.
    const { onSearch } = this.props;
    // let val = this.state.value;
    return (
      <div>
        <input
          type='search'
          value={this.state.value}
          placeholder='Search characters...'
          onChange={(e) => this.setState({ value: e.target.value })}
          //   onChange={(e) => {
          //     val = e.target.value;
          //   }}
        />
        <button
          onClick={() => {
            // this.setState({ value: val });
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

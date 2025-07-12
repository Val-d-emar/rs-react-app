import React from 'react';

class Search extends React.Component {
  render() {
    return (
      <div>
        <input type='search' placeholder='Search characters...' />
        <button>Search</button>
      </div>
    );
  }
}

export default Search;

// File: src/components/Main/Main.tsx
import React from 'react';
import Spinner from '../Spinner/Spinner';
import type { IProps } from '../../types/interfaces';

class Main extends React.Component<IProps, object> {
  render() {
    // We get all the data from props, not from state.
    const { loading, error, filteredData } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    if (!loading && filteredData.length === 0) {
      return <p>Not found.</p>;
    }

    return (
      <main>
        {/* There will be a list of cards or a spinner/error here. */}
        <p>
          <ul>
            {filteredData.map((char) => (
              <li key={char.name}>{char.name}</li>
            ))}
          </ul>
        </p>
      </main>
    );
  }
}

export default Main;

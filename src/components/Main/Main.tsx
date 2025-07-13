// File: src/components/Main/Main.tsx
import React from 'react';
import Spinner from '../Spinner/Spinner';
import type { IProps } from '../../types/interfaces';
import CardList from '../CardList/CardList';

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
        {/* We render a table with the list of cards. */}
        <table border={1} cellPadding={5} cellSpacing={0} width={'100%'}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <CardList items={filteredData} />
        </table>
        <button
          onClick={() => {
            throw new Error('This is a test error!');
          }}
          style={{ position: 'relative', marginTop: '20px', left: '50px' }}
        >
          Throw Error
        </button>
      </main>
    );
  }
}

export default Main;

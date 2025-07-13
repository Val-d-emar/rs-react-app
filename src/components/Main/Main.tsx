// File: src/components/Main/Main.tsx
import React from 'react';
import Spinner from '../Spinner/Spinner';
import type { IProps } from '../../types/interfaces';
import CardList from '../CardList/CardList';
import styles from './Main.module.css';

class Main extends React.Component<IProps, object> {
  render() {
    const { loading, error, filteredData } = this.props;

    if (loading) {
      return <Spinner />;
    }

    // if (error) {
    //   return <p>Error: {error.message}</p>;
    // }

    // if (!loading && filteredData.length === 0) {
    //   return <p>Not found.</p>;
    // }

    return (
      <main>
        <h2>Results</h2>
        {error && (
          <p>Error: {error instanceof Error ? error.message : error} </p>
        )}
        {filteredData.length === 0 && !loading && !error && <p>Not found.</p>}
        {/* There will be a list of cards or a spinner/error here. */}
        {/* We render a table with the list of cards. */}
        {filteredData.length != 0 && !loading && !error && (
          <table className={styles.resultsTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <CardList items={filteredData} />
          </table>
        )}
      </main>
    );
  }
}

export default Main;

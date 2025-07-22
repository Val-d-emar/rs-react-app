// File: src/App.tsx
import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import type { IItem, IState } from './types/interfaces';
import { log } from './log';
import ThrowError from './components/ThrowError/ThrowError';

export class App extends React.Component<object, IState> {
  state: IState = {
    data: [],
    loading: true,
    error: null,
    search: localStorage.getItem('pokeSearch') || '',
  };
  componentDidMount() {
    this.fetchData(this.state.search);
  }

  // This method fetches data from the PokeAPI.
  fetchData = async (search: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;

    this.setState({ loading: true, error: null });
    try {
      let response = await fetch(url);
      if (!response.ok) {
        // PokeAPI returns a 404 if the Pokémon is not found, this is a normal situation.
        if (response.status === 404) {
          response = await fetch('https://pokeapi.co/api/v2/pokemon'); //get all
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      const data = await response.json();

      // If you searched for a specific Pokémon, the API will return an object. We wrap it in an array.
      // // If you requested a list, the API will return { results: [...] }.
      const pokeData: IItem[] = [];
      if (data.results && Array.isArray(data.results)) {
        data.results.map((item: IItem) => {
          pokeData.push({
            name: item.name,
            url:
              item.url.split('/').filter(Boolean).pop() ||
              'N/A ' + Math.random(),
          });
        });
      } else if (data && data.name && data.id) {
        pokeData.push({
          name: data.name,
          url: String(data.id),
        });
      } else {
        throw new Error('Unexpected data format');
      }
      this.setState({
        data: pokeData.filter((char) =>
          char.name.toLowerCase().includes(search.toLowerCase().trim())
        ),
        loading: false,
      });
      log('Fetched data:', data);
    } catch (e) {
      this.setState({ error: e as Error, loading: false });
    }
  };
  // This handler is invoked when the 'Search' button is clicked.
  handleSearch = (term: string) => {
    const trimmed = term.trim();
    this.setState({ search: trimmed });
    localStorage.setItem('pokeSearch', trimmed);
    this.fetchData(trimmed);
  };
  render() {
    const { search, loading, error, data } = this.state;
    return (
      <div className='app'>
        <ErrorBoundary>
          <Header initial={search} onSearch={this.handleSearch} />
          <Main loading={loading} error={error} filteredData={data} />
          <ThrowError />
        </ErrorBoundary>
      </div>
    );
  }
}
export default App;

// File: src/App.tsx
import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import type { IState } from './types/interfaces';

class App extends React.Component<object, IState> {
  state: IState = {
    data: [],
    // filteredData: [],
    loading: true,
    error: null,
    search: localStorage.getItem('pokeSearch') || '',
  };
  componentDidMount() {
    this.fetchData(this.state.search);
  }
  // This method fetches data from the PokeAPI.
  fetchData = async (search: string) => {
    const url = search
      ? `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      : 'https://pokeapi.co/api/v2/pokemon';

    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // PokeAPI returns a 404 if the Pokémon is not found, this is a normal situation.
        if (response.status === 404) {
          this.setState({ data: [], loading: false });
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // If you searched for a specific Pokémon, the API will return an object. We wrap it in an array.
      // // If you requested a list, the API will return { results: [...] }.
      this.setState(
        { data: data.results ? data.results : [data], loading: false } //,
      );
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
        <Header initial={search} onSearch={this.handleSearch} />
        <Main loading={loading} error={error} filteredData={data} />
      </div>
    );
  }
}

export default App;

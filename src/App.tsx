// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import type { IState } from './types/interfaces';
// import Spinner from './components/Spinner/Spinner';

class App extends React.Component<object, IState> {
  state: IState = {
    data: [],
    filteredData: [],
    loading: true,
    error: null,
    search: 'a',
  };
  componentDidMount() {
    this.fetchData();
  }
  // просто фильтрует массив
  filterData = (term: string) => {
    const lowerCase = term.toLowerCase().trim();
    const filtered = this.state.data.filter((char) =>
      char.name.toLowerCase().includes(lowerCase)
    );
    this.setState({ filteredData: filtered });
  };
  fetchData = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon'; //?limit=1000
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.setState(
        { data: data.results, loading: false },
        // После загрузки сразу отфильтруем список
        () => this.filterData(this.state.search)
        // () => {}
      );
    } catch (e) {
      this.setState({ error: e as Error, loading: false });
    }
  };
  // This handler is invoked when the 'Search' button is clicked.
  handleSearch = (term: string) => {
    const trimmed = term.trim();
    this.setState({ search: trimmed });
    localStorage.setItem('pokeSearchTerm', trimmed);
    this.filterData(trimmed);
  };
  render() {
    const { search, loading, error, filteredData } = this.state;
    return (
      <div className='app'>
        <Header initial={search} onSearch={this.handleSearch} />
        <Main loading={loading} error={error} filteredData={filteredData} />
      </div>
    );
  }
}

export default App;

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
    search: localStorage.getItem('pokeSearch') || '',
  };
  componentDidMount() {
    this.fetchData(this.state.search);
  }
  // просто фильтрует массив
  // filterData = (term: string) => {
  //   const lowerCase = term.toLowerCase().trim();
  //   const filtered = this.state.data.filter((char) =>
  //     char.name.toLowerCase().includes(lowerCase)
  //   );
  //   this.setState({ filteredData: filtered });
  // };
  fetchData = async (search: string) => {
    const url = search
      ? `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      : 'https://pokeapi.co/api/v2/pokemon';

    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(url);
      // , {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // });
      if (!response.ok) {
        // PokeAPI возвращает 404 если покемон не найден, это штатная ситуация
        if (response.status === 404) {
          this.setState({ data: [], loading: false });
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // 3. Адаптация ответа API
      // Если искали конкретного покемона, API вернет объект. Оборачиваем его в массив.
      // Если запрашивали список, API вернет { results: [...] }.
      this.setState(
        { filteredData: data.results ? data.results : [data], loading: false } //,
        // После загрузки сразу отфильтруем список
        // () => this.filterData(this.state.search)
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
    localStorage.setItem('pokeSearch', trimmed);
    // this.filterData(trimmed);
    this.fetchData(trimmed);
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

import React from 'react';
import Spinner from '../Spinner/Spinner';

// Let's define types for the data from the API.

interface IState {
  data: Idata[];
  filteredData: Idata[];
  loading: boolean;
  error: Error | null;
  search: string;
}
interface Idata {
  name: string;
  url: string;
}

class Main extends React.Component<object, IState> {
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
  render() {
    const { loading, error, filteredData } = this.state;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <p>Error: {error.message}</p>;
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

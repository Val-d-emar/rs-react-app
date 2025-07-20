import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from './App';
import type { IItem } from './types/interfaces';

// --- Preparation ---

// 1. Mock data that we will be returning from our 'fake' API.
const mockPokemonList: IItem[] = [
  { name: 'Charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
  { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
];

// 2. We mock child components to isolate the App tests from their implementation.
vi.mock('./components/Spinner/Spinner', () => ({
  default: () => <div data-testid='spinner'>Loading...</div>,
}));

describe('App Component - Integration Tests', () => {
  // 3. We are configuring the "spy" for the global fetch method
  const fetchSpy = vi.spyOn(window, 'fetch');

  // 4. Clearing localStorage and mocks before each test for isolation.
  beforeEach(() => {
    localStorage.clear();
    // We are using vi.clearAllMocks() or fetchSpy.mockClear()
    fetchSpy.mockClear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  // --- Tests ---

  it('should fetch and display a list of pokemon on initial render', async () => {
    // Arrange: Setting up mock fetch for a successful response
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockPokemonList }),
    } as Response);

    // Act
    render(<App />);

    // Assert: we check that the spinner is visible first
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Waiting for the asynchronous operations to complete and the UI to update.
    await waitFor(() => {
      // We check that the spinner has disappeared.
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
      // We are checking that the data from the mock is displayed.
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Charizard')).toBeInTheDocument();
    });

    // We check that fetch was called with the correct URL.
    expect(fetchSpy).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/');
  });
  it('should fetch and display a list of pokemon on initial render if bag data', async () => {
    // Arrange: Setting up mock fetch for a successful response
    const badData: IItem[] = [
      { name: 'Charizard', url: '' },
      { name: 'Bulbasaur', url: '' },
    ];
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: badData }),
    } as Response);

    // Act
    render(<App />);

    // Waiting for the asynchronous operations to complete and the UI to update.
    await waitFor(() => {
      // We are checking that the data from the mock is displayed.
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Charizard')).toBeInTheDocument();
      const naElements = screen.getAllByText(/N\/A/i);
      expect(naElements).toHaveLength(badData.length);
    });
  });
  it('should trow error if bag data', async () => {
    // Arrange: Setting up mock fetch for a successful response
    const badData = { name: 'Charizard', id: null };
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...badData }),
    } as Response);

    // Act
    render(<App />);

    // Waiting for the asynchronous operations to complete and the UI to update.
    await waitFor(() => {
      // We are checking that the data from the mock is displayed.
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
      expect(screen.getByText(/Unexpected data format/i)).toBeInTheDocument();
    });
  });
  it('should perform a search when user types and clicks search button', async () => {
    const user = userEvent.setup();

    // Arrange: The first fetch for the initial loading (empty list)
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response);
    // Second fetch for the search result
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'Charizard', id: 6 }), // Solo Pokemon
    } as Response);

    // Act
    render(<App />);
    const searchInput = screen.getByRole('searchbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await user.type(searchInput, 'charizard');
    await user.click(searchButton);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Charizard')).toBeInTheDocument();
    });

    // Checking that the second fetch call was made with the correct search URL.
    expect(fetchSpy).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/');
    // Checking that the value has been saved in localStorage
    expect(localStorage.getItem('pokeSearch')).toBe('charizard');
  });

  it('should display an error message if the API call fails', async () => {
    // Arrange: Нwe are adjusting mock fetch for the error
    fetchSpy.mockRejectedValueOnce(new Error('Network Error'));

    // Act
    render(<App />);

    // Assert
    await waitFor(() => {
      // We are looking for the error message that our component should display.
      expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
    });
  });

  it('should load search term from localStorage on initial render', async () => {
    // Arrange: Save the value in localStorage BEFORE rendering
    localStorage.setItem('pokeSearch', 'metapod');
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'metapod', id: 11 }),
    } as Response);

    // Act
    render(<App />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Metapod')).toBeInTheDocument();
    });

    // Checking that fetch was called immediately with the search query from localStorage
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/metapod'
    );
    // Checking that the input field is filled with the value from localStorage
    expect(screen.getByRole('searchbox')).toHaveValue('metapod');
  });

  it('should render an error message when an error is provided', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response);

    // Act
    render(<App />);

    // Assert: Пwe check that the spinner is visible first
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Waiting for the asynchronous operations to complete and the UI to update.
    await waitFor(() => {
      // We check that the spinner has disappeared.
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
      // Assert: We are checking that the error message is in place.
      expect(screen.getByText(/Not found/i)).toBeInTheDocument();
    });

    // We check that fetch was called with the correct URL.
    expect(fetchSpy).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/');
  });

  it('should perform a search when user types and clicks search button', async () => {
    const user = userEvent.setup();

    // Arrange: The first fetch for the initial loading (empty list)
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response);
    // Second fetch for the search result
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response);

    // Act
    render(<App />);
    const searchInput = screen.getByRole('searchbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await user.type(searchInput, 'hycnrdgyubcbgynruzmcrnarser');
    await user.click(searchButton);

    // Waiting for the asynchronous operations to complete and the UI to update.
    await waitFor(() => {
      // We check that the spinner has disappeared.
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
      // Assert: We are checking that the error message is in place.
      expect(screen.getByText(/Not found/i)).toBeInTheDocument();
    });

    // Checking that the second fetch call was made with the correct search URL.
    expect(fetchSpy).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/');
    // Checking that the value has been saved in localStorage
    expect(localStorage.getItem('pokeSearch')).toBe(
      'hycnrdgyubcbgynruzmcrnarser'
    );

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('should render the "Throw Error" button in all states except loading/error', async () => {
    // Checking for the presence of the button upon successful render
    const user = userEvent.setup();

    // Arrange: The first fetch for the initial loading (empty list)
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    } as Response);

    // Act
    const { rerender } = render(<App />);
    const searchInput = screen.getByRole('searchbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    // Checking for the presence of a button when the list is empty
    await user.type(searchInput, 'hycnrdgyubcbgynruzmcrnarser');
    await user.click(searchButton);

    rerender(<App />);
    expect(
      screen.getByRole('button', { name: /Throw Error/i })
    ).toBeInTheDocument();

    // Checking for the presence of a button when the list is not empty
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockPokemonList }),
    } as Response);

    await user.type(searchInput, 'a');
    await user.click(searchButton);

    rerender(<App />);
    expect(
      screen.getByRole('button', { name: /Throw Error/i })
    ).toBeInTheDocument();

    // let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const errorButton = screen.getByRole('button', { name: /Throw Error/i });
    await user.click(errorButton);
    // Checking that the error is thrown and the button is no longer present
    rerender(<App />);
    expect(
      screen.queryByRole('button', { name: /Throw Error/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/Something went wrong. Please reload the page/i)
    ).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
  it('should display an error message if the API call fails', async () => {
    // Arrange: Setting up the fetch mock to ERROR (rejected Promise)
    fetchSpy.mockRejectedValueOnce(new Error('Network Error'));

    // Act
    render(<App />);

    // Assert
    await waitFor(() => {
      // We are looking for the error message that our component should display.
      expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
    });
  });
  // And also a test for server error (not 200 OK)
  it('should handle non-200 API responses gracefully', async () => {
    // Arrange: Emulating a server response with an error (for example, 500)
    fetchSpy.mockResolvedValueOnce({
      ok: false, // <-- Key flag
      status: 500,
    } as Response);
    // Act
    render(<App />);
    // Assert
    await waitFor(() => {
      // We are looking for the error message that our component should display.
      expect(screen.getByText(/HTTP error! status/i)).toBeInTheDocument();
      expect(screen.getByText(/500/i)).toBeInTheDocument();
    });
  });
  it('should handle 404 API response', async () => {
    // Arrange: Emulating a server response with an error (for example, 500)
    fetchSpy.mockResolvedValueOnce({
      ok: false, // <-- Key flag
      status: 404,
    } as Response);
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockPokemonList }),
    } as Response);
    // Act
    render(<App />);
    // Assert
    // Waiting for the asynchronous operations to complete and the UI to update.
    await waitFor(() => {
      // We are checking that the data from the mock is displayed.
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Charizard')).toBeInTheDocument();
    });

    // We check that fetch was called with the correct URL.
    expect(fetchSpy).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/');
  });
  it('should handle 404 API response + 500 second', async () => {
    // Arrange: Emulating a server response with an error (for example, 500)
    fetchSpy.mockResolvedValueOnce({
      ok: false, // <-- Key flag
      status: 404,
    } as Response);
    // Arrange: Emulating a server response with an error (for example, 500)
    fetchSpy.mockResolvedValueOnce({
      ok: false, // <-- Key flag
      status: 500,
    } as Response);
    // Act
    render(<App />);
    // Assert
    await waitFor(() => {
      // We are looking for the error message that our component should display.
      expect(screen.getByText(/HTTP error! status/i)).toBeInTheDocument();
      expect(screen.getByText(/500/i)).toBeInTheDocument();
    });
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Main from './Main';
import type { IItem } from '../../types/interfaces';

// Vitest requires us to "drench" child components if they are not important for the test.
// This speeds up the test and isolates Main from the child elements.
vi.mock('../Spinner/Spinner', () => ({
  default: () => <div data-testid='spinner'>Mocked Spinner</div>,
}));

vi.mock('../CardList/CardList', () => ({
  default: () => (
    <tbody data-testid='card-list-body'>
      <tr>
        <td>Mocked CardList</td>
      </tr>
    </tbody>
  ),
}));

describe('Main Component', () => {
  const mockPokemonList: IItem[] = [{ name: 'Pikachu', url: '25' }];

  it('should render the Spinner when loading is true', () => {
    // Arrange & Act: Rendering the component in the loading state
    render(<Main loading={true} error={null} filteredData={[]} />);

    // Assert: We check that the spinner is in place, and there is none of the rest.
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByText(/No Pokémon found/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('should render "No found" message when the list is empty and not loading', () => {
    // Act: Rendering with an empty list
    render(<Main loading={false} error={null} filteredData={[]} />);

    // Assert: Checking for the presence of the corresponding message
    expect(screen.getByText(/Not found/i)).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('should render the results table when data is provided', () => {
    // Act: Rendering with data
    render(
      <Main loading={false} error={null} filteredData={mockPokemonList} />
    );

    // Assert: Checking that the table (and its 'locked' body) is in place.
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByTestId('card-list-body')).toBeInTheDocument();

    // We check that there are no other states.
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(screen.queryByText(/Not found/i)).not.toBeInTheDocument();
  });
  it('should render "Error" message when the error', () => {
    const error = new Error('This is a test error!');
    // Act: Rendering with an empty list
    render(<Main loading={false} error={error} filteredData={[]} />);

    // Assert: Checking for the presence of the corresponding message
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test error/i)).toBeInTheDocument();
  });
  it('should render the error as a string if it is not an Error object', () => {
    // Arrange: We create props, where error is a simple string.
    const errorString = 'Something went terribly wrong';
    const props = {
      loading: false,
      error: errorString, // <--- Ключевой момент
      filteredData: [],
    };

    // Act
    render(<Main {...props} />);

    // Assert: We check that the string itself is displayed, not its property. .message
    expect(screen.getByText(`Error: ${errorString}`)).toBeInTheDocument();
  });
});

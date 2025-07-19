// import { render, screen } from '@testing-library/react';
// import { describe, it, expect, vi } from 'vitest';
// import type { IItem } from './types/interfaces';
// import Main from './components/Main/Main';
// import App from './App';

// // Vitest requires us to "drench" child components if they are not important for the test.
// // This speeds up the test and isolates Main from the child elements.
// vi.mock('../Spinner/Spinner', () => ({
//   default: () => <div data-testid='spinner'>Mocked Spinner</div>,
// }));

// vi.mock('../CardList/CardList', () => ({
//   default: () => (
//     <tbody data-testid='card-list-body'>
//       <tr>
//         <td>Mocked CardList</td>
//       </tr>
//     </tbody>
//   ),
// }));

// describe('App Component', () => {
//   const mockPokemonList: IItem[] = [
//     { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
//   ];

//   it('should render an error message when an error is provided', () => {
//     // Arrange
//     const mockError = new Error('Failed to fetch');

//     // Act: Rendering the component with an error
//     render(<App object data={[]} loading={false} error={mockError} />);

//     // Assert: We are checking that the error message is in place.
//     expect(screen.getByText(/Not found/i)).toBeInTheDocument();
//     expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
//     expect(screen.queryByRole('table')).not.toBeInTheDocument();
//   });

//   it('should render the "Throw Error" button in all states except loading/error', () => {
//     // Checking for the presence of the button upon successful render
//     const { rerender } = render(
//       <App data={mockPokemonList} loading={false} error={null} />
//     );
//     expect(
//       screen.getByRole('button', { name: /Throw Error/i })
//     ).toBeInTheDocument();

//     // Checking for the presence of a button when the list is empty
//     rerender(<App data={[]} loading={false} error={null} />);
//     expect(
//       screen.getByRole('button', { name: /Throw Error/i })
//     ).toBeInTheDocument();
//   });
// });

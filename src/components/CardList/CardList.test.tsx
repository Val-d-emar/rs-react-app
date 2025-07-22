// src/components/CardList/CardList.test.tsx
import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardList from './CardList';
import type { IItem } from '../../types/interfaces';

describe('CardList Component', () => {
  const mockPokemonList: IItem[] = [
    { name: 'Bulbasaur', url: '1' },
    { name: 'Charmander', url: '4' },
    { name: 'Squirtle', url: '7' },
  ];

  it('should render a table row for each pokemon', () => {
    // Arrange & Act: We are rendering the component inside the table, since. <tbody> cannot exist on its own
    render(
      <table>
        <CardList items={mockPokemonList} />
      </table>
    );

    // Assert:
    // 1. Finding the body of the table
    const tableBody = screen.getByTestId('card-list-body');
    // 2. Searching for ALL lines (role 'row') Inside the body of the table
    const rows = within(tableBody).getAllByRole('row');
    // 3. We check that the number of lines matches the length of our mock array.
    expect(rows).toHaveLength(mockPokemonList.length);
  });

  it('should render no rows if the pokemon list is empty', () => {
    render(
      <table>
        <CardList items={[]} />
      </table>
    );

    const tableBody = screen.getByTestId('card-list-body');
    // Используем queryAllByRole, т.к. он не выдает ошибку, если ничего не найдено (в отличие от getAllByRole)
    const rows = within(tableBody).queryAllByRole('row');
    expect(rows).toHaveLength(0);
  });
});

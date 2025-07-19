import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';
import type { IItem } from '../../types/interfaces';

// `describe` groups related tests
describe('Card Component', () => {
  // `it` or `test` describes a specific test case
  it('should render pokemon name and description correctly', () => {
    // 1. Arrange (Preparation): We are creating mock (artificial) data
    const mockPokemon: IItem = {
      name: 'Pikachu',
      url: '25',
    };

    // 2. Act (Action): Rendering the component with mock data
    render(
      <table>
        <tbody>
          <Card {...mockPokemon} />
        </tbody>
      </table>
    );

    // 3. Assert (Check): We check that what we expected has appeared on the screen.
    // We use screen.getByText to search for elements by their text
    // Regular expression /Pikachu/i makes search case insensitive
    const nameElement = screen.getByText(/Pikachu/i);
    const descriptionElement = screen.getByText(/25/i);

    // `expect` - this statement. We expect that the elements are in the document.
    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});

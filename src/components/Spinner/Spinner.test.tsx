// src/components/Spinner/Spinner.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Spinner from './Spinner';

describe('Spinner Component', () => {
  it('should render correctly', () => {
    // Act: Rendering the component
    render(<Spinner />);

    // Assert: Searching for the element by its data-testid
    const spinnerElement = screen.getByTestId('spinner');

    // Checking if it exists in the DOM
    expect(spinnerElement).toBeInTheDocument();
  });
});

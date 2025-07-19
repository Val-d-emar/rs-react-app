import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Search from './Search';

describe('Search Component', () => {
  it('should render an input and a button', () => {
    // Arrange: Creating a 'dummy' for mandatory skipping onSearch
    const handleSearchMock = vi.fn();

    // Act: Рендерим компонент
    render(<Search initial='' onSearch={handleSearchMock} />);

    // Assert: Checking the presence of elements on the screen
    // getByRole - the best way to search for elements, as it is focused on accessibility (accessibility)
    const inputElement = screen.getByRole('searchbox');
    const buttonElement = screen.getByRole('button', { name: /search/i });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should display the initial search term from props', () => {
    const handleSearchMock = vi.fn();
    const initialTerm = 'Darth Vader';

    render(<Search initial={initialTerm} onSearch={handleSearchMock} />);

    const inputElement = screen.getByRole('searchbox');
    // We check that the initial value is displayed in the input field.
    expect(inputElement).toHaveValue(initialTerm);
  });

  it('should update input value when user types', async () => {
    const user = userEvent.setup();
    const handleSearchMock = vi.fn();

    render(<Search initial='' onSearch={handleSearchMock} />);

    const inputElement = screen.getByRole('searchbox');

    // Act: Simulating user text input
    await user.type(inputElement, 'Luke Skywalker');

    // Assert: We check that the value in the input field has been updated.
    expect(inputElement).toHaveValue('Luke Skywalker');
  });

  it('should call the onSearch callback with the input value when button is clicked', async () => {
    const user = userEvent.setup();
    // Arrange: Creating a mock function to track its calls
    const handleSearchMock = vi.fn();
    const searchTerm = 'R2-D2';

    render(<Search initial='' onSearch={handleSearchMock} />);

    const inputElement = screen.getByRole('searchbox');
    const buttonElement = screen.getByRole('button', { name: /search/i });

    // Act: The user enters the text and presses the button.
    await user.type(inputElement, searchTerm);
    await user.click(buttonElement);

    // Assert: We are checking that our mock function was called.
    expect(handleSearchMock).toHaveBeenCalledTimes(1);
    // And most importantly: we check that it was called with the CORRECT value.
    expect(handleSearchMock).toHaveBeenCalledWith(searchTerm);
  });
});

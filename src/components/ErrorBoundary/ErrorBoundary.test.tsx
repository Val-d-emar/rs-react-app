import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

// 1. Creating a "problematic" component that will throw an error.
const ProblematicComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('This is a test error!');
  }
  return <div>I am a good component</div>;
};

describe('ErrorBoundary Component', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  // 2. Setting up the "spy" for console.error before each test
  beforeEach(() => {
    // We expect that React and our ErrorBoundary will call console.error.
    // To avoid cluttering the console during tests, we 'intercept' these calls.
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  // 3. Restoring the original console.error function after each test
  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should render children when there is no error', () => {
    // Act: Rendering ErrorBoundary with a "good" child component
    render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    // Assert: Checking that the child component is displayed
    expect(screen.getByText(/I am a good component/i)).toBeInTheDocument();
  });

  it('should display a fallback UI when a child component throws an error', () => {
    // Act: Rendering ErrorBoundary with a "problematic" child component
    render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // Assert:
    // 1. We are checking that the backup UI has appeared on the screen.
    expect(
      screen.getByText(/Something went wrong. Please reload the page/i)
    ).toBeInTheDocument();

    // 2. Checking that the "problematic" component did NOT appear.
    expect(
      screen.queryByText(/I am a good component/i)
    ).not.toBeInTheDocument();
  });

  it('should log the error to the console when it catches an error', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // Assert: We check that our 'spy' on console.error was called.
    // React calls it twice in the test environment, so we are checking that there were calls > 0.
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});

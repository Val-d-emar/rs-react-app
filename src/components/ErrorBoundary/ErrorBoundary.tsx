// File: src/components/ErrorBoundary/ErrorBoundary.tsx
// We use `import type` for entities that are only types.
import { Component, type ErrorInfo, type ReactNode } from 'react';

// Typing: the component accepts child elements
interface Props {
  children: ReactNode;
}

// Typing: the state holds a flag for the presence of an error
interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // 1. Initializing state
  public state: State = {
    hasError: false,
  };

  // 2. This method updates the state so that the next render will show the fallback UI.
  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  // 3. This method logs error information.
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  // 4. The render method decides what to show.
  public render() {
    // If there is an error flag in the state...
    if (this.state.hasError) {
      // ...showing the backup interface.
      return <h1>Something went wrong. Please reload the page.</h1>;
    }

    // Otherwise, we just render the child components as usual.
    return this.props.children;
  }
}

export default ErrorBoundary;

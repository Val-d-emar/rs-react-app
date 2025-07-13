// File: src/components/ThrowError/ThrowError.tsx
import React from 'react';
import type { IThrowErrorState } from '../../types/interfaces';
import styles from './ThrowError.module.css';

class ThrowError extends React.Component<object, IThrowErrorState> {
  state = {
    throwError: false,
  };
  // This button simply changes the state.
  triggerRenderError = () => {
    this.setState({ throwError: true });
  };
  render() {
    // In the next render, this condition will become true.
    if (this.state.throwError) {
      // The error occurs DIRECTLY INSIDE RENDER,
      // that's why ErrorBoundary will catch it!
      throw new Error('This is a test error!');
    }
    return (
      <div className={styles.error}>
        <button
          onClick={this.triggerRenderError}
          // style={{ position: 'relative', marginTop: '20px', left: '50px' }}
        >
          Throw Error
        </button>
      </div>
    );
  }
}
export default ThrowError;

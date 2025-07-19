import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { log } from './log'; // Importing our function

describe('log utility function', () => {
  // Creating a "spy" for console.log. It will track all calls to this function.
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  // Before each test, we 'mock' (replace) console.log with an empty function.
  // This is necessary to prevent log messages from cluttering the output of the test results.
  beforeEach(() => {
    vi.resetModules();
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  // After each test, we restore the original implementation of console.log.
  // This is EXTREMELY IMPORTANT to avoid breaking the logs in other tests.
  afterEach(() => {
    consoleLogSpy.mockRestore();
    vi.unstubAllEnvs(); // Resetting all overridden environment variables
  });

  it('should NOT call console.log because the "logging" constant is false', () => {
    // Arrange: We set the environment to 'development' to specifically test the flag "logging"
    vi.stubEnv('VITE_LOGGING_ENABLED', 'false');
    vi.stubEnv('MODE', 'development');

    // Act: Calling our function
    log('Hello', 'World');

    // Assert: We make sure that console.log was NOT called.
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  it('should NOT call console.log when MODE is not "development"', () => {
    // Arrange: Setting up the environment in 'production'
    vi.stubEnv('VITE_LOGGING_ENABLED', 'true');
    vi.stubEnv('MODE', 'production');

    // Act
    log('This should not be logged');

    // Assert
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });
  // Test case: "Happy path"
  it('should call console.log when logging is enabled AND mode is development', () => {
    // Arrange: Creating ideal conditions for calling the log
    vi.stubEnv('VITE_LOGGING_ENABLED', 'true');
    vi.stubEnv('MODE', 'development');
    const message = 'This should be logged';
    const anotherArg = { id: 1 };

    // Act: We call our function with several arguments
    log(message, anotherArg);

    // Assert: Checking that console.log was called exactly once.
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    // And we check that it was called with the correct arguments.
    expect(consoleLogSpy).toHaveBeenCalledWith(message, anotherArg);
  });
});

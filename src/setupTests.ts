// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"; // Add matchers for React Testing Library

const originalWarn = console.warn;
console.warn = (message: string, ...rest: any[]) => {
  if (
    message.includes("React Router Future Flag Warning") ||
    message.includes(
      "Relative route resolution within Splat routes is changing"
    )
  ) {
    return;
  }
  originalWarn(message, ...rest);
};

// Mock `console.error` globally for cleaner test logs
jest.spyOn(console, "error").mockImplementation(() => {});

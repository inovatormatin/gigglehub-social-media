require("dotenv").config({ path: ".env.test" });

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/tests/styleMock.js", // Mock CSS/SCSS imports
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Setup file for Jest environment
  testMatch: ["<rootDir>/src/tests/**/*.test.(ts|tsx)"], // Matches `.test.ts` and `.test.tsx` files
};

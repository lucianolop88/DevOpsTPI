module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  setupFiles: ["<rootDir>/jest.setup.js"],
};

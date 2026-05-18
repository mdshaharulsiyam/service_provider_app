module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  forceExit: true,
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|react-native-.*|@react-native|@react-native-community|@react-navigation|expo|expo-.*|@expo(nent)?/.*|@expo/.*|react-redux|@reduxjs/toolkit|redux|redux-thunk|reselect|immer)/)",
  ],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/__mocks__/svgMock.js",
  },
};

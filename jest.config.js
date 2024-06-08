module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  };
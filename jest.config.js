module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  verbose: true, // Включает подробный вывод
  bail: true, // Останавливает тесты после первого провала
  collectCoverage: true, // Включает сбор покрытия кода
  coverageReporters: ['text-summary', 'lcov'], // Форматы отчетов покрытия
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Игнорирование определенных папок
  errorOnDeprecated: true, // Выводит предупреждения об использовании устаревших API
  testTimeout: 10000, // Устанавливает таймаут для тестов в миллисекундах
};
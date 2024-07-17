/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  bail: false,
  globalSetup: './src/tests/globalSetup.ts',
  globalTeardown: './src/tests/globalTeardown.ts'
};
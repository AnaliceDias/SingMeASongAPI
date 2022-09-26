/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
      'ts-jest': {
          useESM: true,
      },
  },
  moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};

// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node'
//   };
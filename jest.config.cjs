module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^/(.*)': '<rootDir>/$1',
    '^src/(.*)': '<rootDir>/src/$1',
    '^images/(.*)$': '<rootDir>/src/images/$1',
    '^storage/(.*)$': '<rootDir>/src/storage/$1',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  }
}

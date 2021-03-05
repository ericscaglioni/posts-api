module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.js',
        '!<rootDir>/src/**/I**.js',
        '!**/protocols/**',
        '!<rootDir>/src/main/**'
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'node'
}
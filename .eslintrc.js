module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: 'airbnb',
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
}

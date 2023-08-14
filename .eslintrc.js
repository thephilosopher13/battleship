module.exports = {
    env: {
        browser: true,
        commonjs: true,
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

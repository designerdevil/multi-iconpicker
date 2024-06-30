module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    parserOptions: {
        sourceType: 'module',
    },
    extends: ['plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': 'warn',
    },
    // "rules": {
    //     "semi": [
    //         "error",
    //         "always"
    //     ],
    //     "quotes": [
    //         "error",
    //         "double"
    //     ]
    // }
}
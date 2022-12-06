module.exports = {
    extends: ['airbnb', 'airbnb-typescript'],
    // extends: ['eslint:recommended'],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'import/prefer-default-export': 'off',
        '@typescript-eslint/indent': ['error', 4],
    },
};

// configuring eslint for typescript, react and prettier
// https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project

module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    overrides: [
        {
            files: ['**/*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'spaced-comment': ['warn', 'always'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'prettier/prettier': 'warn',
        'react-hooks/rules-of-hooks': 'warn',
        'react/display-name': 'off',
        'react/prop-types': 'off',
    },
};

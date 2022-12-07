module.exports = {
    extends: [
        'eslint:recommended',
        'airbnb',
        'airbnb-typescript',
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'import/prefer-default-export': 'off',
        '@typescript-eslint/indent': ['error', 4],
        'no-console': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        'arrow-parens': ['warn', 'as-needed']
    },
};

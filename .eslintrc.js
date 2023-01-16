module.exports = {
    extends: ['eslint:recommended', 'airbnb', 'airbnb-typescript'],
    parserOptions: {
        project: './tsconfig.json',
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        'import/prefer-default-export': 'off',
        '@typescript-eslint/indent': 'off',
        'no-console': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        'arrow-parens': ['warn', 'as-needed'],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'spaced-comment': 'off',
        'max-len': 'off',
        'react/jsx-curly-brace-presence': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'class-methods-use-this': 'off',
    },
};

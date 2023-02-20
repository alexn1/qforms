module.exports = {
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: 'always',
    printWidth: 100,
    bracketSameLine: true,
    overrides: [
        {
            files: ['**/*.css', '**/*.scss', '**/*.less'],
            options: {
                singleQuote: false,
                tabWidth: 2,
            },
        },
        {
            files: ['.github/**/*.yml'],
            options: {
                singleQuote: false,
                tabWidth: 2,
            },
        },
    ],
};

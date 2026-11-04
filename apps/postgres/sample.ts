import type { BackHostApp } from '../../dist';

// registers the global class SampleBkApplication (modelClass in sample.json)
require('./SampleBkApplication.ts');

// frontend classes are also needed on the server for rendering
require('./public/js/SampleApplicationController');
require('./public/js/PersonsPersonsFirstNameTableFormTextBoxFieldView');

function initCustomRoutes(hostApp: BackHostApp): void {
    // page/Page1/{id}-{title}
    hostApp.createCustomRoute(
        /^\/page\/Page1\/(\d+)-([a-z0-9-]+)$/,
        ['viewer', 'postgres', 'sample', 'local', 'domain'],
        {
            page: 'Page1',
            id: '0', // id
            title: '1', // some words and numbers seprated by minus
        },
    );
}

module.exports = { initCustomRoutes };

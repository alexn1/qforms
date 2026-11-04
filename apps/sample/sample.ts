import type { BackHostApp } from '../../dist';

// dist is a CommonJS bundle without statically detectable named exports,
// so named ESM imports from it fail under node, hence require
const { BkApplication, BkHelper } = require('../../dist') as typeof import('../../dist');

// frontend classes are also needed on the server for rendering
require('./public/js/SampleApplicationController');
require('./public/js/PersonsPersonsFirstNameTableFormTextBoxFieldView');

class SampleBkApplication extends BkApplication {}

BkHelper.registerGlobalClass(SampleBkApplication);

function initCustomRoutes(hostApp: BackHostApp): void {
    // page/Page1/{id}-{title}
    hostApp.createCustomRoute(
        /^\/page\/Page1\/(\d+)-([a-z0-9-]+)$/,
        ['viewer', 'sample', 'sample', 'local', 'domain'],
        {
            page: 'Page1',
            id: '0', // id
            title: '1', // some words and numbers seprated by minus
        },
    );
}

module.exports = { SampleBkApplication, initCustomRoutes };

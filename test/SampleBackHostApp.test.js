const { test, describe, expect, beforeAll, afterAll } = require('@jest/globals');
const { inspect } = require('util');
const supertest = require('supertest');

const { SampleBackHostApp } = require('../apps/sample/SampleBackHostApp');

require('../apps/sample/SampleBkApplication');
require('../apps/sample/public/js/SampleApplicationController');
require('../apps/sample/public/js/PersonsPersonsFirstNameTableFormTextBoxFieldView');

describe('SampleBackHostApp', () => {
    let app;
    let httpServer;

    beforeAll(async () => {
        app = new SampleBackHostApp();
        await app.init();
        httpServer = app.getHttpServer();
        // console.debug(`httpServer`, inspect(httpServer, false, 1));
        // await app.run();
    });

    afterAll(() => {});

    test('sample page action', async () => {
        const { status, body } = await supertest(httpServer).get(
            '/viewer/sample/sample/local/localhost/?action=page&page=Person&params[key]=2',
        );
        expect(status).toBe(200);
        console.debug(body);
    });

    test('sample select action', async () => {
        const { status, body } = await supertest(httpServer).get(
            '/viewer/sample/sample/local/localhost/?action=select&page=Person&form=Person&ds=default&params[key]=2',
        );
        expect(status).toBe(200);
        console.debug(body);
    });
});

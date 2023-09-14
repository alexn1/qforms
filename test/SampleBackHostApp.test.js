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
    const PATHNAME = '/viewer/sample/sample/local/localhost/';

    beforeAll(async () => {
        app = new SampleBackHostApp();
        await app.init();
        httpServer = app.getHttpServer();
        // console.debug(`httpServer`, inspect(httpServer, false, 1));
        // await app.run();
    });

    afterAll(async () => {
        await app.shutdown();
    });

    test('page action', async () => {
        const { status, body } = await supertest(httpServer).get(
            `${PATHNAME}?action=page&page=Person&params[key]=2`,
        );
        expect(status).toBe(200);
        // console.debug(body);
    });

    test('select action', async () => {
        const { status, body } = await supertest(httpServer).get(
            `${PATHNAME}?action=select&page=Person&form=Person&ds=default&params[key]=2`,
        );
        expect(status).toBe(200);
        // console.debug(body);
    });
});

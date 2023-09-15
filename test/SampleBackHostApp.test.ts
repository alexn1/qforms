import { test, describe, expect, beforeAll, afterAll } from '@jest/globals';
import { inspect } from 'util';
import supertest from 'supertest';

import { SampleBackHostApp } from '../apps/sample/SampleBackHostApp';

import '../apps/sample/SampleBkApplication';
import '../apps/sample/public/js/SampleApplicationController';
import '../apps/sample/public/js/PersonsPersonsFirstNameTableFormTextBoxFieldView';

describe('SampleBackHostApp', () => {
    let app: SampleBackHostApp;
    let httpServer: any;
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
            `${PATHNAME}page?name=Person&params[key]=2`,
        );
        expect(status).toBe(200);
        // console.debug(body);
    });

    test('select action', async () => {
        const { status, body } = await supertest(httpServer).get(
            `${PATHNAME}select?page=Person&form=Person&ds=default&params[key]=2`,
        );
        expect(status).toBe(200);
        // console.debug(body);
    });
});

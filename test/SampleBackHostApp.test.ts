import { test, describe, expect, beforeAll, afterAll } from '@jest/globals';
import { inspect } from 'util';
import supertest from 'supertest';

import { SampleBackHostApp } from '../apps/sample/SampleBackHostApp';

import '../apps/sample/SampleBkApplication';
import '../apps/sample/public/js/SampleApplicationController';
import '../apps/sample/public/js/PersonsPersonsFirstNameTableFormTextBoxFieldView';
import { Helper, PageActionResponse } from '../dist';

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
        const response: PageActionResponse = body;
        expect(status).toBe(200);
        // console.debug(response);
    });

    test('select action', async () => {
        const { status, body } = await supertest(httpServer).get(
            `${PATHNAME}select?page=Person&form=Person&ds=default&params[key]=2`,
        );
        expect(status).toBe(200);
        // console.debug(body);
    });

    test('insert action', async () => {
        const { status, body } = await supertest(httpServer)
            .post(PATHNAME)
            .send({
                uuid: '561fe598-6d9f-4deb-aec3-80247187d35a',
                action: 'insert',
                form: 'Person',
                page: 'Person',
                row: Helper.encodeObject({
                    created: new Date(),
                    updated: new Date(),
                    first_name: 'first',
                    last_name: 'last',
                }),
            });
        expect(status).toBe(201);
        console.debug(body);
    });
});

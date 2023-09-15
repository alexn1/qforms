import { test, describe, expect, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import { Helper, PageActionResponse, Result, keyToKeyTuple, SelectActionResponse } from '../dist';
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
        // const response: PageActionResponse = body;
        // console.debug(response);
    });

    describe('crud', () => {
        const UUID = '561fe598-6d9f-4deb-aec3-80247187d35a';
        const PAGE = 'Person';
        const FORM = 'Person';
        let personId: number;
        let row = {
            created: new Date(),
            updated: new Date(),
            first_name: 'first',
            last_name: 'last',
        };

        test('create', async () => {
            const { status, body } = await supertest(httpServer)
                .post(PATHNAME)
                .send({
                    action: 'insert',
                    form: FORM,
                    page: PAGE,
                    uuid: UUID,
                    row: Helper.encodeObject(row),
                });
            expect(status).toBe(201);
            const result: Result = body;
            const [key] = result.default.person.insert!;
            [personId] = keyToKeyTuple(key) as [number];
        });

        test('read', async () => {
            const { status, body } = await supertest(httpServer).get(
                `${PATHNAME}select?page=${PAGE}&form=${FORM}&ds=default&params[key]=${personId}`,
            );
            expect(status).toBe(200);
            const response: SelectActionResponse = body;
            expect(Helper.decodeObject(response.rows[0])).toEqual({ id: personId, ...row });
        });
    });
});

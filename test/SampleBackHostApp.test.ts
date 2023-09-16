import { test, describe, expect, beforeAll, afterAll } from '@jest/globals';
import { Server } from 'http';
import supertest from 'supertest';
import {
    Key,
    Helper,
    PageActionResponse,
    Result,
    keyToKeyTuple,
    SelectActionResponse,
    UpdateActionDto,
    Row,
    RawRow,
    InsertActionDto,
    DeleteActionDto,
} from '../dist';
import { SampleBackHostApp } from '../apps/sample';

describe('SampleBackHostApp', () => {
    let app: SampleBackHostApp;
    let httpServer: Server;
    const PATHNAME = '/viewer/sample/sample/local/localhost/';
    const PAGE = 'Person';
    const FORM = 'Person';

    beforeAll(async () => {
        app = new SampleBackHostApp();
        await app.init();
        httpServer = app.getHttpServer();
    });

    afterAll(async () => {
        await app.shutdown();
    });

    test('page action', async () => {
        const { status, body } = await supertest(httpServer).get(
            `${PATHNAME}page?name=${PAGE}&params[key]=1`,
        );
        expect(status).toBe(200);
        const response: PageActionResponse = body;
        delete response.page.actions;
        delete response.page.dataSources;
        // @ts-ignore
        delete response.page.forms;
        expect(response.page).toEqual({
            name: 'Person',
            caption: 'Person',
            cssBlock: '',
            viewClass: '',
            ctrlClass: '',
            formInTab: 'false',
            newMode: false,
        });
    });

    describe('crud', () => {
        const UUID = '561fe598-6d9f-4deb-aec3-80247187d35a';
        let row = {
            created: new Date(),
            updated: new Date(),
            first_name: 'first',
            last_name: 'last',
        } as unknown as Row;
        let key: Key;

        test('create', async () => {
            const rawRow = Helper.encodeObject(row) as RawRow;
            const data: InsertActionDto = {
                uuid: UUID,
                action: 'insert',
                form: FORM,
                page: PAGE,
                row: rawRow,
            };
            const { status, body } = await supertest(httpServer).post(PATHNAME).send(data);
            expect(status).toBe(201);
            const result: Result = body;
            [key] = result.default.person.insert!;
        });

        test('read', async () => {
            const [id] = keyToKeyTuple(key) as [number];
            const { status, body } = await supertest(httpServer).get(
                `${PATHNAME}select?page=${PAGE}&form=${FORM}&ds=default&params[key]=${id}`,
            );
            expect(status).toBe(200);
            const response: SelectActionResponse = body;
            const selctedRow = Helper.decodeObject(response.rows[0]) as Row;
            expect(selctedRow).toEqual({ id, ...row });
        });

        test('update', async () => {
            const rawRow = Helper.encodeObject({ first_name: 'changed field' }) as RawRow;
            const data: UpdateActionDto = {
                uuid: UUID,
                page: PAGE,
                form: FORM,
                changes: { [key]: rawRow },
            };
            const { status, body } = await supertest(httpServer)
                .patch(`${PATHNAME}update`)
                .send(data);
            expect(status).toBe(200);
            const result: Result = body;
            const first_name = Helper.decodeValue(
                result.default.person.updateEx![key].first_name,
            ) as string;
            expect(first_name).toBe('changed field');
        });

        test('delete', async () => {
            const data: DeleteActionDto = {
                uuid: UUID,
                page: PAGE,
                form: FORM,
                params: { key },
            };
            const { status, body } = await supertest(httpServer)
                .delete(`${PATHNAME}_delete`)
                .send(data);
            expect(status).toBe(200);
            const result: Result = body;
            expect(result.default.person.delete).toEqual([key]);
        });
    });
});

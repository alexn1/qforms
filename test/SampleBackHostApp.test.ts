import { test, describe, expect, beforeAll, afterAll } from '@jest/globals';
import { Server } from 'http';
import supertest from 'supertest';
import {
    Key,
    Helper,
    PageActionResponse,
    Result,
    keyToKeyTuple,
    ReadActionResponse,
    UpdateActionDto,
    Row,
    RawRow,
    CreateActionDto,
    DeleteActionDto,
    Action,
} from '../dist';
import { SampleBackHostApp } from '../apps-ts/sample';
import { HttpClient } from './core/HttpClient';

describe('SampleBackHostApp', () => {
    let app: SampleBackHostApp;
    let httpServer: Server;
    let httpClient: HttpClient;
    const PATHNAME = '/viewer/sample/sample/local/domain/';
    const PAGE = 'Person';
    const FORM = 'Person';

    beforeAll(async () => {
        app = new SampleBackHostApp({
            appsDirPath: './apps-ts',
        });
        await app.init();
        httpServer = app.getHttpServer();
        httpClient = new HttpClient(httpServer);
    });

    afterAll(async () => {
        await app.shutdown();
    });

    test('page action', async () => {
        const { status, body } = await httpClient.get(
            `${PATHNAME}?action=${Action.page}&page=${PAGE}&params[key]=1`,
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
            const data: CreateActionDto = {
                uuid: UUID,
                action: Action.create,
                form: FORM,
                page: PAGE,
                row: rawRow,
            };
            const { status, body } = await httpClient.post(PATHNAME, data);
            expect(status).toBe(201);
            const result: Result = body;
            [key] = result.default.person.insert!;
        });

        test('read', async () => {
            const [id] = keyToKeyTuple(key) as [number];
            const { status, body } = await httpClient.get(
                `${PATHNAME}?action=${Action.read}&page=${PAGE}&form=${FORM}&ds=default&params[key]=${id}`,
            );
            expect(status).toBe(200);
            const response: ReadActionResponse = body;
            const selctedRow = Helper.decodeObject(response.rows[0]) as Row;
            expect(selctedRow).toEqual({ id, ...row });
        });

        test('update', async () => {
            const rawRow = Helper.encodeObject({ first_name: 'changed field' }) as RawRow;
            const data: UpdateActionDto = {
                action: Action.update,
                uuid: UUID,
                page: PAGE,
                form: FORM,
                changes: { [key]: rawRow },
            };
            const { status, body } = await httpClient.patch(PATHNAME, data);
            expect(status).toBe(200);
            const result: Result = body;
            const first_name = Helper.decodeValue(
                result.default.person.updateEx![key].first_name,
            ) as string;
            expect(first_name).toBe('changed field');
        });

        test('delete', async () => {
            const data: DeleteActionDto = {
                action: Action.delete,
                uuid: UUID,
                page: PAGE,
                form: FORM,
                params: { key },
            };
            const { status, body } = await httpClient.delete(PATHNAME, data);
            expect(status).toBe(200);
            const result: Result = body;
            expect(result.default.person.delete).toEqual([key]);
        });
    });
});

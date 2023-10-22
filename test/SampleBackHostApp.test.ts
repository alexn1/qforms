import { test, describe, expect, beforeAll, afterAll } from '@jest/globals';
import { Server } from 'http';
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
    BkHelper,
} from '../dist';
import { SampleBackHostApp } from '../apps-ts/sample';
import { HttpClient } from './core/HttpClient';
import { createDatabase, restartLocalDb, query } from './core/helper';

let app: SampleBackHostApp;
let httpServer: Server;
let httpClient: HttpClient;

beforeAll(async () => {
    await restartLocalDb();
    await createDatabase('demo');
    await query(
        'demo',
        `create table person (
            id serial NOT NULL,
            created timestamptz,
            updated timestamptz,
            first_name varchar(255),
            last_name varchar(255)
        )`,
    );
    process.env.PORT = '5433';
    app = new SampleBackHostApp({ srcDirPath: './apps-ts' });
    await app.init();
    httpServer = app.getHttpServer();
    httpClient = new HttpClient(httpServer);
}, 20000);

afterAll(async () => {
    await app.shutdown();
});

describe('Person', () => {
    const PATHNAME = '/viewer/sample/sample/local/domain/';
    const PAGE = 'Person';

    test('page', async () => {
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
            params: { key: 1 },
        });
    });

    describe('crud', () => {
        const FORM = 'Person';
        const UUID = BkHelper.newClientId();
        const row = {
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

describe('Page1', () => {
    test('index', async () => {
        const { status, text } = await httpClient.get('/page/Page1/100-some-title');
        expect(status).toBe(200);
        expect(typeof text).toBe('string');
        expect(text.length).toBe(text.length);
    });
});

import { test, describe, expect, beforeAll, afterAll } from '@jest/globals';
import { inspect } from 'util';
import supertest from 'supertest';
import { BackHostApp } from '../dist';

describe('BackHostApp', () => {
    let app: BackHostApp;
    let httpServer: any;

    beforeAll(async () => {
        app = new BackHostApp({ port: 7002 });
        await app.init();
        httpServer = app.getHttpServer();
        // console.debug(`httpServer`, inspect(httpServer, false, 1));
        // await app.run();
    });

    afterAll(() => {});

    test('/monitor', async () => {
        const { status } = await supertest(httpServer).get('/monitor');
        expect(status).toBe(200);
    });

    test('/viewer/test/test/local/localhost/', async () => {
        const { status } = await supertest(httpServer).get('/viewer/test/test/local/localhost/');
        expect(status).toBe(200);
    });
});

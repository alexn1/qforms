import { test, describe, expect, beforeAll, afterAll } from '@jest/globals';
import { BackHostApp } from '../dist';
import { HttpClient } from './core/HttpClient';

describe('BackHostApp', () => {
    let app: BackHostApp;
    let httpServer: any;
    let httpClient: HttpClient;

    beforeAll(async () => {
        app = new BackHostApp({ port: 7002 });
        await app.init();
        httpServer = app.getHttpServer();
        httpClient = new HttpClient(httpServer);
    });

    afterAll(async () => {
        await app.shutdown();
    });

    test('/monitor', async () => {
        const { status } = await httpClient.get('/monitor');
        expect(status).toBe(200);
    });

    test('/viewer/test/test/local/localhost/', async () => {
        const { status } = await httpClient.get('/viewer/test/test/local/localhost/');
        expect(status).toBe(200);
    });
});

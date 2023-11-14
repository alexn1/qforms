import { test, describe, expect, beforeAll, afterAll } from '@jest/globals';
// import { BackHostApp } from '../dist';
import { BackHostApp } from '../../src';
import { HttpClient } from '../core/HttpClient';
import { Server } from 'http';

describe('BackHostApp', () => {
    let app: BackHostApp;
    let httpServer: Server;
    let httpClient: HttpClient;

    beforeAll(async () => {
        app = new BackHostApp({ codeRootDirPath: './dist' });
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

    test('/viewer/test/test/local/domain/', async () => {
        const { status } = await httpClient.get('/viewer/test/test/local/domain/');
        expect(status).toBe(200);
    });
});

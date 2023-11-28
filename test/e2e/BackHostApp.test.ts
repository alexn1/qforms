import { test, describe, expect, beforeAll, afterAll } from '@jest/globals';
// import { BackHostApp } from '../dist';
import { BackHostApp } from '../../src';
import { HttpClient } from '../core/HttpClient';
import { Server } from 'http';

describe('BackHostApp without monitor', () => {
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
        const { status, text } = await httpClient.get('/monitor');
        expect(status).toBe(200);
        expect(text).toBe('Please set monitor username/password in app params');
    });

    test('/viewer/test/test/local/domain/', async () => {
        const { status } = await httpClient.get('/viewer/test/test/local/domain/');
        expect(status).toBe(200);
    });
});

describe('BackHostApp with monitor', () => {
    let app: BackHostApp;
    let httpServer: Server;
    let httpClient: HttpClient;

    beforeAll(async () => {
        app = new BackHostApp({
            codeRootDirPath: './dist',
            monitor: {
                username: 'admin',
                password: '123qwe',
            },
        });
        await app.init();
        httpServer = app.getHttpServer();
        httpClient = new HttpClient(httpServer);
    });

    afterAll(async () => {
        await app.shutdown();
    });

    test('/monitor no auth', async () => {
        const { status, text, header } = await httpClient.get('/monitor');
        expect(status).toBe(401);
        expect(text).toBe('Unauthorized');
        expect(header['x-powered-by']).toBe('Express');
        expect(header['www-authenticate']).toBe('Basic realm="My Realm"');
        expect(new Date(header['date']).getTime()).not.toBeNaN();
        expect(header['connection']).toBe('close');
        expect(header['content-length']).toBe('12');
    });

    test('/monitor auth', async () => {
        const { status, text, header } = await httpClient.get('/monitor', {
            authorization: `Basic ${btoa('admin:123qwe')}`,
        });
        expect(status).toBe(200);
        expect(text.split('\n')[0]).toBe('<!DOCTYPE html>');
    });
});

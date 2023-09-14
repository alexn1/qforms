const { test, describe, expect, beforeAll, afterAll } = require('@jest/globals');
const { inspect } = require('util');
const supertest = require('supertest');
const { BackHostApp } = require('../dist');

describe('BackHostApp', () => {
    let app;
    let httpServer;

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

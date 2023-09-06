const { inspect } = require('util');
const supertest = require('supertest');
const { BackHostApp } = require('../dist');

test('app', async () => {
    const app = new BackHostApp({ port: 7002 });
    await app.init();
    // await app.run();
    const httpServer = app.getHttpServer();
    // console.debug(`httpServer`, inspect(httpServer, false, 1));

    /* const { status, text } = await supertest(httpServer).get('/monitor');
    console.debug('status:', status);
    console.debug('text:', text); */

    const { status, text } = await supertest(httpServer).get('/viewer/test/test/local/localhost/');
    console.debug('status:', status);
    console.debug('text:', text);
});

'use strict';
// console.log('http.js');
const http = require('http');
const path = require('path');

const qforms = require('./qforms');
const server = require('./server');
const pkg    = require('../../package.json');

main(); function main() {
    // console.log('http.main');
    process.on('message', onMessage);
    process.on('SIGINT', onSIGINT);
    process.on('SIGTERM', onSIGTERM);
    process.on('exit', onExit);
    process.on('unhandledRejection', onUnhandledRejection );

    const params = qforms.Helper.getCommandLineParams();
    const host = params.host || pkg.config.host;
    const port = params.port || pkg.config.port;
    const httpServer = http.createServer(server);
    httpServer.on('error', onError);
    httpServer.listen(port, host, () => {
        if (process.send) {
            process.send('online');
        }
        const appsDirPath = path.resolve(server.get('hostApp').appsDirPath);
        console.log(`QForms server v${pkg.version} listening on http://${host}:${port}\n\tprocess.env.NODE_ENV: ${process.env.NODE_ENV}\n\tappsDirPath: ${appsDirPath}\n\tmonitor: http://${host}:${port}/monitor`);
    });
}

async function shutdown() {
    console.log('shutdown');
    const applications = server.get('hostApp').applications;
    const routes = Object.keys(applications);
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        console.log('route:', route);
        const application = applications[route];
        await application.deinit();
    }
}

async function onMessage(message) {
    console.log('http.onMessage');
    if (message === 'shutdown') {
        await shutdown();
        process.exit(0);
    }
}

async function onSIGINT() {
    console.log('onSIGINT');
    console.log('Received INT signal (Ctrl+C), shutting down gracefully...');
    await shutdown();
    process.exit(0);
}

function onSIGTERM() {
    console.log('onSIGTERM');
    console.log('Received SIGTERM (kill) signal, shutting down forcefully.');
    process.exit(1);
}

function onExit(code) {
    console.log('onExit', code);
    console.log('process.exit:', code);
}

function onError(err) {
    console.error('onError', err.code, err.message);
    /*if (err.code === 'EADDRINUSE') {
        console.error(`Address ${host}:${port} in use.`);
    } else {
        console.error(err);
    }*/
}

async function onUnhandledRejection(err) {
    console.error('onUnhandledRejection', err);
    err.message = `unhandledRejection: ${err.message}`;
    const hostApp = server.get('hostApp');
    if (hostApp) {
        await server.get('hostApp').logError(null, err);
    }
}

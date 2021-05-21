const express = require('express');
const http = require('http');
const path = require('path');

const pkg    = require('../../package.json');
const HostApp = require('./HostApp');

let _hostApp = null;

function run(params = {}) {
    console.log('run', params);
    const appsDirPath     = params.appsDirPath     || pkg.config.appsDirPath;
    const handleException = params.handleException || true;

    const server = express();
    const hostApp = _hostApp = new HostApp(server);
    hostApp.init({appsDirPath, handleException});

    // console.log('http.main');
    process.on('message', onMessage);
    process.on('SIGINT', onSIGINT);
    process.on('SIGTERM', onSIGTERM);
    process.on('exit', onExit);
    process.on('unhandledRejection', onUnhandledRejection);


    const host = params.host || pkg.config.host;
    const port = params.port || pkg.config.port;
    const httpServer = http.createServer(server);
    httpServer.on('error', onError);
    httpServer.listen(port, host, () => {
        if (process.send) {
            process.send('online');
        }
        const appsDirPath = path.resolve(hostApp.appsDirPath);
        console.log(`QForms server v${pkg.version} listening on http://${host}:${port}/app\n\tprocess.env.NODE_ENV: ${process.env.NODE_ENV}\n\tappsDirPath: ${appsDirPath}\n\tmonitor: http://${host}:${port}/monitor`);
    });
}

async function shutdown() {
    console.log('shutdown');
    const applications = _hostApp.applications;
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
    if (_hostApp) {
        err.message = `unhandledRejection: ${err.message}`;
        await _hostApp.logError(null, err);
    }
}



module.exports = run;

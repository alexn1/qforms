'use strict';
console.log('www.js');
const http    = require('http');
const path    = require('path');

const qforms = require('./qforms');
const server = require('./server');
const pkg    = require('../../package.json');

main(); function main() {
    console.log('www.main');
    process.on('message', onMessage);
    process.on('SIGINT', onSIGINT);
    process.on('SIGTERM', onSIGTERM);
    process.on('exit', onExit);

    const params = qforms.Helper.getCommandLineParams();
    const host = params.host || pkg.config.host;
    const port = params.port || pkg.config.port;
    const www = http.createServer(server);
    www.on('error', onError);
    www.listen(port, host, () => {
        if (process.send) {
            process.send('online');
        }
        const appsDirPath = path.resolve(server.get('hostApp').appsDirPath);
        console.log(`QForms server v${pkg.version} listening on http://${host}:${port}, process.env.NODE_ENV: ${process.env.NODE_ENV}, applications from ${appsDirPath}`);
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
    console.log('www.onMessage');
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

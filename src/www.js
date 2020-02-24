'use strict';
console.log('www.js');
var http    = require('http');
var path    = require('path');
var Promise = require('bluebird');

var qforms = require('./qforms');
var server = require('./server');
var pkg    = require('../package.json');

////////////////////////////////////////////////////////////////////////////////////////////////////
main(); function main() {
    console.log('www.main');
    process.on('message', function (message) {
        if (message === 'shutdown') {
            shutdown().then(function () {
                process.exit(0);
            });
        }
    });
    process.on('SIGINT', function () {
        console.log('Received INT signal (Ctrl+C), shutting down gracefully...');
        shutdown().then(function () {
            process.exit(0);
        });
    });
    process.on('SIGTERM', function () {
        console.log('Received SIGTERM (kill) signal, shutting down forcefully.');
        process.exit(1);
    });
    process.on('exit', function (code) {
        console.log('process.exit:', code);
    });

    var port = qforms.Helper.getCommandLineParams().port || pkg.config.port;
    var host = qforms.Helper.getCommandLineParams().host || pkg.config.host;
    var www = http.createServer(server);
    www.on('error', function(err) {
        if (err.code === 'EADDRINUSE') {
            console.error('Address {host}:{port} in use.'.template({host: host, port: port}));
        } else {
            console.error(err);
        }
    });
    www.listen(port, host, function() {
        if (process.send) {
            process.send('online');
        }
        const appsDirPath = path.resolve(server.get('appsDirPath'));
        console.log(`QForms server v${pkg.version} listening on http://${host}:${port}, process.env.NODE_ENV: ${server.get('env')}, applications from ${appsDirPath}`);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function shutdown() {
    console.log('shutdown');
    return Promise.try(function () {
        var applications = server.get('applications');
        var appNames = Object.keys(applications);
        return Promise.each(appNames, function (appName) {
            var application = applications[appName];
            return application.deinit();
        });
    });
}
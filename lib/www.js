'use strict';

var http    = require('http');
var path    = require('path');
var Promise = require('bluebird');

var qforms = require('./qforms');
var server = require('./server');
var pkg    = require('../package.json');

////////////////////////////////////////////////////////////////////////////////////////////////////
main(); function main() {
    console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
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
        self.log('Received SIGTERM (kill) signal, shutting down forcefully.');
        process.exit(1);
    });
    process.on('exit', function (code) {
        console.log('process.exit:', code);
    });

    var port = qforms.helper.getCommandLineParams().port || pkg.config.port;
    var host = qforms.helper.getCommandLineParams().host || pkg.config.host;
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
        console.log('QForms server v{version} listening on http://{host}:{port}, env: {env}, applications from {appsDirPath}'.template({
            version    : pkg.version,
            host       : host,
            port       : port,
            appsDirPath: path.resolve(server.get('appsDirPath')),
            env        : server.get('env')
        }));
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
            return application.deinit2();
        });
    });
}
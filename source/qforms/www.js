'use strict';

var http = require('http');
var path = require('path');

var pkg    = require('./package.json');
var qforms = require('./qforms');
var server = require('./server');

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
    console.log('QForms server v{version} listening on http://{host}:{port}, applications from {appsDirPath}'.template({
        version    : pkg.version,
        host       : host,
        port       : port,
        appsDirPath: path.resolve(server.get('appsDirPath'))
    }));
});
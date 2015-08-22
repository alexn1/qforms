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
        console.log('Error: address in use.');
    } else {
        console.log(err);
    }
});
www.listen(port, host, function() {
    console.log('QForms server listening on http://{host}:{port}, applications from {appsDirPath}'.template({
        host       : host,
        port       : port,
        appsDirPath: path.resolve(server.get('appsDirPath'))
    }));
});
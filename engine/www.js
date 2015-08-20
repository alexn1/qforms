'use strict';

var http = require('http');
var path = require('path');

var server = require('./server');
var qforms = require('./qforms');

var port = qforms.helper.getCommandLineParams().port || 3000;
var host = qforms.helper.getCommandLineParams().host || 'localhost';

var www = http.createServer(server).listen(port, host, function() {
    console.log('QForms server listening on http://{host}:{port}, applications from {appsDirPath}'.template({
        host       : host,
        port       : port,
        appsDirPath: path.resolve(server.get('appsDirPath'))
    }));
});
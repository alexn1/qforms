'use strict';

var http = require('http');
var path = require('path');

var server = require('./backend/server');

var www = http.createServer(server).listen(server.get('port'), server.get('host'), function() {
    console.log('QForms server listening on http://{host}:{port}, applications from {appsDirPath}'.template({
        host       : server.get('host'),
        port       : server.get('port'),
        appsDirPath: path.resolve(server.get('appsDirPath'))
    }));
});
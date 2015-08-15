'use strict';

var http = require('http');
var path = require('path');

var qforms = require('./qforms');

var server = http.createServer(qforms).listen(qforms.get('port'), qforms.get('host'), function() {
    console.log('QForms server listening on http://{host}:{port}, applications from {appsDirPath}'.template({
        host       : qforms.get('host'),
        port       : qforms.get('port'),
        appsDirPath: path.resolve(qforms.get('appsDirPath'))
    }));
});
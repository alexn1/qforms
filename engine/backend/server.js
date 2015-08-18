'use strict';

var express    = require('express');
var config     = require('config');
var path       = require('path');
var fs         = require('fs');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var session    = require('express-session');
var _          = require('underscore');
var async      = require('async');

var p         = require('../package');
var helper    = require('./common/helper');
var multipart = require('./common/multipart');

var server = module.exports = express();

// environment
server.set('appsDirPath', helper.getCommandLineParams().appsDirPath || config.get('appsDirPath'));
if (!fs.existsSync(server.get('appsDirPath'))) {
    console.log("Application folder '" + path.resolve(server.get('appsDirPath')) + "' doesn't exist");
    process.exit(1);
}
server.set('version'        , p.version);
server.set('host'           , helper.getCommandLineParams().host            || config.get('host'));
server.set('port'           , helper.getCommandLineParams().port            || config.get('port'));
server.set('handleException', helper.getCommandLineParams().handleException || 'true');
server.set('view engine'    , 'ejs');
server.set('views'          , './backend/routes');
server.set('public'         , './frontend');
server.set('runtime'        , './runtime');
server.set('temp'           , './runtime/temp');
server.set('applications'   , {});
server.set('commonStyleCss' , helper.getFilePathsSync(path.join(server.get('public')), 'common/style', 'css'));
server.set('commonClassCss' , helper.getFilePathsSync(path.join(server.get('public')), 'common/class', 'css'));
server.set('commonClassJs'  , helper.getFilePathsSync(path.join(server.get('public')), 'common/class', 'js'));

helper.createDirIfNotExistsSync(server.get('runtime'));
helper.createDirIfNotExistsSync(server.get('temp'));

// middlewares
//server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(multipart);

server.use(session({
    secret            : 'qforms',
    key               : 'sid',
    resave            : false,
    saveUninitialized : false
}));
server.use(express.static(server.get('public')));

// routes
var home   = require('./routes/home');
var viewer = require('./routes/viewer');
var editor = require('./routes/editor');
var file   = require('./routes/viewer/file');
var error  = require('./routes/error');

// get
server.get('/'                               , home);
server.get('/view/:appDirName/:appFileName'  , viewer);
server.get('/view/:appDirName/:appFileName/*', file);
server.get('/edit/:appDirName/:appFileName'  , editor);

// post
server.post('/'                             , home);
server.post('/view/:appDirName/:appFileName', viewer);
server.post('/edit/:appDirName/:appFileName', editor);

// catch 404 and forward to error handler
server.use(error.e404);
server.use(error.page);

process.on('SIGINT', function () {
    console.log('process.SIGINT');
    var applications = _.map(server.get('applications'), function(application) {
        return application;
    });
    async.eachSeries(applications, function(application, next) {
        application.deinit(next);
    }, process.exit);
});

process.on('exit', function () {
    console.log('process.exit');
});
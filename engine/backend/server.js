'use strict';

var express    = require('express');
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

var engineDirPath  = path.join(__dirname, '..');
var backendDirPath = __dirname;

// environment
server.set('appsDirPath', path.join(engineDirPath, helper.getCommandLineParams().appsDirPath || '../app'));
if (!fs.existsSync(server.get('appsDirPath'))) {
    console.log("Application folder '" + path.resolve(server.get('appsDirPath')) + "' doesn't exist");
    process.exit(1);
}
server.set('version'        , p.version);
server.set('handleException', helper.getCommandLineParams().handleException || true);
server.set('view engine'    , 'ejs');
server.set('views'          , path.join(backendDirPath, 'routes'));
server.set('public'         , path.join(engineDirPath,  'frontend'));
server.set('runtime'        , path.join(engineDirPath,  'runtime'));
server.set('temp'           , path.join(engineDirPath,  'runtime/temp'));
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
var home   = require(path.join(backendDirPath, 'routes/home'));
var viewer = require(path.join(backendDirPath, 'routes/viewer'));
var editor = require(path.join(backendDirPath, 'routes/editor'));
var file   = require(path.join(backendDirPath, 'routes/viewer/file'));
var error  = require(path.join(backendDirPath, 'routes/error'));

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
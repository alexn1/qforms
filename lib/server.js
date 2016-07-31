'use strict';

var express    = require('express');
var path       = require('path');
var fs         = require('fs');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var session    = require('express-session');
var _          = require('underscore');
var async      = require('async');

var pkg       = require('../package.json');
var helper    = require('./backend/common/helper');
var multipart = require('./backend/common/multipart');

var server = module.exports = express();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
initExpressServer(server); function initExpressServer(server) {
    //console.log('initExpressServer');
    var engineDirPath  = __dirname;
    var backendDirPath = path.join(engineDirPath, 'backend');

    // environment
    server.set('appsDirPath', path.join(helper.getCommandLineParams().appsDirPath || pkg.config.appsDirPath));
    if (!fs.existsSync(server.get('appsDirPath'))) {
        console.log("Application folder '{appsDirPath}' doesn't exist".template({
            appsDirPath: path.resolve(server.get('appsDirPath'))
        }));
        process.exit(1);
    }

    // vars
    server.set('version'        , pkg.version);
    server.set('handleException', helper.getCommandLineParams().handleException || true);
    server.set('view engine'    , 'ejs');
    server.set('views'          , path.join(backendDirPath, 'routes'));
    server.set('public'         , path.join(engineDirPath,  'frontend'));
    server.set('runtime'        , path.join(engineDirPath,  'runtime'));
    server.set('temp'           , path.join(engineDirPath,  'runtime/temp'));
    server.set('applications'   , {});
    server.set('commonClassCss' , helper.getFilePathsSync(server.get('public'), 'common/class', 'css'));
    server.set('commonClassJs'  , helper.getFilePathsSync(server.get('public'), 'common/class', 'js' ));
    server.set('homeClassCss'   , helper.getFilePathsSync(server.get('public'), 'home/class'  , 'css'));
    server.set('homeClassJs'    , helper.getFilePathsSync(server.get('public'), 'home/class'  , 'js' ));
    server.set('viewerClassCss' , helper.getFilePathsSync(server.get('public'), 'viewer/class', 'css'));
    server.set('viewerClassJs'  , helper.getFilePathsSync(server.get('public'), 'viewer/class', 'js' ));
    server.set('editorClassCss' , helper.getFilePathsSync(server.get('public'), 'editor/class', 'css'));
    server.set('editorClassJs'  , helper.getFilePathsSync(server.get('public'), 'editor/class', 'js' ));

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

    // process
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
        //console.log('process.exit');
    });

    // runtime & temp
    helper.createDirIfNotExistsSync(server.get('runtime'));
    helper.createDirIfNotExistsSync(server.get('temp'));
}
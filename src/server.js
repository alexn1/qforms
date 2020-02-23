'use strict';
console.log('server.js');
var express    = require('express');
var path       = require('path');
var fs         = require('fs');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var session    = require('express-session');

var pkg       = require('../package.json');
var helper    = require('./backend/common/helper');
var multipart = require('./backend/common/multipart');

var server = module.exports = express();

// routes
const home    = require('./backend/routes/home');
const viewer  = require('./backend/routes/viewer');
var editor    = require('./backend/routes/editor');
var file      = require('./backend/routes/viewer/file');
var error     = require('./backend/routes/error');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
initExpressServer(server); function initExpressServer(server) {
    console.log('server.initExpressServer');
    var engineDirPath  = __dirname;
    var backendDirPath = path.join(engineDirPath, 'backend');

    // environment
    const appsDirPath = helper.getCommandLineParams().appsDirPath || pkg.config.appsDirPath;
    if (!fs.existsSync(appsDirPath)) {
        console.error(`Application folder '${path.resolve(appsDirPath)}' doesn't exist`);
        process.exit(1);
    }

    // vars
    server.set('appsDirPath', appsDirPath);
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

    server.enable('strict routing');

    // production by default to disable editor
    if (!process.env.NODE_ENV) {
        server.set('env', 'production');
    }

    // middlewares
    //server.use(morgan('dev'));
    server.use(function (req, res, next) {
        //console.log(req.originalUrl);
        next();
    });
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(multipart);
    server.use(session({
        secret            : 'qforms',
        key               : 'sid',
        resave            : false,
        saveUninitialized : false
    }));


    // home
    server.get('/' , home);
    server.post('/', home);

    // view
    server.get('/view/:appDirName/:appFileName/' , viewer);
    server.get('/view/:appDirName/:appFileName/*', viewer_file);
    server.post('/view/:appDirName/:appFileName/', viewer);

    // editor
    server.get('/edit/:appDirName/:appFileName/' , editor);
    server.get('/edit/:appDirName/:appFileName/*', editor_file);
    server.post('/edit/:appDirName/:appFileName/', editor);

    // /favicon.ico
    server.get('/favicon.ico', favicon);
    server.use(express.static(server.get('public')));

    // catch 404 and forward to error handler
    server.use(error.e404);
    server.use(error.e500);

    // runtime & temp
    helper.createDirIfNotExistsSync(server.get('runtime'));
    helper.createDirIfNotExistsSync(server.get('temp'));
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function viewer_file(req, res, next) {
    file(req, res, function () {
        //console.log('file not found: ', req.originalUrl);
        const pth = `/view/${req.params.appDirName}/${req.params.appFileName}`;
        var uri = req.originalUrl.replace(pth, '');
        var filePath = path.join(server.get('public'), uri);
        res.sendFile(filePath);
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function editor_file(req, res, next) {
    file(req, res, function () {
        //console.log('file not found: ', req.originalUrl);
        const pth = `/edit/${req.params.appDirName}/${req.params.appFileName}`;
        var uri = req.originalUrl.replace(pth, '');
        var filePath = path.join(server.get('public'), uri);
        res.sendFile(filePath);
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function favicon(req, res, next) {
    console.log('/favicon.ico');
    res.end();
}

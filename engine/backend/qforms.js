'use strict';

var express    = require('express');
var path       = require('path');
var fs         = require('fs');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var _          = require('underscore');
var async      = require('async');

var p      = require('../package');
var helper = require('./common/helper');

var qforms = module.exports = express();

// environment
qforms.set('appsDirPath', helper.getParams().appsDirPath || '../../samples');
if (!fs.existsSync(qforms.get('appsDirPath'))) {
    console.log("Application folder '" + path.resolve(qforms.get('appsDirPath')) + "' doesn't exists");
    process.exit(1);
}
qforms.set('version'       , p.version);
qforms.set('host'          , helper.getParams().host || 'localhost');
qforms.set('port'          , helper.getParams().port || 3000);
qforms.set('view engine'   , 'ejs');
qforms.set('views'         , './routes');
qforms.set('public'        , '../frontend');
qforms.set('applications'  , {});
qforms.set('commonStyleCss', helper.getFilePathsSync(path.join(qforms.get('public')), 'common/style', 'css'));
qforms.set('commonClassCss', helper.getFilePathsSync(path.join(qforms.get('public')), 'common/class', 'css'));
qforms.set('commonClassJs' , helper.getFilePathsSync(path.join(qforms.get('public')), 'common/class', 'js'));

// middlewares
//qforms.use(morgan('dev'));
qforms.use(bodyParser.json());
qforms.use(bodyParser.urlencoded({ extended: false }));
qforms.use(express.static(qforms.get('public')));

// routes
var home   = require('./routes/home');
var viewer = require('./routes/viewer');
var editor = require('./routes/editor');
var file   = require('./routes/viewer/file');
var error  = require('./routes/error');

// get
qforms.get('/'                               , home);
qforms.get('/view/:appDirName/:appFileName'  , viewer);
qforms.get('/view/:appDirName/:appFileName/*', file);
qforms.get('/edit/:appDirName/:appFileName'  , editor);

// post
qforms.post('/'                             , home);
qforms.post('/view/:appDirName/:appFileName', viewer);
qforms.post('/edit/:appDirName/:appFileName', editor);

// catch 404 and forward to error handler
qforms.use(error.e404);
qforms.use(error.page);

process.on("SIGINT", function () {
    console.log('process.SIGINT');
    process.exit();
});

process.on("exit", function () {
    console.log("process.exit");
    var apps = _.map(qforms.get('applications'), function(app) {return app;});
    async.eachSeries(apps, function(app, next) {
        app.deinit(next);
    });
});

// start
qforms.listen(qforms.get('port'), qforms.get('host'), function() {
    console.log('QForms server listening on http://' + qforms.get('host') + ':' + qforms.get('port'));
    console.log('apps from [' + path.resolve(qforms.get('appsDirPath')) + ']');
});
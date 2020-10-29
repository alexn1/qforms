'use strict';
// console.log('server.js');
const express    = require('express');
const fs         = require('fs');
// const morgan     = require('morgan');
const bodyParser = require('body-parser');
const session    = require('express-session');
const Helper    = require('./common/Helper');
const multipart = require('connect-multiparty')();
const _         = require('underscore');
const async     = require('async');
const Context = require('./Context');

const server = module.exports = express();
// const qforms = require('./qforms');
const HostApp = require('./HostApp');

initExpressServer(server); function initExpressServer(server) {
    // console.log('server.initExpressServer');
    const hostApp = new HostApp(server);
    hostApp.init();
    server.set('hostApp', hostApp);

    // middlewares
    // server.use(morgan('dev'));
    // server.use(serverRequest);
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(multipartHandler);
    server.use(session({
        secret            : 'qforms',
        key               : 'sid',
        resave            : false,
        saveUninitialized : false
    }));

    // home
    server.get('/' , homeGet);
    server.post('/', homePost);

    server.get('/monitor', monitorGet);

    // view
    server.get('/view/:appDirName/:appFileName/:env/' , viewerGet);
    server.post('/view/:appDirName/:appFileName/:env/', viewerPost);

    // viewerFile
    server.get('/view/:appDirName/:appFileName/:env/*', viewerFile);

    // editor
    server.get('/edit/:appDirName/:appFileName/:env/' , editorGet);
    server.post('/edit/:appDirName/:appFileName/:env/', editorPost);

    // editorFile
    server.get('/edit/:appDirName/:appFileName/:env/*', editorFile);

    // favicon.ico
    server.get('/favicon.ico', favicon);
    server.use(express.static(hostApp.publicDirPath));

    // catch 404 and forward to error handler
    server.use(e404);
    server.use(e500);

    // runtime & temp
    Helper.createDirIfNotExistsSync(server.get('runtime'));
    Helper.createDirIfNotExistsSync(server.get('temp'));
}

function serverRequest(req, res, next) {
    console.log(`serverRequest: ${req.originalUrl}`);
    next();
}

async function viewerFile(req, res, next) {
    // console.warn('viewerFile', req.originalUrl);
    try {
        await server.get('hostApp').viewerFile(req, res);
    } catch (err) {
        next(err);
    }
}

async function editorFile(req, res, next) {
    // console.warn('editorFile', req.originalUrl);
    try {
        await server.get('hostApp').editorFile(req, res);
    } catch (err) {
        next(err);
    }
}

function favicon(req, res, next) {
    //console.log('/favicon.ico');
    res.end();
}

async function viewerGet(req, res, next)  {
    console.warn('viewerGet', req.params);
    let context = null;
    try {
        const context = Context.create({req});
        await server.get('hostApp').handleViewerGet(req, res, context);
    } catch (err) {
        next(err);
    } finally {
        Context.destroy(context);
    }
}

async function viewerPost(req, res, next)  {
    console.warn('viewerPost', req.params, req.body);
    let context = null;
    const hostApp = server.get('hostApp');
    try {
        context = Context.create({req});
        const time = await hostApp.handleViewerPost(req, res, context);
        await hostApp.logRequest(req, context, time);
    } catch (err) {
        await hostApp.logError(req, context, err);
        next(err);
    } finally {
        Context.destroy(context);
    }
}

async function editorGet(req, res, next)  {
    console.warn('editorGet', req.params);
    try {
        const hostApp = server.get('hostApp');
        if (hostApp.nodeEnv === 'development') {
            await hostApp.editorIndexGet(req, res);
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
}

async function editorPost(req, res, next)  {
    console.warn('editorPost', req.params, req.body);
    try {
        const hostApp = server.get('hostApp');
        if (hostApp.nodeEnv === 'development') {
            await hostApp.editorPost(req, res);
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
}

async function homePost(req, res, next) {
    console.warn('homePost', req.params);
    try {
        await server.get('hostApp').homePost(req, res);
    } catch (err) {
        next(err);
    }
}

async function homeGet(req, res, next) {
    console.warn('homeGet');
    try {
        await server.get('hostApp').homeGet(req, res);
    } catch (err) {
        next(err);
    }
}

async function monitorGet(req, res, next) {
    console.warn('monitorGet');
    try {
        const hostApp = server.get('hostApp');
        if (hostApp.nodeEnv === 'development') {
            await hostApp.monitorGet(req, res);
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
}

function e404(req, res, next) {
    console.warn(req.method, 'error/404');
    const err = new Error('page not found');
    err.status = 404;
    next(err);
}

function e500(err, req, res, next) {
    console.warn('module.exports.e500:', req.method, req.originalUrl);
    console.error(err);
    res.status(err.status || 500);
    if (req.headers['content-type'] && req.headers['content-type'].indexOf('application/json') !== -1) {
        res.end(typeof err === 'string' ? err : err.message);
    } else {
        res.render('error', {
            message: err.message,
            error  : req.app.get('env') === 'development' ? err : {}
        });
    }
}

function multipartHandler(req, res, next) {
    if (!req.is('multipart/form-data')) {
        next();
        return;
    }
    multipart(req, res, () => {
        if (req.body.__data) {
            const body = JSON.parse(req.body.__data);
            delete req.body.__data;
            for (let name in body) {
                req.body[name] = body[name];
            }
        }
        if (req.body.row) {
            for (let name in req.files) {
                req.body.row[name] = req.files[name];
            }
        }
        // loading file content to req.files[n].data
        const tasks = _.map(req.files, file => {
            return next => {
                fs.readFile(file.path, (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        file.data = data;
                        next();
                    }
                })

            }
        });
        async.series(tasks, next);
    });
}

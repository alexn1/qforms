'use strict';
// console.log('server.js');
const express    = require('express');
// const fs         = require('fs');
// const morgan     = require('morgan');
const bodyParser = require('body-parser');
const session    = require('express-session');
const Helper    = require('./common/Helper');
// const multipart = require('connect-multiparty')();
// const _         = require('underscore');
// const async     = require('async');
const Context = require('./Context');
const HostApp = require('./HostApp');
const server = module.exports = express();
// const qforms = require('./qforms');


initExpressServer(server); function initExpressServer(server) {
    // console.log('server.initExpressServer');
    const hostApp = new HostApp(server);
    hostApp.init();
    server.set('hostApp', hostApp);

    // middlewares
    // server.use(morgan('dev'));
    // server.use(serverRequest);
    server.use(bodyParser.json({limit: '10mb'}));
    server.use(bodyParser.urlencoded({ extended: false }));
    // server.use(multipartHandler);
    server.use(session({
        secret            : 'qforms',
        key               : 'sid',
        resave            : false,
        saveUninitialized : false
    }));

    // test
    server.get('/test' , getTest);
    server.post('/test', postTest);

    // home
    server.get( '/', homeGet);
    server.post('/', homePost);

    // monitor
    server.get('/monitor', monitorGet);

    // get
    // server.get('/view/:appDirName/:appFileName/:env/', viewerGet);
    // server.get('/edit/:appDirName/:appFileName/:env/', editorGet);

    server.get('/:module/:appDirName/:appFileName/:env/', moduleGet);

    // post
    // server.post('/view/:appDirName/:appFileName/:env/', viewerPost);
    // server.post('/edit/:appDirName/:appFileName/:env/', editorPost);
    server.post('/:module/:appDirName/:appFileName/:env/', modulePost);

    // viewerFile/editorFile
    // server.get('/view/:appDirName/:appFileName/:env/*', viewerFile);
    // server.get('/edit/:appDirName/:appFileName/:env/*', editorFile);
    server.get('/:module/:appDirName/:appFileName/:env/*', moduleFile);


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

/*function serverRequest(req, res, next) {
    console.log(`serverRequest: ${req.originalUrl}`);
    next();
}*/

async function moduleFile(req, res, next) {
    // console.warn('moduleFile', req.originalUrl);
    let context = null;
    try {
        context = Context.create({req});
        if (context.module === 'view') {
            await server.get('hostApp').viewerFile(req, res, context);
        } else if (context.module === 'edit') {
            await server.get('hostApp').editorFile(req, res, context);
        }
    } catch (err) {
        next(err);
    } finally {
        Context.destroy(context);
    }
}

async function viewerFile(req, res, next) {
    // console.warn('viewerFile', req.originalUrl);
    let context = null;
    try {
        context = Context.create({req});
        await server.get('hostApp').viewerFile(req, res, context);
    } catch (err) {
        next(err);
    } finally {
        Context.destroy(context);
    }
}

async function editorFile(req, res, next) {
    // console.warn('editorFile', req.originalUrl);
    let context = null;
    try {
        context = Context.create({req});
        await server.get('hostApp').editorFile(req, res, context);
    } catch (err) {
        next(err);
    } finally {
        Context.destroy(context);
    }
}

function favicon(req, res, next) {
    //console.log('/favicon.ico');
    res.end();
}

async function moduleGet(req, res, next) {
    console.warn('moduleGet', req.params);
    let context = null;
    try {
        const hostApp = server.get('hostApp');
        context = Context.create({req});
        if (context.module === 'view') {
            await hostApp.handleViewerGet(req, res, context);
        } else if (context.module === 'edit') {
            await hostApp.handleEditorGet(req, res, context);
        } else {
            throw new Error(`unknown module: ${context.module}`);
        }
    } catch (err) {
        next(err);
    } finally {
        Context.destroy(context);
    }
}

// async function viewerGet(req, res, next)  {
//     console.warn('viewerGet', req.params);
//     /*new Promise((resolve, reject) => {
//         reject(new Error('sample error'));
//     });*/
//     let context = null;
//     try {
//         context = Context.create({req});
//         await server.get('hostApp').handleViewerGet(req, res, context);
//     } catch (err) {
//         next(err);
//     } finally {
//         Context.destroy(context);
//     }
// }

async function modulePost(req, res, next)  {
    console.warn('modulePost', req.params, req.body);
    let context = null;
    const hostApp = server.get('hostApp');
    try {
        context = Context.create({req});
        if (context.module === 'view') {
            const time = await hostApp.handleViewerPost(req, res, context);
            // await hostApp.logRequest(req, context, time);
        } else if (context.module === 'edit') {
            const time = await hostApp.handleEditorPost(req, res, context);
            // await hostApp.logRequest(req, context, time);
        }
    } catch (err) {
        await hostApp.logError(req, err);
        next(err);
    } finally {
        Context.destroy(context);
    }
}

/*async function viewerPost(req, res, next)  {
    console.warn('viewerPost', req.params, req.body);
    let context = null;
    const hostApp = server.get('hostApp');
    try {
        context = Context.create({req});
        const time = await hostApp.handleViewerPost(req, res, context);
        // await hostApp.logRequest(req, context, time);
    } catch (err) {
        await hostApp.logError(req, err);
        next(err);
    } finally {
        Context.destroy(context);
    }
}*/

/*async function editorGet(req, res, next)  {
    console.warn('editorGet', req.params);
    let context = null;
    try {
        const hostApp = server.get('hostApp');
        context = Context.create({req});
        if (hostApp.nodeEnv === 'development') {
            await hostApp.handleEditorGet(req, res, context);
        } else {
            next();
        }
    } catch (err) {
        next(err);
    } finally {
        Context.destroy(context);
    }
}*/

/*async function editorPost(req, res, next)  {
    console.warn('editorPost', req.params, req.body);
    let context = null;
    try {
        const hostApp = server.get('hostApp');
        context = Context.create({req});
        if (hostApp.nodeEnv === 'development') {
            await hostApp.handleEditorPost(req, res, context);
        } else {
            next();
        }
    } catch (err) {
        next(err);
    } finally {
        Context.destroy(context);
    }
}*/

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

async function e404(req, res, next) {
    console.warn(req.method, 'error/404');
    const err = new Error(`${req.method} ${req.originalUrl} page not found`);
    err.status = 404;
    next(err);
}

async function e500(err, req, res, next) {
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
    await server.get('hostApp').logError(req, err);
}

/*function multipart2(req, res) {
    return new Promise(resolve => multipart(req, res, resolve));
}*/

// async function multipartHandler(req, res, next) {
//     if (!req.is('multipart/form-data')) {
//         next();
//         return;
//     }
//     console.log('multipartHandler');
//     await multipart2(req, res);
//     if (req.body.__json) {
//         const data = JSON.parse(req.body.__json);
//         delete req.body.__json;
//         for (const name in data) {
//             req.body[name] = data[name];
//         }
//     }
//     for (const name in req.files) {
//         req.files[name].buffer = await Helper.readBinaryFile(req.files[name].path);
//     }
//     /*if (req.body.row) {
//         for (let name in req.files) {
//             req.body.row[name] = req.files[name];
//         }
//     }*/
//     next();
// }

function getTest(req, res, next) {
    console.log('getTest');
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end('getTest');
}

function postTest(req, res, next) {
    console.log('postTest', req.body);
    res.json({foo: 'bar'});
}

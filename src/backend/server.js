// console.log('server.js');
const express    = require('express');
// const morgan     = require('morgan');
// const bodyParser = require('body-parser');
// const session    = require('express-session');
const Helper    = require('./Helper');
// const multipart = require('connect-multiparty')();
// const Context = require('./Context');
const HostApp = require('./HostApp');
const server = module.exports = express();

initExpressServer(server); function initExpressServer(server) {
    // console.log('server.initExpressServer');
    const hostApp = new HostApp(server);
    hostApp.init();
}

/*function serverRequest(req, res, next) {
    console.log(`serverRequest: ${req.originalUrl}`);
    next();
}*/

/*async function moduleFile(req, res, next) {
    // console.warn('moduleFile', req.originalUrl);
    let context = null;
    try {
        context = Context.create({req});
        if (context.module === 'view') {
            await server.get('hostApp').viewerFile(req, res, context);
        } else if (context.module === 'edit') {
            await server.get('hostApp').editorFile(req, res, context);
        } else {
            next();
        }
    } catch (err) {
        next(err);
    } finally {
        Context.destroy(context);
    }
}*/

/*function favicon(req, res, next) {
    //console.log('/favicon.ico');
    res.end();
}*/

/*async function moduleGet(req, res, next) {
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
}*/

/*async function modulePost(req, res, next)  {
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
}*/

/*async function appPost(req, res, next) {
    console.warn('appPost', req.params);
    try {
        await server.get('hostApp').appPost(req, res);
    } catch (err) {
        next(err);
    }
}*/

/*async function appGet(req, res, next) {
    console.warn('appGet');
    try {
        await server.get('hostApp').appGet(req, res);
    } catch (err) {
        next(err);
    }
}*/

/*async function monitorGet(req, res, next) {
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
}*/

/*async function e404(req, res, next) {
    console.warn(req.method, 'error/404');
    const err = new Error(`${req.method} ${req.originalUrl} page not found`);
    err.status = 404;
    next(err);
}*/

/*async function e500(err, req, res, next) {
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
}*/

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

/*function getTest(req, res, next) {
    console.log('getTest');
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end('getTest');
}*/

/*
function postTest(req, res, next) {
    console.log('postTest', req.body);
    res.json({foo: 'bar'});
}
*/

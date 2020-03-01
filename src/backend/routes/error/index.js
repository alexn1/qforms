'use strict';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.e404 = (req, res, next) => {
    console.warn(req.method, 'routes/error/404');
    var err = new Error('page not found');
    err.status = 404;
    next(err);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.e500 = (err, req, res, next) => {
    console.warn(req.method, 'routes/error/500');
    var message = (typeof err === 'string') ? err : err.message;
    console.error('module.exports.e500:', message, req.originalUrl, err.stack);
    res.status(err.status || 500);
    if (req.headers['content-type'] && req.headers['content-type'].indexOf('application/json') !== -1) {
        res.end(message);
    } else {
        res.render('error/view', {
            message: err.message,
            error  : req.app.get('env') === 'development' ? err : {}
        });
    }
};
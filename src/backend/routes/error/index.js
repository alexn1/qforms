'use strict';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.e404 = function(req, res, next) {
    //console.log('module.exports.e404');
    var err = new Error('page not found');
    err.status = 404;
    next(err);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.e500 = function(err, req, res, next) {
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
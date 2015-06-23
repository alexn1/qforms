'use strict';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.e404 = function(req, res, next) {
    var err = new Error('not found');
    err.status = 404;
    next(err);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.page = function(err, req, res, next) {
    res.status(err.status || 500);
    if (req.headers['content-type'] && req.headers['content-type'].indexOf('application/json') !== -1) {
        var message = (typeof err === 'string') ? err : err.message;
        res.end('Error message: ' + message);
    } else {
        res.render('error/view', {
            message: err.message,
            error: req.app.get('env') === 'development' ? err : {}
        });
    }
};
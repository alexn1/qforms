'use strict';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.e404 = function(req, res, next) {
    //console.log('module.exports.e404');
    var err = new Error('page not found');
    err.status = 404;
    next(err);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.page = function(err, req, res, next) {
    console.log('module.exports.page');
    res.status(err.status || 500);
    if (req.headers['content-type'] && req.headers['content-type'].indexOf('application/json') !== -1) {
        var message = (typeof err === 'string') ? err : err.message;
        res.end(message);
    } else {
        res.render('error/view', {
            message: err.message,
            error  : req.app.get('env') === 'development' ? err : {}
        });
    }
};
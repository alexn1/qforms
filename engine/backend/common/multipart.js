'use strict';

var multipart = require('connect-multiparty')();

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function(req, res, next) {
    if (req.is('multipart/form-data')) {
        multipart(req, res, function() {
            if (req.body.__data) {
                var body = JSON.parse(req.body.__data);
                delete req.body.__data;
                for (var name in body) {
                    req.body[name] = body[name];
                }
            }
            if (req.body.row) {
                for (var name in req.files) {
                    req.body.row[name] = req.files[name];
                }
            }
            console.error(req.body);
            next();
        });
    } else {
        next();
    }
};
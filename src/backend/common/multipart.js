'use strict';

var multipart = require('connect-multiparty')();
var _         = require('underscore');
var async     = require('async');
var fs        = require('fs');

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = (req, res, next) => {
    if (req.is('multipart/form-data')) {
        multipart(req, res, () => {
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
            // loading file content to req.files[n].data
            var tasks = _.map(req.files, file => {
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
    } else {
        next();
    }
};
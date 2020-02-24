'use strict';

var util          = require('util');
var path          = require('path');
var fs            = require('fs');
var child_process = require('child_process');
var stream        = require('stream');
var Promise       = require('bluebird');

var qforms = require('../../../../qforms');
var server = require('../../../../server');
var Model  = require('../Model');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Page extends Model {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(data, parent) {
        super(data, parent);
        this.application        = parent;
        this.app                = parent;
        this.dirPath            = path.join(this.parent.dirPath, 'pages', this.name);
        this.viewFilePath       = path.join(
            server.get('public'),
            'viewer/class/Controller/ModelController/PageController/view',
            this.data['@class'] + 'View.ejs'
        );
        this.customViewFilePath = path.join(this.dirPath, this.name + '.ejs');
        this.createCollections  = ['dataSources', 'forms'];
        this.fillCollections    = ['dataSources', 'forms'];
        this.dataSources        = {};
        this.forms              = {};
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static async create(data, parent) {
        var customClassFilePath = path.join(
            parent.dirPath,
            'pages',
            data['@attributes'].name,
            data['@attributes'].name + '.backend.js'
        );
        return qforms.Helper.getFileContent(customClassFilePath).then(content => {
            if (content) {
                var customClass = eval(content);
                return new customClass(data, parent);
            } else {
                return new Page(data, parent);
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async rpc(context) {
        return {
            result: 'ok'
        };
    }

}

module.exports = Page;
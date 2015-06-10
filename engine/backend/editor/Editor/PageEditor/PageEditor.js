'use strict';

module.exports = PageEditor;

var util = require('util');
var path = require('path');
var _    = require('underscore');

var qforms          = require('../../../qforms');
var Editor          = require('../Editor');
var TableFormEditor = require('../../Editor/FormEditor/TableFormEditor/TableFormEditor');
var RowFormEditor   = require('../../Editor/FormEditor/RowFormEditor/RowFormEditor');
var TreeFormEditor  = require('../../Editor/FormEditor/TreeFormEditor/TreeFormEditor');

util.inherits(PageEditor, Editor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PageEditor(appEditor, pageFile) {
    this.appEditor          = appEditor;
    this.pageFile           = pageFile;
    this.defaultEjsFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/PageController/view/PageView.ejs'
    );
    this.defaultCssFilePath = path.join(
        qforms.get('public'),
        'viewer/class/Controller/ModelController/PageController/view/PageView.css'
    );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.createData = function(params) {
    return {
        '@class'      :'Page',
        '@attributes' : {
            'formatVer' : "0.1",
            'name'      : params['name'],
            'caption'   : params['caption'] ? params['caption'] : params['name'],
            'width'     : params['width']   ? params['width']   : '640',
            'height'    : params['height']  ? params['height']  : '480'
        },
        'dataSources' : {},
        'forms'       : {}
    };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getData = function() {
    return this.pageFile.getData();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.setAttr = function(name, value, callback) {
    var self = this;
    var setPageAttr = function(_callback) {
        self.pageFile.setAttr(name, value);
        self.pageFile.save(_callback);
    };
    if (name === 'name') {
        var pageName = this.pageFile.getAttr('name');
        var pageLinkEditor = this.appEditor.getPageLink(pageName);
        pageLinkEditor.setAttr(name, value, function() {
            setPageAttr(callback);
        });
    } else {
        setPageAttr(callback);
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.createForm = function(params, callback) {
    var self = this;
    var name = params['name'];
    this.pageFile.newForm(params);
    // fields
    if (params.fields) {
        for (var fieldName in params.fields) {
            this.pageFile.newFormField(
                _.extend(
                    {form: name},
                    params.fields[fieldName]
                )
            );
        }
    }
    // dataSources
    if (params.dataSources) {
        for (var dataSourceName in params.dataSources) {
            var dataSource = params.dataSources[dataSourceName];
            this.pageFile.newFormDataSource(
                _.extend(
                    {form:name},
                    dataSource
                )
            );
            // keyColumns
            if (dataSource.keyColumns) {
                for (var keyColumnName in dataSource.keyColumns) {
                    var keyColumn = dataSource.keyColumns[keyColumnName];
                    this.pageFile.newFormDataSouceKeyColumn(
                        _.extend(
                            {'form':name, 'dataSource':dataSourceName},
                            keyColumn
                        )
                    );
                }
            }
        }
    }
    this.pageFile.save(function() {
        var formEditor = self.getForm(name);
        callback(formEditor);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getForm = function(name) {
    var formData = this.pageFile.getFormData(name);
    return eval('new {class}Editor(this, name)'.replace('{class}', formData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.removeForm = function(name, callback) {
    this.pageFile.deleteForm(name);
    this.pageFile.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.createEjs = function(params, callback) {
    var customEjsFilePath = this.getCustomFilePath(params, 'ejs');
    //path.join(this.appEditor.appFile.appInfo.dirPath, params.page, params.page + '.ejs');
    this.createFile(customEjsFilePath, this.defaultEjsFilePath, this.getViewName(), params.page, null, function(ejs) {
        callback(ejs);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.createCss = function(params, callback) {
    var customCssFilePath = this.getCustomFilePath(params, 'css');
    //path.join(this.appEditor.appFile.appInfo.dirPath, params.page, params.page + '.css');
    var emptyTemplate = '.' + params.page + ' \n';
    this.createFile(customCssFilePath, this.defaultCssFilePath, this.getViewName(), params.page, emptyTemplate, function(css) {
        callback(css);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.createJs = function(params, callback) {
    var templateFilePath = path.join(__dirname, 'Page.js.ejs');
    var customJsFilePath = this.getCustomFilePath(params, 'js') ;
    //path.join(this.appEditor.appFile.appInfo.dirPath, params.page, params.page + '.js');
    this.createFile2(customJsFilePath, templateFilePath, {
        page: this.pageFile.getAttr('name'),
        _class: this.constructor.name.replace('Editor', '')
    }, function(js) {
        callback(js);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getCustomDirPath = function(params) {
    return path.join(
        this.appEditor.appFile.appInfo.dirPath,
        'pages',
        params.page
    );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getCustomFilePath = function(params, ext) {
    return path.join(
        this.getCustomDirPath(params),
        params.page + '.' + ext
    );
};
'use strict';

module.exports = PageEditor;

var util = require('util');
var path = require('path');
var _    = require('underscore');

var qforms = require('../../../../qforms');
var server = require('../../../../server');

var Editor = require('../Editor');

util.inherits(PageEditor, Editor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PageEditor(appEditor, pageFile) {
    this.appEditor          = appEditor;
    this.parent             = appEditor;
    this.pageFile           = pageFile;
    this.data               = pageFile.data;
    this.name               = this.data['@attributes'].name;
    this.defaultEjsFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/PageController/view/PageView.ejs'
    );
    this.defaultCssFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/PageController/view/PageView.css'
    );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.createData = function(params) {
    return {
        '@class'      :'Page',
        '@attributes' : {
            formatVer : '0.1',
            name      : params['name'],
            caption   : params['caption'] ? params['caption'] : params['name'],
            width     : params['width']   ? params['width']   : '640',
            height    : params['height']  ? params['height']  : '480'
        },
        dataSources : {},
        forms       : {}
    };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getData = function() {
    return this.data;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.setAttr = function(name, value, callback) {
    var self = this;
    var setPageAttr = function(_callback) {
        self.pageFile.setAttr(name, value);
        self.save(_callback);
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
PageEditor.prototype.moveFormUp = function(params, callback) {
    this.data.forms = qforms.helper.moveObjProp(this.data.forms, params.form, -1);
    this.save(function() {
        callback('ok');
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.save = function(callback) {
    this.pageFile.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.moveFormDown = function(params, callback) {
    this.data.forms = qforms.helper.moveObjProp(this.data.forms, params.form, 1);
    this.save(function() {
        callback('ok');
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.newForm = function(params) {
    var name   = params['name'];
    var _class = params['class'];
    if (!this.data.forms) {
        this.data.forms = {};
    }
    if (this.data.forms[name]) {
        throw new Error('Form {name} already exists.'.replace('{name}', name));
    }
    var data;
    switch (_class) {
        case 'TableForm':
            data = qforms.TableFormEditor.createData(params);
            break;
        case 'RowForm':
            data = qforms.RowFormEditor.createData(params);
            break;
        case 'TreeForm':
            data = qforms.TreeFormEditor.createData(params);
            break;
        default:
            throw new Error('unknown form class');
    }
    this.data.forms[name] = data;
    return this.getForm(name);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.createForm = function(params, callback) {
    var self = this;
    var name = params.name;
    var formEditor = this.newForm(params);
    // fields
    if (params.fields) {
        for (var fieldName in params.fields) {
            formEditor.newField(_.extend(
                {form: name},
                params.fields[fieldName]
            ));
        }
    }
    // dataSources
    if (params.dataSources) {
        for (var dataSourceName in params.dataSources) {
            var dataSource = params.dataSources[dataSourceName];
            formEditor.newDataSource(
                _.extend(
                    {form:name},
                    dataSource
                )
            );
            // keyColumns
            if (dataSource.keyColumns) {
                for (var keyColumnName in dataSource.keyColumns) {
                    var keyColumn = dataSource.keyColumns[keyColumnName];
                    formEditor.newDataSouceKeyColumn(
                        _.extend(
                            {'form':name, 'dataSource':dataSourceName},
                            keyColumn
                        )
                    );
                }
            }
        }
    }
    this.save(function() {
        var formEditor = self.getForm(name);
        callback(formEditor);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getForm = function(name) {
    var formData = this.data.forms[name];
    return eval('new qforms.{class}Editor(this, name, formData)'.replace('{class}', formData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getDataSource = function(name) {
    var dataSourceData  = this.data.dataSources[name];
    return eval('new qforms.{class}Editor(this, name, dataSourceData)'.replace('{class}', dataSourceData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.removeForm = function(name, callback) {
    this.deleteForm(name);
    this.save(callback);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.createEjs = function(params, callback) {
    var self = this;
    this.getCustomFilePath('ejs', function(customEjsFilePath) {
        self.createFileByReplace(customEjsFilePath, self.defaultEjsFilePath, self.getViewName(), params.page, null, function(ejs) {
            callback(ejs);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.createCss = function(params, callback) {
    var self = this;
    this.getCustomFilePath('css', function(customCssFilePath) {
        var emptyTemplate = '.' + params.page + ' \n';
        self.createFileByReplace(customCssFilePath, self.defaultCssFilePath, self.getViewName(), params.page, emptyTemplate, function(css) {
            callback(css);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.createJs = function(params, callback) {
    var self = this;
    var templateFilePath = path.join(__dirname, 'Page.js.ejs');
    this.getCustomFilePath('js', function(customJsFilePath) {
        self.createFileByParams(customJsFilePath, templateFilePath, {
            page  : self.pageFile.getAttr('name'),
            _class: self.constructor.name.replace('Editor', '')
        }, function(js) {
            callback(js);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getCustomDirPath = function(callback) {
    var self = this;
    this.parent.getCustomDirPath(function(customDirPath) {
        var dirPath = path.join(customDirPath, 'pages', self.name);
        qforms.helper.createDirIfNotExists(dirPath, function() {
            callback(dirPath);
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getCustomDirPath2 = function() {
    var self = this;
    return self.parent.getCustomDirPath2().then(function (customDirPath) {
        var dirPath = path.join(customDirPath, 'pages', self.name);
        return qforms.helper.createDirIfNotExists2(dirPath).then(function () {
            return dirPath;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getCustomFilePath = function(ext, callback) {
    var self = this;
    this.getCustomDirPath(function(customDirPath) {
        callback(path.join(customDirPath, self.name + '.' + ext));
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getCustomFilePath2 = function(ext) {
    var self = this;
    self.getCustomDirPath2().then(function (customDirPath) {
        return path.join(customDirPath, self.name + '.' + ext);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.newDataSource = function(params) {
    var name   = params['name'];
    var _class = params['class'];
    if (!this.data.dataSources) {
        this.data.dataSources = {};
    }
    if (this.data.dataSources[name]) {
        throw new Error('Data Source {name} already exist.'.replace('{name}', name));
    }
    var data;
    switch (_class) {
        case 'DataSource':
            data = qforms.DataSourceEditor.create(params);
            break;
        case 'SqlDataSource':
            data = qforms.SqlDataSourceEditor.create(params);
            break;
        default:
            throw new Error('Unknown data source class.');
    }
    return this.data.dataSources[name] = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.setDataSourceAttr = function(dataSource, name, value) {
    this.data.dataSources[dataSource]['@attributes'][name] = value;
    if (name === 'name') {
        this.data.dataSources = qforms.helper.replaceKey(
            this.data.dataSources,
            dataSource,
            value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.deleteForm = function(name) {
    delete this.data.forms[name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.deleteDataSource = function(dataSource) {
    delete this.data.dataSources[dataSource];
};

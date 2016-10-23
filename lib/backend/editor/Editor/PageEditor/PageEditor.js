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
    var self = this;
    self.appEditor          = appEditor;
    self.parent             = appEditor;
    self.pageFile           = pageFile;
    self.data               = pageFile.data;
    self.name               = self.data['@attributes'].name;
    self.defaultEjsFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/PageController/view/PageView.ejs'
    );
    self.defaultCssFilePath = path.join(
        server.get('public'),
        'viewer/class/Controller/ModelController/PageController/view/PageView.css'
    );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.createData = function(params) {
    return {
        '@class'     :'Page',
        '@attributes': {
            formatVer: '0.1',
            name     : params['name'],
            caption  : params['caption'] ? params['caption'] : params['name'],
            width    : params['width']   ? params['width']   : '640',
            height   : params['height']  ? params['height']  : '480'
        },
        dataSources: {},
        forms      : {}
    };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getData = function() {
    var self = this;
    return self.data;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.setAttr = function(name, value) {
    var self = this;
    if (name === 'name') {
        var pageName = self.pageFile.getAttr('name');
        var pageLinkEditor = self.appEditor.getPageLink(pageName);
        return pageLinkEditor.setAttr(name, value).then(function () {
            self.pageFile.setAttr(name, value);
            return self.save();
        });
    } else {
        self.pageFile.setAttr(name, value);
        return self.save();
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.moveFormUp2 = function(params) {
    var self = this;
    self.data.forms = qforms.helper.moveObjProp(self.data.forms, params.form, -1);
    return self.save().then(function () {
        return 'ok';
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.save = function() {
    var self = this;
    return self.pageFile.save();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.moveFormDown2 = function(params) {
    var self = this;
    self.data.forms = qforms.helper.moveObjProp(self.data.forms, params.form, 1);
    return self.save().then(function () {
        return 'ok';
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.newForm = function(params) {
    var self = this;
    var name   = params['name'];
    var _class = params['class'];
    if (!self.data.forms) {
        self.data.forms = {};
    }
    if (self.data.forms[name]) {
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
    self.data.forms[name] = data;
    return self.getForm(name);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.createForm2 = function(params) {
    var self = this;
    var name = params.name;
    var formEditor = self.newForm(params);
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
    return self.save().then(function () {
        var formEditor = self.getForm(name);
        return formEditor;
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getForm = function(name) {
    var self = this;
    var formData = self.data.forms[name];
    return eval('new qforms.{class}Editor(this, name, formData)'.replace('{class}', formData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getDataSource = function(name) {
    var self = this;
    var dataSourceData = self.data.dataSources[name];
    return eval('new qforms.{class}Editor(this, name, dataSourceData)'.replace('{class}', dataSourceData['@class']));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.removeForm2 = function(name) {
    var self = this;
    self.deleteForm(name);
    return self.save();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.createEjs2 = function(params) {
    var self = this;
    return self.getCustomFilePath2('ejs').then(function (customEjsFilePath) {
        return self.createFileByReplace(customEjsFilePath, self.defaultEjsFilePath, self.getViewName(), params.page, null).then(function (ejs) {
            return ejs;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.createCss2 = function(params) {
    var self = this;
    return self.getCustomFilePath2('css').then(function (customCssFilePath) {
        var emptyTemplate = '.' + params.page + ' \n';
        return self.createFileByReplace(customCssFilePath, self.defaultCssFilePath, self.getViewName(), params.page, emptyTemplate).then(function (css) {
            return css;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.createJs2 = function(params) {
    var self = this;
    var templateFilePath = path.join(__dirname, 'Page.js.ejs');
    return self.getCustomFilePath2('js').then(function (customJsFilePath) {
        return self.createFileByParams(customJsFilePath, templateFilePath, {
            page  : self.pageFile.getAttr('name'),
            _class: self.constructor.name.replace('Editor', '')
        }).then(function (js) {
            return js;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getCustomDirPath2 = function() {
    var self = this;
    console.log('PageEditor.prototype.getCustomDirPath2');
    return self.parent.getCustomDirPath2().then(function (customDirPath) {
        var dirPath = path.join(customDirPath, 'pages', self.name);
        return qforms.helper.createDirIfNotExists(dirPath).then(function () {
            return dirPath;
        });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.getCustomFilePath2 = function(ext) {
    var self = this;
    return self.getCustomDirPath2().then(function (customDirPath) {
        return path.join(customDirPath, self.name + '.' + ext);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.newDataSource = function(params) {
    var self = this;
    var name   = params['name'];
    var _class = params['class'];
    if (!self.data.dataSources) {
        self.data.dataSources = {};
    }
    if (self.data.dataSources[name]) {
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
    return self.data.dataSources[name] = data;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.setDataSourceAttr = function(dataSource, name, value) {
    var self = this;
    self.data.dataSources[dataSource]['@attributes'][name] = value;
    if (name === 'name') {
        self.data.dataSources = qforms.helper.replaceKey(self.data.dataSources, dataSource, value);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.deleteForm = function(name) {
    var self = this;
    delete self.data.forms[name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageEditor.prototype.deleteDataSource = function(dataSource) {
    var self = this;
    delete self.data.dataSources[dataSource];
};
'use strict';

QForms.inherits(Form, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Form(data, page) {
    var self = this;
    Model.call(self, data);
    self.parent = page;
    self.page   = page;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.setValue = function(name, value) {
    var self = this;
    //console.log(name + ' = ' + value);
    var args = {
        controller: 'Form',
        action    : 'save',
        params    : {
            pageFileName: self.page.pageLink.data['@attributes'].fileName,
            form        : self.data['@attributes'].name,
            attr        : name,
            value       : value
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        self.data['@attributes'][name] = value;
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.delete = function() {
    var self = this;
    var args = {
        controller: 'Form',
        action    : 'delete',
        params    : {
            pageFileName: self.page.pageLink.data['@attributes'].fileName,
            form        : self.data['@attributes'].name
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.moveUp2 = function() {
    var self = this;
    var args = {
        controller: 'Form',
        action    : 'moveUp',
        params    : {
            pageFileName: self.page.pageLink.data['@attributes'].fileName,
            form        : self.data['@attributes'].name
        }
    };
    return QForms.doHttpRequest(args);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.moveDown2 = function() {
    var self = this;
    var args = {
        controller: 'Form',
        action    : 'moveDown',
        params    : {
            pageFileName: self.page.pageLink.data['@attributes'].fileName,
            form        : self.data['@attributes'].name
        }
    };
    return QForms.doHttpRequest(args);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.newField2 = function(params) {
    var self = this;
    params['pageFileName'] = self.page.pageLink.data['@attributes'].fileName;
    params['form']         = self.data['@attributes'].name;
    var args = {
        controller: 'Field',
        action    : '_new',
        params    : params
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.newControl2 = function(params) {
    var self = this;
    params['pageFileName'] = self.page.pageLink.data['@attributes'].fileName;
    params['form']         = self.data['@attributes'].name;
    var args = {
        controller: 'Control',
        action    : '_new',
        params    : params
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.newDataSource2 = function(params) {
    var self = this;
    params['page']  = self.page.pageLink.data['@attributes'].fileName;
    params['form']  = self.data['@attributes'].name;
    var args = {
        controller: 'DataSource',
        action    : '_new',
        params    : params
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.getView = function(view) {
    var self = this;
    var args = {
        controller: 'Form',
        action    : 'getView',
        params    : {
            view: view,
            page: self.data !== undefined ? self.page.data['@attributes'].name : null,
            form: self.data !== undefined ? self.data['@attributes'].name      : null
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.saveView = function(text, view) {
    var self = this;
    var args = {
        controller: 'Form',
        action    : 'saveView',
        params    : {
            page: self.page.data['@attributes'].name,
            form: self.data['@attributes'].name,
            view: view,
            text: text
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.saveController = function(text) {
    var self = this;
    var args = {
        controller: 'Form',
        action    : 'saveController',
        params    : {
            page: self.page.data['@attributes'].name,
            form: self.data['@attributes'].name,
            text: text
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.createView2 = function() {
    var self = this;
    var args = {
        controller: 'Form',
        action    : 'createView',
        params    : {
            page : self.page.data['@attributes'].name,
            form : self.data['@attributes'].name,
            class: self.data['@class']
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.createController2 = function() {
    var self = this;
    var args = {
        controller: 'Form',
        action    : 'createController',
        params    : {
            page : self.page.data['@attributes'].name,
            form : self.data['@attributes'].name,
            class: self.data['@class']
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};
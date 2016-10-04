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
Form.prototype.setValue = function(name, value, callback) {
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
    QForms.doHttpRequest2(args).then(function (data) {
        self.data['@attributes'][name] = value;
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.delete = function(callback) {
    var self = this;
    var args = {
        controller: 'Form',
        action    : 'delete',
        params    : {
            pageFileName: self.page.pageLink.data['@attributes'].fileName,
            form        : self.data['@attributes'].name
        }
    };
    QForms.doHttpRequest2(args).then(function (data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.moveUp = function(callback) {
    var self = this;
    var args = {
        controller: 'Form',
        action    : 'moveUp',
        params    : {
            pageFileName: self.page.pageLink.data['@attributes'].fileName,
            form        : self.data['@attributes'].name
        }
    };
    QForms.doHttpRequest2(args).then(callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.moveDown = function(callback) {
    var self = this;
    var args = {
        controller: 'Form',
        action    : 'moveDown',
        params    : {
            pageFileName: self.page.pageLink.data['@attributes'].fileName,
            form        : self.data['@attributes'].name
        }
    };
    QForms.doHttpRequest2(args).then(callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.newField = function(params, callback) {
    var self = this;
    params['pageFileName'] = self.page.pageLink.data['@attributes'].fileName;
    params['form']         = self.data['@attributes'].name;
    var args = {
        controller: 'Field',
        action    : '_new',
        params    : params
    };
    QForms.doHttpRequest2(args).then(function (data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.newControl = function(params, callback) {
    var self = this;
    params['pageFileName'] = self.page.pageLink.data['@attributes'].fileName;
    params['form']         = self.data['@attributes'].name;
    var args = {
        controller: 'Control',
        action    : '_new',
        params    : params
    };
    QForms.doHttpRequest2(args).then(function (data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.newDataSource = function(params, callback) {
    var self = this;
    params['page']  = self.page.pageLink.data['@attributes'].fileName;
    params['form']  = self.data['@attributes'].name;
    var args = {
        controller: 'DataSource',
        action    : '_new',
        params    : params
    };
    QForms.doHttpRequest2(args).then(function (data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.getView = function(view, callback) {
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
    QForms.doHttpRequest2(args).then(function (data) {
        callback(data);
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
    QForms.doHttpRequest2(args).then(function (data) {

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
    QForms.doHttpRequest2(args).then(function (data) {

    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.createView = function(callback) {
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
    QForms.doHttpRequest2(args).then(function (data) {
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.createController = function(callback) {
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
    QForms.doHttpRequest2(args).then(function (data) {
        callback(data);
    });
};
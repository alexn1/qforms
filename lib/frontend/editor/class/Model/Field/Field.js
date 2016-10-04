'use strict';

QForms.inherits(Field, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Field(data, parent) {
    var self = this;
    Model.call(self, data);
    self.parent = parent;
    self.form   = parent;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.setValue = function(name, value, callback) {
    var self = this;
    //console.log(name + ' = ' + value);
    var args = {
        controller: 'Field',
        action    : 'save',
        params    : {
            pageFileName: self.form.page.pageLink.data['@attributes'].fileName,
            form        : self.form.data['@attributes'].name,
            field       : self.data['@attributes'].name,
            attr        : name,
            value       : value
        }
    };
    QForms.doHttpRequest(self, args, function (data) {
        self.data['@attributes'][name] = value;
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.delete = function(callback) {
    var self = this;
    var args = {
        controller : 'Field',
        action     : 'delete',
        params     : {
            pageFileName:self.form.page.pageLink.data['@attributes'].fileName,
            form        :self.form.data['@attributes'].name,
            field       :self.data['@attributes'].name
        }
    };
    QForms.doHttpRequest(self, args, function(data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.getView = function(view, callback) {
    var self = this;
    var args = {
        controller: 'Field',
        action    : 'getView',
        params    : {
            view : view,
            page : self.data !== undefined ? self.form.page.data['@attributes'].name : null,
            form : self.data !== undefined ? self.form.data['@attributes'].name      : null,
            field: self.data !== undefined ? self.data['@attributes'].name           : null
        }
    };
    QForms.doHttpRequest(self, args, function(data) {
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.saveView = function(text, view) {
    var self = this;
    var args = {
        controller: 'Field',
        action    : 'saveView',
        params    : {
            page : self.form.page.data['@attributes'].name,
            form : self.form.data['@attributes'].name,
            field: self.data['@attributes'].name,
            view : view,
            text : text
        }
    };
    QForms.doHttpRequest(self, args, function(data){});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.saveController = function(text) {
    var self = this;
    var args = {
        controller: 'Field',
        action    : 'saveController',
        params    : {
            page : self.form.page.data['@attributes'].name,
            form : self.form.data['@attributes'].name,
            field: self.data['@attributes'].name,
            text : text
        }
    };
    QForms.doHttpRequest(self, args, function (data) {

    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.createView = function(callback) {
    var self = this;
    var args = {
        controller: 'Field',
        action    : 'createView',
        params    : {
            page : self.form.page.data['@attributes'].name,
            form : self.form.data['@attributes'].name,
            field: self.data['@attributes'].name,
            class: self.data['@class']
        }
    };
    QForms.doHttpRequest(self, args, function (data) {
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.createController = function(callback) {
    var self = this;
    var args = {
        controller: 'Field',
        action    : 'createController',
        params    : {
            page : self.form.page.data['@attributes'].name,
            form : self.form.data['@attributes'].name,
            field: self.data['@attributes'].name,
            class: self.data['@class']
        }
    };
    QForms.doHttpRequest(self, args, function (data) {
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.changeClass = function(params, callback) {
    var self = this;
    params['page']  = self.form.page.data['@attributes'].name;
    params['form']  = self.form.data['@attributes'].name;
    params['field'] = self.data['@attributes'].name;
    var args = {
        controller: 'Field',
        action    : 'changeClass',
        params    : params
    };
    QForms.doHttpRequest(self, args, function (data) {
        self.data = data;
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.moveUp = function(callback) {
    var self = this;
    var args = {
        controller : 'Field',
        action     : 'moveUp',
        params     : {
            pageFileName: self.form.page.pageLink.data['@attributes'].fileName,
            form        : self.form.data['@attributes'].name,
            field       : self.data['@attributes'].name
        }
    };
    QForms.doHttpRequest(self, args, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.moveDown = function(callback) {
    var self = this;
    var args = {
        controller : 'Field',
        action     : 'moveDown',
        params     : {
            pageFileName: self.form.page.pageLink.data['@attributes'].fileName,
            form        : self.form.data['@attributes'].name,
            field       : self.data['@attributes'].name
        }
    };
    QForms.doHttpRequest(self, args, callback);
};
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
Field.prototype.setValue2 = function(name, value) {
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
    return QForms.doHttpRequest2(args).then(function (data) {
        self.data['@attributes'][name] = value;
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.delete = function() {
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
    return QForms.doHttpRequest2(args).then(function (data) {
        return (data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.getView = function(view) {
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
    return QForms.doHttpRequest2(args).then(function (data) {
        return data;
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
    return QForms.doHttpRequest2(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.saveController2 = function(text) {
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
    return QForms.doHttpRequest2(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.createView2 = function() {
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
    return QForms.doHttpRequest2(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.createController2 = function() {
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
    return QForms.doHttpRequest2(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.changeClass = function(params) {
    var self = this;
    params['page']  = self.form.page.data['@attributes'].name;
    params['form']  = self.form.data['@attributes'].name;
    params['field'] = self.data['@attributes'].name;
    var args = {
        controller: 'Field',
        action    : 'changeClass',
        params    : params
    };
    return QForms.doHttpRequest2(args).then(function (data) {
        self.data = data;
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.moveUp2 = function() {
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
    return QForms.doHttpRequest2(args);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.moveDown2 = function() {
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
    return QForms.doHttpRequest2(args);
};
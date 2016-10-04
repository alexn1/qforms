'use strict';

QForms.inherits(Control, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Control(data, form) {
    var self = this;
    Model.call(self, data);
    self.form = form;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Control.prototype.getView = function(view, callback) {
    var self = this;
    var args = {
        controller: 'Control',
        action    : 'getView',
        params    : {
            view : view,
            page : self.data !== undefined ? self.form.page.data['@attributes'].name : null,
            form : self.data !== undefined ? self.form.data['@attributes'].name      : null,
            field: self.data !== undefined ? self.data['@attributes'].name           : null
        }
    };
    QForms.doHttpRequest2(args).then(function (data) {
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Control.prototype.setValue = function(name, value, callback) {
    var self = this;
    //console.log(name + ' = ' + value);
    var args = {
        controller: 'Control',
        action    : 'save',
        params    : {
            pageFileName: self.form.page.pageLink.data['@attributes'].fileName,
            form        : self.form.data['@attributes'].name,
            control     : self.data['@attributes'].name,
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
Control.prototype.delete = function(callback) {
    var self = this;
    var args = {
        controller: 'Control',
        action    : 'delete',
        params    : {
            pageFileName: self.form.page.pageLink.data['@attributes'].fileName,
            form        : self.form.data['@attributes'].name,
            control     : self.data['@attributes'].name
        }
    };
    QForms.doHttpRequest2(args).then(function (data) {
        if (callback) {
            callback(data);
        }
    });
};
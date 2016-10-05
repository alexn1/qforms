'use strict';

QForms.inherits(Param, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Param(data, database) {
    var self = this;
    Model.call(self, data);
    self.database = database;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Param.prototype.setValue2 = function(name, value) {
    var self = this;
    //console.log(name + ' = ' + value);
    var args = {
        controller: 'Param',
        action    : 'save',
        params    : {
            database: self.database.data['@attributes'].name,
            param   : self.data['@attributes'].name,
            attr    : name,
            value   : value
        }
    };
    return QForms.doHttpRequest2(args).then(function (data) {
        self.data['@attributes'][name] = value;
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Param.prototype.delete = function(callback) {
    var self = this;
    var args = {
        controller: 'Param',
        action    : 'delete',
        params    : {
            database: self.database.data['@attributes'].name,
            param   : self.data['@attributes'].name
        }
    };
    QForms.doHttpRequest2(args).then(function (data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Param.prototype.getView = function(view, callback) {
    var self = this;
    var args = {
        controller: 'Param',
        action    : 'getView',
        params    : {
            view: view
        }
    };
    QForms.doHttpRequest2(args).then(function (data) {
        callback(data);
    });
};
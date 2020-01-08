'use strict';

QForms.inherits(Param, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Param(data, database) {
    var self = this;
    Model.call(self, data);
    self.database = database;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Param.prototype.setValue = function(name, value) {
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
    return QForms.doHttpRequest(args).then(function (data) {
        self.data['@attributes'][name] = value;
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Param.prototype.delete = function() {
    var self = this;
    var args = {
        controller: 'Param',
        action    : 'delete',
        params    : {
            database: self.database.data['@attributes'].name,
            param   : self.data['@attributes'].name
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Param.prototype.getView = function(view) {
    var self = this;
    var args = {
        controller: 'Param',
        action    : 'getView',
        params    : {
            view: view
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};
'use strict';

QForms.inherit(Database, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Database(data) {
    var self = this;
    Model.call(self, data);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.setValue = function(name, value, callback) {
    var self = this;
    //console.log(name + ' = ' + value);
    var args = {
        controller: 'Database',
        action    : 'save',
        params    : {
            database: self.data['@attributes'].name,
            attr    : name,
            value   : value
        }
    };
    QForms.doHttpRequest(self, args, function(data) {
        self.data['@attributes'][name] = value;
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.delete = function(callback) {
    var self = this;
    var args = {
        controller: 'Database',
        action    : 'delete',
        params    : {
            database: self.data['@attributes'].name
        }
    };
    QForms.doHttpRequest(self, args, function (data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.newParam = function(name, callback) {
    var self = this;
    var args = {
        controller: 'Param',
        action    : '_new',
        params    : {
            database: self.data['@attributes'].name,
            name    : name
        }
    };
    QForms.doHttpRequest(self, args, function (data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.getView = function(view, callback) {
    var self = this;
    var args = {
        controller: 'Database',
        action    : 'getView',
        params    : {
            view    : view,
            database: self.data !== undefined ? self.data['@attributes'].name : null
        }
    };
    QForms.doHttpRequest(self, args, function (data) {
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.getTableInfo = function(table, callback) {
    var self = this;
    var args = {
        controller: 'Database',
        action    : 'getTableInfo',
        params    : {
            database: self.data !== undefined ? self.data['@attributes'].name : null,
            table   : table
        }
    };
    QForms.doHttpRequest(self, args, function(result) {
        callback(result);
    });
};
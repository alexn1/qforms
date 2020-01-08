'use strict';

QForms.inherits(Database, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Database(data) {
    var self = this;
    Model.call(self, data);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.setValue = function(name, value) {
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
    return QForms.doHttpRequest(args).then(function (data) {
        self.data['@attributes'][name] = value;
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.delete = function() {
    var self = this;
    var args = {
        controller: 'Database',
        action    : 'delete',
        params    : {
            database: self.data['@attributes'].name
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return (data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.newParam = function(name) {
    var self = this;
    var args = {
        controller: 'Param',
        action    : '_new',
        params    : {
            database: self.data['@attributes'].name,
            name    : name
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.getView = function(view) {
    var self = this;
    var args = {
        controller: 'Database',
        action    : 'getView',
        params    : {
            view    : view,
            database: self.data !== undefined ? self.data['@attributes'].name : null
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.getTableInfo = function(table) {
    var self = this;
    var args = {
        controller: 'Database',
        action    : 'getTableInfo',
        params    : {
            database: self.data !== undefined ? self.data['@attributes'].name : null,
            table   : table
        }
    };
    return QForms.doHttpRequest(args).then(function (result) {
        return result;
    });
};
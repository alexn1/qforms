'use strict';

QForms.inherit(KeyColumn, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function KeyColumn(data, dataSource) {
    var self = this;
    Model.call(self, data);
    self.dataSource = dataSource;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumn.prototype.setValue = function(name, value, callback) {
    var self = this;
    //console.log(name + ' = ' + value);
    var args = {
        controller: 'KeyColumn',
        action    : 'save',
        params    : {
            form        : self.dataSource.parent.data['@attributes'].name,
            pageFileName: self.dataSource.parent.page.pageLink.data['@attributes'].fileName,
            dataSource  : self.dataSource.data['@attributes'].name,
            keyColumn   : self.data['@attributes'].name,
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
KeyColumn.prototype.delete = function(callback) {
    var self = this;
    var args = {
        controller: 'KeyColumn',
        action    : 'delete',
        params    : {
            page      : self.dataSource.parent.page.pageLink.data['@attributes'].fileName,
            form      : self.dataSource.parent.data['@attributes'].name,
            dataSource: self.dataSource.data['@attributes'].name,
            keyColumn : self.data['@attributes'].name
        }
    };
    QForms.doHttpRequest(self, args, function (data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumn.prototype.getView = function(view, callback) {
    var self = this;
    var args = {
        controller: 'KeyColumn',
        action    : 'getView',
        params    : {
            view: view
        }
    };
    QForms.doHttpRequest(self, args, function (data) {
        callback(data);
    });
};
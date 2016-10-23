'use strict';

QForms.inherits(KeyColumn, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function KeyColumn(data, dataSource) {
    var self = this;
    Model.call(self, data);
    self.dataSource = dataSource;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumn.prototype.setValue = function(name, value) {
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
    return QForms.doHttpRequest(args).then(function (data) {
        self.data['@attributes'][name] = value;
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumn.prototype.delete = function() {
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
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumn.prototype.getView = function(view) {
    var self = this;
    var args = {
        controller: 'KeyColumn',
        action    : 'getView',
        params    : {
            view: view
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};
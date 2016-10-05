'use strict';

QForms.inherits(ParentKeyColumn, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ParentKeyColumn(data, dataSource) {
    var self = this;
    Model.call(self, data);
    self.dataSource = dataSource;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumn.prototype.setValue2 = function(name, value) {
    var self = this;
    //console.log(name + ' = ' + value);
    var args = {
        controller: 'ParentKeyColumn',
        action    : 'save',
        params    : {
            form           : self.dataSource.parent.data['@attributes'].name,
            pageFileName   : self.dataSource.parent.page.pageLink.data['@attributes'].fileName,
            dataSource     : self.dataSource.data['@attributes'].name,
            parentKeyColumn: self.data['@attributes'].name,
            attr           : name,
            value          : value
        }
    };
    return QForms.doHttpRequest2(args).then(function (data) {
        self.data['@attributes'][name] = value;
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumn.prototype.delete2 = function() {
    var self = this;
    var args = {
        controller: 'ParentKeyColumn',
        action    : 'delete',
        params    : {
            page           : self.dataSource.parent.page.pageLink.data['@attributes'].fileName,
            form           : self.dataSource.parent.data['@attributes'].name,
            dataSource     : self.dataSource.data['@attributes'].name,
            parentKeyColumn: self.data['@attributes'].name
        }
    };
    return QForms.doHttpRequest2(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumn.prototype.getView2 = function(view) {
    var self = this;
    var args = {
        controller: 'ParentKeyColumn',
        action    : 'getView',
        params    : {
            view: view
        }
    };
    return QForms.doHttpRequest2(args).then(function (data) {
        return data;
    });
};

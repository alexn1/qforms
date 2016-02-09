'use strict';

QForms.inherit(KeyColumn, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function KeyColumn(data, dataSource) {
    Model.call(this, data);
    this.dataSource = dataSource;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumn.prototype.setValue = function(name, value, callback) {
    //console.log(name + ' = ' + value);
    var args = {
        controller:'KeyColumn',
        action:'save',
        params:{
            form:this.dataSource.parent.data['@attributes'].name,
            pageFileName:this.dataSource.parent.page.pageLink.data['@attributes'].fileName,
            dataSource:this.dataSource.data['@attributes'].name,
            keyColumn:this.data['@attributes'].name,
            attr:name,
            value:value
        }
    };
    QForms.doHttpRequest(this, args, function(data) {
        this.data['@attributes'][name] = value;
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumn.prototype.delete = function(callback) {
    var args = {
        controller:'KeyColumn',
        action:'delete',
        params:{
            page:this.dataSource.parent.page.pageLink.data['@attributes'].fileName,
            form:this.dataSource.parent.data['@attributes'].name,
            dataSource:this.dataSource.data['@attributes'].name,
            keyColumn:this.data['@attributes'].name
        }
    };
    QForms.doHttpRequest(this, args, function(data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
KeyColumn.prototype.getView = function(view, callback) {
    var args = {
        controller:'KeyColumn',
        action:'getView',
        params:{
            view:view
        }
    };
    QForms.doHttpRequest(this, args, function(data) {
        callback(data);
    });
};
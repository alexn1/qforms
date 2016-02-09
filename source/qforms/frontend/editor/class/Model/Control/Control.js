'use strict';

QForms.inherit(Control, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Control(data, form) {
    Model.call(this, data);
    this.form = form;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Control.prototype.getView = function(view, callback) {
    var args = {
        controller:'Control',
        action:'getView',
        params:{
            view : view,
            page : this.data !== undefined ? this.form.page.data['@attributes'].name : null,
            form : this.data !== undefined ? this.form.data['@attributes'].name : null,
            field: this.data !== undefined ? this.data['@attributes'].name : null
        }
    };
    QForms.doHttpRequest(this, args, function(data) {
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Control.prototype.setValue = function(name, value, callback) {
    //console.log(name + ' = ' + value);
    var args = {
        controller:'Control',
        action:'save',
        params:{
            pageFileName:this.form.page.pageLink.data['@attributes'].fileName,
            form:this.form.data['@attributes'].name,
            control:this.data['@attributes'].name,
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
Control.prototype.delete = function(callback) {
    var args = {
        controller:'Control',
        action:'delete',
        params:{
            pageFileName:this.form.page.pageLink.data['@attributes'].fileName,
            form:this.form.data['@attributes'].name,
            control:this.data['@attributes'].name
        }
    };
    QForms.doHttpRequest(this, args, function(data) {
        if (callback) {
            callback(data);
        }
    });
};
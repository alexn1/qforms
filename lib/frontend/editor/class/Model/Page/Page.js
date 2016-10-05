'use strict';

QForms.inherits(Page, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Page(data, parent, pageLink) {
    var self = this;
    Model.call(self, data);
    self.parent      = parent;
    self.pageLink    = pageLink;
    self.application = parent;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.setValue2 = function(name, value) {
    var self = this;
    //console.log(name + ' = ' + value);
    var args = {
        controller: 'Page',
        action    : 'save',
        params    : {
            fileName: self.pageLink.data['@attributes'].fileName,
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
Page.prototype.delete2 = function() {
    var self = this;
    var args = {
        controller: 'Page',
        action    : 'delete',
        params    : {
            page: self.data['@attributes'].name
        }
    };
    return QForms.doHttpRequest2(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.newForm2 = function(params) {
    var self = this;
    params['pageFileName'] = self.pageLink.data['@attributes'].fileName;
    var args = {
        controller: 'Form',
        action    : '_new',
        params    : params
    };
    return QForms.doHttpRequest2(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.getView2 = function(view) {
    var self = this;
    var args = {
        controller: 'Page',
        action    : 'getView',
        params    : {
            view: view,
            page: self.data !== undefined ? self.data['@attributes'].name : null
        }
    };
    return QForms.doHttpRequest2(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.saveView = function(text, view) {
    var self = this;
    var args = {
        controller: 'Page',
        action    : 'saveView',
        params    : {
            page: self.data['@attributes'].name,
            view: view,
            text: text
        }
    };
    QForms.doHttpRequest2(args).then(function (data) {

    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.saveController = function(text) {
    var self = this;
    var args = {
        controller: 'Page',
        action    : 'saveController',
        params    : {
            page: self.data['@attributes'].name,
            text: text
        }
    };
    QForms.doHttpRequest2(args).then(function (data) {

    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.createView2 = function() {
    var self = this;
    var args = {
        controller: 'Page',
        action    : 'createView',
        params    : {
            page: self.data['@attributes'].name
        }
    };
    return QForms.doHttpRequest2(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.createController2 = function() {
    var self = this;
    var args = {
        controller: 'Page',
        action    : 'createController',
        params    : {
            page: self.data['@attributes'].name
        }
    };
    return QForms.doHttpRequest2(args).then(function (data) {
        return data;
    });
};
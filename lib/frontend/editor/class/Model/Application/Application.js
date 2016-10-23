'use strict';

QForms.inherits(Application, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Application(data) {
    var self = this;
    Model.call(self, data);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.setValue = function(name, value) {
    var self = this;
    //console.log(name + ' = ' + value);
    var args = {
        controller: 'Application',
        action    : 'save',
        params    : {
            attr : name,
            value: value
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        self.data['@attributes'][name] = value;
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.newPage = function(params) {
    var self = this;
    params['menu'] = (params['startup'] === 'true') ? 'Pages' : '';
    var args = {
        controller: 'Page',
        action    : '_new',
        params    : params
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return [data.page, data.pageLink];
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.newDatabase2 = function(params) {
    var self = this;
    var args = {
        controller: 'Database',
        action    : '_new',
        params    : params
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.getView = function(view) {
    var self = this;
    var args = {
        controller: 'Application',
        action    : 'getView',
        params    : {
            app : self.data['@attributes'].name,
            view: view
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.saveView = function(text, view) {
    var self = this;
    var args = {
        controller: 'Application',
        action    : 'saveView',
        params    : {
            app : self.data['@attributes'].name,
            view: view,
            text: text
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.saveController2 = function(text) {
    var self = this;
    var args = {
        controller: 'Application',
        action    : 'saveController',
        params    : {
            app : self.data['@attributes'].name,
            text: text
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.createView2 = function() {
    var self = this;
    var args = {
        controller: 'Application',
        action    : 'createView',
        params    : {
            app: self.data['@attributes'].name
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.createController2 = function() {
    var self = this;
    var args = {
        controller: 'Application',
        action    : 'createController',
        params    : {
            app: self.data['@attributes'].name
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.newDataSource2 = function(params) {
    var self = this;
    var args = {
        controller: 'DataSource',
        action    : '_new',
        params    : params
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};
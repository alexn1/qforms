'use strict';

QForms.inherits(Application, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Application(data) {
    var self = this;
    Model.call(self, data);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.setValue = function(name, value, callback) {
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
    QForms.doHttpRequest2(args).then(function (data) {
        self.data['@attributes'][name] = value;
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.newPage = function(params, callback) {
    var self = this;
    params['menu'] = (params['startup'] === 'true') ? 'Pages' : '';
    var args = {
        controller: 'Page',
        action    : '_new',
        params    : params
    };
    QForms.doHttpRequest2(args).then(function (data) {
        if (callback) {
            callback(data.page, data.pageLink);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.newDatabase = function(params, callback) {
    var self = this;
    var args = {
        controller: 'Database',
        action    : '_new',
        params    : params
    };
    QForms.doHttpRequest2(args).then(function (data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.getView = function(view, callback) {
    var self = this;
    var args = {
        controller: 'Application',
        action    : 'getView',
        params    : {
            app : self.data['@attributes'].name,
            view: view
        }
    };
    QForms.doHttpRequest2(args).then(function (data) {
        callback(data);
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
    QForms.doHttpRequest2(args).then(function (data) {

    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.saveController = function(text) {
    var self = this;
    var args = {
        controller: 'Application',
        action    : 'saveController',
        params    : {
            app : self.data['@attributes'].name,
            text: text
        }
    };
    QForms.doHttpRequest2(args).then(function (data) {

    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.createView = function(callback) {
    var self = this;
    var args = {
        controller: 'Application',
        action    : 'createView',
        params    : {
            app: self.data['@attributes'].name
        }
    };
    QForms.doHttpRequest2(args).then(function (data) {
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.createController = function(callback) {
    var self = this;
    var args = {
        controller: 'Application',
        action    : 'createController',
        params    : {
            app: self.data['@attributes'].name
        }
    };
    QForms.doHttpRequest2(args).then(function (data) {
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.newDataSource = function(params, callback) {
    var self = this;
    var args = {
        controller: 'DataSource',
        action    : '_new',
        params    : params
    };
    QForms.doHttpRequest2(args).then(function (data) {
        if (callback) {
            callback(data);
        }
    });
};
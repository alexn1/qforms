'use strict';

var fs = require('fs');

var helper                = require('../common/helper');
var ApplicationController = require('../viewer/ModelController/ApplicationController/ApplicationController');

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('test01', function() {
    var application;
    var key;
    before(function(done) {
        ApplicationController.create('../../apps/demo/application1.json', function(_application) {
            _application.init(function() {
                application = _application;
                done();
            });
        });
    });
    it('insert row with RowForm', function(done) {
        var context = application.createContext({
            row: {
                first_name: 'test a',
                last_name : 'test b'
            }
        });
        application.getPage(context, 'employee', function(page) {
            page.forms.employee.dataSources.default.insert(context, function(_key) {
                key = _key;
                console.log('key: ', JSON.stringify(_key));
                done();
            });
        });
    });
    it('delete row with RowForm', function(done) {
        var context = application.createContext({
            row: {
                id: JSON.parse(key)[0]
            }
        });
        application.getPage(context, 'employee', function(page) {
            page.forms.employee.dataSources.default.delete(context, function() {
                done();
            });
        });
    });
});
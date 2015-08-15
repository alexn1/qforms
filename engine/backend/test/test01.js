'use strict';

var fs = require('fs');

var helper                = require('../common/helper');
var ApplicationController = require('../viewer/ModelController/ApplicationController/ApplicationController');

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('test01', function() {
    it('insert row with RowForm', function(done) {
        ApplicationController.create('../../apps/demo/application1.json', function(application) {
            application.init(function() {
                var context = application.createContext({
                    row: {
                        first_name: 'test a',
                        last_name : 'test b'
                    }
                });
                application.getPage(context, 'employee', function(page) {
                    page.forms.employee.dataSources.default.insert(context, function(key) {
                        console.log(key);
                        done();
                    });
                });
            });
        });
    });
});
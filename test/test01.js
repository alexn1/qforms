'use strict';

var path   = require('path');
var should = require('should');

var pkg    = require('../package.json');
var qforms = require(path.join('../build', pkg.version, 'lib/qforms'));

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('test01', function() {
    var application;
    var key;
    before(function(done) {
        qforms.ApplicationController.create('apps/demo/application1.json', function(_application) {
            _application.init(function() {
                application = _application;
                done();
            });
        });
    });
    after(function(done) {
        application.deinit(done);
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
                var row = page.forms.employee.dataSources.default.getKeyValues(_key);
                application.databases.default.query(context, 'select * from employee where id = {id}', row, function(rows) {
                    should.exist(rows[0]);
                    rows[0].should.be.type('object').and.have.properties({
                        first_name: 'test a',
                        last_name : 'test b'
                    });
                });
                done();
            });
        });
    });
    it('delete row with RowForm', function(done) {
        var context = application.createContext();
        application.getPage(context, 'employee', function(page) {
            context.row = page.forms.employee.dataSources.default.getKeyValues(key);
            page.forms.employee.dataSources.default.delete(context, function() {
                application.databases.default.query(context, 'select * from employee where id = {id}', context.row, function(rows) {
                    should.not.exist(rows[0]);
                    done();
                });
            });
        });
    });
});
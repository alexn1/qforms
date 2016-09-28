'use strict';

var path   = require('path');
var should = require('should');

var qforms = require(path.join('../build', 'lib/qforms'));

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('test01', function() {
    var application;
    var key;
    before(function(done) {
        qforms.Application.create2('apps/demo/Application1.json').then(function (_application) {
            return _application.init2().then(function () {
                application = _application;
                done();
            });
        });
    });
    after(function(done) {
        application.deinit2().then(function () {
            done();
        });
    });
    it('insert row with RowForm', function(done) {
        var context = qforms.Application.createContext({
            row: {
                first_name: 'test a',
                last_name : 'test b'
            }
        });
        application.getPage2(context, 'Employee').then(function(page) {
            return page.forms.Employee.dataSources.default.insert2(context).then(function(_key) {
                key = _key;
                var row = page.forms.Employee.dataSources.default.getKeyValues(_key);
                return application.databases.default.query2(context, 'select * from employee where id = {id}', row).then(function (rows) {
                    should.exist(rows[0]);
                    rows[0].should.be.type('object').and.have.properties({
                        first_name: 'test a',
                        last_name : 'test b'
                    });
                    done();
                });
            });
        });
    });
    it('delete row with RowForm', function(done) {
        var context = qforms.Application.createContext();
        application.getPage2(context, 'Employee').then(function (page) {
            context.row = page.forms.Employee.dataSources.default.getKeyValues(key);
            return page.forms.Employee.dataSources.default.delete2(context).then(function () {
                return application.databases.default.query2(context, 'select * from employee where id = {id}', context.row).then(function(rows) {
                    should.not.exist(rows[0]);
                    done();
                });
            });
        });
    });
});
'use strict';

var path   = require('path');
var del    = require('del');

var pkg    = require('../engine/package.json');
var qforms = require(path.join('../build', pkg.version));


////////////////////////////////////////////////////////////////////////////////////////////////////
describe('test02', function() {
    var appFileDir  = 'app/test';
    var appFilePath = 'app/test/application1.json';
    before(function(done) {
        del('app/test', done);
    });
    after(function(done) {
        del('app/test', done);
    });
    it('create new application', function(done) {
        qforms.helper.createDirIfNotExists2(appFileDir).then(function() {
            return qforms.ApplicationEditor.createAppFile2(appFilePath, {name: 'application1'});
        }).then(function(appFile) {
            var appEditor = new qforms.ApplicationEditor(appFile);
            return appEditor.createPage2({name: 'page1', startup: 'true'});
        }).then(function(pageEditor) {
            pageEditor.createForm({name: 'form1', class: 'TableForm'}, function(formEditor) {
                done();
            });
        });
    });
});
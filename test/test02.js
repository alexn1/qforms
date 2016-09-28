'use strict';

var path   = require('path');
var del    = require('del');

var qforms = require(path.join('../build', 'lib/qforms'));

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('test02', function() {
    var appFileDir  = 'apps/test';
    var appFilePath = 'apps/test/application1.json';
    before(function(done) {
        del('apps/test', done);
    });
    it('create new application', function(done) {
        qforms.helper.createDirIfNotExists2(appFileDir).then(function() {
            return qforms.ApplicationEditor.createAppFile2(appFilePath, {name: 'Application1'});
        }).then(function(appFile) {
            var appEditor = new qforms.ApplicationEditor(appFile);
            return appEditor.createPage2({name: 'Page1', startup: 'true'});
        }).then(function(pageEditor) {
            pageEditor.createForm2({name: 'Form1', class: 'TableForm'});
        }).then(function (formEditor) {
            done();
        });
    });
});
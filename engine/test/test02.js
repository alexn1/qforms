'use strict';

var qforms = require('../backend/qforms');

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('test02', function() {
    var appFileDir  = '../app/test';
    var appFilePath = '../app/test/application1.json';
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
'use strict';

var helper            = require('../backend/common/helper');
var ApplicationEditor = require('../backend/editor/Editor/ApplicationEditor/ApplicationEditor');

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('test02', function() {
    var appFileDir  = '../app/test';
    var appFilePath = '../app/test/application1.json';
    it('create new application', function(done) {
        helper.createDirIfNotExists2(appFileDir).then(function() {
            return ApplicationEditor.createAppFile2(appFilePath, {name: 'application1'});
        }).then(function(appFile) {
            var appEditor = new ApplicationEditor(appFile);
            return appEditor.createPage2({name: 'page1', startup: 'true'});
        }).then(function(pageEditor) {
            pageEditor.createForm({name: 'form1', class: 'TableForm'}, function(formEditor) {
                done();
            });
        });
    });
});
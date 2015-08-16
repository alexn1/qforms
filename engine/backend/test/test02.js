'use strict';

var helper            = require('../common/helper');
var ApplicationEditor = require('../editor/Editor/ApplicationEditor/ApplicationEditor');

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('test02', function() {
    var appFileDir  = '../../apps/test';
    var appFilePath = '../../apps/test/application1.json';
    it('create new application', function(done) {
        helper.createDirIfNotExists(appFileDir, function() {
            ApplicationEditor.createAppFile(appFilePath, {name: 'application1'}, function(appFile) {
                var appEditor = new ApplicationEditor(appFile);
                appEditor.createPage({name: 'page1', startup: 'true'}, function(pageEditor) {
                    pageEditor.createForm({name: 'form1', class: 'TableForm'}, function(formEditor) {
                        done();
                    });
                });
            });
        });
    });
});
'use strict';

QForms.inherits(VisualController, DocumentController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function VisualController(model) {
    var self = this;
    DocumentController.call(self, model);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.createTab = function(docs) {
    var self = this;
    var name = self.model.getFullName('_');
    var caption = self.model.getFullName('/');
    // get from server all needed to display edit window
    self.model.getView('VisualView.html').then(function (result) {
        self.$view          = $(result.view);
        self.$view.attr('id', name);
        self.data           = result.data;
        self.cmTemplateHtml = null;
        self.cmTemplateCss  = null;
        self.cmTemplateJs   = null;
        self.save           = 'ejs';
        // document tab
        var tab = docs.createTab(self.$view.get(0), caption, function(tab) {tab.ctrl.tab = undefined;});
        tab.ctrl = self;
        docs.selectTab(tab);
        self.tab = tab;
        // view/code tab
        self.$view.children('.TabWidget').attr('id', '{name}_TabWidget'.replace('{name}', name));
        self.tabWidget = new TabWidget(self.$view.children('.TabWidget').get(0));
        self.tabWidget.init();
        self.tabWidget.on('tabShow', self.listeners.tabShow = self.tabWidget_TabShow.bind(self));

        // custom view
        if (self.data.ejs) {
            self.showCustomView();
        } else {
            self.$view.find('.btnCreateView').click(function() {
                self.btnCreateView_Click();
            });
            self.$view.find('.btnSaveView').css('display', 'none');
        }

        // custom controller
        if (self.data.js) {
            self.showCustomController();
        } else {
            self.$view.find('.btnCreateController').click(function() {
                self.btnCreateController_Click();
            });
            self.$view.find('.btnSaveController').css('display', 'none');
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.tabWidget_TabShow = function(ea) {
    var self = this;
    if ($(ea.tab).hasClass('tabController')) {
        if (self.data.js) {
            if (self.cmTemplateJs === null) {
                self.initCmTemplateJs();
            }
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.showCustomController = function() {
    var self = this;
    self.$view.find('.wndJs').css('display', 'block');
    if ($(self.tabWidget.activeTab).hasClass('tabController')) {
        self.initCmTemplateJs();
    }
    self.$view.find('.btnSaveController').click(function() {self.btnSaveController_Click();});
    self.$view.find('.btnCreateController').css('display', 'none');
    self.$view.find('.btnSaveController').css('display', 'inline-block');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.showCustomView = function() {
    var self = this;
    self.$view.find('.wndHtml').css('display', 'block');
    self.initCmTemplateHtml();
    self.$view.find('.btnSaveView').click(function() {self.btnSaveView_Click();});
    self.$view.find('.btnHtml').click(function() {self.btnHtml_Click();});
    self.$view.find('.btnCss').click(function() {self.btnCss_Click();});
    self.$view.find('.btnCreateView').css('display', 'none');
    self.$view.find('.btnSaveView').css('display', 'inline-block');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.initCmTemplateHtml = function() {
    var self = this;
    self.cmTemplateHtml = CodeMirror.fromTextArea(self.$view.find('.cmHtmlView').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
    self.cmTemplateHtml.setOption('theme', 'cobalt');
    self.cmTemplateHtml.setValue(self.data.ejs);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.initCmTemplateCss = function() {
    var self = this;
    self.cmTemplateCss = CodeMirror.fromTextArea(self.$view.find('.cmCssView').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
    self.cmTemplateCss.setOption('theme', 'cobalt');
    self.cmTemplateCss.setValue(self.data.css);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.initCmTemplateJs = function() {
    var self = this;
    self.cmTemplateJs = CodeMirror.fromTextArea(self.$view.find('.cmJsCode').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
    self.cmTemplateJs.setOption('theme', 'cobalt');
    self.cmTemplateJs.setValue(self.data.js);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.btnSaveView_Click = function() {
    var self = this;
    var text;
    switch (self.save) {
        case 'ejs':
            text = self.cmTemplateHtml.getValue();
            break;
        case 'css':
            text = self.cmTemplateCss.getValue();
            break;
    }
    self.model.saveView(text, self.save);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.btnSaveController_Click = function() {
    var self = this;
    var text  = self.cmTemplateJs.getValue();
    self.model.saveController(text);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.btnHtml_Click = function() {
    var self = this;
    self.$view.find('.wndHtml').css('display', 'block');
    self.$view.find('.wndCss').css('display', 'none');
    self.$view.find('.btnHtml').removeClass('btn-default');
    self.$view.find('.btnHtml').addClass('btn-primary');
    self.$view.find('.btnCss').removeClass('btn-primary');
    self.$view.find('.btnCss').addClass('btn-default');
    self.save = 'ejs';
};

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.btnCss_Click = function() {
    var self = this;
    self.$view.find('.wndCss').css('display', 'block');
    self.$view.find('.wndHtml').css('display', 'none');
    if (self.cmTemplateCss === null) {
        self.initCmTemplateCss();
    }
    self.$view.find('.btnCss').removeClass('btn-default');
    self.$view.find('.btnCss').addClass('btn-primary');
    self.$view.find('.btnHtml').removeClass('btn-primary');
    self.$view.find('.btnHtml').addClass('btn-default');
    self.save = 'css';
};

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.btnCreateView_Click = function() {
    var self = this;
    self.model.createView().then(function (data) {
        self.data.ejs = data.ejs;
        self.data.css = data.css;
        self.showCustomView();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.btnCreateController_Click = function() {
    var self = this;
    self.model.createController().then(function (data) {
        self.data.js = data.js;
        self.showCustomController();
    });
};
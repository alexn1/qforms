"use strict"

QForms.inherit(VisualController,DocumentController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function VisualController(model) {
    DocumentController.call(this,model);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.createTab = function(docs) {
    var name = this.model.getFullName('_');
    var caption = this.model.getFullName('/');
    var self = this;
    // берём с сервера всё необходимое для отображаения окна редактирования
    this.model.getView('VisualView.html', function(result) {
        self.$view          = $(result.view);
        self.$view.attr("id",name);
        self.data           = result.data;
        self.cmTemplateHtml = null;
        self.cmTemplateCss  = null;
        self.cmTemplateJs   = null;
        self.save           = "ejs";
        // document tab
        var tab = docs.createTab(self.$view.get(0), caption, function(tab) {tab.ctrl.tab = undefined;});
        tab.ctrl = self;
        docs.selectTab(tab);
        self.tab = tab;
        // view/code tab
        self.$view.children(".TabWidget").attr("id","{name}_TabWidget".replace("{name}",name));
        self.tabWidget = new TabWidget(self.$view.children(".TabWidget").get(0))
        self.tabWidget.init();
        self.tabWidget.eventTabShow.subscribe(self,"tabWidget_TabShow");

        // custom view
        if (self.data.ejs) {
            self.showCustomView();
        } else {
            self.$view.find(".btnCreateView").click(function() {
                self.btnCreateView_Click();
            });
            self.$view.find(".btnSaveView").css("display","none");
        }

        // custom controller
        if (self.data.js) {
            self.showCustomController();
        } else {
            self.$view.find(".btnCreateController").click(function() {
                self.btnCreateController_Click();
            });
            self.$view.find(".btnSaveController").css("display","none");
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.tabWidget_TabShow = function(ea) {
    var self = this;
    if ($(ea.tab).hasClass("tabController")) {
        if (self.data.js) {
            if (this.cmTemplateJs === null) {
                this.initCmTemplateJs();
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.showCustomController = function() {
    var self = this;
    self.$view.find(".wndJs").css("display","block");
    if ($(this.tabWidget.activeTab).hasClass("tabController")) {
        this.initCmTemplateJs();
    }
    this.$view.find(".btnSaveController").click(function() {self.btnSaveController_Click();});
    this.$view.find(".btnCreateController").css("display","none");
    this.$view.find(".btnSaveController").css("display","inline-block");
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.showCustomView = function() {
    var self = this;
    this.$view.find(".wndHtml").css("display","block");
    this.initCmTemplateHtml();
    this.$view.find(".btnSaveView").click(function() {self.btnSaveView_Click();});
    this.$view.find(".btnHtml").click(function() {self.btnHtml_Click();});
    this.$view.find(".btnCss").click(function() {self.btnCss_Click();});
    this.$view.find(".btnCreateView").css("display","none");
    this.$view.find(".btnSaveView").css("display","inline-block");
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.initCmTemplateHtml = function() {
    this.cmTemplateHtml = CodeMirror.fromTextArea(this.$view.find(".cmHtmlView").get(0), {lineNumbers: true,styleActiveLine: true,matchBrackets: true});
    this.cmTemplateHtml.setOption("theme", "cobalt");
    this.cmTemplateHtml.setValue(this.data.ejs);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.initCmTemplateCss = function() {
    this.cmTemplateCss = CodeMirror.fromTextArea(this.$view.find(".cmCssView").get(0), {lineNumbers: true,styleActiveLine: true,matchBrackets: true});
    this.cmTemplateCss.setOption("theme", "cobalt");
    this.cmTemplateCss.setValue(this.data.css);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.initCmTemplateJs = function() {
    this.cmTemplateJs = CodeMirror.fromTextArea(this.$view.find(".cmJsCode").get(0), {lineNumbers: true,styleActiveLine: true,matchBrackets: true});
    this.cmTemplateJs.setOption("theme", "cobalt");
    this.cmTemplateJs.setValue(this.data.js);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.btnSaveView_Click = function() {
    var text;
    switch (this.save) {
        case "ejs":
            text = this.cmTemplateHtml.getValue();
            break;
        case "css":
            text = this.cmTemplateCss.getValue();
            break;
    }
    this.model.saveView(text,this.save);
}


////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.btnSaveController_Click = function() {
    var text  = this.cmTemplateJs.getValue();
    this.model.saveController(text);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.btnHtml_Click = function() {
    this.$view.find(".wndHtml").css("display","block");
    this.$view.find(".wndCss").css("display","none");
    this.$view.find(".btnHtml").removeClass("btn-default");
    this.$view.find(".btnHtml").addClass("btn-primary");
    this.$view.find(".btnCss").removeClass("btn-primary");
    this.$view.find(".btnCss").addClass("btn-default");
    this.save = "ejs";
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.btnCss_Click = function() {
    this.$view.find(".wndCss").css("display","block");
    this.$view.find(".wndHtml").css("display","none");
    if (this.cmTemplateCss === null) {
        this.initCmTemplateCss();
    }
    this.$view.find(".btnCss").removeClass("btn-default");
    this.$view.find(".btnCss").addClass("btn-primary");
    this.$view.find(".btnHtml").removeClass("btn-primary");
    this.$view.find(".btnHtml").addClass("btn-default");
    this.save = "css";
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.btnCreateView_Click = function() {
    var self = this;
    this.model.createView(function(data) {
        self.data.ejs = data.ejs;
        self.data.css = data.css;
        self.showCustomView();
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
VisualController.prototype.btnCreateController_Click = function() {
    var self = this;
    this.model.createController(function(data) {
        self.data.js = data.js;
        self.showCustomController();
    });
}
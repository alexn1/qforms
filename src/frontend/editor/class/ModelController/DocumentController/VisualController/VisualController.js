class VisualController extends DocumentController {

    /*constructor(model) {
        super(model);
    }*/

    async createTab(docs) {
        const self = this;
        const name = self.model.getFullName('_');
        const caption = self.model.getFullName('/');
        // get from server all needed to display edit window
        const result = await self.model.getView('VisualView.html');
        self.$view          = $(result.view);
        self.$view.attr('id', name);
        self.data           = result.data;
        self.cmTemplateHtml = null;
        self.cmTemplateCss  = null;
        self.cmTemplateJs   = null;
        self.save           = 'ejs';
        // document tab
        const tab = docs.createTab(self.$view.get(0), caption, function(tab) {tab.ctrl.tab = undefined;});
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
    }

    tabWidget_TabShow(ea) {
        if ($(ea.tab).hasClass('tabController')) {
            if (this.data.js) {
                if (this.cmTemplateJs === null) {
                    this.initCmTemplateJs();
                }
            }
        }
    }

    showCustomController() {
        const self = this;
        this.$view.find('.wndJs').css('display', 'block');
        if ($(this.tabWidget.activeTab).hasClass('tabController')) {
            this.initCmTemplateJs();
        }
        this.$view.find('.btnSaveController').click(function() {self.btnSaveController_Click();});
        this.$view.find('.btnCreateController').css('display', 'none');
        this.$view.find('.btnSaveController').css('display', 'inline-block');
    }

    showCustomView() {
        const self = this;
        this.$view.find('.wndHtml').css('display', 'block');
        this.initCmTemplateHtml();
        this.$view.find('.btnSaveView').click(function() {self.btnSaveView_Click();});
        this.$view.find('.btnHtml').click(function() {self.btnHtml_Click();});
        this.$view.find('.btnCss').click(function() {self.btnCss_Click();});
        this.$view.find('.btnCreateView').css('display', 'none');
        this.$view.find('.btnSaveView').css('display', 'inline-block');
    }

    initCmTemplateHtml() {
        this.cmTemplateHtml = CodeMirror.fromTextArea(this.$view.find('.cmHtmlView').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        this.cmTemplateHtml.setOption('theme', 'cobalt');
        this.cmTemplateHtml.setValue(this.data.ejs);
    }

    initCmTemplateCss() {
        this.cmTemplateCss = CodeMirror.fromTextArea(this.$view.find('.cmCssView').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        this.cmTemplateCss.setOption('theme', 'cobalt');
        this.cmTemplateCss.setValue(this.data.css);
    }

    initCmTemplateJs() {
        this.cmTemplateJs = CodeMirror.fromTextArea(this.$view.find('.cmJsCode').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        this.cmTemplateJs.setOption('theme', 'cobalt');
        this.cmTemplateJs.setValue(this.data.js);
    }

    btnSaveView_Click() {
        let text;
        switch (this.save) {
            case 'ejs':
                text = this.cmTemplateHtml.getValue();
                break;
            case 'css':
                text = this.cmTemplateCss.getValue();
                break;
        }
        this.model.saveView(text, this.save);
    }

    btnSaveController_Click() {
        const text  = this.cmTemplateJs.getValue();
        this.model.saveController(text);
    }

    btnHtml_Click() {
        this.$view.find('.wndHtml').css('display', 'block');
        this.$view.find('.wndCss').css('display', 'none');
        this.$view.find('.btnHtml').removeClass('btn-default');
        this.$view.find('.btnHtml').addClass('btn-primary');
        this.$view.find('.btnCss').removeClass('btn-primary');
        this.$view.find('.btnCss').addClass('btn-default');
        this.save = 'ejs';
    }

    btnCss_Click() {
        this.$view.find('.wndCss').css('display', 'block');
        this.$view.find('.wndHtml').css('display', 'none');
        if (this.cmTemplateCss === null) {
            this.initCmTemplateCss();
        }
        this.$view.find('.btnCss').removeClass('btn-default');
        this.$view.find('.btnCss').addClass('btn-primary');
        this.$view.find('.btnHtml').removeClass('btn-primary');
        this.$view.find('.btnHtml').addClass('btn-default');
        this.save = 'css';
    }

    async btnCreateView_Click() {
        const data = await this.model.createView();
        this.data.ejs = data.ejs;
        this.data.css = data.css;
        this.showCustomView();
    }

    async btnCreateController_Click() {
        const data = await this.model.createController();
        this.data.js = data.js;
        this.showCustomController();
    }

}

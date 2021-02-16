class VisualController extends DocumentController {

    constructor(model, parent) {
        super(model, parent);
        this.data = null;
        // this.$view = null;
        /*this.cmTemplateHtml = null;
        this.cmTemplateCss  = null;
        this.cmTemplateJs   = null;*/
        // this.save = null;
        // this.tabWidget = null;
        this.cm = null;
    }

    /*async createTab(docs) {
        const name = this.model.getFullName('_');
        const caption = this.model.getFullName('/');

        // get from server all needed to display an edit window
        const result = await this.model.getView('VisualView.html');
        this.$view          = $(result.view);
        this.$view.attr('id', name);
        this.data           = result.data;
        this.cmTemplateHtml = null;
        this.cmTemplateCss  = null;
        this.cmTemplateJs   = null;
        this.save           = 'ejs';

        // document tab
        const tab = docs.createTab(this.$view.get(0), caption, (tab) => {tab.ctrl.tab = undefined;});
        tab.ctrl = this;
        docs.selectTab(tab);
        this.tab = tab;

        // view/code tab
        this.$view.children('.TabWidget').attr('id', '{name}_TabWidget'.replace('{name}', name));
        this.tabWidget = new TabWidget(this.$view.children('.TabWidget').get(0));
        this.tabWidget.init();
        this.tabWidget.on('tabShow', this.listeners.tabShow = this.tabWidget_TabShow.bind(this));

        // custom view
        if (this.data.ejs) {
            this.showCustomView();
        } else {
            this.$view.find('.btnCreateView').click(() => {
                this.btnCreateView_Click();
            });
            this.$view.find('.btnSaveView').css('display', 'none');
        }

        // custom controller
        if (this.data.js) {
            this.showCustomController();
        } else {
            this.$view.find('.btnCreateController').click(() => {
                this.btnCreateController_Click();
            });
            this.$view.find('.btnSaveController').css('display', 'none');
        }
    }*/

    /*tabWidget_TabShow(ea) {
        if ($(ea.tab).hasClass('tabController')) {
            if (this.data.js) {
                if (this.cmTemplateJs === null) {
                    this.initCmTemplateJs();
                }
            }
        }
    }*/

    /*showCustomController() {
        this.$view.find('.wndJs').css('display', 'block');
        if ($(this.tabWidget.activeTab).hasClass('tabController')) {
            this.initCmTemplateJs();
        }
        this.$view.find('.btnSaveController').click(() => {this.btnSaveController_Click();});
        this.$view.find('.btnCreateController').css('display', 'none');
        this.$view.find('.btnSaveController').css('display', 'inline-block');
    }*/

    /*showCustomView() {
        this.$view.find('.wndHtml').css('display', 'block');
        this.initCmTemplateHtml();
        this.$view.find('.btnSaveView').click(() => {this.btnSaveView_Click();});
        this.$view.find('.btnHtml').click(() => {this.btnHtml_Click();});
        this.$view.find('.btnCss').click(() => {this.btnCss_Click();});
        this.$view.find('.btnCreateView').css('display', 'none');
        this.$view.find('.btnSaveView').css('display', 'inline-block');
    }*/

    /*initCmTemplateHtml() {
        this.cmTemplateHtml = CodeMirror.fromTextArea(this.$view.find('.cmHtmlView').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        this.cmTemplateHtml.setOption('theme', 'cobalt');
        this.cmTemplateHtml.setValue(this.data.ejs);
    }*/

    /*initCmTemplateCss() {
        this.cmTemplateCss = CodeMirror.fromTextArea(this.$view.find('.cmCssView').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        this.cmTemplateCss.setOption('theme', 'cobalt');
        this.cmTemplateCss.setValue(this.data.css);
    }*/

    /*initCmTemplateJs() {
        this.cmTemplateJs = CodeMirror.fromTextArea(this.$view.find('.cmJsCode').get(0), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        this.cmTemplateJs.setOption('theme', 'cobalt');
        this.cmTemplateJs.setValue(this.data.js);
    }*/

    /*btnSaveView_Click() {
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
    }*/

    /*btnSaveController_Click() {
        const text  = this.cmTemplateJs.getValue();
        this.model.saveController(text);
    }*/

    /*btnHtml_Click() {
        this.$view.find('.wndHtml').css('display', 'block');
        this.$view.find('.wndCss').css('display', 'none');
        this.$view.find('.btnHtml').removeClass('btn-default');
        this.$view.find('.btnHtml').addClass('btn-primary');
        this.$view.find('.btnCss').removeClass('btn-primary');
        this.$view.find('.btnCss').addClass('btn-default');
        this.save = 'ejs';
    }*/

    /*btnCss_Click() {
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
    }*/

    /*async btnCreateView_Click() {
        const data = await this.model.createView();
        this.data.ejs = data.ejs;
        this.data.css = data.css;
        this.showCustomView();
    }*/

    /*async btnCreateController_Click() {
        const data = await this.model.createController();
        this.data.js = data.js;
        this.showCustomController();
    }*/

    async createDocument() {
        console.log('VisualController.createDocument');
        const document = await super.createDocument();
        const result = await this.model.getView('VisualView.html');
        this.data = result.data;
        return document;
    }
    onCMCreate(cm) {
        this.cm = cm;
    }
    onControllerSave = async e => {
        console.log('ApplicationController.onControllerSave'/*, this.cm.getValue()*/);
        this.model.saveController(this.cm.getValue());
    }
    onCreateCustomController = async e => {
        console.log('ApplicationController.onCreateCustomController');
        const data = await this.model.createController();
        this.data.js = data.js;
        this.document.view.rerender();
    }

}

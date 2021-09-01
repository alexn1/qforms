class PageEditor extends Editor {

    constructor(data, pageLink) {
        super(data);
        this.pageLink    = pageLink;
        this.dataSources = [];
        this.actions     = [];
        this.forms       = [];
    }

    init() {
        // data sources
        for (const data of this.data.dataSources) {
            this.createDataSource(data);
        }

        // actions
        for (const data of this.data.actions) {
            this.createAction(data);
        }

        // forms
        for (const data of this.data.forms) {
            this.createForm(data);
        }
    }
    createForm(data) {
        const form = new FormEditor(data, this);
        form.init();
        this.forms.push(form);
        return form;
    }
    removeForm(form) {
        console.log('Page.removeForm', form.getName());
        const i = this.forms.indexOf(form);
        if (i === -1) throw new Error('no such form');
        this.forms.splice(i, 1);
    }
    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'save',
            params    : {
                fileName: this.pageLink.getFileName(),
                attr    : name,
                value   : value
            }
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'delete',
            params    : {
                page: this.getName()
            }
        });
    }

    async delete() {
        console.log('PageEditor.delete', this.getName());
        await this.deleteData();
        this.pageLink.remove();
    }

    async newForm(params) {
        params['pageFileName'] = this.pageLink.getFileName();
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Form',
            action    : '_new',
            params    : params
        });
        return this.createForm(data);
    }

    async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'getView',
            params    : {
                view: view,
                page: this.data !== undefined ? this.getName() : null
            }
        });
    }

    async saveView(text, view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'saveView',
            params    : {
                page: this.getName(),
                view: view,
                text: text
            }
        });
    }

    async saveController(text) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'saveController',
            params    : {
                page: this.getName(),
                text: text
            }
        });
    }

    async createView() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'createView',
            params    : {
                page: this.getName()
            }
        });
    }

    async createController() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'createController',
            params    : {
                page: this.getName()
            }
        });
    }

    async createModelBackJs() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'createModelBackJs',
            params    : {
                page: this.getName()
            }
        });
    }

    async newAction(params) {
        params['pageFileName'] = this.pageLink.getFileName();
        // params['form']         = this.getName();
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Action',
            action    : '_new',
            params    : params
        });
        return this.createAction(data);
    }

}

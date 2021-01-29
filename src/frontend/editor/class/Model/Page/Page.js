class Page extends Model {

    constructor(data, parent, pageLink) {
        super(data);
        this.parent      = parent;
        this.pageLink    = pageLink;
        this.application = parent;
        this.dataSources = [];
        this.forms       = [];
    }

    init() {
        // data sources
        for (const name in this.data.dataSources) {
            this.createDataSource(this.data.dataSources[name]);
        }

        // forms
        for (const name in this.data.forms) {
            this.createForm(this.data.forms[name]);
        }
    }

    createDataSource(data) {
        const dataSource = new DataSource(data, this);
        dataSource.init();
        this.dataSources.push(dataSource);
    }

    createForm(data) {
        const form = new Form(data, this);
        form.init();
        this.forms.push(form);
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'save',
            params    : Helper.encodeObject({
                fileName: this.pageLink.data['@attributes'].fileName,
                attr    : name,
                value   : value
            })
        });
        this.data['@attributes'][name] = value;
        return data;
    }

    async delete() {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'delete',
            params    : Helper.encodeObject({
                page: this.data['@attributes'].name
            })
        });
    }

    async newForm(params) {
        params['pageFileName'] = this.pageLink.data['@attributes'].fileName;
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
    }

    async getView(view) {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view,
                page: this.data !== undefined ? this.data['@attributes'].name : null
            })
        });
    }

    async saveView(text, view) {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'saveView',
            params    : Helper.encodeObject({
                page: this.data['@attributes'].name,
                view: view,
                text: text
            })
        });
    }

    async saveController(text) {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'saveController',
            params    : Helper.encodeObject({
                page: this.data['@attributes'].name,
                text: text
            })
        });
    }

    async createView() {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'createView',
            params    : Helper.encodeObject({
                page: this.data['@attributes'].name
            })
        });
    }

    async createController() {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'createController',
            params    : Helper.encodeObject({
                page: this.data['@attributes'].name
            })
        });
    }

}

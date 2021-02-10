class Page extends Model {

    constructor(data, pageLink) {
        super(data);
        this.pageLink    = pageLink;
        // this.application = parent;
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
        return dataSource;
    }

    createForm(data) {
        const form = new Form(data, this);
        form.init();
        this.forms.push(form);
        return form;
    }
    removeDataSource(dataSource) {
        console.log('Page.removeDataSource', dataSource.getName());
        const i = this.dataSources.indexOf(dataSource);
        if (i === -1) throw new Error('no such dataSource');
        this.dataSources.splice(i, 1);
    }
    removeForm(form) {
        console.log('Page.removeForm', form.getName());
        const i = this.forms.indexOf(form);
        if (i === -1) throw new Error('no such form');
        this.forms.splice(i, 1);
    }
    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'save',
            params    : Helper.encodeObject({
                fileName: this.pageLink.getFileName(),
                attr    : name,
                value   : value
            })
        });
        this.data['@attributes'][name] = value;
        return data;
    }

    async deleteData() {
        await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'delete',
            params    : Helper.encodeObject({
                page: this.getName()
            })
        });
    }

    async delete() {
        console.log('Page.delete', this.getName());
        await this.deleteData();
        this.pageLink.remove();
    }

    async newForm(params) {
        params['pageFileName'] = this.pageLink.getFileName();
        const data = await QForms.doHttpRequest({
            controller: 'Form',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
        return this.createForm(data);
    }

    async getView(view) {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view,
                page: this.data !== undefined ? this.getName() : null
            })
        });
    }

    async saveView(text, view) {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'saveView',
            params    : Helper.encodeObject({
                page: this.getName(),
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
                page: this.getName(),
                text: text
            })
        });
    }

    async createView() {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'createView',
            params    : Helper.encodeObject({
                page: this.getName()
            })
        });
    }

    async createController() {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'createController',
            params    : Helper.encodeObject({
                page: this.getName()
            })
        });
    }

}

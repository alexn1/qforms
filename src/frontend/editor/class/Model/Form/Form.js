class Form extends Model {

    constructor(data, page) {
        super(data);
        this.parent = page;
        this.page   = page;
        this.dataSources = [];
        this.fields      = [];
        this.actions     = {};
    }

    init() {
        // dataSources
        for (const name in this.data.dataSources) {
            this.createDataSource(this.data.dataSources[name]);
        }

        // fields
        for (const name in this.data.fields) {
            this.createField(this.data.fields[name]);
        }

        // actions
        for (const name in this.data.actions) {
            this.createAction(this.data.actions[name], name);
        }
    }

    createDataSource(data) {
        const dataSource = new DataSource(data, this);
        dataSource.init();
        this.dataSources.push(dataSource);
    }
    createField(data) {
        const field = new Field(data, this);
        field.init();
        this.fields.push(field);
    }
    createAction(data, name) {
        const action = new Action(data, this);
        action.init();
        this.actions[name] = action;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'save',
            params    : Helper.encodeObject({
                pageFileName: this.page.pageLink.data['@attributes'].fileName,
                form        : this.data['@attributes'].name,
                attr        : name,
                value       : value
            })
        });
        this.data['@attributes'][name] = value;
        return data;
    }

    async delete() {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'delete',
            params    : Helper.encodeObject({
                pageFileName: this.page.pageLink.data['@attributes'].fileName,
                form        : this.data['@attributes'].name
            })
        });
    }

    moveUp() {
        const args = {
            controller: 'Form',
            action    : 'moveUp',
            params    : Helper.encodeObject({
                pageFileName: this.page.pageLink.data['@attributes'].fileName,
                form        : this.data['@attributes'].name
            })
        };
        return QForms.doHttpRequest(args);
    }

    moveDown() {
        const args = {
            controller: 'Form',
            action    : 'moveDown',
            params    : Helper.encodeObject({
                pageFileName: this.page.pageLink.data['@attributes'].fileName,
                form        : this.data['@attributes'].name
            })
        };
        return QForms.doHttpRequest(args);
    }

    async newField(params) {
        params['pageFileName'] = this.page.pageLink.data['@attributes'].fileName;
        params['form']         = this.data['@attributes'].name;
        return await QForms.doHttpRequest({
            controller: 'Field',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
    }

    async newControl(params) {
        params['pageFileName'] = this.page.pageLink.data['@attributes'].fileName;
        params['form']         = this.data['@attributes'].name;
        return await QForms.doHttpRequest({
            controller: 'Control',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
    }

    async newAction(params) {
        params['pageFileName'] = this.page.pageLink.getFileName();
        params['form']         = this.getName();
        return await QForms.doHttpRequest({
            controller: 'Action',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
    }

    async newDataSource(params) {
        params['page']  = this.page.pageLink.data['@attributes'].fileName;
        params['form']  = this.data['@attributes'].name;
        return await QForms.doHttpRequest({
            controller: 'DataSource',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
    }

    async getView(view) {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'getView',
            params    : Helper.encodeObject({
                view: view,
                page: this.data !== undefined ? this.page.data['@attributes'].name : null,
                form: this.data !== undefined ? this.data['@attributes'].name      : null
            })
        });
    }

    async saveView(text, view) {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'saveView',
            params    : Helper.encodeObject({
                page: this.page.data['@attributes'].name,
                form: this.data['@attributes'].name,
                view: view,
                text: text
            })
        });
    }

    async saveController(text) {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'saveController',
            params    : Helper.encodeObject({
                page: this.page.data['@attributes'].name,
                form: this.data['@attributes'].name,
                text: text
            })
        });
    }

    async createView() {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'createView',
            params    : Helper.encodeObject({
                page : this.page.data['@attributes'].name,
                form : this.data['@attributes'].name,
                class: this.data['@class']
            })
        });
    }

    async createController() {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'createController',
            params    : Helper.encodeObject({
                page : this.page.data['@attributes'].name,
                form : this.data['@attributes'].name,
                class: this.data['@class']
            })
        });
    }

}

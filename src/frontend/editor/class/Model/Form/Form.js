class Form extends Model {

    constructor(data, page) {
        super(data, page);
        this.page   = page;
        this.dataSources = [];
        this.fields      = [];
        this.actions     = [];
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
            this.createAction(this.data.actions[name]);
        }
    }

    createDataSource(data) {
        const dataSource = new DataSource(data, this);
        dataSource.init();
        this.dataSources.push(dataSource);
        return dataSource;
    }
    createField(data) {
        const field = new Field(data, this);
        field.init();
        this.fields.push(field);
        return field;
    }
    createAction(data) {
        const action = new Action(data, this);
        action.init();
        this.actions.push(action);
        return action;
    }
    removeDataSource(dataSource) {
        console.log('Form.removeDataSource', dataSource.getName());
        const i = this.dataSources.indexOf(dataSource);
        if (i === -1) throw new Error('no such dataSource');
        this.dataSources.splice(i, 1);
    }
    removeField(field) {
        console.log('Form.removeField', field.getName());
        const i = this.dataSources.indexOf(field);
        if (i === -1) throw new Error('no such field');
        this.dataSources.splice(i, 1);
    }
    removeAction(action) {
        console.log('Form.removeField', action.getName());
        const i = this.dataSources.indexOf(action);
        if (i === -1) throw new Error('no such action');
        this.dataSources.splice(i, 1);
    }
    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'save',
            params    : Helper.encodeObject({
                pageFileName: this.page.pageLink.getFileName(),
                form        : this.getName(),
                attr        : name,
                value       : value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'delete',
            params    : Helper.encodeObject({
                pageFileName: this.page.pageLink.getFileName(),
                form        : this.getName()
            })
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeForm(this);
    }
    moveUp() {
        const args = {
            controller: 'Form',
            action    : 'moveUp',
            params    : Helper.encodeObject({
                pageFileName: this.page.pageLink.getFileName(),
                form        : this.getName()
            })
        };
        return QForms.doHttpRequest(args);
    }

    moveDown() {
        const args = {
            controller: 'Form',
            action    : 'moveDown',
            params    : Helper.encodeObject({
                pageFileName: this.page.pageLink.getFileName(),
                form        : this.getName()
            })
        };
        return QForms.doHttpRequest(args);
    }

    async newField(params) {
        params['pageFileName'] = this.page.pageLink.getFileName();
        params['form']         = this.getName();
        return await QForms.doHttpRequest({
            controller: 'Field',
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
        params['page']  = this.page.pageLink.getFileName();
        params['form']  = this.getName();
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
                page: this.data !== undefined ? this.page.getName() : null,
                form: this.data !== undefined ? this.getName()      : null
            })
        });
    }

    async saveView(text, view) {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'saveView',
            params    : Helper.encodeObject({
                page: this.page.getName(),
                form: this.getName(),
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
                page: this.page.getName(),
                form: this.getName(),
                text: text
            })
        });
    }

    async createView() {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'createView',
            params    : Helper.encodeObject({
                page : this.page.getName(),
                form : this.getName(),
                class: this.getClassName()
            })
        });
    }

    async createController() {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'createController',
            params    : Helper.encodeObject({
                page : this.page.getName(),
                form : this.getName(),
                class: this.getClassName()
            })
        });
    }

}

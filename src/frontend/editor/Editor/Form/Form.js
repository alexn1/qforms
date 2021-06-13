class Form extends Editor {

    constructor(data, page) {
        super(data, page);
        this.page   = page;
        this.dataSources = [];
        this.fields      = [];
        this.actions     = [];
    }

    init() {
        // dataSources
        for (const data of this.data.dataSources) {
            this.createDataSource(data);
        }

        // actions
        for (const data of this.data.actions) {
            this.createAction(data);
        }

        // fields
        for (const data of this.data.fields) {
            this.createField(data);
        }
    }
    createField(data) {
        const field = new Field(data, this);
        field.init();
        this.fields.push(field);
        return field;
    }
    removeField(field) {
        console.log('Form.removeField', field.getName());
        const i = this.fields.indexOf(field);
        if (i === -1) throw new Error('no such field');
        this.fields.splice(i, 1);
    }
    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
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
        await FrontHostApp.doHttpRequest({
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
        return FrontHostApp.doHttpRequest(args);
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
        return FrontHostApp.doHttpRequest(args);
    }

    async newField(params) {
        params['pageFileName'] = this.page.pageLink.getFileName();
        params['form']         = this.getName();
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Field',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
        return this.createField(data);
    }

    async newAction(params) {
        params['pageFileName'] = this.page.pageLink.getFileName();
        params['form']         = this.getName();
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Action',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
        return this.createAction(data);
    }

    async newDataSource(params) {
        params['page']  = this.page.pageLink.getFileName();
        params['form']  = this.getName();
        const data = await FrontHostApp.doHttpRequest({
            controller: 'DataSource',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
        return this.createDataSource(data);
    }

    async getView(view) {
        return await FrontHostApp.doHttpRequest({
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
        return await FrontHostApp.doHttpRequest({
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
        return await FrontHostApp.doHttpRequest({
            controller: 'Form',
            action    : 'saveController',
            params    : Helper.encodeObject({
                page: this.page.getName(),
                form: this.getName(),
                text: text
            })
        });
    }

    async createModelBackJs() {
        return await FrontHostApp.doHttpRequest({
            controller: 'Form',
            action    : 'createModelBackJs',
            params    : Helper.encodeObject({
                page: this.page.getName(),
                form: this.getName(),
            })
        });
    }

    async createView() {
        return await FrontHostApp.doHttpRequest({
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
        return await FrontHostApp.doHttpRequest({
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

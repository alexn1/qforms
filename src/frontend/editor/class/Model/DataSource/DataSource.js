class DataSource extends Model {

    constructor(data, parent) {
        super(data, parent);
        this.keyColumns = [];
        // this.parentKeyColumns = [];
    }

    init() {
        for (const name in this.data.keyColumns) {
            this.createKeyColumn(this.data.keyColumns[name]);
        }
        /*for (const name in this.data.parentKeyColumns) {
            this.createParentKeyColumn(this.model.parentKeyColumns[name]);
        }*/
    }

    createKeyColumn(data) {
        const keyColumn = new KeyColumn(data, this);
        keyColumn.init();
        this.keyColumns.push(keyColumn);
        return keyColumn;
    }
    /*createParentKeyColumn(data) {
        const parentKeyColumn = new ParentKeyColumn(data, this);
        parentKeyColumn.init();
        this.parentKeyColumns.push(parentKeyColumn);
        return parentKeyColumn;
    }*/

    static async create(parent, params) {
        if (parent instanceof Form) {
            const form = parent;
            params['page']  = form.page.pageLink.data['@attributes'].fileName;
            params['form']  = form.data['@attributes'].name;
        }
        if (parent instanceof Page) {
            const page = parent;
            params['page']  = page.pageLink.data['@attributes'].fileName;
        }
        return await QForms.doHttpRequest({
            controller: 'DataSource',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const args = {
            controller: 'DataSource',
            action    : 'save',
            params    : Helper.encodeObject({
                dataSource: this.data['@attributes'].name,
                attr      : name,
                value     : value
            })
        };
        if (this.parent instanceof Page) {
            args.params.pageFileName = Helper.encodeValue(this.parent.pageLink.data['@attributes'].fileName);
        }
        if (this.parent instanceof Form) {
            args.params.form         = Helper.encodeValue(this.parent.data['@attributes'].name);
            args.params.pageFileName = Helper.encodeValue(this.parent.page.pageLink.data['@attributes'].fileName);
        }
        const data = await QForms.doHttpRequest(args);
        this.data['@attributes'][name] = value;
        return data;
    }

    async deleteData() {
        const args = {
            controller: 'DataSource',
            action    : 'delete',
            params    : Helper.encodeObject({
                dataSource: this.data['@attributes'].name
            })
        };
        if (this.parent instanceof Page) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.data['@attributes'].fileName);
        }
        if (this.parent instanceof Form) {
            args.params.form = Helper.encodeValue(this.parent.data['@attributes'].name);
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.data['@attributes'].fileName);
        }
        await QForms.doHttpRequest(args);
    }
    async delete() {
        await this.deleteData();
        this.parent.removeDataSource();
    }

    async moveUp() {
        const args = {
            controller: 'DataSource',
            action    : 'moveUp',
            params    : Helper.encodeObject({
                dataSource: this.data['@attributes'].name
            })
        };
        if (this.parent instanceof Page) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.data['@attributes'].fileName);
        }
        if (this.parent instanceof Form) {
            args.params.form = Helper.encodeValue(this.parent.data['@attributes'].name);
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.data['@attributes'].fileName);
        }
        return await QForms.doHttpRequest(args);
    }

    async moveDown() {
        const args = {
            controller: 'DataSource',
            action    : 'moveDown',
            params    : Helper.encodeObject({
                dataSource: this.data['@attributes'].name
            })
        };
        if (this.parent instanceof Page) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.data['@attributes'].fileName);
        }
        if (this.parent instanceof Form) {
            args.params.form = Helper.encodeValue(this.parent.data['@attributes'].name);
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.data['@attributes'].fileName);
        }
        return await QForms.doHttpRequest(args);
    }

    async newKeyColumn(name) {
        const args = {
            controller: 'KeyColumn',
            action    : '_new',
            params    : Helper.encodeObject({
                dataSource: this.data['@attributes'].name,
                name      : name
            })
        };
        if (this.parent instanceof Form) {
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.data['@attributes'].fileName);
            args.params.form = Helper.encodeValue(this.parent.data['@attributes'].name);
        }
        if (this.parent instanceof Page) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.data['@attributes'].fileName);
        }
        return await QForms.doHttpRequest(args);
    }

    /*async newParentKeyColumn(name) {
        return await QForms.doHttpRequest({
            controller: 'ParentKeyColumn',
            action    : '_new',
            params    : Helper.encodeObject({
                page      : this.parent.page.pageLink.data['@attributes'].fileName,
                form      : this.parent.data['@attributes'].name,
                dataSource: this.data['@attributes'].name,
                name      : name
            })
        });
    }*/

    async getView(view) {
        const args = {
            controller: 'DataSource',
            action    : 'getView',
            params    : Helper.encodeObject({
                dataSource: (this instanceof DataSource) ? this.data['@attributes'].name : undefined,
                view      : view
            })
        };
        if (this.parent instanceof Page) {

            args.params.pageFileName = Helper.encodeValue((this instanceof DataSource) ? this.parent.pageLink.data['@attributes'].fileName : undefined);
        }
        if (this.parent instanceof Form) {
            args.params.pageFileName = Helper.encodeValue((this instanceof DataSource) ? this.parent.page.pageLink.data['@attributes'].fileName : undefined);
            args.params.form         = Helper.encodeValue((this instanceof DataSource) ? this.parent.data['@attributes'].name                   : undefined);
        }
        return await QForms.doHttpRequest(args);
    }

    async saveController(text) {
        const args = {
            controller: 'DataSource',
            action    : 'saveController',
            params    : Helper.encodeObject({
                dataSource: this.data['@attributes'].name,
                text      : text
            })
        };
        if (this.parent instanceof Page) {
            args.params.pageFileName = Helper.encodeValue(this.parent.pageLink.data['@attributes'].fileName);
        }
        if (this.parent instanceof Form) {
            args.params.pageFileName = Helper.encodeValue(this.parent.page.pageLink.data['@attributes'].fileName);
            args.params.form         = Helper.encodeValue(this.parent.data['@attributes'].name);
        }
        return await QForms.doHttpRequest(args);
    }

    async createController() {
        const args = {
            controller: 'DataSource',
            action    : 'createController',
            params    : Helper.encodeObject({
                page        : this.parent.page.data['@attributes'].name,
                pageFileName: this.parent.page.pageLink.data['@attributes'].fileName,
                form        : this.parent.data['@attributes'].name,
                dataSource  : this.data['@attributes'].name
            })
        };
        return await QForms.doHttpRequest(args);
    }

    getFullName() {
        if (this.parent instanceof Form) {
            return [this.parent.parent.name, this.parent.name, this.name].join('.');
        } else if (this.parent instanceof Page) {
            return [this.parent.name, this.name].join('.');
        } else if (this.parent instanceof Application) {
            return this.name;
        }
    }

}

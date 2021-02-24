class DataSource extends Model {

    constructor(data, parent) {
        super(data, parent);
        this.keyColumns = [];
    }

    init() {
        for (const name in this.data.keyColumns) {
            this.createKeyColumn(this.data.keyColumns[name]);
        }
    }

    createKeyColumn(data) {
        const keyColumn = new KeyColumn(data, this);
        keyColumn.init();
        this.keyColumns.push(keyColumn);
        return keyColumn;
    }
    removeKeyColumn(keyColumn) {
        console.log('Database.removeParam', keyColumn.getName());
        const i = this.keyColumns.indexOf(keyColumn);
        if (i === -1) throw new Error('no such keyColumn');
        this.keyColumns.splice(i, 1);
    }
    static async create(parent, params) {
        if (parent instanceof Form) {
            const form = parent;
            params['page']  = form.page.pageLink.getFileName();
            params['form']  = form.getName();
        }
        if (parent instanceof Page) {
            const page = parent;
            params['page']  = page.pageLink.getFileName();
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
                dataSource: this.getName(),
                attr      : name,
                value     : value
            })
        };
        if (this.parent instanceof Page) {
            args.params.pageFileName = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof Form) {
            args.params.form         = Helper.encodeValue(this.parent.getName());
            args.params.pageFileName = Helper.encodeValue(this.parent.page.pageLink.getFileName());
        }
        const data = await QForms.doHttpRequest(args);
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        const args = {
            controller: 'DataSource',
            action    : 'delete',
            params    : Helper.encodeObject({
                dataSource: this.getName()
            })
        };
        if (this.parent instanceof Page) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof Form) {
            args.params.form = Helper.encodeValue(this.parent.getName());
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.getFileName());
        }
        await QForms.doHttpRequest(args);
    }
    async delete() {
        await this.deleteData();
        this.parent.removeDataSource(this);
    }

    async moveUp() {
        const args = {
            controller: 'DataSource',
            action    : 'moveUp',
            params    : Helper.encodeObject({
                dataSource: this.getName()
            })
        };
        if (this.parent instanceof Page) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof Form) {
            args.params.form = Helper.encodeValue(this.parent.getName());
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.getFileName());
        }
        return await QForms.doHttpRequest(args);
    }

    async moveDown() {
        const args = {
            controller: 'DataSource',
            action    : 'moveDown',
            params    : Helper.encodeObject({
                dataSource: this.getName()
            })
        };
        if (this.parent instanceof Page) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof Form) {
            args.params.form = Helper.encodeValue(this.parent.getName());
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.getFileName());
        }
        return await QForms.doHttpRequest(args);
    }

    async newKeyColumnData(name) {
        const args = {
            controller: 'KeyColumn',
            action    : '_new',
            params    : Helper.encodeObject({
                dataSource: this.getName(),
                name      : name
            })
        };
        if (this.parent instanceof Form) {
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.getFileName());
            args.params.form = Helper.encodeValue(this.parent.getName());
        }
        if (this.parent instanceof Page) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        return await QForms.doHttpRequest(args);
    }
    async newKeyColumn(name) {
        const data = await this.newKeyColumnData(name);
        return this.createKeyColumn(data);
    }
    async getView(view) {
        const args = {
            controller: 'DataSource',
            action    : 'getView',
            params    : Helper.encodeObject({
                dataSource: (this instanceof DataSource) ? this.getName() : undefined,
                view      : view
            })
        };
        if (this.parent instanceof Page) {

            args.params.pageFileName = Helper.encodeValue((this instanceof DataSource) ? this.parent.pageLink.getFileName() : undefined);
        }
        if (this.parent instanceof Form) {
            args.params.pageFileName = Helper.encodeValue((this instanceof DataSource) ? this.parent.page.pageLink.getFileName() : undefined);
            args.params.form         = Helper.encodeValue((this instanceof DataSource) ? this.parent.getName()                   : undefined);
        }
        return await QForms.doHttpRequest(args);
    }

    async saveController(text) {
        const args = {
            controller: 'DataSource',
            action    : 'saveController',
            params    : Helper.encodeObject({
                dataSource: this.getName(),
                text      : text
            })
        };
        if (this.parent instanceof Page) {
            args.params.pageFileName = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof Form) {
            args.params.pageFileName = Helper.encodeValue(this.parent.page.pageLink.getFileName());
            args.params.form         = Helper.encodeValue(this.parent.getName());
        }
        return await QForms.doHttpRequest(args);
    }

    async createController() {
        const args = {
            controller: 'DataSource',
            action    : 'createController',
            params    : Helper.encodeObject({
                page        : this.parent.page.getName(),
                pageFileName: this.parent.page.pageLink.getFileName(),
                form        : this.parent.getName(),
                dataSource  : this.getName()
            })
        };
        return await QForms.doHttpRequest(args);
    }

    getFullName() {
        if (this.parent instanceof Form) {
            return [this.parent.parent.getName(), this.parent.getName(), this.getName()].join('.');
        } else if (this.parent instanceof Page) {
            return [this.parent.getName(), this.getName()].join('.');
        } else if (this.parent instanceof Application) {
            return this.getName();
        }
    }

}

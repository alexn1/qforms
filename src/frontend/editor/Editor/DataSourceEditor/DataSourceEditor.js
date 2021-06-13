class DataSourceEditor extends Editor {

    constructor(data, parent) {
        super(data, parent);
        this.keyColumns = [];
    }

    init() {
        for (const data of this.data.keyColumns) {
            this.createKeyColumn(data);
        }
    }

    createKeyColumn(data) {
        const keyColumn = new KeyColumnEditor(data, this);
        keyColumn.init();
        this.keyColumns.push(keyColumn);
        return keyColumn;
    }
    removeKeyColumn(keyColumn) {
        console.log('DatabaseEditor.removeParam', keyColumn.getName());
        const i = this.keyColumns.indexOf(keyColumn);
        if (i === -1) throw new Error('no such keyColumn');
        this.keyColumns.splice(i, 1);
    }
    static async create(parent, params) {
        if (parent instanceof FormEditor) {
            const form = parent;
            params['page']  = form.page.pageLink.getFileName();
            params['form']  = form.getName();
        }
        if (parent instanceof PageEditor) {
            const page = parent;
            params['page']  = page.pageLink.getFileName();
        }
        return await FrontHostApp.doHttpRequest({
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
        if (this.parent instanceof PageEditor) {
            args.params.pageFileName = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof FormEditor) {
            args.params.form         = Helper.encodeValue(this.parent.getName());
            args.params.pageFileName = Helper.encodeValue(this.parent.page.pageLink.getFileName());
        }
        const data = await FrontHostApp.doHttpRequest(args);
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
        if (this.parent instanceof PageEditor) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof FormEditor) {
            args.params.form = Helper.encodeValue(this.parent.getName());
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.getFileName());
        }
        await FrontHostApp.doHttpRequest(args);
    }

    async createModelBackJs() {
        return await FrontHostApp.doHttpRequest({
            controller: 'DataSource',
            action    : 'createModelBackJs',
            params    : Helper.encodeObject({
                ...(this.parent instanceof PageEditor ? {page: this.parent.pageLink.getFileName()} : {}),
                ...(this.parent instanceof FormEditor ? {
                    form: this.parent.getName(),
                    page: this.parent.page.pageLink.getFileName()
                } : {}),
                dataSource: this.getName(),
            })
        });
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
        if (this.parent instanceof PageEditor) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof FormEditor) {
            args.params.form = Helper.encodeValue(this.parent.getName());
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.getFileName());
        }
        return await FrontHostApp.doHttpRequest(args);
    }

    async moveDown() {
        const args = {
            controller: 'DataSource',
            action    : 'moveDown',
            params    : Helper.encodeObject({
                dataSource: this.getName()
            })
        };
        if (this.parent instanceof PageEditor) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof FormEditor) {
            args.params.form = Helper.encodeValue(this.parent.getName());
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.getFileName());
        }
        return await FrontHostApp.doHttpRequest(args);
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
        if (this.parent instanceof FormEditor) {
            args.params.page = Helper.encodeValue(this.parent.page.pageLink.getFileName());
            args.params.form = Helper.encodeValue(this.parent.getName());
        }
        if (this.parent instanceof PageEditor) {
            args.params.page = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        return await FrontHostApp.doHttpRequest(args);
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
                dataSource: (this instanceof DataSourceEditor) ? this.getName() : undefined,
                view      : view
            })
        };
        if (this.parent instanceof PageEditor) {
            args.params.pageFileName = Helper.encodeValue((this instanceof DataSourceEditor) ? this.parent.pageLink.getFileName() : undefined);
        }
        if (this.parent instanceof FormEditor) {
            args.params.pageFileName = Helper.encodeValue((this instanceof DataSourceEditor) ? this.parent.page.pageLink.getFileName() : undefined);
            args.params.form         = Helper.encodeValue((this instanceof DataSourceEditor) ? this.parent.getName()                   : undefined);
        }
        return await FrontHostApp.doHttpRequest(args);
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
        if (this.parent instanceof PageEditor) {
            args.params.pageFileName = Helper.encodeValue(this.parent.pageLink.getFileName());
        }
        if (this.parent instanceof FormEditor) {
            args.params.pageFileName = Helper.encodeValue(this.parent.page.pageLink.getFileName());
            args.params.form         = Helper.encodeValue(this.parent.getName());
        }
        return await FrontHostApp.doHttpRequest(args);
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
        return await FrontHostApp.doHttpRequest(args);
    }

    getFullName() {
        if (this.parent instanceof FormEditor) {
            return [this.parent.parent.getName(), this.parent.getName(), this.getName()].join('.');
        } else if (this.parent instanceof PageEditor) {
            return [this.parent.getName(), this.getName()].join('.');
        } else if (this.parent instanceof ApplicationEditor) {
            return this.getName();
        }
    }

}

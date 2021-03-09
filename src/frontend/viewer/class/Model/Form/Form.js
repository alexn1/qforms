class Form extends Model {
    constructor(data, parent) {
        super(data, parent);
        this.dataSources = {};
        this.fields      = {};
    }

    init() {
        // dataSources
        for (const data of this.data.dataSources) {
            const name = data.name;
            try {
                this.dataSources[name] = eval(`new ${data.class}(data, this)`);
                this.dataSources[name].init();
            } catch (err) {
                err.message = `${this.getFullName()}.${name}: ${err.message}`;
                throw err;
            }
        }

        // fields
        for (const data of this.data.fields) {
            const name = data.name;
            this.fields[name] = eval(`new ${data.class}(data, this)`);
            this.fields[name].init();
        }
    }

    deinit() {
        // console.log('Form.deinit:', this.getFullName());
        for (const dsName in this.dataSources) {
            this.dataSources[dsName].deinit();
        }
        for (const name in this.fields) {
            this.fields[name].deinit();
        }
        super.deinit();
    }

    fillDefaultValues(row) {
        for (const name in this.fields) {
            this.fields[name].fillDefaultValue(row);
        }
    }

    onDataSourceRefresh(e) {
        // console.log('Form.onDataSourceRefresh', this.getFullName());
        this.emit('refresh', e);
    }

    onDataSourceInsert(e) {
        // console.log('Form.onDataSourceInsert', this.getFullName());
        this.parent.onFormInsert(e);
        this.emit('insert', e);
    }

    onDataSourceUpdate(e) {
        // console.log('Form.onDataSourceUpdate', this.getFullName());
        this.emit('update', e);
    }

    onDataSourceDelete(e) {
        // console.log('Form.onDataSourceDelete', this.getFullName());
        this.emit('delete', e);
    }

    async update() {
        console.log('Form.update', this.getFullName(), this.isChanged());
        if (this.getPage().deinited) throw new Error('page already deinited');
        if (!this.isChanged() && !this.getDefaultDataSource().hasNewRows()) throw new Error(`form model not changed or does not have new rows: ${this.getFullName()}`);
        await this.getDefaultDataSource().update();
    }

    isChanged() {
        // console.log('Form.isChanged', this.getFullName());
        return this.getDefaultDataSource().isChanged();
    }

    hasNew() {
        // console.log('Form.hasNew', this.getFullName());
        return this.getDefaultDataSource().hasNew();
    }

    async rpc(name, params) {
        console.log('Form.rpc', this.getFullName(), name, params);
        if (!name) throw new Error('no name');
        const result = await this.getApp().request({
            action: 'rpc',
            page  : this.getPage().getName(),
            form  : this.getName(),
            name  : name,
            params: Helper.encodeObject(params)
        });
        if (result.errorMessage) throw new Error(`rpc error: ${result.errorMessage}`);
        return result;
    }

    getKey() {
        return null;
    }

    getDefaultDataSource() {
        return this.getDataSource('default');
    }

    getPage() {
        return this.parent;
    }

    getApp() {
        return this.parent.parent;
    }
    async refresh() {
        await this.getDefaultDataSource().refresh();
    }
}

'use strict';

class Form extends Model {
    constructor(name, parent, data) {
        super(data, parent);
        this.dataSources   = {};
        this.fields        = {};
        this.controls      = {};
    }

    init() {
        // dataSources
        for (const name in this.data.dataSources) {
            const data = this.data.dataSources[name];
            try {
                this.dataSources[name] = eval(`new ${data.class}(data, this)`);
                this.dataSources[name].init();
            } catch (err) {
                err.message = `${this.getFullName()}.${name}: ${err.message}`;
                throw err;
            }
        }

        // fields
        for (const name in this.data.fields) {
            const data = this.data.fields[name];
            this.fields[name] = eval(`new ${data.class}(data, this)`);
            this.fields[name].init();
        }

        // controls
        for (const name in this.data.controls) {
            const data = this.data.controls[name];
            this.controls[name] = eval('new {class}(data, this)'.replace('{class}', data.class));
            this.controls[name].init();
        }
        // this.dataSource = this.dataSources.default;
    }

    deinit() {
        console.log('Form.deinit:', this.getFullName());
        for (const dsName in this.dataSources) {
            this.dataSources[dsName].deinit();
        }
        for (const name in this.fields) {
            this.fields[name].deinit();
        }
        for (const name in this.controls) {
            this.controls[name].deinit();
        }
        super.deinit();
    }

    fillDefaultValues(row) {
        for (const name in this.fields) {
            this.fields[name].fillDefaultValue(row);
        }
    }

    onDataSourceUpdate(e) {
        console.log('Form.onDataSourceUpdate', this.getFullName());
    }

    async update() {
        console.log('Form.update', this.getFullName(), this.isChanged());
        if (this.getPage().deinited) throw new Error('page already deinited');
        if (!this.isChanged() && !this.getDataSource().hasNewRows()) throw new Error(`form not changed or does not have new rows: ${this.getFullName()}`);
        await this.getDataSource().update();
    }

    async refill() {
        console.log('Form.refill', this.getFullName());
        await this.getDataSource().refill(this.getPage().params);
        this.emit('refilled', {source: this});
    }

    // executeAction(action, args) {
    //     action.exec(args, {'form':this});
    // }

    getFullName() {
        return [
            this.getPage().getFullName(),
            this.getName()
        ].join('.');
    }

    async refresh() {
        console.log('Form.refresh', this.getFullName());
        await this.getDataSource().refresh();
        this.emit('refresh', {source: this});
    }

    isChanged() {
        // console.log('Form.isChanged', this.getFullName());
        return this.getDataSource().isChanged();
    }

    async rpc(name, params) {
        console.log('Form.rpc', this.getFullName(), name, params);
        if (!name) throw new Error('no name');
        return await this.getPage().getApp().request({
            action: 'rpc',
            page: this.getPage().getName(),
            form: this.getName(),
            name: name,
            params: params
        });
    }

    getKey() {
        return null;
    }

    getDataSource() {
        if (!this.dataSources.default) throw new Error(`${this.getFullName()}: no default data source`);
        return this.dataSources.default;
    }

    getPage() {
        return this.parent;
    }

    getApp() {
        return this.parent.parent;
    }
}

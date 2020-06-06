'use strict';

class Application extends Model {
    constructor(data) {
        super(data);
        this.databases    = {};
        this.dataSources  = {};
    }

    init() {
        console.log('Application.init');
        // databases
        for (const name in this.data.databases) {
            this.databases[name] = new Database(this.data.databases[name], this);
            this.databases[name].init();
        }

        // dataSources
        for (const name in this.data.dataSources) {
            this.dataSources[name] = new DataSource(name, this, this.data.dataSources[name]);
            this.dataSources[name].init();
        }
    }

    deinit() {
        for (const name in this.dataSources) {
            this.dataSources[name].deinit();
        }
        // TODO: add deinit on opened pages
    }

    // getTable(fullTableName) {
    //     if (!(fullTableName in this.tables)) {
    //         const table = new EventEmitter();
    //         table.name = fullTableName;
    //         this.tables[fullTableName] = table;
    //     }
    //     return this.tables[fullTableName];
    // }

    async logout() {
        const data = await this.request({
            'action':'logout'
        });
        this.emit('logout', {source: this});
    }

    async request(data) {
        // console.warn('Application.request', data);
        const start = Date.now();
        const response = await QForms.doHttpRequest(data);
        const time = Date.now() - start;
        // console.warn('response:', response);
        this.emit('request', {time});
        return response;
    }
}

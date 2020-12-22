class Application extends Model {
    constructor(data) {
        super(data);
        this.databases   = {};
        this.dataSources = {};
    }

    init() {
        // console.log('Application.init');
        if (!this.data.theme) throw new Error('no theme attr');

        // databases
        for (const name in this.data.databases) {
            this.databases[name] = new Database(this.data.databases[name], this);
            this.databases[name].init();
        }

        // dataSources
        for (const name in this.data.dataSources) {
            const data = this.data.dataSources[name];
            this.dataSources[name] = eval(`new ${data.class}(data, this)`);
            this.dataSources[name].init();
        }
    }

    deinit() {
        for (const name in this.dataSources) {
            this.dataSources[name].deinit();
        }
        // TODO: add deinit on opened pages
        super.deinit();
    }

    async logout() {
        const data = await this.request({
            'action': 'logout'
        });
        this.emit('logout', {source: this});
    }

    async request(options) {
        // console.warn('Application.request', data);
        const start = Date.now();
        const response = await QForms.doHttpRequest(options);
        this.emit('request', {time: Date.now() - start});
        return response;
    }

    /*async request2(options) {
        // console.warn('Application.request', data);
        const start = Date.now();
        const response = await QForms.doHttpRequest2(options);
        this.emit('request', {time: Date.now() - start});
        return response;
    }*/

    getDatabase(name) {
        if (!this.databases[name]) throw new Error(`no database with name: ${name}`);
        return this.databases[name];
    }

    getText() {
        return this.data.text;
    }
    async rpc(name, params) {
        console.log('Application.rpc', this.getFullName(), name, params);
        if (!name) throw new Error('no name');
        const result = await this.request({
            action: 'rpc',
            name  : name,
            params: Helper.encodeObject(params)
        });
        if (result.errorMessage) throw new Error(`rpc error: ${result.errorMessage}`);
        return result;
    }
}

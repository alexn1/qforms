class Application extends Model {
    constructor(data) {
        super(data);
        this.databases   = [];
        this.dataSources = [];
    }

    init() {
        // console.log('Application.init');
        if (!this.data.theme) throw new Error('no theme attr');

        // databases
        for (const data of this.data.databases) {
            const database = new Database(data, this);
            database.init();
            this.databases.push(database);
        }

        // data sources
        this.createDataSources();
    }

    deinit() {
        this.deinitDataSources();
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
        const response = await FrontHostApp.doHttpRequest(options);
        this.emit('request', {time: Date.now() - start});
        return response;
    }

    getDatabase(name) {
        const database = this.databases.find(database => database.getName() === name);
        if (!database) throw new Error(`no database: ${name}`);
        return database;
    }

    getText() {
        return this.data.text;
    }
    getUser() {
        return this.data.user;
    }
    getDomain() {
        return this.data.domain;
    }
    getVirtualPath() {
        return this.data.virtualPath;
    }
    async rpc(name, params) {
        console.log('Application.rpc', this.getFullName(), name, params);
        if (!name) throw new Error('no name');
        const result = await this.request({
            action: 'rpc',
            name  : name,
            params: Helper.encodeObject(params)
        });
        if (result.errorMessage) throw new Error(result.errorMessage);
        return result;
    }
}

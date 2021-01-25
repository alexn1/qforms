class Application extends Model {

    constructor(data) {
        super(data);
        this.databases   = {};
        this.dataSources = {};
        this.pageLinks   = {};
    }

    init() {
        // databases
        for (const name in this.data.databases) {
            const databaseData = this.data.databases[name];
            const database = new Database(databaseData);
            database.init();
            this.databases[name] = database;
        }

        // dataSources
        for (const name in this.data.dataSources) {
            const dataSourceData = this.data.dataSources[name];
            const dataSource = new DataSource(dataSourceData);
            dataSource.init();
            this.dataSources[name] = dataSource;
        }

        // pageLinks
        for (const name in this.data.pageLinks) {
            const pageLinkData = this.data.pageLinks[name];
            const pageLink = new PageLink(pageLinkData, this);
            pageLink.init();
            this.pageLinks[name] = pageLink;
        }
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Application',
            action    : 'save',
            params    : Helper.encodeObject({
                attr : name,
                value: value
            })
        });
        this.data['@attributes'][name] = value;
        return data;
    }

    async newPage(params) {
        params['menu'] = (params['startup'] === 'true') ? 'Pages' : '';
        const data = await QForms.doHttpRequest({
            controller: 'Page',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
        return [data.page, data.pageLink];
    }

    async newDatabase(params) {
        const data = await QForms.doHttpRequest({
            controller: 'Database',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
        return data;
    }

    async getView(view) {
        return await QForms.doHttpRequest({
            controller: 'Application',
            action    : 'getView',
            params    : Helper.encodeObject({
                app : this.data['@attributes'].name,
                view: view
            })
        });
    }

    async saveView(text, view) {
        return await QForms.doHttpRequest({
            controller: 'Application',
            action    : 'saveView',
            params    : Helper.encodeObject({
                app : this.data['@attributes'].name,
                view: view,
                text: text
            })
        });
    }

    async saveController(text) {
        return await QForms.doHttpRequest({
            controller: 'Application',
            action    : 'saveController',
            params    : Helper.encodeObject({
                app : this.data['@attributes'].name,
                text: text
            })
        });
    }

    async createView() {
        return await QForms.doHttpRequest({
            controller: 'Application',
            action    : 'createView',
            params    : Helper.encodeObject({
                app: this.data['@attributes'].name
            })
        });
    }

    async createController() {
        return await QForms.doHttpRequest({
            controller: 'Application',
            action    : 'createController',
            params    : Helper.encodeObject({
                app: this.data['@attributes'].name
            })
        });
    }

    async newDataSource(params) {
        return await QForms.doHttpRequest({
            controller: 'DataSource',
            action    : '_new',
            params    : Helper.encodeObject(params)
        });
    }

}

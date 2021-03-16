class Model extends EventEmitter {
    constructor(data, parent) {
        if (!data.name) throw new Error(`${data.class} no name`);
        super();
        this.data     = data;
        this.parent   = parent;
        this.deinited = false;
    }

    init() {
    }

    deinit() {
        if (this.deinited) throw new Error(`${this.getFullName()}: model already deinited`);
        this.deinited = true;
    }

    static getAttr(data, name) {
        return data[name];
    }

    getAttr(name) {
        return this.data[name];
    }

    getClassName() {
        return this.getAttr('class');
    }

    getName() {
        return this.getAttr('name');
    }
    getFullName() {
        if (this.parent) {
            return `${this.parent.getFullName()}.${this.getName()}`;
        }
        return this.getName();
    }
    getCaption() {
        return this.data.caption;
    }
    getDataSource(name) {
        return this.dataSources.find(dataSource => dataSource.getName() === name);
    }
    createDataSources() {
        for (const data of this.data.dataSources) {
            try {
                const dataSource = eval(`new ${data.class}(data, this)`);
                dataSource.init();
                this.dataSources.push(dataSource);
            } catch (err) {
                err.message = `${this.getFullName()}.${data.name}: ${err.message}`;
                throw err;
            }
        }
    }
    deinitDataSources() {
        for (const dataSource of this.dataSources) {
            dataSource.deinit();
        }
    }
}

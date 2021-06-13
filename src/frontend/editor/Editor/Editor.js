class Editor {

    constructor(data, parent = null) {
        if (!data) throw new Error('no data');
        this.data   = data;
        this.parent = parent;
    }

    init() {
    }

    getClassName() {
        return this.data['@class'];
    }

    getName() {
        return this.getAttr('name');
    }

    getFullName(splitter = '.') {
        let name;
        if (this.form) {
            name = `${this.form.page.getName()}${splitter}${this.form.getName()}${splitter}${this.getName()}`;
        } else if (this.page) {
            name = `${this.page.getName()}${splitter}${this.getName()}`;
        } else {
            name = this.getName();
        }
        return name;
    }

    async setValue(name, value) {
        throw new Error(`${this.constructor.name}.setValue not implemented`);
    }

    getAttr(name) {
        return this.data['@attributes'][name];
    }
    getAttributes() {
        return this.data['@attributes'];
    }

    setAttr(name, value) {
        this.data['@attributes'][name] = value;
    }

    /*getObject(col, name) {
        return this[col].find(obj => obj.getName() === name);
    }*/
    createDataSource(data) {
        const dataSource = new DataSource(data, this);
        dataSource.init();
        this.dataSources.push(dataSource);
        return dataSource;
    }
    removeDataSource(dataSource) {
        // console.log('Editor.removeDataSource', dataSource.getName());
        const i = this.dataSources.indexOf(dataSource);
        if (i === -1) throw new Error('no such dataSource');
        this.dataSources.splice(i, 1);
    }
    createAction(data) {
        const action = new Action(data, this);
        action.init();
        this.actions.push(action);
        return action;
    }
    removeAction(action) {
        // console.log('Editor.removeField', action.getName());
        const i = this.actions.indexOf(action);
        if (i === -1) throw new Error('no such action');
        this.actions.splice(i, 1);
    }

}

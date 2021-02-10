class Model {

    constructor(data, parent = null) {
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

    getFullName(splitter) {
        let name;
        if (this.form) {
            name = ('{page}' + splitter + '{form}' + splitter + '{field}')
                .replace('{page}' , this.form.page.getName())
                .replace('{form}' , this.form.getName())
                .replace('{field}', this.getName());
        } else if (this.page) {
            name = ('{page}' + splitter + '{form}')
                .replace('{page}', this.page.getName())
                .replace('{form}', this.getName());
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

    setAttr(name, value) {
        this.data['@attributes'][name] = value;
    }

    /*getObject(col, name) {
        return this[col].find(obj => obj.getName() === name);
    }*/

}

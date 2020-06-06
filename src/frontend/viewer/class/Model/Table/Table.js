'use strict';

class Table extends Model {
    constructor(...args) {
        super(...args);
        this.columns = {};
    }
    init() {
        // console.log('Table.init', this.getFullName());
        for (const name in this.data.columns) {
            this.columns[name] = new Column(this.data.columns[name], this);
            this.columns[name].init();
        }
    }

    getFullName() {
        return `${this.parent.getName()}.${this.getName()}`;
    }

    getColumn(name) {
        if (!this.columns[name]) throw new Error(`table ${this.getFullName()}: no column ${name}`);
        return this.columns[name];
    }
}

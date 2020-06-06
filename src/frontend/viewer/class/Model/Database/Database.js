'use strict';

class Database extends Model {
    constructor(...args) {
        super(...args);
        this.tables = {};
    }

    init() {
        // console.log('Database.init', this.getName());
        for (const name in this.data.tables) {
            this.tables[name] = new Table(this.data.tables[name], this);
            this.tables[name].init();
        }
    }
}

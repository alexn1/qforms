'use strict';

class Column  extends Model {
    init() {
        // console.log('Column.init', this.getFullName());
    }

    getFullName() {
        return `${this.parent.getFullName()}.${this.getName()}`;
    }

    getType() {
        if (!this.data.type) throw new Error(`column ${this.getFullName()}: no type`);
        return this.data.type;
    }
}

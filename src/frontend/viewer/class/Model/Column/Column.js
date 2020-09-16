'use strict';

class Column  extends Model {
    init() {
        // console.log('Column.init', this.getFullName());
    }

    getType() {
        if (!this.data.type) throw new Error(`column ${this.getFullName()}: no type`);
        return this.data.type;
    }
}

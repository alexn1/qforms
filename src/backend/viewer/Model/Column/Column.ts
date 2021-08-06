import Model from '../Model';
import Application from '../Application/Application';

class Column extends Model {

    // constructor(data, parent) {
    //     super(data, parent);
    //     // console.log('Column.constructor', this.getName());
    // }

    static async create(data, parent): Promise<Column> {
        return new Column(data, parent);
    }

    isKey(): boolean {
        return this.getAttr('key') === 'true';
    }

    isAuto(): boolean {
        return this.getAttr('auto') === 'true';
    }

    getApp(): Application {
        return this.parent.parent.parent;
    }
    /*getDbType() {
        return this.getAttr('dbType');
    }*/
}

export = Column;

import { Model } from '../Model';
import { Helper } from '../../../../common/Helper';
import { ColumnData } from '../../../../common/ModelData/ColumnData';

export class Column extends Model<ColumnData> {
    constructor(data, parent) {
        super(data, parent);
        if (!this.getAttr('type')) throw new Error(`column ${this.getFullName()}: no type`);
        if (!['string', 'number', 'boolean', 'object', 'date'].includes(this.getAttr('type'))) {
            throw new Error(`${this.getFullName()}: wrong column type: ${this.getAttr('type')}`);
        }
    }

    init() {
        // console.debug('Column.init', this.getFullName());
    }

    getType() {
        return this.getAttr('type');
    }
}

Helper.registerGlobalClass(Column);

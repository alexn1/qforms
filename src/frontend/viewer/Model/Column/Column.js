class Column  extends Model {
    constructor(data, parent) {
        super(data, parent);
        if (!this.getAttr('type')) throw new Error(`column ${this.getFullName()}: no type`);
        if (!['string', 'number', 'boolean', 'object', 'date'].includes(this.getAttr('type'))) {
            throw new Error(`${this.getFullName()}: wrong column type: ${this.getAttr('type')}`);
        }
    }
    init() {
        // console.log('Column.init', this.getFullName());
    }
    getType() {
        return this.getAttr('type');
    }
}
window.QForms.Column = Column;

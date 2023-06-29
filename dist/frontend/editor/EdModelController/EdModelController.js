"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdModelController = void 0;
const common_1 = require("../../common");
class EdModelController {
    constructor(model, parent = null) {
        this.model = model;
        this.parent = parent;
        this.view = null;
    }
    init() { }
    getTitle() {
        return this.model.getName();
    }
    getStyle() {
        return {
        // fontWeight: 'bold',
        };
    }
    getPropList() {
        return {
            list: this.model.data['@attributes'],
            options: {},
        };
    }
    async setProperty(name, value) {
        await this.model.setValue(name, value);
    }
    /*getObject(col, name) {
        return this[col].find(obj => obj.model.getName() === name);
    }*/
    async doAction(name) {
        throw new Error(`${this.constructor.name}.doAction('${name}') not implemented`);
    }
    getDocumentViewClass() {
        console.log(`${this.constructor.name}.getDocumentViewClass`);
        return null;
    }
    moveColItem(colName, item, offset) {
        common_1.Helper.moveArrItem(this[colName], item, offset);
    }
}
exports.EdModelController = EdModelController;

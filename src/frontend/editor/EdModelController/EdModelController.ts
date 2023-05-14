import { Helper } from '../../common';

export class EdModelController {
    model: any;
    parent: any;
    view: any;

    constructor(model, parent = null) {
        // super();
        this.model = model;
        this.parent = parent;
        this.view = null;
    }

    init() {}

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

    async setProperty(name, value): Promise<void> {
        await this.model.setValue(name, value);
    }

    /*getObject(col, name) {
        return this[col].find(obj => obj.model.getName() === name);
    }*/

    async doAction(name) {
        throw new Error(`${this.constructor.name}.doAction('${name}') not implemented`);
    }

    getDocumentViewClass(): any {
        console.log(`${this.constructor.name}.getDocumentViewClass`);
        return null;
    }

    moveColItem(colName, item, offset) {
        Helper.moveArrItem(this[colName], item, offset);
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormLinkFieldController = void 0;
const TableFormFieldController_1 = require("../TableFormFieldController");
const TableFormLinkFieldView_1 = require("./TableFormLinkFieldView");
class TableFormLinkFieldController extends TableFormFieldController_1.TableFormFieldController {
    constructor() {
        super(...arguments);
        this.onClick = (e) => {
            console.log('TableFormLinkFieldController.onClick', e);
            e.preventDefault();
            this.emit('click', { source: this });
        };
    }
    getViewClass() {
        return super.getViewClass() || TableFormLinkFieldView_1.TableFormLinkFieldView;
    }
}
exports.TableFormLinkFieldController = TableFormLinkFieldController;
if (typeof window === 'object') {
    // @ts-ignore
    window.TableFormLinkFieldController = TableFormLinkFieldController;
}

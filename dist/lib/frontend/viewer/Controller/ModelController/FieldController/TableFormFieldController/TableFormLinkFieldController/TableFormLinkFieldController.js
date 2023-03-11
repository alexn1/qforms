"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormLinkFieldController = void 0;
const TableFormFieldController_1 = require("../TableFormFieldController");
const TableFormLinkFieldView_1 = require("./TableFormLinkFieldView");
const Helper_1 = require("../../../../../../common/Helper");
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
Helper_1.Helper.registerGlobalClass(TableFormLinkFieldController);

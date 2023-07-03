"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormLinkFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormLinkFieldView_1 = require("./RowFormLinkFieldView");
const Helper_1 = require("../../../../../../common/Helper");
class RowFormLinkFieldController extends RowFormFieldController_1.RowFormFieldController {
    constructor() {
        super(...arguments);
        this.onClick = (e) => {
            console.debug('RowFormLinkFieldController.onClick', e);
            const pageName = this.getModel().getAttr('page');
            if (pageName) {
                e.preventDefault();
                this.openPage({
                    name: pageName,
                    params: {
                        key: this.getValue(),
                    },
                });
            }
            // @ts-ignore
            this.emit({ source: this });
        };
    }
    getViewClass() {
        return super.getViewClass() || RowFormLinkFieldView_1.RowFormLinkFieldView;
    }
    getDisplayValue() {
        const displayColumn = this.getModel().getAttr('displayColumn');
        if (displayColumn) {
            const ds = this.getModel().getDefaultDataSource();
            const rawValue = ds.getValue(ds.getSingleRow(), displayColumn);
            return JSON.parse(rawValue);
        }
        return null;
    }
}
exports.RowFormLinkFieldController = RowFormLinkFieldController;
Helper_1.Helper.registerGlobalClass(RowFormLinkFieldController);

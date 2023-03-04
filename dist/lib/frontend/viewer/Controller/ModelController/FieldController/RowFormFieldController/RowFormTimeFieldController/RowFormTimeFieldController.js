"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormTimeFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormTimeFieldView_1 = require("./RowFormTimeFieldView");
const common_1 = require("../../../../../../common");
class RowFormTimeFieldController extends RowFormFieldController_1.RowFormFieldController {
    constructor() {
        super(...arguments);
        this.defaultValue = null;
    }
    /* constructor(...args) {
        super(...args);
        this.defaultValue = null;
    } */
    getViewClass() {
        return super.getViewClass() || RowFormTimeFieldView_1.RowFormTimeFieldView;
    }
    getValueForWidget() {
        return this.getValue();
    }
    setValueFromWidget(widgetValue) {
        if (isNaN(widgetValue))
            throw new Error('wrong time');
        this.setValue(widgetValue);
    }
    getDefaultValue() {
        return this.defaultValue;
    }
    setDefaultValue2(defaultValue) {
        if (typeof defaultValue === 'string') {
            this.defaultValue = common_1.TimeBox.getIntegerValue(defaultValue);
        }
        else {
            if (defaultValue >= 24 * 60)
                throw new Error(`wrong default value: ${defaultValue}`);
            this.defaultValue = defaultValue;
        }
    }
    getPlaceholder() {
        // console.log('CarReservefromTimeController.getPlaceholder', this.defaultValue);
        if (this.defaultValue !== null)
            return common_1.TimeBox.getStringValue(this.defaultValue);
        return super.getPlaceholder();
    }
}
exports.RowFormTimeFieldController = RowFormTimeFieldController;
// @ts-ignore
window.RowFormTimeFieldController = RowFormTimeFieldController;

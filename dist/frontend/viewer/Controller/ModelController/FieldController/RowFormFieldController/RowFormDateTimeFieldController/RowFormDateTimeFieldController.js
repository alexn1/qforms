"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormDateTimeFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormDateTimeFieldView_1 = require("./RowFormDateTimeFieldView");
const common_1 = require("../../../../../../common");
const Helper_1 = require("../../../../../../common/Helper");
class RowFormDateTimeFieldController extends RowFormFieldController_1.RowFormFieldController {
    constructor(model, parent) {
        super(model, parent);
        this.onView2Create = (widget2) => {
            // console.log('RowFormDateTimeFieldController.onView2Create', widget2);
            this.widget2 = widget2;
        };
        /*_onChange(widgetValue) {
            // console.log('RowFormDateTimeFieldController._onChange', this.widget2);
            if (widgetValue !== null) {
                setTimeout(() => {
                    const input = this.widget2.getInputElement();
                    input.focus();
                    input.setSelectionRange(0, input.value.length);
                }, 0);
            }
        }*/
        this.onChange2 = (widgetValue, fireEvent = true) => {
            // console.log('RowFormDateTimeFieldController.onChange2', widgetValue);
            this.resetErrors();
            this.resetErrors2();
            this.rerender();
            if (!this.isValidateOnChange2())
                return;
            try {
                this.setValueFromView2(widgetValue);
            }
            catch (err) {
                console.log(`${this.model.getFullName()}: cannot parse time: ${err.message}`);
                this.state.parseError2 = err.message;
            }
            // validate
            if (!this.state.parseError2) {
                this.validate2();
                if (this.isValid()) {
                    this.copyValueToModel();
                }
            }
            // changed
            this.refreshChangedState();
            // event
            if (fireEvent) {
                try {
                    this.emit('change', { value: widgetValue });
                }
                catch (err) {
                    console.error('unhandled change event error:', this.model.getFullName(), err);
                }
                this.parent.onFieldChange({ source: this });
            }
        };
        this.onBlur2 = (widgetValue, fireEvent = true) => {
            console.log('RowFormDateTimeFieldController.onBlur2', widgetValue);
            if (!this.isEditable())
                return;
            this.resetErrors2();
            this.rerender();
            // get value from widget
            try {
                this.setValueFromView2(widgetValue);
            }
            catch (err) {
                console.log(`${this.model.getFullName()}: cannot parse time: ${err.message}`);
                this.state.parseError2 = err.message;
            }
            // validate
            if (!this.state.parseError2) {
                this.validate2();
                if (this.isValid()) {
                    this.copyValueToModel();
                }
            }
            // changed
            this.refreshChangedState();
            // event
            if (fireEvent) {
                try {
                    this.emit('change', { value: widgetValue });
                }
                catch (err) {
                    console.error('unhandled change event error:', this.model.getFullName(), err);
                }
                this.parent.onFieldChange({ source: this });
            }
        };
        this.widget2 = null;
        this.defaultValue = 0;
        this.state.parseError2 = null;
        this.state.error2 = null;
    }
    getViewClass() {
        return super.getViewClass() || RowFormDateTimeFieldView_1.RowFormDateTimeFieldView;
    }
    getValueForWidget() {
        return this.getValue();
    }
    getValueForTime() {
        // console.log('RowFormDateTimeFieldController.getValueForTime', this.model.getFullName(), this.defaultValue, TimeBox.getStringValue(this.defaultValue));
        const date = this.getValue();
        if (date) {
            const value = date.getHours() * 60 + date.getMinutes();
            // console.log('value:', value);
            if (value !== this.defaultValue) {
                // console.log('not equal to default value', value, this.defaultValue);
                return value;
            }
        }
        return null;
    }
    setValueFromWidget(widgetValue) {
        if (widgetValue === null) {
            this.state.parseError2 = null;
            this.resetErrors2();
            if (this.widget2)
                this.widget2.setValue(null);
        }
        else {
            const [h, m] = common_1.TimeBox.splitTime(this.defaultValue);
            widgetValue.setHours(h, m);
        }
        this.setValue(widgetValue);
    }
    getPlaceholder2() {
        return common_1.TimeBox.getStringValue(this.defaultValue);
    }
    getDefaultValue() {
        return this.defaultValue;
    }
    setDefaultValue2(defaultValue) {
        // console.log('RowFormDateTimeFieldController.setDefaultValue2', this.widget2 ? this.widget2.getValue() : null);
        if (typeof defaultValue === 'string') {
            this.defaultValue = common_1.TimeBox.getIntegerValue(defaultValue);
        }
        else {
            if (defaultValue >= 24 * 60)
                throw new Error(`wrong default value: ${defaultValue}`);
            this.defaultValue = defaultValue;
        }
        if (this.widget2 && this.widget2.getValue() === null && this.state.value) {
            this.setValue2(null);
        }
    }
    setValueFromView2(widgetValue) {
        if (isNaN(widgetValue))
            throw new Error(this.getTimeErrorText());
        this.setValue2(widgetValue);
    }
    getTimeErrorText() {
        return this.getModel().getApp().getText().field.timeNotValid;
    }
    setValue2(widgetValue) {
        const value = widgetValue !== null ? widgetValue : this.defaultValue;
        const [h, m] = common_1.TimeBox.splitTime(value);
        this.state.value.setHours(h, m);
    }
    validate2() {
        // console.log('RowFormFieldController.validate', this.model.getFullName());
        this.state.error2 = this.getError2();
    }
    getError2() {
        // console.log('RowFormFieldController.getError', this.model.getFullName());
        // parse validator
        if (this.widget2) {
            try {
                const widgetValue = this.widget2.getValue();
            }
            catch (err) {
                return `can't parse time: ${err.message}`;
            }
        }
        return null;
    }
    isParseError2() {
        return this.state.parseError2 !== null;
    }
    resetErrors2() {
        this.setError2(null);
        this.state.parseError2 = null;
    }
    setError2(error2) {
        this.state.error2 = error2;
    }
    getErrorMessage2() {
        if (this.state.parseError2) {
            return this.state.parseError2;
        }
        return this.state.error2;
    }
    isValid2() {
        return this.state.parseError2 === null && this.state.error2 === null;
    }
    refill() {
        // console.log('RowFormDateTimeFieldController.refill');
        if (!this.widget2)
            return;
        super.refill();
        this.widget2.setValue(this.getValueForTime());
        this.resetErrors2();
        this.refreshChangedState();
    }
    isParseError() {
        return super.isParseError() || this.isParseError2();
    }
    isValid() {
        return super.isValid() && this.isValid2();
    }
    getErrorMessage() {
        if (super.getErrorMessage() === null && this.getErrorMessage2() === null)
            return null;
        return [
            ...(super.getErrorMessage() ? [super.getErrorMessage()] : []),
            ...(this.getErrorMessage2() ? [this.getErrorMessage2()] : []),
        ].join(', ');
    }
    isValidateOnChange2() {
        return true;
    }
    isValidateOnBlur2() {
        return false;
    }
}
exports.RowFormDateTimeFieldController = RowFormDateTimeFieldController;
Helper_1.Helper.registerGlobalClass(RowFormDateTimeFieldController);
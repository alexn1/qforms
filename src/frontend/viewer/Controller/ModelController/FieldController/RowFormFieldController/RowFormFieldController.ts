import React from 'react';

import { FieldController } from '../FieldController';
import { Field } from '../../../../Model/Field/Field';
import { FormController } from '../../FormController/FormController';
import { RowFormController } from '../../FormController/RowFormController/RowFormController';
import { RowForm } from '../../../../Model/Form/RowForm/RowForm';
import { JSONString, RawRow } from '../../../../../../types';
import { RowFormFieldView } from './RowFormFieldView';

export class RowFormFieldController<TField extends Field = Field> extends FieldController<TField> {
    state: { value: any; parseError: string | null; error: string | null; changed: boolean } = {
        value: null,
        parseError: null,
        error: null,
        changed: false,
    };

    constructor(model: TField, parent: FormController) {
        super(model, parent);
        /* this.state = {
            value: null,
            parseError: null,
            error: null,
            changed: false,
        }; */
    }

    init() {
        const row = this.getRow();
        const value = this.getModel().getValue(row);
        this.setValue(value);
        // console.debug(this.getModel().getFullName(), value);
    }

    refill() {
        // console.debug('RowFormFieldController.refill', this.getModel().getFullName());
        if (!this.view) return;
        const value = this.getModel().getValue(this.getRow());
        this.setValue(value);
        this.resetErrors();
        this.refreshChangedState();
    }

    getRow(): RawRow {
        const form = this.getModel().getForm() as RowForm;
        return form.getRow();
    }

    getForm<TRowFormController extends FormController = RowFormController>(): TRowFormController {
        return this.getParent() as TRowFormController;
    }

    copyValueToModel() {
        // console.debug('RowFormFieldController.copyValueToModel', this.getModel().getFullName());
        this.getModel().setValue(this.getRow(), this.getValue());
    }

    /*_onChange(widgetValue) {

    }*/

    putValue(widgetValue: string) {
        // console.debug('RowFormFieldController.putValue', widgetValue);
        this.onChange(widgetValue, false);
    }

    onChange = async (widgetValue: string, fireEvent = true) => {
        console.debug(
            'RowFormFieldController.onChange',
            JSON.stringify(
                typeof widgetValue === 'string' ? widgetValue.substring(0, 100) : widgetValue,
            ),
        );
        // this._onChange(widgetValue);

        this.resetErrors();
        this.rerender();

        // get value from widget
        try {
            this.setValueFromWidget(widgetValue);
        } catch (err) {
            console.error(
                `${this.getModel().getFullName()}: cannot parse view value: ${err.message}`,
            );
            this.state.parseError = err.message;
        }

        // validate
        if (!this.state.parseError && this.isValidateOnChange()) {
            this.validate();
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
            } catch (err) {
                console.error('unhandled change event error:', this.getModel().getFullName(), err);
            }
            this.getParent<RowFormController>().onFieldChange({ source: this });
        }
    };

    onBlur = (widgetValue: string, fireEvent = true) => {
        console.debug(
            'RowFormFieldController.onBlur',
            this.getModel().getFullName(),
            JSON.stringify(widgetValue),
        );
        if (!this.isEditable()) return;

        // this.resetErrors();
        this.rerender(); // to clear field focus class

        if (!this.isValidateOnBlur()) return;

        // get value from widget
        try {
            this.setValueFromWidget(widgetValue);
        } catch (err) {
            console.error(
                `${this.getModel().getFullName()}: cannot parse view value: ${err.message}`,
            );
            this.state.parseError = err.message;
        }

        // validate
        if (!this.state.parseError && this.isValidateOnBlur()) {
            this.validate();
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
            } catch (err) {
                console.error('unhandled change event error:', this.getModel().getFullName(), err);
            }
            this.getParent<RowFormController>().onFieldChange({ source: this });
        }
    };

    getValueForWidget() {
        const value = this.getValue();
        // console.debug('value:', this.getModel().getFullName(), value, typeof value);
        return this.valueToString(value);
    }

    setValueFromWidget(widgetValue: string) {
        // console.debug('RowFormFieldController.setValueFromWidget', this.getModel().getFullName(), typeof widgetValue, widgetValue);
        if (typeof widgetValue !== 'string')
            throw new Error(
                `${this.getModel().getFullName()}: widgetValue must be string, but got ${typeof widgetValue}`,
            );
        const value = this.stringToValue(widgetValue);
        // console.debug('value:', value);
        this.setValue(value);
    }

    setValue(value: any) {
        // console.debug('RowFormFieldController.setValue', this.getModel().getFullName(), value);
        this.state.value = value;
    }

    getValue() {
        return this.state.value;
    }

    isChanged(): boolean {
        // console.debug('RowFormFieldController.isChanged', this.getModel().getFullName(), this.state);
        return this.state.changed;
    }

    isValid() {
        return this.state.parseError === null && this.state.error === null;
    }

    validate() {
        // console.debug('RowFormFieldController.validate', this.getModel().getFullName());
        if (this.isVisible()) {
            this.state.error = this.getError();
        }
    }

    refreshChangedState() {
        this.state.changed = this.calcChangedState(this.getRow());
    }

    getPlaceholder() {
        // console.debug('RowFormFieldController.getPlaceholder', this.getModel().getFullName(), this.getModel().getAttr('placeholder'));
        if (this.getModel().getAttr('placeholder')) return this.getModel().getAttr('placeholder');
        if (this.getApp().isDebugMode()) {
            const value = this.getValue();
            if (value === undefined) return 'undefined';
            if (value === null) return 'null';
            if (value === '') return 'empty string';
        }
        return null;
    }

    getError() {
        // console.debug('RowFormFieldController.getError', this.getModel().getFullName());

        // parse validator
        if (this.view && (this.view as RowFormFieldView).getWidget()) {
            try {
                const widgetValue = (this.view as RowFormFieldView).getWidget().getValue();
            } catch (err) {
                return `can't parse value: ${err.message}`;
            }
        }

        // null validator
        const value = this.getValue();
        if (this.getModel().isNotNull() && (value === null || value === undefined)) {
            return this.getNullErrorText();
        }

        return null;
    }

    getNullErrorText(): string {
        return this.getModel().getApp().getText().form.required;
    }

    isEditable(): boolean {
        return (
            (this.getParent() as RowFormController).getMode() === 'edit' &&
            !this.getModel().isReadOnly()
        );
    }

    isParseError() {
        return this.state.parseError !== null;
    }

    calcChangedState(row: RawRow) {
        // console.debug('RowFormFieldController.calcChangedState', this.getModel().getFullName());
        if (!row) throw new Error('FieldController: no row');
        if (this.isParseError()) {
            console.debug(
                `FIELD CHANGED ${this.getModel().getFullName()}: parse error: ${this.getErrorMessage()}`,
            );
            return true;
        }
        if (!this.isValid()) {
            console.debug(
                `FIELD CHANGED ${this.getModel().getFullName()}: not valid: ${this.getErrorMessage()}`,
            );
            return true;
        }
        if (this.getModel().hasColumn()) {
            const fieldRawValue = this.getModel().valueToRaw(this.getValue());
            const dsRawValue = this.getModel().getRawValue(row);
            if (fieldRawValue !== dsRawValue) {
                console.debug(
                    `FIELD CHANGED ${this.getModel().getFullName()}`,
                    JSON.stringify(dsRawValue),
                    JSON.stringify(fieldRawValue),
                );
                return true;
            }
            if (this.getModel().isChanged(row)) {
                let original = row[this.getModel().getAttr('column')];
                let modified = this.getModel().getDefaultDataSource().getRowWithChanges(row)[
                    this.getModel().getAttr('column')
                ];
                if (original) original = original.substr(0, 100) as JSONString;
                if (modified) modified = modified.substr(0, 100) as JSONString;
                console.debug(
                    `MODEL CHANGED ${this.getModel().getFullName()}:`,
                    original,
                    modified,
                );
                return true;
            }
        }
        return false;
    }

    setError(error: string | null) {
        this.state.error = error;
    }

    resetErrors() {
        this.setError(null);
        this.state.parseError = null;
    }

    getErrorMessage() {
        if (this.state.parseError) {
            return this.state.parseError;
        }
        return this.state.error;
    }

    renderView(): any {
        return React.createElement(this.getViewClass(), {
            onCreate: this.onViewCreate,
            ctrl: this,
        });
    }

    isValidateOnChange() {
        return this.getModel().validateOnChange();
    }

    isValidateOnBlur() {
        return this.getModel().validateOnBlur();
    }

    onChangePure = async (value: any, fireEvent = true) => {
        console.debug('RowFormFieldController.onChangePure', JSON.stringify(value));

        // value
        this.setValue(value);
        this.resetErrors();
        this.rerender();

        // validate
        if (this.isValidateOnChange()) {
            this.validate();
            if (this.isValid()) {
                this.copyValueToModel();
            }
        }

        // changed
        this.refreshChangedState();

        // event
        if (fireEvent) {
            try {
                this.emit('change', { value });
            } catch (err) {
                console.error('unhandled change event error:', this.getModel().getFullName(), err);
            }
            (this.getParent() as RowFormController).onFieldChange({ source: this });
        }
    };
}

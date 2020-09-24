'use strict';

class FieldController extends ModelController {

    static create(model, parent) {
        // console.log('FieldController.create', model.getFullName());
        let obj;
        if (model.data.js) {
            const CustomClass = eval(model.data.js);
            if (!CustomClass) throw new Error(`custom class of "${model.getName()}" field does not return type`);
            obj = new CustomClass(model, parent);
        } else {
            obj = eval(`new ${model.data.class}Controller(model, parent);`);
        }
        return obj;
    }

    constructor(model, parent) {
        super(model);
        this.parent = parent;
        this.views  = new Map();    // list of all views that controlled by this field
        this.html   = null;
    }

    init() {
    }

    deinit() {
        // console.log('FieldController.deinit:', this.model.getFullName());
        this.views = null;
        super.deinit();
    }

    renderView() {
        if (this.html === null) {
            this.html = QForms.render(this.model.data.view, {model: this.model});
        }
        return $(this.html).get(0);
    }

    fill(row, view) {
        // console.log('FieldController.fill', this.model.getFullName());
        this.views.set(row, view);
        view.dbRow = row;
        const value = this.model.getValue(row);
        this.setValue(value, view);
        this.setViewStyle(view, row);
    }

    refill(row, view) {
        // console.log('FieldController.refill', this.model.getFullName());
        const value = this.model.getValue(row);
        this.setValue(value, view);
        this.setViewStyle(view, row);
        this.updateChangedClass(row, view);
        this.updateErrorClass(view, true);
        view.firstElementChild.classList.remove('error');
    }

    updateChangedClass(row, view) {
        // console.log('FieldController.updateChangedClass', this.model.getFullName(), this.isChanged(row, view));
        if (this.isChanged(row, view)) {
            $(view).addClass('changed');
        } else {
            $(view).removeClass('changed');
        }
    }

    getStringValue(view) {
        switch (this.model.getForm().getClassName()) {
            case 'RowForm'  : return view.firstElementChild.value;
            case 'TableForm': return view.firstElementChild.innerHTML;
            default: throw new Error(`unknown form class: ${this.model.getForm().getClassName()}`);
        }
    }

    setStringValue(stringValue, view) {
        switch (this.model.getForm().getClassName()) {
            case 'RowForm'  : view.firstElementChild.value     = stringValue; break;
            case 'TableForm': view.firstElementChild.innerHTML = stringValue; break;
            default: throw new Error(`unknown form class: ${this.model.getForm().getClassName()}`);
        }
    }

    setPlaceHolder(view, value) {
        // console.log('FieldController.setPlaceHolder', this.model.getFullName(), value);
    }

    setValue(value, view) {
        // console.log('FieldController.setValue', this.model.getFullName(), this.model.getColumnType(), typeof value, value);
        const stringValue = this.valueToString(value);
        this.setStringValue(stringValue, view);
        this.setPlaceHolder(view, value);
    }

    getValue(view) {
        // console.log('FieldController.getValue', this.model.getFullName());
        const stringValue = this.getStringValue(view);
        const value = this.stringToValue(stringValue);
        this.setPlaceHolder(view, value);
        return value;
    }

    setViewStyle(view, row) {
    }

    beginEdit(view) {
    }

    endEdit(view) {
    }

    isValid(view) {
        // console.log('FieldController.isValid', this.model.getFullName());
        try {
            const value = this.getValue(view);

            // null check
            let isValid = true;
            if (this.model.data.notNull === 'true') {
                isValid = !this.isEmpty(value);
                if (!isValid) console.error(`${this.model.getFullName()}: null`);
            }

            // type check
            let isValid2 = true;
            if (this.model.getColumnType() === 'number') {
                isValid2 = !isNaN(Number(value));
                if (!isValid2) console.error('not number');
            }

            if (!isValid || !isValid2) {
                console.error(`${this.model.getFullName()}: not valid`);
            }
            return isValid && isValid2;
        } catch (err) {
            console.error(`${this.model.getFullName()} not valid:`, err.message);
            return false;
        }
    }

    onChange(el) {
        console.log('FieldController.onChange', this.model.getFullName());
        const view = el.parentNode;
        const row = view.dbRow;
        const valid = this.isValid(view);
        if (valid) {
            this.model.setValue(row, this.getValue(view));
        }
        this.updateErrorClass(view, valid);
        this.updateChangedClass(row, view);
        this.parent.onFieldChange({source: this, view, row, el, field: this});
    }

    updateErrorClass(view, valid) {
        // console.log('FieldController.updateErrorClass', this.model.getFullName(), valid);
        if (valid) {
            view.classList.remove('error');
        } else {
            view.classList.add('error');
        }
    }

    isEmpty(value) {
        return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
    }

    isChanged(row, view) {
        // console.log('FieldController.isChanged', this.model.getFullName());
        if (!row) throw new Error('FieldController: no row');
        if (!view) throw new Error('FieldController: no view');
        // if (!this.isValid(view)) return true;
        const changed = this.model.isChanged(row);
        if (changed) {
            console.log(`FIELD CHANGED ${this.model.getFullName()}:`, row[this.model.data.column], this.model.getDataSource().changes.get(row)[this.model.data.column]);
        }
        return changed;
    }

    valueToString(value) {
        // console.log('Field.valueToString', this.getFullName(), typeof value, value);
        switch (typeof value) {
            case 'string':
                return value;
            case 'object':
                if (value === null) return '';
                if (value instanceof Date) return value.toISOString();
                return JSON.stringify(value, null, 4);
            case 'number':
            case 'boolean':
                return value.toString();
            case 'undefined':
                return '';
            default: throw new Error(`${this.model.getFullName()}: unknown value type: ${typeof value}, value: ${value}`);
        }
    }

    stringToValue(stringValue) {
        if (stringValue.trim() === '') return null;
        const columnType = this.model.getColumnType();
        if (columnType === 'object' || columnType === 'boolean') {
            return JSON.parse(stringValue);
        } else if (columnType === 'date') {
            const date = new Date(stringValue);
            if (date.toString() === 'Invalid Date') throw new Error(`invalid date: ${stringValue}`);
            return date;
        } else if (columnType === 'number') {
            const num = Number(stringValue);
            if (isNaN(num)) throw new Error('not a number');
            return num;
        }
        return stringValue;
    }

}

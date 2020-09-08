'use strict';

class FieldController extends ModelController {
    constructor(model, parent) {
        super(model);
        this.parent = parent;
        this.views  = new Map();    // list of all views that controlled by this field
        this.html   = null;
    }

    static create(model, parent) {
        // console.log('FieldController.create', model.getFullName());
        let obj;
        if (model.data.js) {
            const CustomClass = eval(model.data.js);
            if (!CustomClass) throw new Error(`custom class of "${model.name}" field does not return type`);
            obj = new CustomClass(model, parent);
        } else {
            obj = eval(`new ${model.data.class}Controller(model, parent);`);
        }
        return obj;
    }

    init() {
    }

    deinit() {
        //console.log('FieldController.deinit: ' + this.model.name);
        this.views = null;
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

    getValue(view) {
        // console.log('FieldController.getValue', this.model.getFullName());
        const getStringValue = this.getStringValue(view);
        if (this.model.getColumnType() === 'object') return this.parseValue(getStringValue);
        return getStringValue;
    }

    getStringValue(view) {
        switch (this.model.getForm().getClassName()) {
            case 'RowForm': return view.firstElementChild.value;
            case 'TableForm': return view.firstElementChild.innerHTML;
            default: throw new Error(`unknown form class: ${this.model.getForm().getClassName()}`);
        }
    }

    setStringValue(stringValue, view) {
        switch (this.model.getForm().getClassName()) {
            case 'RowForm':view.firstElementChild.value = stringValue;break;
            case 'TableForm':view.firstElementChild.innerHTML = stringValue;break;
            default: throw new Error(`unknown form class: ${this.model.getForm().getClassName()}`);
        }
    }

    parseValue(value) {
        // console.log('FieldController.parseValue', this.model.getFullName());
        if (value.trim() === '') return null;
        return JSON.parse(value);
    }

    setPlaceHolder(value, view) {
        // console.log('FieldController.setPlaceHolder', this.model.getFullName(), value);
        if (this.model.getForm().getClassName() === 'RowForm') {
            if (value === undefined) {
                view.firstElementChild.placeholder = 'undefined';
            } else if (value === null) {
                view.firstElementChild.placeholder = 'null';
            } else if (value === '') {
                view.firstElementChild.placeholder = 'empty string';
            } else {
                view.firstElementChild.placeholder = this.valueToString(value);
            }
        }
    }

    valueToString(value) {
        switch (typeof value) {
            case 'string': return value;
            case 'object':
                if (value === null) return '';
                return JSON.stringify(value, null, 4);
            case 'number':
            case 'boolean':
                return value.toString();
            case 'undefined':
                return '';
            default: throw new Error(`${this.model.getFullName()}: unknown value type: ${typeof value}, value: ${value}`);
        }
    }

    setValue(value, view) {
        // console.log('FieldController.setValue', this.model.getFullName());
        this.setPlaceHolder(value, view);
        this.setStringValue(this.valueToString(value), view);
    }

    setViewStyle(view, row) {
    }

    beginEdit(view) {
    }

    endEdit(view) {
    }

    isValid(view) {
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
            console.error('not valid: ', err.message);
            return false;
        }
    }

    onChange(el) {
        console.log('FieldController.onChange', this.model.name);
        const view = el.parentNode;
        const row = view.dbRow;
        const valid = this.isValid(view);
        if (valid) {
            const value = this.getValue(view);
            const newValue = this.model.setValue(row, value);
            // this.setValue(newValue, view);
            this.setPlaceHolder(newValue, view);
        }
        this.updateErrorClass(view, valid);

        // event
        this.updateChangedClass(row, view);
        this.parent.onFieldChange({source: this, view, row, el, field: this});
    }

    updateErrorClass(view, valid) {
        if (valid) {
            view.firstElementChild.classList.remove('error');
        } else {
            view.firstElementChild.classList.add('error');
        }
    }

    isEmpty(value) {
        return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
    }

    isChanged(row, view) {
        if (!row) throw new Error('FieldController: no row');
        if (!view) throw new Error('FieldController: no view');
        // console.log('FieldController.isChanged', this.model.getFullName());
        const fieldChanged = this.valueToString(this.model.getValue(row)) !== this.getStringValue(view);
        if (fieldChanged) {
            console.log(`FIELD CHANGED ${this.model.getFullName()}:`);
            console.log('this.getStringValue(view):', this.getStringValue(view));
            console.log('this.model.getValue(row):', this.model.getValue(row));
            console.log('this.valueToString(this.model.getValue(row)):', this.valueToString(this.model.getValue(row)));
            console.log('row:', row);
        }
        const rowChanged = this.model.isChanged(row);
        if (rowChanged) {
            console.log(`ROW CHANGED ${this.model.getFullName()}:`, row[this.model.data.column], this.model.getDataSource().changes.get(row)[this.model.data.column]);
        }
        return rowChanged || fieldChanged;
    }

}

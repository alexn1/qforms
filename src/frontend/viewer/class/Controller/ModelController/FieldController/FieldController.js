'use strict';

class FieldController extends ModelController {

    static create(model, parent) {
        // console.log('FieldController.create', model.getFullName(), parent.model.getClassName());
        let obj;
        if (model.data.js) {
            const CustomClass = eval(model.data.js);
            if (!CustomClass) throw new Error(`custom class of "${model.getName()}" field does not return type`);
            obj = new CustomClass(model, parent);
        } else {
            let className = `${parent.model.getClassName()}${model.getClassName()}Controller`;
            // console.log('className:', className);
            obj = eval(`new ${className}(model, parent);`);
        }
        return obj;
    }

    constructor(model, parent) {
        super(model);
        this.parent = parent;
    }

    init() {
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
        // console.log('FieldController.stringToValue', this.model.getFullName(), stringValue);
        if (stringValue.trim() === '') return null;
        const columnType = this.model.getColumnType();
        // console.log('columnType:', columnType);
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

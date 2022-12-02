import {Field} from '../Field';

export class TextAreaField extends Field {
    getRows() {
        return this.data.rows;
    }
    getCols() {
        return this.data.cols;
    }
}
window.TextAreaField = TextAreaField;

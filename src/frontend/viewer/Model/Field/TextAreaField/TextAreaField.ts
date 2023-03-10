import { Field } from '../Field';
import { Helper } from '../../../../common';

export class TextAreaField extends Field {
    getRows() {
        return this.data.rows;
    }

    getCols() {
        return this.data.cols;
    }
}

Helper.registerGlobalClass(TextAreaField);

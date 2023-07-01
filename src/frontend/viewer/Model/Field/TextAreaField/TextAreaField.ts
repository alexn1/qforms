import { Field } from '../Field';
import { Helper } from '../../../../common';

export class TextAreaField extends Field {
    getRows() {
        return this.getData().rows;
    }

    getCols() {
        return this.getData().cols;
    }
}

Helper.registerGlobalClass(TextAreaField);

import { ModelView } from '../ModelView';
import { FieldController } from './FieldController';
import {Field} from '../../../Model/Field/Field'

export class FieldView<T extends FieldController<Field>> extends ModelView<T> {
    getStyle(row) {
        return this.getCtrl().getViewStyle(row);
    }
}

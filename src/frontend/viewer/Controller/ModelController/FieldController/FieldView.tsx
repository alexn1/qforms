import { ModelView } from '../ModelView';
import { FieldController } from './FieldController';

export class FieldView<T extends FieldController> extends ModelView<T> {
    getStyle(row) {
        return this.getCtrl().getViewStyle(row);
    }
}

import { FieldController } from '../FieldController';

export class TableFormFieldController extends FieldController {
    getValueForWidget(row) {
        // console.log('TableFormFieldController.getValueForWidget');
        return this.valueToString(this.model.getValue(row));
    }
}

// @ts-ignore
window.TableFormFieldController = TableFormFieldController;

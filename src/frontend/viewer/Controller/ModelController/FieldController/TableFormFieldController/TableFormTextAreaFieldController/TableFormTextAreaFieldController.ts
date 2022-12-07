import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormTextAreaFieldView } from './TableFormTextAreaFieldView';

export class TableFormTextAreaFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormTextAreaFieldView;
    }
}

// @ts-ignore
window.TableFormTextAreaFieldController = TableFormTextAreaFieldController;

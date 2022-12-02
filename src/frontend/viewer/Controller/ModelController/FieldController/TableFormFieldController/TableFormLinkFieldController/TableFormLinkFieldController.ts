import {TableFormFieldController} from '../TableFormFieldController';
import {TableFormLinkFieldView} from './TableFormLinkFieldView';

export class TableFormLinkFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormLinkFieldView;
    }
    onClick = e => {
        console.log('TableFormLinkFieldController.onClick', e);
        e.preventDefault();
        this.emit('click', {source: this});
    }
}

// @ts-ignore
window.TableFormLinkFieldController = TableFormLinkFieldController;

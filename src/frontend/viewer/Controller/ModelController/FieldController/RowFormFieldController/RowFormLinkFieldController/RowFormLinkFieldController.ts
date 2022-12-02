import {RowFormFieldController} from '../RowFormFieldController';
import {RowFormLinkFieldView} from './RowFormLinkFieldView';

export class RowFormLinkFieldController extends  RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormLinkFieldView;
    }
    onClick = e => {
        console.log('RowFormLinkFieldController.onClick', e);
        // @ts-ignore
        this.emit({source: this});
    }
}

// @ts-ignore
window.RowFormLinkFieldController = RowFormLinkFieldController;

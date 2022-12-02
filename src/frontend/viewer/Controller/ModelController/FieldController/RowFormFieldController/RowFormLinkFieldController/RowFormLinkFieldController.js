import {RowFormFieldController} from '../RowFormFieldController';

export class RowFormLinkFieldController extends  RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormLinkFieldView;
    }
    onClick = e => {
        console.log('RowFormLinkFieldController.onClick', e);
        this.emit({source: this});
    }
}
window.RowFormLinkFieldController = RowFormLinkFieldController;

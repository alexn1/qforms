import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormLinkFieldView } from './RowFormLinkFieldView';
import { LinkField } from '../../../../../Model/Field/LinkField/LinkField';

export class RowFormLinkFieldController extends RowFormFieldController<LinkField> {
    getViewClass() {
        return super.getViewClass() || RowFormLinkFieldView;
    }
    onClick = e => {
        console.log('RowFormLinkFieldController.onClick', e);
        // @ts-ignore
        this.emit({ source: this });
    };
}

// @ts-ignore
window.RowFormLinkFieldController = RowFormLinkFieldController;

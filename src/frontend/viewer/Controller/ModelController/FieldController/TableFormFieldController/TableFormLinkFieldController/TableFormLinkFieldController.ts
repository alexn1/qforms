import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormLinkFieldView } from './TableFormLinkFieldView';
import { LinkField } from '../../../../../Model/Field/LinkField/LinkField';

export class TableFormLinkFieldController extends TableFormFieldController<LinkField> {
    getViewClass() {
        return super.getViewClass() || TableFormLinkFieldView;
    }

    onClick = (e) => {
        console.log('TableFormLinkFieldController.onClick', e);
        e.preventDefault();
        this.emit('click', { source: this });
    };
}

// @ts-ignore
window.TableFormLinkFieldController = TableFormLinkFieldController;

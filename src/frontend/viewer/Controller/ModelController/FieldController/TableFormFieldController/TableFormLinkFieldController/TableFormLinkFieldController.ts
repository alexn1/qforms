import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormLinkFieldView } from './TableFormLinkFieldView';
import { LinkField } from '../../../../../Model/Field/LinkField/LinkField';
import { Helper } from '../../../../../../common/Helper';

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

Helper.registerGlobalClass(TableFormLinkFieldController);

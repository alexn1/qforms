import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormLinkFieldView } from './RowFormLinkFieldView';
import { LinkField } from '../../../../../Model/Field/LinkField/LinkField';
import { SyntheticEvent } from 'react';

export class RowFormLinkFieldController extends RowFormFieldController<LinkField> {
    getViewClass() {
        return super.getViewClass() || RowFormLinkFieldView;
    }

    onClick = (e: SyntheticEvent) => {
        console.log('RowFormLinkFieldController.onClick', e);
        e.preventDefault();

        // @ts-ignore
        this.emit({ source: this });
    };
}

// @ts-ignore
window.RowFormLinkFieldController = RowFormLinkFieldController;

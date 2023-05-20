import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormLinkFieldView } from './RowFormLinkFieldView';
import { LinkField } from '../../../../../Model/Field/LinkField/LinkField';
import { SyntheticEvent } from 'react';
import { Helper } from '../../../../../../common/Helper';

export class RowFormLinkFieldController extends RowFormFieldController<LinkField> {
    getViewClass() {
        return super.getViewClass() || RowFormLinkFieldView;
    }

    onClick = (e: SyntheticEvent) => {
        console.log('RowFormLinkFieldController.onClick', e);
        const pageName = this.getModel().getAttr('page');
        if (pageName) {
            e.preventDefault();
            this.openPage({
                name: pageName,
                params: {
                    key: this.getValue(),
                },
            });
        }

        // @ts-ignore
        this.emit({ source: this });
    };

    getDisplayValue(): string {
        const displayColumn = this.getModel().getAttr('displayColumn');
        if (displayColumn) {
            const ds = this.getModel().getDefaultDataSource();
            const rawValue = ds.getValue(ds.getSingleRow(), displayColumn);
            return JSON.parse(rawValue);
        }
        return null;
    }
}

Helper.registerGlobalClass(RowFormLinkFieldController);

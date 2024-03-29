import { keyTupleToKey } from '../../../../../../../types';
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormLinkFieldController } from './RowFormLinkFieldController';

import './RowFormLinkFieldView.less';

export class RowFormLinkFieldView extends RowFormFieldView<RowFormLinkFieldController> {
    render() {
        const ctrl = this.getCtrl();
        let href = ctrl.getValueForWidget();
        let displayValue = ctrl.getValueForWidget();

        // valueOfDisplayColumn
        const valueOfDisplayColumn = ctrl.getDisplayValue();
        if (valueOfDisplayColumn) {
            displayValue = valueOfDisplayColumn;
        }

        const pageName = ctrl.getModel().getAttr('page');
        if (pageName) {
            const value = ctrl.getValueForWidget();
            href = ctrl.getPage().createOpenInNewLink(pageName, keyTupleToKey([value]));
            // console.debug('href:', link);
        }

        return (
            <div className={this.getCssClassNames()}>
                <a href={href} onClick={ctrl.onClick} target={'_blank'} rel={'noreferrer'}>
                    {displayValue}
                </a>
            </div>
        );
    }
}

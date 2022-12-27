import { RowFormFieldView } from '../RowFormFieldView';
import { CheckBoxList } from '../../../../../../common';
import './RowFormCheckBoxListFieldView.less';

export class RowFormCheckBoxListFieldView extends RowFormFieldView {
    getItems() {
        const ctrl = this.getCtrl();
        try {
            return ctrl.getRows().map(row => {
                return ctrl.getItemFromRow(row);
            });
        } catch (err) {
            err.message = `${ctrl.getModel().getFullName()}: ${err.message}`;
            throw err;
        }
    }
    renderCheckBoxList() {
        const ctrl = this.getCtrl();
        return (
            <CheckBoxList
                name={ctrl.getModel().getFullName()}
                classList={[`${this.getCssBlockName()}__checkboxlist`]}
                onCreate={this.onWidgetCreate}
                value={ctrl.getValueForWidget()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                items={this.getItems()}
            />
        );
    }
    render() {
        return <div className={this.getCssClassNames()}>{this.renderCheckBoxList()}</div>;
    }
}

// @ts-ignore
window.RowFormCheckBoxListFieldView = RowFormCheckBoxListFieldView;

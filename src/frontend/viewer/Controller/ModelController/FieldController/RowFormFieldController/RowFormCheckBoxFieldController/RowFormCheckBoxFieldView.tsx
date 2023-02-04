import { RowFormFieldView } from '../RowFormFieldView';
import { CheckBox } from '../../../../../../common';
import { RowFormCheckBoxFieldController } from './RowFormCheckBoxFieldController';
import './RowFormCheckBoxFieldView.less';

export class RowFormCheckBoxFieldView<
    T extends RowFormCheckBoxFieldController
> extends RowFormFieldView<T> {
    onCheckBoxChange = (checked, e) => {
        this.getCtrl().onChange(checked);
    };
    render() {
        // console.log('RowFormCheckBoxFieldView.render');
        const ctrl = this.getCtrl();
        return (
            <div className={this.getCssClassNames()}>
                <CheckBox
                    onCreate={this.onWidgetCreate}
                    checked={ctrl.getValueForWidget()}
                    readOnly={!ctrl.isEditable()}
                    disabled={!ctrl.isEditable()}
                    onChange={this.onCheckBoxChange}
                />
            </div>
        );
    }
}

// @ts-ignore
window.RowFormCheckBoxFieldView = RowFormCheckBoxFieldView;

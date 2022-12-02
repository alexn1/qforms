import {RowFormFieldView} from '../RowFormFieldView';

export class RowFormCheckBoxFieldView extends RowFormFieldView {
    onCheckBoxChange = (checked, e) => {
        this.getCtrl().onChange(checked);
    }
    render() {
        // console.log('RowFormCheckBoxFieldView.render');
        const ctrl = this.getCtrl();
        return <div className={this.getCssClassNames()}>
            <CheckBox
                onCreate={this.onWidgetCreate}
                checked={ctrl.getValueForWidget()}
                readOnly={!ctrl.isEditable()}
                disabled={!ctrl.isEditable()}
                onChange={this.onCheckBoxChange}
            />
        </div>;
    }
}

window.RowFormCheckBoxFieldView = RowFormCheckBoxFieldView;
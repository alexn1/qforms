import { RowFormFieldView } from '../RowFormFieldView';
import { DropdownDatePicker } from '../../../../../../common';

export class RowFormDateFieldView extends RowFormFieldView {
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getCssClassNames()}>
                <DropdownDatePicker
                    classList={[`${this.getCssBlockName()}__date-picker`]}
                    onCreate={this.onWidgetCreate}
                    value={ctrl.getValueForWidget()}
                    readOnly={!ctrl.isEditable()}
                    onChange={ctrl.onChange}
                    placeholder={ctrl.getPlaceholder()}
                    format={ctrl.getFormat()}
                    oldDates={this.props.oldDates}
                    // getMinDate={this.props.getMinDate}
                    minDate={this.props.minDate}
                />
            </div>
        );
    }
}

// @ts-ignore
window.RowFormDateFieldView = RowFormDateFieldView;

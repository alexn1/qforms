import { RowFormFieldView } from '../RowFormFieldView';
import { DropdownDatePicker } from '../../../../../../common';
import { RowFormDateFieldController } from './RowFormDateFieldController';

import './RowFormDateFieldView.less';

export class RowFormDateFieldView extends RowFormFieldView<RowFormDateFieldController> {
    render() {
        const ctrl = this.getCtrl();
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
                    debug={ctrl.getApp().isDebugMode()}
                />
            </div>
        );
    }
}

import { RowFormFieldView } from '../RowFormFieldView';
import { DropdownDatePicker, TimeBox2 } from '../../../../../../common';
import { RowFormDateTimeFieldController } from './RowFormDateTimeFieldController';
import './RowFormDateTimeFieldView.less';

export class RowFormDateTimeFieldView extends RowFormFieldView<RowFormDateTimeFieldController> {
    onClear2 = async () => {
        // console.debug('RowFormDateTimeFieldView.onClear2');
        this.getCtrl().onChange2(null);
    };

    isCloseVisible() {
        if (this.props.readOnly) return false;
        const { ctrl } = this.props;
        if (!ctrl.widget2) {
            return this.props.value !== undefined;
        }
        return ctrl.widget2.state.value !== '';
    }

    renderDatePart() {
        const ctrl = this.getCtrl();
        return (
            <DropdownDatePicker
                classList={[`${this.getCssBlockName()}__dropdown-date-picker`]}
                onCreate={this.onWidgetCreate}
                value={ctrl.getValueForWidget()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                placeholder={ctrl.getPlaceholder()}
                format={ctrl.getFormat()}
                oldDates={this.props.oldDates}
                // getMinDate={this.props.getMinDate}
                highlightedDate={ctrl.getHighlightedDate ? ctrl.getHighlightedDate() : null}
                selectToday={ctrl.getSelectToday ? ctrl.getSelectToday() : null}
                minDate={ctrl.getMinDate ? ctrl.getMinDate() : null}
                debug={ctrl.getApp().getHostApp().isDebugMode()}
            />
        );
    }

    renderTimePart() {
        const ctrl = this.getCtrl();
        return (
            <TimeBox2
                classList={[`${this.getCssBlockName()}__time-box`]}
                onCreate={ctrl.onView2Create}
                readOnly={!ctrl.isEditable()}
                value={ctrl.getValueForTime()}
                onChange={ctrl.onChange2}
                onBlur={ctrl.isValidateOnBlur2() ? ctrl.onBlur2 : null}
                placeholder={ctrl.getPlaceholder2()}
                onClear={this.onClear2}
            />
        );
    }

    getMode(): 'datetime' | 'date' {
        return this.getCtrl().state.value ? 'datetime' : 'date';
    }

    render() {
        // console.debug('RowFormDateTimeFieldView.render');
        return (
            <div
                className={`${this.getCssClassNames()} ${this.getMode()}`}
                style={this.getStyle(this.getCtrl().getRow())}>
                {this.renderDatePart()}
                {this.renderTimePart()}
            </div>
        );
    }
}

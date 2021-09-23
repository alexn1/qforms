class RowFormDatePickerFieldView extends RowFormFieldView {
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getCssClassNames()}>
            <DropdownDatePicker
                onCreate={ctrl.onWidgetCreate}
                value={ctrl.getValueForWidget()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                placeholder={ctrl.getPlaceholder()}
                format={ctrl.model.getFormat()}
                oldDates={this.props.oldDates}
                getMinDate={this.props.getMinDate}
            />
        </div>;
    }
}
window.QForms.RowFormDatePickerFieldView = RowFormDatePickerFieldView;

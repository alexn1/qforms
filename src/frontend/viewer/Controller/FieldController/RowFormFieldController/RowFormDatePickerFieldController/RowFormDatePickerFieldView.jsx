class RowFormDatePickerFieldView extends RowFormFieldView {
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getClassName()}>
            <DropdownDatePicker
                onCreate={ctrl.onViewCreate}
                value={ctrl.getValueForView()}
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

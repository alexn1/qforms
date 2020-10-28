class RowFormDatePickerFieldView extends ReactComponent {
    getClassName() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return [
            'field',
            'RowFormDatePickerFieldView',
            ...(ctrl.state.changed ? ['changed'] : []),
            ...(ctrl.state.error !== null ? ['error'] : [])
        ].join(' ');
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getClassName()}>
            <DropdownDatePicker
                // onCreate={ctrl.onViewCreate}
                value={ctrl.renderValueForView()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                placeholder={ctrl.getPlaceHolder()}
                format={ctrl.model.getFormat()}
            />
        </div>;
    }
}
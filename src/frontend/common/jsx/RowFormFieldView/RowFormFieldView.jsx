class RowFormFieldView extends ReactComponent {
    getClassName() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return [
            'field',
            `RowForm${model.getClassName()}View`,
            model.getName(),
            ...(ctrl.state.changed ? ['changed'] : []),
            ...(ctrl.state.error !== null ? ['error'] : [])
        ].join(' ');
    }
    render() {
        // console.log('RowFormFieldView.render', this.props.ctrl.model.getClassName());
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        if (model.getClassName() === 'DatePickerField') {
            return (
                <div className={this.getClassName()}>
                    <DropdownDatePicker
                        // onCreate={ctrl.onViewCreate}
                        value={ctrl.getValueForView()}
                        readOnly={!ctrl.isEditable()}
                        onChange={ctrl.onChange}
                        placeholder={ctrl.getPlaceHolder()}
                    />
                </div>
            );
        }
        if (model.getClassName() === 'ComboBoxField') {
            return (
                <div className={this.getClassName()}>
                    <ComboBox
                        // onCreate={ctrl.onViewCreate}
                        value={ctrl.getValueForView()}
                        readOnly={!ctrl.isEditable()}
                        onChange={ctrl.onChange}
                        items={ctrl.getItems()}
                    />
                </div>
            );
        }
        return (
            <div className={this.getClassName()}>
                <TextBox
                    // onCreate={ctrl.onViewCreate}
                    value={ctrl.getValueForView()}
                    readOnly={!ctrl.isEditable()}
                    onChange={ctrl.onChange}
                    placeholder={ctrl.getPlaceHolder()}
                />
            </div>
        );
    }
}

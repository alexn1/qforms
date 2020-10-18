class RowFormFieldView extends ReactComponent {
    renderFieldView() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        if (model.getClassName() === 'DatePickerField') {
            return (
                <DropdownDatePicker
                    // onCreate={ctrl.onViewCreate}
                    value={ctrl.getValueForView()}
                    readOnly={!ctrl.isEditable()}
                    onChange={ctrl.onChange}
                    placeholder={ctrl.getPlaceHolder()}
                />
            );
        }
        if (model.getClassName() === 'ComboBoxField') {
            return (
                <ComboBox
                    // onCreate={ctrl.onViewCreate}
                    value={ctrl.getValueForView()}
                    readOnly={!ctrl.isEditable()}
                    onChange={ctrl.onChange}
                    items={ctrl.getItems()}
                />
            );
        }
        return (
            <TextBox
                // onCreate={ctrl.onViewCreate}
                value={ctrl.getValueForView()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                placeholder={ctrl.getPlaceHolder()}
            />
        );
    }
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
        return (
            <div className={this.getClassName()}>{this.renderFieldView()}</div>
        );
    }
}

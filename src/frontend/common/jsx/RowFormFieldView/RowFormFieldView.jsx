class RowFormFieldView extends ReactComponent {
    renderFieldViewContent() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        if (model.getClassName() === 'DatePickerField') {
            return (
                <DropdownDatePicker
                    // cb={ctrl.onFieldViewContentCreated}
                    value={ctrl.getValueForView()}
                    readOnly={model.isReadOnly()}
                    onChange={ctrl.onChange2}
                    placeholder={ctrl.getPlaceHolder()}
                />
            );
        }
        if (model.getClassName() === 'ComboBoxField') {
            return (
                <ComboBox
                    // cb={ctrl.onFieldViewContentCreated}
                    value={ctrl.getValueForView()}
                    readOnly={model.isReadOnly()}
                    onChange={ctrl.onChange2}
                    items={ctrl.getItems()}
                />
            );
        }
        return (
            <TextBox
                // cb={ctrl.onFieldViewContentCreated}
                value={ctrl.getValueForView()}
                readOnly={model.isReadOnly()}
                onChange={ctrl.onChange2}
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
            <div className={this.getClassName()}>{this.renderFieldViewContent()}</div>
        );
    }
}

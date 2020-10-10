class RowFormFieldView extends ReactComponent {
    renderFieldViewContent() {
        const model = this.props.model;
        const ctrl = this.props.ctrl;
        if (model.getClassName() === 'DatePickerField') {
            return (
                <DropdownDatePicker
                    // cb={ctrl.onFieldViewContentCreated}
                    value={ctrl.getValueForView()}
                    readOnly={ctrl.model.isReadOnly()}
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
                    readOnly={ctrl.model.isReadOnly()}
                    onChange={ctrl.onChange2}
                    items={ctrl.getItems()}
                />
            );
        }
        return (
            <TextBox
                // cb={ctrl.onFieldViewContentCreated}
                value={ctrl.getValueForView()}
                readOnly={ctrl.model.isReadOnly()}
                onChange={ctrl.onChange2}
                placeholder={ctrl.getPlaceHolder()}
            />
        );
    }
    getClassName() {
        const model = this.props.model;
        const ctrl = this.props.ctrl;
        return [
            'field',
            `RowForm${model.getClassName()}View`,
            model.getName(),
            ...(ctrl.state.changed ? ['changed'] : []),
            ...(ctrl.state.error !== null ? ['error'] : [])
        ].join(' ');
    }
    render() {
        // console.log('RowFormFieldView.render', this.props.model.getClassName());
        return (
            <div className={this.getClassName()}>{this.renderFieldViewContent()}</div>
        );
    }
}

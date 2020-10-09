class RowFormFieldView extends ReactComponent {
    renderFieldViewContent() {
        const model = this.props.model;
        const ctrl = this.props.ctrl;
        const row = this.props.row;
        const valueForView = ctrl.getValueForView(row);

        if (model.getClassName() === 'DatePickerField') {
            return (
                <DropdownDatePicker
                    cb={ctrl.onFieldViewContentCreated}
                    value={valueForView}
                    readOnly={model.data.readOnly === 'true'}
                    onChange={ctrl.onChange2}
                    placeholder={ctrl.getPlaceHolder()}

                />
            );
        }
        if (model.getClassName() === 'ComboBoxField') {
            return (
                <ComboBox
                    cb={ctrl.onFieldViewContentCreated}
                    items={ctrl.getItems()}
                    value={ctrl.valueToString(ctrl.model.getValue(row))}
                    readOnly={model.data.readOnly === 'true'}
                    onChange={ctrl.onChange2}
                />
            );
        }
        return (
            <TextBox
                cb={ctrl.onFieldViewContentCreated}
                value={valueForView}
                readOnly={model.data.readOnly === 'true'}
                onChange={ctrl.onChange2}
                placeholder={ctrl.getPlaceHolder(model.getValue(row))}
            />
        );
    }
    render() {
        console.log('RowFormFieldView.render', this.props.model.getClassName());
        const model = this.props.model;
        const ctrl = this.props.ctrl;
        return (
            <div
                className={`field RowForm${model.getClassName()}View ${model.getName()} ${ctrl.state.changed ? 'changed' : ''} ${ctrl.state.error ? 'error' : ''}`}>
                {this.renderFieldViewContent()}
            </div>
        );
    }
}

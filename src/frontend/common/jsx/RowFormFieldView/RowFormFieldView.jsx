class RowFormFieldView extends ReactComponent {
    renderFieldViewContent() {
        const model = this.props.model;
        const ctrl = this.props.ctrl;

        if (model.getClassName() === 'DatePickerField') {
            return (
                <DropdownDatePicker
                    cb={ctrl.onFieldViewContentCreated}
                    value={ctrl.getValueForView()}
                    readOnly={ctrl.isReadOnly()}
                    onChange={ctrl.onChange2}
                    placeholder={ctrl.getPlaceHolder()}
                />
            );
        }
        if (model.getClassName() === 'ComboBoxField') {
            return (
                <ComboBox
                    cb={ctrl.onFieldViewContentCreated}
                    value={ctrl.getValueForView()}
                    readOnly={ctrl.isReadOnly()}
                    onChange={ctrl.onChange2}
                    items={ctrl.getItems()}
                />
            );
        }
        return (
            <TextBox
                cb={ctrl.onFieldViewContentCreated}
                value={ctrl.getValueForView()}
                readOnly={ctrl.isReadOnly()}
                onChange={ctrl.onChange2}
                placeholder={ctrl.getPlaceHolder()}
            />
        );
    }
    render() {
        // console.log('RowFormFieldView.render', this.props.model.getClassName());
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

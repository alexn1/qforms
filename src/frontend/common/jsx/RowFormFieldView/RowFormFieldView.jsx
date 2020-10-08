class RowFormFieldView extends ReactComponent {
    renderFieldViewContent() {
        const model = this.props.model;
        const ctrl = this.props.ctrl;
        const row = this.props.row;
        const value = ctrl.getValueForView(row);

        if (model.getClassName() === 'DatePickerField') {
            return (
                <DropdownDatePicker value={value}/>
            );
        }

        return (
            <TextBox readOnly={model.data.readOnly === 'true'} value={value} cb={ctrl.onFieldViewContentCreated} onChange={ctrl.onChange2}></TextBox>
        );
    }
    render() {
        console.log('RowFormFieldView.render', this.props.model.getClassName());
        const model = this.props.model;
        return (
            <div
                className={`field RowForm${model.getClassName()}View ${model.getName()}`}>
                {this.renderFieldViewContent()}
            </div>
        );
    }
}

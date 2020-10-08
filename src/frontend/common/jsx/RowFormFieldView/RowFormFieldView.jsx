class RowFormFieldView extends ReactComponent {
    // getFieldId(model) {
    //     return `${model.getForm().getPage().id}_${model.getForm().getName()}_${model.getName()}`;
    // }
    getFieldViewContent(model, ctrl, row) {
        const value = ctrl.getValueForView(row);
        return (
            <TextBox value={value} name={model.getName()} cb={ctrl.onFieldViewContentCreated}></TextBox>
        );
    }
    render() {
        const model = this.props.model;
        const ctrl = this.props.ctrl;
        const row = this.props.row;
        return (
            <div
                className={`field ${model.getName()}`}>
                {this.getFieldViewContent(model, ctrl, row)}
            </div>
        );
    }
}

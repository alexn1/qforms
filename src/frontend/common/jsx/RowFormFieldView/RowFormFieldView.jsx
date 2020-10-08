class RowFormFieldView extends ReactComponent {
    renderFieldViewContent() {
        const ctrl = this.props.ctrl;
        const row = this.props.row;
        const value = ctrl.getValueForView(row);
        return (
            <TextBox value={value} cb={ctrl.onFieldViewContentCreated}></TextBox>
        );
    }
    render() {
        const model = this.props.model;
        return (
            <div
                className={`field ${model.getName()}`}>
                {this.renderFieldViewContent()}
            </div>
        );
    }
}

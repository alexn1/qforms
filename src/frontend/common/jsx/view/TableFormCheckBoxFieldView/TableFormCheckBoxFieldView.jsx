class TableFormCheckBoxFieldView extends TableFormFieldView {
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return (
            <div className="TableFormCheckBoxFieldView" style={ctrl.renderViewStyle(row)}>
                <CheckBox
                    checked={ctrl.renderValueForView(row)}
                    readOnly={true}
                    // disabled={true}
                />
            </div>
        );
    }
}

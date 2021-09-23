class TableFormCheckBoxFieldView extends TableFormFieldView {
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getCssClassNames()} style={ctrl.renderViewStyle(row)}>
                <CheckBox
                    checked={ctrl.getValueForWidget(row)}
                    readOnly={true}
                    // disabled={true}
                />
            </div>
        );
    }
}
window.QForms.TableFormCheckBoxFieldView = TableFormCheckBoxFieldView;

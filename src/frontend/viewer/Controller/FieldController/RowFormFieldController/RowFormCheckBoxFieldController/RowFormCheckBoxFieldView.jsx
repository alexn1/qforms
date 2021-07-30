class RowFormCheckBoxFieldView extends RowFormFieldView {
    render() {
        // console.log('RowFormCheckBoxFieldView.render');
        const ctrl = this.props.ctrl;
        return <div className={this.getClassName()}>
            <CheckBox
                onCreate={ctrl.onWidgetCreate}
                checked={ctrl.getValueForWidget()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
            />
        </div>;
    }
}

window.QForms.RowFormCheckBoxFieldView = RowFormCheckBoxFieldView;

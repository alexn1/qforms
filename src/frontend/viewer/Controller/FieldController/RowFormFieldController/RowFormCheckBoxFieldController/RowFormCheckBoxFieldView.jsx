class RowFormCheckBoxFieldView extends RowFormFieldView {
    render() {
        // console.log('RowFormCheckBoxFieldView.render');
        const ctrl = this.props.ctrl;
        return <div className={this.getClassName()}>
            <CheckBox
                onCreate={ctrl.onViewCreate}
                checked={ctrl.getValueForView()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
            />
        </div>;
    }
}

window.QForms.RowFormCheckBoxFieldView = RowFormCheckBoxFieldView;

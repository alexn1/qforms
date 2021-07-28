class RowFormComboBoxFieldView extends RowFormFieldView {
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getClassName()}>
                <ComboBox
                    onCreate={ctrl.onViewCreate}
                    nullable={true}
                    value={ctrl.getValueForView()}
                    readOnly={!ctrl.isEditable()}
                    onChange={ctrl.onChange}
                    items={ctrl.getItems()}
                    placeholder={ctrl.getPlaceholder()}
                />
                <button onClick={ctrl.onEditButtonClick}>...</button>
            </div>
        );
    }
}
window.QForms.RowFormComboBoxFieldView = RowFormComboBoxFieldView;

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
                {ctrl.getModel().getAttr('itemEditPage') && ctrl.getValue() &&
                    <Button
                        onClick={ctrl.onEditButtonClick}
                        // enabled={!!ctrl.getModel().getAttr('itemEditPage')}
                    >...</Button>
                }
            </div>
        );
    }
}
window.QForms.RowFormComboBoxFieldView = RowFormComboBoxFieldView;

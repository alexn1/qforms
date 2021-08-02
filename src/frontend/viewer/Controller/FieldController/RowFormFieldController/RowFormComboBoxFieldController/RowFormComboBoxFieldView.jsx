class RowFormComboBoxFieldView extends RowFormFieldView {
    render() {
        // console.log('RowFormComboBoxFieldView.render', this.props.ctrl.getItems());
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getClassName()}>
                <ComboBox
                    onCreate={ctrl.onWidgetCreate}
                    nullable={true}
                    value={ctrl.getValueForWidget()}
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
                {ctrl.getModel().getAttr('newRowMode')
                    && ctrl.getModel().getAttr('newRowMode') !== 'disabled'
                    && ctrl.getForm().getMode() === 'edit'
                    && <Button
                        onClick={ctrl.onCreateButtonClick}
                    >+</Button>
                }
            </div>
        );
    }
}
window.QForms.RowFormComboBoxFieldView = RowFormComboBoxFieldView;

class RowFormComboBoxFieldView extends RowFormFieldView {
    onChange = async e => {
        this.rerender();
        await this.props.ctrl.onChange(e);
    }
    render() {
        // console.log('RowFormComboBoxFieldView.render', this.props.ctrl.getItems(), this.props.ctrl.getValue());
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getClassName()}>
                <ComboBox
                    onCreate={ctrl.onWidgetCreate}
                    nullable={true}
                    value={ctrl.getValueForWidget()}
                    readOnly={!ctrl.isEditable()}
                    onChange={this.onChange}
                    items={ctrl.getItems()}
                    placeholder={ctrl.getPlaceholder()}
                />
                {ctrl.getModel().getAttr('itemEditPage') &&
                    <Button
                        onClick={ctrl.onEditButtonClick}
                        enabled={!!ctrl.getValue()}
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

class RowFormComboBoxFieldView extends RowFormFieldView {
    onChange = async widgetValue => {
        // console.log('RowFormComboBoxFieldView.onChange', widgetValue);
        this.rerender();
        await this.props.ctrl.onChange(widgetValue);
    }
    render() {
        // console.log('RowFormComboBoxFieldView.render', this.props.ctrl.getItems(), this.props.ctrl.getValue());
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getCssClassNames()}>
                <Select
                    classList={[`${this.getCssBlockName()}__select`]}
                    onCreate={ctrl.onWidgetCreate}
                    nullable={true}
                    value={ctrl.getValueForWidget()}
                    readOnly={!ctrl.isEditable()}
                    onChange={this.onChange}
                    items={ctrl.getItems()}
                    placeholder={ctrl.getPlaceholder()}
                    onMouseDown={ctrl.getModel().getAttr('itemSelectPage') ? ctrl.onItemSelect : null}
                />
                {ctrl.getModel().getAttr('itemEditPage') &&
                    <Button
                        classList={[`${this.getCssBlockName()}__edit-button`]}
                        onClick={ctrl.onEditButtonClick}
                        enabled={!!ctrl.getValue()}
                    >...</Button>
                }
                {ctrl.getModel().getAttr('newRowMode') !== 'disabled'
                    && ctrl.getForm().getModel().getAttr('itemCreatePage')
                    && ctrl.getForm().getModel().getAttr('itemCreateForm')
                    && ctrl.getForm().getMode() === 'edit'
                    && <Button
                        classList={[`${this.getCssBlockName()}__create-button`]}
                        onClick={ctrl.onCreateButtonClick}
                    >+</Button>
                }
            </div>
        );
    }
}
window.QForms.RowFormComboBoxFieldView = RowFormComboBoxFieldView;

class RowFormComboBoxFieldView extends RowFormFieldView {
    onChange = async widgetValue => {
        // console.log('RowFormComboBoxFieldView.onChange', widgetValue);
        this.rerender();
        await this.props.ctrl.onChange(widgetValue);
    }
    isCreateButtonVisible() {
        if (this.getCtrl().getForm().getMode() !== 'edit') {
            return false;
        }
        if (this.getCtrl().getModel().getAttr('newRowMode') === 'disabled') {
            return false;
        }
        if (this.getCtrl().getModel().getAttr('newRowMode') === 'editPage') {
            return !!this.getCtrl().getModel().getAttr('itemEditPage')
                && !!this.getCtrl().getModel().getAttr('itemCreateForm');
        }
        if (this.getCtrl().getModel().getAttr('newRowMode') === 'createPage') {
            return !!this.getCtrl().getModel().getAttr('itemCreatePage')
                && !!this.getCtrl().getModel().getAttr('itemCreateForm');
        }
    }
    render() {
        // console.log('RowFormComboBoxFieldView.render', this.props.ctrl.getItems(), this.props.ctrl.getValue());
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getCssClassNames()}>
                <Select
                    classList={[`${this.getCssBlockName()}__select`]}
                    onCreate={this.onWidgetCreate}
                    nullable={true}
                    value={ctrl.getValueForWidget()}
                    readOnly={!ctrl.isEditable()}
                    onChange={this.onChange}
                    items={ctrl.getItems()}
                    placeholder={ctrl.getPlaceholder()}
                    onMouseDown={ctrl.getModel().getAttr('itemSelectPage') ? ctrl.onItemSelect : null}
                />
                {ctrl.getModel().getAttr('itemEditPage') && !!ctrl.getValue() &&
                    <Button
                        classList={[`${this.getCssBlockName()}__edit-button`]}
                        onClick={ctrl.onEditButtonClick}
                        enabled={!!ctrl.getValue()}
                    >...</Button>
                }
                {this.isCreateButtonVisible()
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

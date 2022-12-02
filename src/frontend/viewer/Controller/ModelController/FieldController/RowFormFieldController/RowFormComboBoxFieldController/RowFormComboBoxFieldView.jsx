export class RowFormComboBoxFieldView extends RowFormFieldView {
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
    renderSelect() {
        const ctrl = this.getCtrl();
        return <Select
            classList={[`${this.getCssBlockName()}__select`]}
            onCreate={this.onWidgetCreate}
            // nullable={ctrl.getModel().isNullable()}
            value={ctrl.getValueForWidget()}
            readOnly={!ctrl.isEditable()}
            onChange={this.onChange}
            items={ctrl.getItems()}
            placeholder={ctrl.getPlaceholder()}
            onMouseDown={ctrl.getModel().getAttr('itemSelectPage') ? ctrl.onItemSelect : null}
        />;
    }
    renderEditButton() {
        const ctrl = this.getCtrl();
        return <Button
            classList={[`${this.getCssBlockName()}__edit-button`]}
            onClick={ctrl.onEditButtonClick}
            enabled={!!ctrl.getValue()}
        >...</Button>;
    }
    renderCreateButton() {
        const ctrl = this.getCtrl();
        return <Button
            classList={[`${this.getCssBlockName()}__create-button`]}
            onClick={ctrl.onCreateButtonClick}
        >+</Button>;
    }
    render() {
        // console.log('RowFormComboBoxFieldView.render', this.props.ctrl.getItems(), this.props.ctrl.getValue());
        return (
            <div className={this.getCssClassNames()}>
                {this.renderSelect()}
                {this.getCtrl().getModel().getAttr('itemEditPage') && !!this.getCtrl().getValue() &&
                    this.renderEditButton()
                }
                {this.isCreateButtonVisible() &&
                    this.renderCreateButton()
                }
            </div>
        );
    }
}
window.QForms.RowFormComboBoxFieldView = RowFormComboBoxFieldView;

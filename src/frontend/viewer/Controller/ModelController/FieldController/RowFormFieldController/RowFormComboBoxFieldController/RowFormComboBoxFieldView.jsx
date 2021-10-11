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

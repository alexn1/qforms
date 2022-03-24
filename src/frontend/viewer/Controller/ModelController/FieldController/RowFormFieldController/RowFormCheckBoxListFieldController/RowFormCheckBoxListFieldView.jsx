class RowFormCheckBoxListFieldView extends RowFormFieldView {
    renderCheckBoxList() {
        const ctrl = this.getCtrl();
        return <CheckBoxList
            name={ctrl.getModel().getFullName()}
            classList={[`${this.getCssBlockName()}__checkboxlist`]}
            onCreate={this.onWidgetCreate}
            value={ctrl.getValueForWidget()}
            readOnly={!ctrl.isEditable()}
            onChange={ctrl.onChange}
            items={ctrl.getItems()}
        />;
    }
    render() {
        return <div className={this.getCssClassNames()}>
            {this.renderCheckBoxList()}
        </div>;
    }
}

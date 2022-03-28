class RowFormCheckBoxListFieldView extends RowFormFieldView {
    getItems() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        try {
            return ctrl.getRows().map(row => {
                return ctrl.getItemFromRow(row);
            });
        } catch (err) {
            err.message = `${model.getFullName()}: ${err.message}`;
            throw err;
        }
    }
    renderCheckBoxList() {
        const ctrl = this.getCtrl();
        return <CheckBoxList
            name={ctrl.getModel().getFullName()}
            classList={[`${this.getCssBlockName()}__checkboxlist`]}
            onCreate={this.onWidgetCreate}
            value={ctrl.getValueForWidget()}
            readOnly={!ctrl.isEditable()}
            onChange={ctrl.onChange}
            items={this.getItems()}
        />;
    }
    render() {
        return <div className={this.getCssClassNames()}>
            {this.renderCheckBoxList()}
        </div>;
    }
}

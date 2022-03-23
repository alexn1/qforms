class RowFormCheckBoxListFieldView extends RowFormFieldView {
    renderCheckBoxList() {
        return <CheckBoxList
            classList={[`${this.getCssBlockName()}__checkboxlist`]}
            name={this.getCtrl().getModel().getFullName()}
            items={this.getCtrl().getItems()}
        />;
    }
    render() {
        return <div className={this.getCssClassNames()}>
            {this.renderCheckBoxList()}
        </div>;
    }
}

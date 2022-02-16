class RowFormRadioFieldView extends RowFormFieldView {
    render() {
        return <div className={this.getCssClassNames()}>
            <Radio  classList={[`${this.getCssBlockName()}__radio`]}
                    name={this.getCtrl().getModel().getName()}
                    items={this.getCtrl().getItems()}
            />
        </div>;
    }
}

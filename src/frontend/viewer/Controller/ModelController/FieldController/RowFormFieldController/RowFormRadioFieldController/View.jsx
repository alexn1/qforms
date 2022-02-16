class RowFormRadioFieldView extends RowFormFieldView {
    onChange = async widgetValue => {
        // console.log('RowFormRadioFieldView.onChange', widgetValue);
        this.rerender();
        await this.getCtrl().onChange(widgetValue);
    }
    render() {
        return <div className={this.getCssClassNames()}>
            <Radio  classList={[
                `${this.getCssBlockName()}__radio`,
                ...(!this.getCtrl().isEditable() ? ['readOnly'] : [])
            ]}
                    name={this.getCtrl().getModel().getName()}
                    items={this.getCtrl().getItems()}
                    value={this.getCtrl().getValueForWidget()}
                    readOnly={!this.getCtrl().isEditable()}
                    onChange={this.onChange}
            />
        </div>;
    }
}

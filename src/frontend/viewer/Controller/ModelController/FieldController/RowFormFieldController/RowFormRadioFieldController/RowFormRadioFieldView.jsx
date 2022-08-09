class RowFormRadioFieldView extends RowFormFieldView {
    onChange = async widgetValue => {
        // console.log('RowFormRadioFieldView.onChange', widgetValue);
        this.rerender();
        await this.getCtrl().onChange(widgetValue);
    }
    /*render() {
        return <div className={this.getCssClassNames()}>
            <Radio  classList={[
                        `${this.getCssBlockName()}__radio`,
                        ...(!this.getCtrl().isEditable() ? ['readOnly'] : [])
                    ]}
                    name={this.getCtrl().getModel().getFullName()}
                    items={this.getCtrl().getItems()}
                    value={this.getCtrl().getValueForWidget()}
                    readOnly={!this.getCtrl().isEditable()}
                    onChange={this.onChange}
            />
        </div>;
    }*/
    render() {
        console.log('RowFormRadioFieldView.render', this.getCtrl().getItems(), this.getCtrl().getValue());
        const value = this.getCtrl().getValue();

        return <div className={this.getCssClassNames()}>

            {this.getCtrl().getItems().map(item => {


                return <input className={`${this.getCssBlockName()}__toggle ${value === item.value ? 'selected' : ''}`}
                              type={'button'}
                              value={item.title || item.value}
                              disabled={!this.getCtrl().isEditable()}
                              data-value={JSON.stringify(item.value)}
                />;
            })}
        </div>;
    }
}

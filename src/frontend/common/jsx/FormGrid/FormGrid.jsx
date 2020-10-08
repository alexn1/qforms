class FormGrid extends ReactComponent {
    getFieldId(model) {
        return `${model.getForm().getPage().id}_${model.getForm().getName()}_${model.getName()}`;
    }
    getFieldLabel(model) {
        return (
            <div key={`label.${model.getName()}`} className={`label ${model.getName()}`}>
                {model.data.caption}:
                {model.data.notNull === 'true' && <span style={{color: 'red'}}>*</span>}
            </div>
        );
    }
    getFieldView(model, ctrl, row) {
        return (
            <div
                key={`field.${model.getName()}`}
                id={this.getFieldId(model)}
                className={`field ${model.getName()}`}>
                {this.getFieldViewContent(model, ctrl, row)}
            </div>
        );
    }
    getFieldViewContent(model, ctrl, row) {
        const value = ctrl.getValueForView(row);
        return (
            <TextBox value={value} name={model.getName()} cb={this.onFieldViewContentCreated}></TextBox>
        );
    }
    onFieldViewContentCreated = c => {
        console.log('FormGrid.onFieldViewContentCreated', c);
    }
    getFieldTooltip(model) {
        return (
            <div key={`tooltip.${model.getName()}`} className={`tooltip ${model.getName()}`}>
                <Tooltip position="left" type="alert" />
            </div>
        );
    }
    render() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        const row = model.getRow();
        // console.log('model:', model);
        return (
            <div className="FormGrid">
                {Object.keys(model.fields).map(name => {
                    const fieldModel = model.fields[name];
                    const fieldCtrl = ctrl.fields[name];
                    // console.log('fieldModel:', fieldModel);
                    return [
                        this.getFieldLabel(fieldModel),
                        this.getFieldView(fieldModel, fieldCtrl, row),
                        this.getFieldTooltip(fieldModel)
                    ];
                })}
            </div>
        );
    }
}

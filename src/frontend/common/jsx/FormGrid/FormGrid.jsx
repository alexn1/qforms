class FormGrid extends ReactComponent {

    getFieldLabel(model) {
        return (
            <div key={`label.${model.getName()}`} className={`label ${model.getName()}`}>
                {model.data.caption}:
                {model.data.notNull === 'true' && <span style={{color: 'red'}}>*</span>}
            </div>
        );
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
                        <RowFormFieldView key={`field.${fieldModel.getName()}`} model={fieldModel} ctrl={fieldCtrl} row={row}/>,
                        this.getFieldTooltip(fieldModel)
                    ];
                })}
            </div>
        );
    }
}

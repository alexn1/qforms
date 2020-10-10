class FormGrid extends ReactComponent {

    getFieldLabel(model) {
        return (
            <div key={`label.${model.getName()}`} className={`label ${model.getName()}`}>
                {model.data.caption}:
                {model.isNotNull() && <span style={{color: 'red'}}>*</span>}
            </div>
        );
    }
    getFieldTooltip(model, ctrl) {
        // console.log('getFieldTooltip:', ctrl.state);
        return (
            <div key={`tooltip.${model.getName()}`} className={`tooltip ${model.getName()}`}>
                <Tooltip position="left" type="alert" hidden={ctrl.state.error === null} tip={ctrl.state.error}/>
            </div>
        );
    }
    render() {
        console.log('FormGrid.render');
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        // console.log('model:', model);
        return (
            <div className="FormGrid">
                {Object.keys(model.fields).map(name => {
                    const fieldModel = model.fields[name];
                    const fieldCtrl = ctrl.fields[name];
                    // console.log('fieldModel:', fieldModel);
                    return [
                        this.getFieldLabel(fieldModel),
                        <RowFormFieldView key={`field.${fieldModel.getName()}`} ctrl={fieldCtrl}/>,
                        this.getFieldTooltip(fieldModel, fieldCtrl)
                    ];
                })}
            </div>
        );
    }
}

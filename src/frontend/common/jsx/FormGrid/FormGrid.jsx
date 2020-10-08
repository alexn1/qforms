class FormGrid extends ReactComponent {
    getFieldId(field) {
        return `${field.getForm().getPage().id}_${field.getForm().getName()}_${field.getName()}`;
    }
    getFieldLabel(field) {
        return (
            <div key={`label.${field.getName()}`} className={`label ${field.getName()}`}>
                {field.data.caption}:
                {field.data.notNull === 'true' && <span style={{color: 'red'}}>*</span>}
            </div>
        );
    }
    getFieldView(field) {
        return (
            <div
                key={`field.${field.getName()}`}
                id={this.getFieldId(field)}
                className={`field ${field.getName()}`}>
                {this.getFieldViewContent(field)}
            </div>
        );
    }
    getFieldViewContent(field) {
        return (
            <TextBox></TextBox>
        );
    }
    getFieldTooltip(field) {
        return (
            <div key={`tooltip.${field.getName()}`} className={`tooltip ${field.getName()}`}>
                <Tooltip position="left" type="alert" />
            </div>
        );
    }
    render() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        // console.log('model:', model);
        return (
            <div className="FormGrid">
                {Object.keys(model.fields).map(name => {
                    const field = model.fields[name];
                    // console.log('field:', field);
                    return [
                        this.getFieldLabel(field),
                        this.getFieldView(field),
                        this.getFieldTooltip(field)
                    ];
                })}
            </div>
        );
    }
}
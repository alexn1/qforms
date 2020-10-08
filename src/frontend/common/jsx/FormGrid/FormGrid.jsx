class FormGrid extends ReactComponent {
    getFieldId(field) {
        return `${field.getForm().getPage().id}_${field.getForm().getName()}_${field.getName()}`;
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
                    return ([
                        <div key={`label.${field.getName()}`} className={`label ${field.getName()}`}>
                            {field.data.caption}:
                            {field.data.notNull === 'true' && <span style={{color: 'red'}}>*</span>}
                        </div>,
                        <div
                            key={`field.${field.getName()}`}
                            id={this.getFieldId(field)}
                            className={`field ${field.getName()}`}></div>,
                        <div key={`tooltip.${field.getName()}`} className={`tooltip ${field.getName()}`}></div>
                    ]);
                })}
            </div>
        );
    }
}
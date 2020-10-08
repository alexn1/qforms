class FormGrid extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div className="FormGrid">
                {Object.keys(ctrl.model.fields).map(name => {
                    const field = ctrl.model.fields[name];
                    console.log('field:', field);
                    return (<div key={name} className={`label ${name}`}>{field.data.caption}:</div>);
                })}
            </div>
        );
    }
}
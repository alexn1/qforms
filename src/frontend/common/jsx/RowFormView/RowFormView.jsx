class RowFormView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className={`RowFormView ${model.getName()}`}>
                <Toolbar ctrl={ctrl}/>
                <FormGrid ctrl={ctrl}/>
            </div>
        );
    }
}

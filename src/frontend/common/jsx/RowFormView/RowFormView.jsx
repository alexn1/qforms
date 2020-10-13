class RowFormView extends ReactComponent {
    render() {
        console.log('RowFormView.render', this.props.ctrl.model.getFullName());
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

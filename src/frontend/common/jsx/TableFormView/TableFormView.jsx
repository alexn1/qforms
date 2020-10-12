class TableFormView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className={`TableFormView full flex-rows ${model.getName()}`}>
            </div>
        );
    }
}

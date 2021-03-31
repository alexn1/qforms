class View extends ReactComponent {
    getActions() {
        return this.props.ctrl.model.data.actions.map(data => ({
            name : Model.getName(data),
            title: Model.getAttr(data, 'caption')
        }));
    }
}

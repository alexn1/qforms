class View extends ReactComponent {
    getActionsForDropdownButton() {
        return this.props.ctrl.model.data.actions.map(data => ({
            name : Model.getName(data),
            title: Model.getAttr(data, 'caption')
        }));
    }
}
window.QForms.View = View;

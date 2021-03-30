class FormView extends ReactComponent {
    getActions() {
        return this.props.ctrl.model.data.actions.map(data => ({
            name : Model.getName(data),
            title: Model.getAttr(data, 'caption')
        }));
    }
    onActionsClick = async li => {
        // console.log('FormView.onActionsClick:', li);
        const ctrl = this.props.ctrl;
        const name = li.dataset.action;
        const data = ctrl.model.data.actions.find(data => data.name === name);
        const result = await ctrl.onActionClick(data, ctrl.getActiveRow(true));
        if (!result) alert(`no handler for ${Model.getName(data)}`);
    }
}

class FormView extends View {
    onActionsClick = async li => {
        // console.log('FormView.onActionsClick:', li);
        const ctrl = this.props.ctrl;
        const name = li.dataset.action;
        // const data = ctrl.model.data.actions.find(data => data.name === name);
        const result = await ctrl.onActionClick(name, ctrl.getActiveRow(true));
        if (!result) alert(`no handler for action '${name}'`);
    }
}

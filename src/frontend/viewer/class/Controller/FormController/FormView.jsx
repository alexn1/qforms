class FormView extends ReactComponent {
    onActionsClick = async li => {
        // console.log('FormView.onActionsClick:', li);
        const ctrl = this.props.ctrl;
        const action = ctrl.model.data.actions.find(data => data.name === li.dataset.action);
        const result = await ctrl.onActionClick(action, ctrl.getActiveRow(true));
        if (!result) alert(`no handler for ${action.name}`);
    }
}

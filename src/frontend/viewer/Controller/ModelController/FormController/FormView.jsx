class FormView extends ModelView {
    constructor(props) {
        super(props);
        this.checkParent();
    }
    onActionsClick = async li => {
        // console.log('FormView.onActionsClick:', li);
        const ctrl = this.props.ctrl;
        const name = li.dataset.action;
        const result = await ctrl.onActionClick(name, ctrl.getActiveRow(true));
        if (!result) {
            throw new Error(`no handler for action '${name}'`);
        }
    }
}
window.QForms.FormView = FormView;

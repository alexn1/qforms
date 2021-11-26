class FormView extends ModelView {
    constructor(props) {
        super(props);
        this.checkParent();
    }
    onActionsClick = async li => {
        // console.log('FormView.onActionsClick:', li);
        const ctrl = this.props.ctrl;
        const name = li.dataset.action;
        try {
            const result = await ctrl.onActionClick(name, ctrl.getActiveRow(true));
            if (!result) {
                throw new Error(`no handler for action '${name}'`);
            }
        } catch (err) {
            await this.getCtrl().getApp().alert({message: err.message});
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('FormView.shouldComponentUpdate', nextProps.updated - this.props.updated);
        if (nextProps.updated - this.props.updated) return true;
        return false;
    }
}
window.QForms.FormView = FormView;

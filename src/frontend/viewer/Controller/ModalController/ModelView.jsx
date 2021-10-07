class ModelView extends ReactComponent {
    getActionsForDropdownButton() {
        return this.props.ctrl.getModel().getCol('actions').map(data => ({
            name : Model.getName(data),
            title: Model.getAttr(data, 'caption')
        }));
    }
    getCssBlockName() {
        const model = this.props.ctrl.getModel();
        if (model.isAttr('cssBlock') && model.getAttr('cssBlock')) {
            return model.getAttr('cssBlock');
        }
        return super.getCssBlockName();
    }
}
window.QForms.ModelView = ModelView;

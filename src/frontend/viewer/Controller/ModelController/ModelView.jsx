class ModelView extends View {
    getActionsForDropdownButton() {
        return this.props.ctrl.getModel().getCol('actions').map(data => {
            if (this.getActionIcon) {
                return {
                    name : Model.getName(data),
                    title: [
                        <div key={'icon'}>{this.getActionIcon(Model.getName(data))}</div>,
                        <div key={'title'}>{Model.getAttr(data, 'caption')}</div>
                    ]
                };
            }
            return {
                name : Model.getName(data),
                title: Model.getAttr(data, 'caption')
            };
        });
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

class ModelView extends View {
    getActionsForDropdownButton() {
        return this.props.ctrl.getModel().getCol('actions').map(data => {
            if (this.renderActionIcon) {
                return {
                    name : Model.getName(data),
                    title: [
                        <div key={'icon'}>{this.renderActionIcon(Model.getName(data))}</div>,
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
    getStyle() {

    }
}

window.QForms.ModelView = ModelView;

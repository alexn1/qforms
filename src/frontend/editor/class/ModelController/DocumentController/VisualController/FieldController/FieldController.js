class FieldController extends VisualController {
    /*constructor(model, parent) {
        super(model, parent);
    }*/
    getTitle() {
        return `${this.model.getClassName()}: ${this.model.getName()}`;
    }
    getActions() {
        return [
            {'action': 'changeClass', 'caption': 'Change Class'},
            {'action': 'moveUp'     , 'caption': 'Move Up'     },
            {'action': 'moveDown'   , 'caption': 'Move Down'   },
            {'action': 'delete'     , 'caption': 'Delete'      }
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'changeClass':
                this.actionChangeClass();
                break;
            case 'delete':
                this.delete();
                break;
            case 'moveUp':
                await this.model.moveUp();
                this.item.move(-1);
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.item.move(1);
                break;
        }
    }

    async actionChangeClass() {
        await EditorController.editorController.openModal(new ChangeClassController({onCreate: async values => {
            const fieldClass = values.class;
            if (this.model.getClassName() !== fieldClass) {
                const data = await this.model.changeClass({class: fieldClass});
                //console.log(data);
                EditorController.editorController.fillPropertyGrid(this);
                this.view.rerender();
            }
        }}));
    }

    getPropList() {
        const list = this.model.data['@attributes'];
        const options = {};
        options['isVisible']        = ['true', 'false'];
        options['readOnly']         = ['true', 'false'];
        options['notNull']          = ['true', 'false'];
        options['align']            = ['left', 'right'];
        options['param']            = ['true', 'false'];
        options['validateOnChange'] = ['true', 'false'];
        options['validateOnBlur']   = ['true', 'false'];
        return {list: list, options: options};
    }
    async delete() {
        await this.model.delete();
        this.parent.removeField(this);
        EditorController.editorController.treeWidget2.select(null);
        EditorController.editorController.treeWidget2.rerender();
    }
    getDocumentViewClass() {
        return VisualView;
    }
}

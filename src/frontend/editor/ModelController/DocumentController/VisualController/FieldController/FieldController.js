class FieldController extends VisualController {
    /*constructor(model, parent) {
        super(model, parent);
    }*/
    getTitle() {
        return `${this.model.getClassName()}: ${this.model.getName()}`;
    }
    getStyle() {
        return {
            fontWeight: 'bold',
            color: 'blue'
        };
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
                await this.actionChangeClass();
                break;
            case 'delete':
                await this.delete();
                break;
            case 'moveUp':
                await this.model.moveUp();
                this.parent.moveColItem('fields', this, -1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
            case 'moveDown':
                await this.model.moveDown();
                this.parent.moveColItem('fields', this, 1);
                EditorFrontHostApp.editorApp.treeWidget2.rerender();
                break;
        }
    }

    async actionChangeClass() {
        await EditorFrontHostApp.editorApp.openModal(new ChangeClassController({
            fieldCtrl: this,
            onCreate: async values => {
                const data = await this.model.changeClass({class: values.class});
                console.log(data);
                EditorFrontHostApp.editorApp.fillPropertyGrid(this);
                this.view.rerender();
            }
        }));
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
        EditorFrontHostApp.editorApp.treeWidget2.select(null);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
    }
    getDocumentViewClass() {
        return VisualView;
    }
}

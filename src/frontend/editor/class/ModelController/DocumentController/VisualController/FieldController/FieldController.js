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
            {'action': ''           , 'caption': '-'           },
            {'action': 'moveUp'     , 'caption': 'Move Up'     },
            {'action': 'moveDown'   , 'caption': 'Move Down'   },
            {'action': ''           , 'caption': '-'           },
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
        const self = this;
        const result = await Field.prototype.getView('changeClass.html');
        $(document.body).append(result.view);
        $('#modal').on('hidden.bs.modal', function() {
            $(this).remove();
        });
        $("#modal button[name='change']").click(function() {
            const fieldClass = $("#modal select[id='fieldClass']").val();
            if (self.model.getClassName() !== fieldClass) {
                self.model.changeClass({class: fieldClass}).then((data) => {
                    //console.log(data);
                    EditorController.editorController.fillPropertyGrid(self);
                });
            }
            $('#modal').modal('hide');
        });
        $('#modal').modal('show');
        $("#modal input[id='fieldClass']").focus();
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
    async createTab(docs) {
    }
}

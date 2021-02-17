class DataSourceController extends DocumentController {
    constructor(model, parent) {
        super(model, parent);
        this.keyColumns = [];
        this.items = [
            {
                getTitle: () => 'Key Columns',
                items: this.keyColumns
            }
        ];
    }
    getTitle() {
        return `${this.model.getClassName()}: ${this.model.getName()}`;
    }
    init() {
        this.model.keyColumns.forEach(keyColumn => this.createKeyColumn(keyColumn));
    }
    createKeyColumn(model) {
        const keyColumn = new KeyColumnController(model, this);
        keyColumn.init();
        this.keyColumns.push(keyColumn);
        return keyColumn;
    }
    removeKeyColumn(keyColumnController) {
        console.log('DataSourceController.removeKeyColumn', keyColumnController.getTitle());
        const i = this.keyColumns.indexOf(keyColumnController);
        if (i === -1) throw new Error('no such keyColumnController');
        this.keyColumns.splice(i, 1);
    }
    getActions() {
        return [
            {
                'action' : 'newItem',
                'caption': 'New Key Column'
            },
            {
                'action' : 'newParentKeyColumn',
                'caption': 'New Parent Key Column'
            },
            {'action':        '', 'caption':         '-'},
            {'action':  'moveUp', 'caption':   'Move Up'},
            {'action':'moveDown', 'caption': 'Move Down'},
            {
                'action' : '',
                'caption': '-'
            },
            {
                'action' : 'delete',
                'caption': 'Delete'
            }
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'newItem':
                this.actionNewKeyColumn();
                break;
            case 'newParentKeyColumn':
                this.actionNewParentKeyColumn();
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

    async actionNewKeyColumn() {
        const result = await KeyColumnController.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(() => {
            const itemName = $("#myModal input[id='itemName']").val();
            this.model.newKeyColumn(itemName).then((itemData) => {
                this.addKeyColumn(itemData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='itemName']").focus();
    }

    getPropList() {
        const propList = {
            list   : {},
            options: {}
        };

        // list
        for (const name in this.model.data['@attributes']) {
            if (!['countQuery', 'singleQuery', 'multipleQuery'].includes(name)) {
                propList.list[name] = this.model.data['@attributes'][name];
            }
        }

        // options
        // propList.options['insertNewKey']         = ['true', 'false'];
        // propList.options['dumpFirstRowToParams'] = ['true', 'false'];
        return propList;
    }
    getDocumentViewClass() {
        if (this.model.getClassName() === 'SqlDataSource') return SqlDataSourceView;
        return super.getDocumentViewClass();
    }
    async onSaveClick(name, value) {
        // console.log('DataSourceController.onSaveClick', name, value);
        await this.model.setValue(name, value);
    }
}

class FormController extends VisualController {
    constructor(model, parent) {
        super(model, parent);
        this.dataSources = [];
        this.fields      = [];
        this.actions     = [];
        this.items = [
            {getTitle: () => 'Data Sources', items: this.dataSources},
            {getTitle: () => 'Fields'      , items: this.fields},
            {getTitle: () => 'Actions'     , items: this.actions}
        ];
    }
    getTitle() {
        return `${this.model.getClassName()}: ${this.model.getName()}`;
    }
    init() {
        this.model.dataSources.forEach(dataSource => this.createDataSource(dataSource));
        this.model.fields.forEach(field => this.createField(field));
        this.model.actions.forEach(action => this.createAction(action));
    }

    createDataSource(model) {
        const dataSource  = new DataSourceController(model, this);
        dataSource.init();
        this.dataSources.push(dataSource);
        return dataSource;
    }

    createField(model) {
        const field = new FieldController(model, this);
        field.init();
        this.fields.push(field);
        return field;
    }
    createAction(model) {
        const action = new ActionController(model, this);
        action.init();
        this.actions.push(action);
        return action;
    }
    removeDataSource(dataSourceController) {
        console.log('ApplicationController.removeDataSource', dataSourceController.getTitle());
        const i = this.dataSources.indexOf(dataSourceController);
        if (i === -1) throw new Error('no such dataSourceController');
        this.dataSources.splice(i, 1);
    }
    removeField(fieldController) {
        console.log('FormController.removeField', fieldController.getTitle());
        const i = this.fields.indexOf(fieldController);
        if (i === -1) throw new Error('no such fieldController');
        this.fields.splice(i, 1);
    }
    removeAction(actionController) {
        console.log('FormController.removeAction', actionController.getTitle());
        const i = this.actions.indexOf(actionController);
        if (i === -1) throw new Error('no such actionController');
        this.actions.splice(i, 1);
    }

    getActions() {
        return [
            {'action': 'newDataSource', 'caption': 'New Data Source'},
            {'action': 'newField'     , 'caption': 'New Field'      },
            {'action': 'newControl'   , 'caption': 'New Control'    },
            {'action': 'newAction'    , 'caption': 'New Action'     },
            {'action': ''             , 'caption': '-'              },
            {'action': 'moveUp'       , 'caption': 'Move Up'        },
            {'action': 'moveDown'     , 'caption': 'Move Down'      },
            {'action': ''             , 'caption': '-'              },
            {'action': 'delete'       , 'caption': 'Delete'         }
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'newDataSource':
                this.actionNewDataSource();
                break;
            case 'newField':
                this.actionNewField();
                break;
            case 'newControl':
                this.actionNewControl();
                break;
            case 'newAction':
                this.actionNewAction();
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

    async actionNewDataSource() {
        const self = this;
        const result = await DataSource.prototype.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(() => {
            const dsName = $("#myModal input[id='dsName']").val();
            const dsClass = $("#myModal select[id='dsClass']").val();
            const params = {
                name:dsName,
                class:dsClass
            };
            self.model.newDataSource(params).then((dataSourceData) => {
                self.addDataSourceItem(dataSourceData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='dsName']").focus();
    }

    async actionNewField() {
        const self = this;
        const result = await Field.prototype.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(() => {
            const name = $("#myModal input[id='name']").val();
            const caption = $("#myModal input[id='caption']").val();
            const fieldClass = $("#myModal select[id='fieldClass']").val();
            const params = {
                name:name,
                caption:caption,
                class:fieldClass
            };
            self.model.newField(params).then((fieldData) => {
                self.addFieldItem(fieldData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='name']").focus();
    }

    async actionNewControl() {
        const result = await Control.prototype.getView('new.html');
        $(document.body).append(result.view);
        $('#modal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#modal button[name='create']").click(async () => {
            const params = {
                name   : $("#modal input[id='name']").val(),
                class  : $("#modal select[id='class']").val(),
                caption: $("#modal input[id='caption']").val()
            };
            const data = await this.model.newControl(params);
            this.addControlItem(data).select();
            $('#modal').modal('hide');
        });
        $('#modal').modal('show');
        $("#modal input[id='name']").focus();
    }

    async actionNewAction() {
        console.log('FormController.actionNewAction');
        const result = await Action.prototype.getView('new.html');
        $(document.body).append(result.view);
        $('#modal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#modal button[name='create']").click(async () => {
            const params = {
                name   : $("#modal input[id='name']").val(),
                caption: $("#modal input[id='caption']").val()
            };
            const data = await this.model.newAction(params);
            this.addActionItem(data).select();
            $('#modal').modal('hide');
        });
        $('#modal').modal('show');
        $("#modal input[id='name']").focus();
    }

    getPropList() {
        return {
            list   : this.model.data['@attributes'],
            options: {
                editMethod: [
                    'disabled',
                    'table',
                    'form'
                ],
                newRowMode: [
                    'disabled',
                    'oneclick',
                    'editform',
                    'createform',
                    'oneclick editform',
                    'oneclick createform'
                ],
                deleteRowMode: [
                    'disabled',
                    'enabled'
                ],
                refreshButton: [
                    'true',
                    'false'
                ],
                visible: ['true', 'false'],
                newMode: ['', 'true', 'false'],
                backOnly : ['true', 'false'],
            }
        };
    }

    async setProperty(name, value) {
        await this.model.setValue(name, value);
    }

    async delete() {
        await this.model.delete();
        this.parent.removeForm(this);
        EditorController.editorController.treeWidget2.select(null);
        EditorController.editorController.treeWidget2.rerender();
    }
    getDocumentViewClass() {
        return VisualView;
    }
}

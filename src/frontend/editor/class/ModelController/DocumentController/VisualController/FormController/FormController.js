class FormController extends VisualController {
    constructor(model, parent) {
        super(model, parent);
        this.dataSources = [];
        this.actions     = [];
        this.fields      = [];
        this.items = [
            {getTitle: () => 'Data Sources', items: this.dataSources},
            {getTitle: () => 'Actions'     , items: this.actions},
            {getTitle: () => 'Fields'      , items: this.fields}
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
            {'action': 'newAction'    , 'caption': 'New Action'     },
            {'action': 'moveUp'       , 'caption': 'Move Up'        },
            {'action': 'moveDown'     , 'caption': 'Move Down'      },
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
        await EditorController.editorController.openModal(new NewDataSourceController({onCreate: async values => {
            const dataSource = await this.model.newDataSource({
                name : values.name,
                class: values.class
            });
            const dataSourceController = this.createDataSource(dataSource);
            await EditorController.editorController.treeWidget2.select(dataSourceController);
            dataSourceController.view.parent.open();
            this.view.rerender();
            EditorController.editorController.treeWidget2.scrollToSelected();
        }}));
    }

    async actionNewField() {
        await EditorController.editorController.openModal(new NewFieldController({onCreate: async values => {
            const field = await this.model.newField({
                name   : values.name,
                caption: values.caption,
                class  : values.class
            });
            const fieldController = this.createField(field);
            await EditorController.editorController.treeWidget2.select(fieldController);
            fieldController.view.parent.open();
            this.view.rerender();
            EditorController.editorController.treeWidget2.scrollToSelected();
        }}));
    }

    async actionNewAction() {
        console.log('FormController.actionNewAction');
        await EditorController.editorController.openModal(new NewActionController({onCreate: async values => {
            const action = await this.model.newAction({
                name   : values.name,
                caption: values.caption
            });
            const actionController = this.createAction(action);
            await EditorController.editorController.treeWidget2.select(actionController);
            actionController.view.parent.open();
            this.view.rerender();
            EditorController.editorController.treeWidget2.scrollToSelected();
        }}));
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

class PageController extends VisualController {

    constructor(model, pageLinkController = null) {
        super(model);
        this.pageLinkController = pageLinkController;
        this.dataSources = [];
        this.forms       = [];
        this.items = [
            {getTitle: () => 'Data Sources', items: this.dataSources},
            {getTitle: () => 'Forms'       , items: this.forms}
        ];
    }

    init() {
        // console.log('PageController.init');
        this.model.dataSources.forEach(dataSource => this.createDataSource(dataSource));
        this.model.forms.forEach(form => this.createForm(form));
    }

    createDataSource(model) {
        const dataSource = new DataSourceController(model, this);
        dataSource.init();
        this.dataSources.push(dataSource);
        return dataSource;
    }

    createForm(model) {
        const form = new FormController(model, this);
        form.init();
        this.forms.push(form);
        return form;
    }

    removeDataSource(dataSourceController) {
        console.log('PageController.removeDataSource', dataSourceController.getTitle());
        const i = this.dataSources.indexOf(dataSourceController);
        if (i === -1) throw new Error('no such dataSourceController');
        this.dataSources.splice(i, 1);
    }
    removeForm(formController) {
        console.log('PageController.removeForm', formController.getTitle());
        const i = this.forms.indexOf(formController);
        if (i === -1) throw new Error('no such formController');
        this.forms.splice(i, 1);
    }

    getActions() {
        return [
            {'action': 'newDataSource', 'caption': 'New Data Source'},
            {'action': 'newForm'      , 'caption': 'New Form'       },
            {'action': 'moveUp'       , 'caption': 'Move Up'        },
            {'action': 'moveDown'     , 'caption': 'Move Down'      },
            {'action': 'delete'       , 'caption': 'Delete'         }
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'newForm':
                this.actionNewForm();
                break;
            case 'newDataSource':
                this.newDataSourceAction();
                break;
            case 'delete':
                this.delete();
                break;
            case 'moveUp':
                await this.model.pageLink.moveUp();
                this.item.move(-1);
                break;
            case 'moveDown':
                await this.model.pageLink.moveDown();
                this.item.move(1);
                break;
            default:
                console.log(name);
        }
    }

    async newDataSourceAction() {
        await EditorController.editorController.openModal(new NewDataSourceController({onCreate: async values => {
            const dataSourceData = await DataSource.create(this.model, {
                name : values.name,
                class: values.class
            });
            const dataSource = this.model.createDataSource(dataSourceData);
            const dataSourceController = this.createDataSource(dataSource);
            await EditorController.editorController.treeWidget2.select(dataSourceController);
            dataSourceController.view.parent.open();
            this.pageLinkController.view.rerender();
            EditorController.editorController.treeWidget2.scrollToSelected();
        }}));
    }

    async actionNewForm() {
        await EditorController.editorController.openModal(new NewFormController({onCreate: async values => {
            const form = await this.model.newForm({
                name   : values.name,
                caption: values.caption,
                class  : values.class
            });
            const formController = this.createForm(form);
            await EditorController.editorController.treeWidget2.select(formController);
            formController.view.parent.open();
            this.pageLinkController.view.rerender();
            EditorController.editorController.treeWidget2.scrollToSelected();
        }}));
    }

    getPropList() {
        const propList = super.getPropList();
        propList.list['menu']    = this.getPageLink().getAttr('menu');
        propList.list['startup'] = this.getPageLink().getAttr('startup');
        propList.options['startup'] = ['true', 'false'];
        return propList;
    }

    setProperty(name, value) {
        if (name === 'startup' || name === 'menu') {
            this.getPageLink().setValue(name, value);
        } else  {
            ModelController.prototype.setProperty.call(this, name, value);
        }
    }

    getPageLink() {
        return this.model.pageLink;
    }

    async delete() {
        await this.model.delete();
        this.pageLinkController.parent.removePageLink(this.pageLinkController);
        EditorController.editorController.treeWidget2.select(null);
        EditorController.editorController.treeWidget2.rerender();
    }

    getDocumentViewClass() {
        return VisualView;
    }
}

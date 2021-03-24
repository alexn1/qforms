class ApplicationController extends VisualController {

    constructor(model, editorController) {
        super(model);
        this.editorController = editorController;
        this.databases   = [];
        this.dataSources = [];
        this.actions     = [];
        this.pageLinks   = [];

        // items
        this.opened = true;
        this.items = [
            {
                getTitle: () => 'Databases',
                items: this.databases
            },
            {
                getTitle: () => 'Data Sources',
                items: this.dataSources
            },
            {
                getTitle: () => 'Actions',
                items: this.actions
            },
            {
                getTitle: () => 'Pages',
                items: this.pageLinks,
                opened: true
            }
        ];
    }
    init() {
        this.model.databases.forEach(database => this.createDatabase(database));
        this.model.dataSources.forEach(dataSource => this.createDataSource(dataSource));
        this.model.actions.forEach(action => this.createAction(action));
        this.model.pageLinks.forEach(pageLink => this.createPageLink(pageLink));
    }

    createDatabase(model) {
        const database = new DatabaseController(model, this);
        database.init();
        this.databases.push(database);
        return database;
    }
    createPageLink(model) {
        const pageLink = new PageLinkController(model, this);
        pageLink.init();
        this.pageLinks.push(pageLink);
        return pageLink;
    }
    removeDatabase(databaseController) {
        console.log('ApplicationController.removeDatabase', databaseController.getTitle());
        const i = this.databases.indexOf(databaseController);
        if (i === -1) throw new Error('no such databaseController');
        this.databases.splice(i, 1);
    }
    removePageLink(pageLinkController) {
        const i = this.pageLinks.indexOf(pageLinkController);
        if (i === -1) throw new Error('no such pageLinkController');
        this.pageLinks.splice(i, 1);
    }

    getActions() {
        return [
            {'action': 'newDatabase'  , 'caption': 'New Database'   },
            {'action': 'newDataSource', 'caption': 'New Data Source'},
            {'action': 'newPage'      , 'caption': 'New Page'       }
        ];
    }

    async doAction(name) {
        switch (name) {
            case 'newDatabase':
                await this.newDatabaseAction();
                break;
            case 'newDataSource':
                await this.newDataSourceAction();
                break;
            case 'newPage':
                await this.newPageAction();
                break;
            default:
                console.log(name);
        }
    }

    async newDatabaseAction() {
        console.log('ApplicationController.newDatabaseAction');
        await EditorController.editorController.openModal(new NewDatabaseController({onCreate: async values => {
            // console.log('values: ', values);
            const database = await this.model.newDatabase({
                _class: values.class,
                name  : values.name,
                params: {
                    host    : {name: 'host'    , value: values.host    },
                    database: {name: 'database', value: values.database},
                    user    : {name: 'user'    , value: values.user    },
                    password: {name: 'password', value: values.password}
                }
            });
            const databaseController = this.createDatabase(database);
            await EditorController.editorController.treeWidget2.select(databaseController);
            databaseController.view.parent.open();
            this.view.rerender();
            EditorController.editorController.treeWidget2.scrollToSelected();
        }}));
    }

    async newDataSourceAction() {
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

    async newPageAction() {
        await EditorController.editorController.openModal(new NewPageController({onCreate: async values => {
            const page = await this.model.newPage({
                name   : values.name,
                caption: values.caption,
                startup: values.startup
            });
            const pageLinkController = this.createPageLink(page.pageLink);
            const pageController = new PageController(page, pageLinkController);
            pageController.init();
            pageLinkController.setPageController(pageController);
            EditorController.editorController.treeWidget2.select(pageLinkController);
            EditorController.editorController.treeWidget2.scrollToSelected();
        }}));
    }

    getPropList() {
        const propList = super.getPropList();
        propList.options['authentication'] = ['true', 'false'];
        propList.options['lang']           = ['en'  , 'ru'   ];
        return propList;
    }
    findPageLink(name) {
        return this.pageLinks.find(pageLink => pageLink.model.getName() === name);
    }
    getDocumentViewClass() {
        return VisualView;
    }
}

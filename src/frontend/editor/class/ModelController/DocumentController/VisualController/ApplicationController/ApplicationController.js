class ApplicationController extends VisualController {

    constructor(model, editorController) {
        super(model);
        this.editorController = editorController;
        this.databases   = [];
        this.dataSources = [];
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
                getTitle: () => 'Pages',
                items: this.pageLinks,
                opened: true
            }
        ];
    }
    init() {
        this.model.databases.forEach(database => this.createDatabase(database));
        this.model.dataSources.forEach(dataSource => this.createDataSource(dataSource));
        this.model.pageLinks.forEach(pageLink => this.createPageLink(pageLink));
    }

    createDatabase(model) {
        const database = new DatabaseController(model, this);
        database.init();
        this.databases.push(database);
        return database;
    }
    createDataSource(model) {
        const dataSource = new DataSourceController(model, this);
        dataSource.init();
        this.dataSources.push(dataSource);
        return dataSource;
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
    removeDataSource(dataSourceController) {
        console.log('ApplicationController.removeDataSource', dataSourceController.getTitle());
        const i = this.dataSources.indexOf(dataSourceController);
        if (i === -1) throw new Error('no such dataSourceController');
        this.dataSources.splice(i, 1);
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
                this.newDatabaseAction();
                break;
            case 'newDataSource':
                this.newDataSourceAction();
                break;
            case 'newPage':
                this.newPageAction();
                break;
            default:
                console.log(name);
        }
    }

    async newDatabaseAction() {
        const result = await Database.prototype.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(async () => {
            const _class   = $("#myModal select[id='class']").val();
            const name     = $("#myModal input[id='name']").val();
            const host     = $("#myModal input[id='host']").val();
            const dbname   = $("#myModal input[id='dbname']").val();
            const user     = $("#myModal input[id='user']").val();
            const password = $("#myModal input[id='password']").val();
            const params = {
                _class: _class,
                name  : name,
                params: {
                    host    : {name: 'host'    , value: host    },
                    database: {name: 'database', value: dbname  },
                    user    : {name: 'user'    , value: user    },
                    password: {name: 'password', value: password}
                }
            };
            // console.log('params:', params);
            const database = await this.model.newDatabase(params);
            const databaseController = this.createDatabase(database);

            $('#myModal').modal('hide');

            await this.editorController.treeWidget2.select(databaseController);
            databaseController.view.parent.open();
            this.items[0].view.rerender();
            this.editorController.treeWidget2.scrollToSelected();
        });
        $('#myModal').modal('show');
        $("#myModal input[id='name']").focus();
    }

    async newPageAction() {
        const result = await Page.prototype.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(async () => {
            const name    = $("#myModal input[id='name']").val();
            const caption = $("#myModal input[id='caption']").val();
            const startup = $("#myModal select[id='startup']").val();
            const params = {
                name   : name,
                caption: caption,
                startup: startup
            };
            const page = await this.model.newPage(params);
            const pageLinkController = this.createPageLink(page.pageLink);

            // pageController
            const pageController = new PageController(page, pageLinkController);
            pageController.init();
            pageLinkController.setPageController(pageController);
            this.editorController.treeWidget2.select(pageLinkController);
            this.editorController.treeWidget2.scrollToSelected();

            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='name']").focus();
    }

    async newDataSourceAction() {
        const result = await DataSource.prototype.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(async () => {
            const dsName = $("#myModal input[id='dsName']").val();
            const dsClass = $("#myModal select[id='dsClass']").val();
            const params = {
                name :dsName,
                class:dsClass
            };
            const dataSourceData = await this.model.newDataSource(params);
            this.addDataSourceItem(dataSourceData).select();
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='dsName']").focus();
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

class ApplicationController extends VisualController {

    constructor(model, editorController) {
        super(model);
        this.editorController = editorController;
        this.item = null;
        this.databasesItem = null;
        this.dataSourcesItem = null;
        this.pagesItem = null;
        this.pageItems = {};

        this.databases   = [];
        this.dataSources = {};
        this.pageLinks   = {};
    }
    init() {
        this.model.databases.forEach(database => this.createDatabase(database));

        // dataSources
        if (this.model.data.dataSources) {
            for (const name in this.model.data.dataSources) {
                const dataSource = this.model.dataSources[name];
                this.dataSources[name] = new DataSourceController(dataSource, null, this);
                this.dataSources[name].init();
            }
        }

        // pageLinks
        if (this.model.data.pageLinks) {
            for (const name in this.model.data.pageLinks) {
                const pageLink = this.model.pageLinks[name];
                this.pageLinks[name] = new PageLinkController(pageLink, null);
                this.pageLinks[name].init();
            }
        }
    }

    createDatabase(model) {
        const database = new DatabaseController(model, this);
        database.init();
        this.databases.push(database);
    }

    createTree(item) {
        this.item = item;

        // databases
        this.databasesItem = this.item.addItem('Databases');
        if (this.model.data.databases) {
            for (const name in this.model.data.databases) {
                this.addDatabaseItem(name);
            }
        }

        // data sources
        this.dataSourcesItem = this.item.addItem('Data Sources');
        if (this.model.data.dataSources) {
            for (const name in this.model.data.dataSources) {
                const dataSourceData = this.model.data.dataSources[name];
                this.addDataSourceItem(dataSourceData, name);
            }
        }

        // pages
        this.pagesItem = this.item.addItem('Pages', 'opened');
        if (this.model.data.pageLinks) {
            for (const name in this.model.data.pageLinks) {
                const pageLinkData = this.model.data.pageLinks[name];
                this.pageItems[name] = this.addPageLinkItem(pageLinkData, name);
            }
        }
    }

    addDatabaseItem(name) {
        const database = this.getObject('databases', name);
        const caption = `${database.model.getClassName()}: ${database.model.getName()}`;
        const databaseItem = this.databasesItem.addItem(caption);
        databaseItem.ctrl = database;
        databaseItem.ctrl.createTree(databaseItem);
        return databaseItem;
    }

    addDataSourceItem(dataSourceData, name) {
        const caption = DataSourceController.prototype.getCaption(dataSourceData);
        const dataSourceItem = this.dataSourcesItem.addItem(caption);
        dataSourceItem.ctrl = this.dataSources[name];
        dataSourceItem.ctrl.createTree(dataSourceItem);
        return dataSourceItem;
    }

    addPageLinkItem(pageLinkData, name) {
        const caption = PageLinkController.prototype.getCaption(pageLinkData);
        const pageLinkItem = this.pagesItem.addItem(caption);
        pageLinkItem.node.className = 'node';
        pageLinkItem.ctrl = this.pageLinks[name];
        return pageLinkItem;
    }

    addPageItem(pageData, pageLinkData) {
        const pageLink = new PageLink(pageLinkData, this.model);
        const page = new Page(pageData, this.model, pageLink);
        const pageController = new PageController(page, null, pageLink);
        pageController.init();

        // pageItem
        const caption = PageController.prototype.getCaption(pageData);
        const pageItem = this.pagesItem.addItem(caption);
        pageItem.ctrl = pageController;
        pageItem.node.className = 'node';
        pageItem.ctrl.createTree(pageItem);
        return pageItem;
    }

    getActions() {
        return [
            {'action': 'newDatabase'  , 'caption': 'New Database'   },
            {'action': 'newDataSource', 'caption': 'New Data Source'},
            {'action': 'newPage'      , 'caption': 'New Page'       }
        ];
    }

    doAction(action) {
        switch (action) {
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
                console.log(action);
        }
    }

    async newPageAction() {
        const self = this;
        const result = await Page.prototype.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            const name = $("#myModal input[id='name']").val();
            const caption = $("#myModal input[id='caption']").val();
            const startup = $("#myModal select[id='startup']").val();
            const params = {
                name:name,
                caption:caption,
                startup:startup
            };
            self.model.newPage(params).then(([pageData, pageLinkData]) => {
                self.pageItems[name] = self.addPageItem(pageData, pageLinkData);
                self.pageItems[name].select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='name']").focus();
    }

    async newDataSourceAction() {
        const self = this;
        const result = await DataSource.prototype.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            const dsName = $("#myModal input[id='dsName']").val();
            const dsClass = $("#myModal select[id='dsClass']").val();
            const params = {
                name :dsName,
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

    async newDatabaseAction() {
        const self = this;
        const result = await Database.prototype.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(async () => {
            const _class = $("#myModal select[id='class']").val();
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
            const databaseData = await self.model.newDatabase(params);
            self.addDatabaseItem(databaseData).select();
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='name']").focus();
    }

    getPropList() {
        const propList = super.getPropList();
        propList.options['authentication'] = ['true', 'false'];
        propList.options['lang']           = ['en'  , 'ru'   ];
        return propList;
    }

    getItem() {
        return {
            ctrl  : this,
            title : this.model.getName(),
            opened: true,
            items : [
                {
                    title: 'Databases',
                    // items: Object.keys(this.databases).map(name => this.databases[name].getItem())
                    items: this.databases.map(database => database.getItem())
                },
                {
                    title: 'Data Sources',
                    items: Object.keys(this.dataSources).map(name => this.dataSources[name].getItem())
                },
                {
                    title : 'Pages',
                    opened: true,
                    items : Object.keys(this.pageLinks).map(name => this.pageLinks[name].getItem())
                }
            ]
        };
    }

}

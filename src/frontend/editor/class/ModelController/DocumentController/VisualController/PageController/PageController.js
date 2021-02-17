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
            {'action': ''             , 'caption': '-'              },
            {'action': 'moveUp'       , 'caption': 'Move Up'        },
            {'action': 'moveDown'     , 'caption': 'Move Down'      },
            {'action': ''             , 'caption': '-'              },
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

    async actionNewForm() {
        const result = await Form.prototype.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(async () => {
            const params = {
                name:$("#myModal input[id='name']").val(),
                caption:$("#myModal input[id='caption']").val(),
                class:$("#myModal select[id='formClass']").val()
            };
            const formData = await this.model.newForm(params);
            this.addFormItem(formData).select();
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
            const dataSourceData = await DataSource.create(this.model, params);
            this.addDataSourceItem(dataSourceData).select();
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='dsName']").focus();
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

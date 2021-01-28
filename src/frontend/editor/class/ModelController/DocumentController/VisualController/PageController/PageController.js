class PageController extends VisualController {

    constructor(model, item, pageLink) {
        super(model);
        this.item      = item;
        this.pageLink  = pageLink;
        this.itemForms = null;
        this.dataSources = {};
        this.forms       = {};
    }

    init() {
        // console.log('PageController.init');

        // dataSources
        if (this.model.data.dataSources) {
            for (const name in this.model.data.dataSources) {
                const dataSource = this.model.dataSources[name];
                this.dataSources[name] = new DataSourceController(dataSource, null, this);
                this.dataSources[name].init();
            }
        }

        // forms
        if (this.model.data.forms) {
            for (const name in this.model.data.forms) {
                const form = this.model.forms[name];
                this.forms[name] = new FormController(form, null);
                this.forms[name].init();
            }
        }
    }

    createTree(item) {
        if (item) this.item = item;

        // data sources
        this.dataSourcesItem = this.item.addItem('Data Sources');
        if (this.model.data.dataSources) {
            for (const name in this.model.data.dataSources) {
                const dataSourceData = this.model.data.dataSources[name];
                this.addDataSourceItem(dataSourceData, name);
            }
        }

        // forms
        this.itemForms = this.item.addItem('Forms');
        if (this.model.data.forms) {
            for (const name in this.model.data.forms) {
                const formData = this.model.data.forms[name];
                this.addFormItem(formData, name);
            }
        }
    }

    addDataSourceItem(dataSourceData, name) {
        const caption = DataSourceController.prototype.getCaption(dataSourceData);
        const dataSourceItem = this.dataSourcesItem.addItem(caption);
        dataSourceItem.ctrl = this.dataSources[name];
        dataSourceItem.ctrl.createTree(dataSourceItem);
        return dataSourceItem;
    }

    addFormItem(formData, name) {
        const caption = FormController.prototype.getCaption(formData);
        const itemForm = this.itemForms.addItem(caption);
        itemForm.ctrl = this.forms[name];
        itemForm.ctrl.createTree(itemForm);
        return itemForm;
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

    async doAction(action) {
        switch (action) {
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
                console.log(action);
        }
    }

    async actionNewForm() {
        const self = this;
        const result = await Form.prototype.getView('new.html');
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            const params = {
                name:$("#myModal input[id='name']").val(),
                caption:$("#myModal input[id='caption']").val(),
                class:$("#myModal select[id='formClass']").val()
            };
            self.model.newForm(params).then((formData) => {
                self.addFormItem(formData).select();
                $('#myModal').modal('hide');
            });
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
            DataSource.create(self.model, params).then((dataSourceData) => {
                self.addDataSourceItem(dataSourceData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='dsName']").focus();
    }

    getPropList() {
        const propList = super.getPropList();
        propList.list['menu']    = this.pageLink.data['@attributes']['menu'];
        propList.list['startup'] = this.pageLink.data['@attributes']['startup'];
        propList.options['startup'] = ['true', 'false'];
        return propList;
    }

    setProperty(name, value) {
        if (name === 'startup' || name === 'menu') {
            this.pageLink.setValue(name, value);
        } else  {
            ModelController.prototype.setProperty.call(this, name, value);
        }
    }

    getItem() {
        return {
            ctrl : this,
            title: this.model.getName(),
            items: [
                {
                    title: 'Data Sources',
                    items: Object.keys(this.dataSources).map(name => this.dataSources[name].getItem())
                },
                {
                    title: 'Forms',
                    items: Object.keys(this.forms).map(name => this.forms[name].getItem())
                }
            ]
        };
    }
}

class FormController extends Controller {

    static create(model, parent) {
        // console.log('FormController.create', model.getFullName());
        const customClassName = `${model.getPage().getName()}${model.getName()}Controller`;
        if (eval(`typeof ${customClassName}`) === 'function') {
            const CustomClass = eval(customClassName);
            // console.log('CustomClass:', CustomClass);
            return new CustomClass(model, parent);
        }
        /*if (model.data.js) {
            const CustomClass = eval(model.data.js);
            if (!CustomClass) throw new Error(`custom class of "${model.getFullName()}" form does not return type`);
            return new CustomClass(model, parent);
        }*/
        return eval(`new ${model.getClassName()}Controller(model, parent);`);
    }
    constructor(model, parent) {
        super(model, parent);
        this.fields = {};
    }
    init() {
        for (const field of this.model.fields) {
            const ctrl = this.fields[field.getName()] = FieldController.create(field, this);
            ctrl.init();
        }
    }
    deinit() {
        // console.log('FormController.deinit:', this.model.getFullName());
        for (const name in this.fields) {
            this.fields[name].deinit();
        }
        super.deinit();
    }
    isValid() {
        return true;
    }
    async openPage(options) {
        return this.getPageController().openPage(options);
    }
    getPageController() {
        return this.parent;
    }
    isChanged() {
        return false;
    }
    async onFieldChange(e) {
        // console.log('FormController.onFieldChange', this.model.getFullName());
        await this.getPageController().onFormChange(e);
    }
    getUpdated() {
        return this.state.updated;
    }
    invalidate() {
        this.state.updated = Date.now();
    }
    getActions() {
        return this.model.data.actions.map(action => ({
            name : action.name,
            title: action.caption
        }));
        /*
        return Object.keys(this.model.data.actions).map(name => {
            const action = this.model.data.actions[name];
            return {
                name : action.name,
                title: action.caption
            };
        });*/
    }
    onActionsClick = async li => {
        // console.log('Toolbar.onActionsClick:', li);
        // const action = this.model.data.actions[li.dataset.action];
        const action = this.model.data.actions.find(data => data.name === li.dataset.action);
        const result = await this.onActionClick(action, this.getActiveRow(true));
        if (!result) alert(`no handler for ${action.name}`);
    }
    async onActionClick(action, row) {
        console.log('FormController.onActionClick', action, row);
    }
    getField(name) {
        return this.fields[name];
    }
}

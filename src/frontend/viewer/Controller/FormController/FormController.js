class FormController extends Controller {

    static create(model, parent) {
        // console.log('FormController.create', model.getFullName());
        const page = model.getPage();
        const customClassName = `${page.getName()}${model.getName()}FormController`;
        const CustomClass = FrontHostApp.getClassByName(customClassName);
        const GeneralClass = FrontHostApp.getClassByName(`${model.getClassName()}Controller`);
        const Class = CustomClass ? CustomClass : GeneralClass;
        return new Class(model, parent);
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
    async onActionClick(name, row) {
        console.log('FormController.onActionClick', name, row);
    }
    getField(name) {
        return this.fields[name];
    }
}
window.QForms.FormController = FormController;

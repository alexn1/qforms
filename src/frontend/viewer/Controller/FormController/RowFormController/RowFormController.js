class RowFormController extends FormController {
    constructor(model, parent) {
        super(model, parent);
        this.state = {
            updated: Date.now(),
            mode   : 'edit',
            hasNew : false,
            changed: false,
            valid  : true
        };
    }

    init() {
        super.init();
        this.model.on('refresh', this.onModelRefresh);
        this.model.on('insert' , this.onModelInsert);
        this.model.on('update' , this.onModelUpdate);
        if (this.model.getDefaultDataSource().getClassName() === 'SqlDataSource') {
            this.state.mode = 'view';
        }
        this.calcState();
    }

    deinit() {
        // console.log('RowFormController.deinit', this.model.getFullName());
        this.model.off('refresh', this.onModelRefresh);
        this.model.off('insert' , this.onModelInsert);
        this.model.off('update' , this.onModelUpdate);
        super.deinit();
    }

    calcState() {
        this.state.hasNew  = this.model.hasNew();
        this.state.changed = this.isChanged();
        this.state.valid   = this.isValid();
        if (this.state.hasNew) {
            this.state.mode = 'edit';
        }
        // console.log('changed:', changed);
        // console.log('hasNew:', hasNew);
    }

    refill() {
        console.log('RowFormController.refill', this.model.getFullName());
        for (const name in this.fields) {
            this.fields[name].refill();
        }
    }

    onModelRefresh = e => {
        console.log('RowFormController.onModelRefresh', this.model.getFullName());
        if (!this.view) return;
        this.refill();
        this.invalidate();
        this.rerender();
    }

    onModelInsert = e => {
        console.log('RowFormController.onModelInsert', this.model.getFullName());
        this.refill();
        this.invalidate();
        this.calcState();
        this.parent.onFormInsert(e);
    }

    onModelUpdate = e => {
        console.log('RowFormController.onModelUpdate', this.model.getFullName());
        this.refill();
        this.invalidate();
        this.calcState();
        this.parent.onFormUpdate(e);
    }

    isValid() {
        // console.log('RowFormController.isValid', this.model.getFullName());
        for (const name in this.fields) {
            const field = this.fields[name];
            if (!field.isValid()) return false;
        }
        return true;
    }
    validate() {
        for (const name in this.fields) {
            this.fields[name].validate();
        }
    }
    clearFieldsError() {
        for (const name in this.fields) {
            this.fields[name].setError(null);
        }
    }
    onSaveClick = async () => {
        console.log('RowFormController.onSaveClick');
        this.validate();
        if (this.isValid()) {
            await this.model.update();
        } else {
            console.error(`cannot update invalid row form: ${this.model.getFullName()}`);
            this.rerender();
        }
    }

    onDiscardClick = () => {
        console.log('RowFormController.onDiscardClick', this.model.getFullName());
        const changedFields = [];
        const row = this.model.getRow();
        for (const name in this.fields) {
            const field = this.fields[name];
            if (field.isChanged(row) || !field.isValid()) {
                changedFields.push(name);
            }
        }
        // console.log('changedFields:', changedFields);
        this.model.discard(changedFields);

        // refill changed fields
        changedFields.forEach(name => {
            this.fields[name].refill();
        });

        // ui
        this.calcState();
        this.rerender();

        // event
        this.parent.onFormDiscard(this);
    }

    onRefreshClick = async () => {
        // console.log('RowFormController.onRefreshClick', this.model.getFullName());
        await this.model.refresh();
    }

    isChanged() {
        // console.log('RowFormController.isChanged', this.model.getFullName());
        if (this.model.isChanged()) return true;
        const row = this.model.getRow();
        for (const name in this.fields) {
            const field = this.fields[name];
            if (field.isChanged(row)) return true;
        }
        return false;
    }

    async onFieldChange(e) {
        // console.log('RowFormController.onFieldChange', this.model.getFullName());
        this.calcState();
        this.invalidate();
        await super.onFieldChange(e);
    }

    onEditClick = e => {
        // console.log('RowFormController.onEditClick', this);
        this.state.mode = 'edit';
        this.rerender();
    }
    onCancelClick = e => {
        // console.log('RowFormController.onCancelClick', this);
        this.state.mode = 'view';
        this.rerender();
    }
    getViewClass() {
        // console.log('RowFormController.getViewClass', this.model.getFullName());
        return RowFormView;
    }
    getActiveRow(withChanges) {
        return this.model.getRow(withChanges);
    }
    getMode() {
        return this.state.mode;
    }
}
window.QForms.RowFormController = RowFormController;

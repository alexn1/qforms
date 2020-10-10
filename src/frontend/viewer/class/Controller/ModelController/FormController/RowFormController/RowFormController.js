'use strict';

class RowFormController extends FormController {
    constructor(model, view, parent) {
        super(model, view, parent);
        this.toolbar = null;
        this.state = {
            mode   : 'view',
            hasNew : false,
            changed: false,
            valid  : true
        };
        this.tooltip = {};
        this.formGrid = null;
    }

    init() {
        super.init();

        // listeners
        this.model.getDataSource().on('rowUpdate', this.listeners.rowUpdate = this.onRowUpdate.bind(this));

        this.calcState();
        this.toolbar = ApplicationController.createReactComponent(this.view.querySelector('.toolbar'), Toolbar, {
            ctrl: this
        });
        this.formGrid = ApplicationController.createReactComponent(this.view.querySelector('.formgrid'), FormGrid, {
            ctrl: this
        });
    }

    deinit() {
        console.log('RowFormController.deinit', this.model.getFullName());
        this.model.getDataSource().off('rowUpdate', this.listeners.rowUpdate);
        const row = this.model.getRow();
        for (const name in this.fields) {
            this.fields[name].deinit(row);
        }
        /*for (const name in this.controls) {
            this.controls[name].deinit();
        }*/
        ReactDOM.unmountComponentAtNode(this.view.querySelector('.toolbar'));
        ReactDOM.unmountComponentAtNode(this.view.querySelector('.formgrid'));
        super.deinit();
    }

    onActionsClick = async li => {
        // console.log('Toolbar.onActionsClick:', li);
        const action = this.model.data.actions[li.dataset.action];
        const result = await this.onActionClick(action, this.model.getRow());
        if (!result) alert(`no handler for ${action.name}`);
    }

    calcState() {
        this.state.hasNew  = this.model.hasNew();
        this.state.changed = this.isChanged();
        this.state.valid   = this.isValid();
        if (this.model.hasNew()) {
            this.state.mode = 'edit';
        }
        // console.log('changed:', changed);
        // console.log('hasNew:', hasNew);
    }

    getActions() {
        return Object.keys(this.model.data.actions).map(name => {
            const action = this.model.data.actions[name];
            return {
                name : action.name,
                title: action.caption
            };
        });
    }

    // fill() {
    //     console.log('RowFormController.fill', this.model.getFullName());
    //     super.fill();
    // }

    onRowUpdate(e) {
        console.log('RowFormController.onRowUpdate', this.model.getFullName(), e);
        for (const name in this.fields) {
            this.fields[name].refill();
        }
        this.calcState();
        this.rerender();
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

    // getFieldValue(name) {
    //     return this.model.getFieldValue(name);
    // }

    async onSaveClick() {
        console.log('RowFormController.onSaveClick');
        for (const name in this.fields) {
            this.fields[name].validate();
        }
        if (this.isValid()) {
            await this.model.update();
        } else {
            console.error(`cannot update invalid row form: ${this.model.getFullName()}`);
            this.rerender();
        }
    }

    onDiscardClick() {
        console.log('RowFormController.onDiscardClick', this.model.getFullName());
        const changedFields = [];
        const row = this.model.getRow();
        for (const name in this.fields) {
            const field = this.fields[name];
            if (field.isChanged(row) || !field.isValid()) {
                changedFields.push(field);
            }
        }

        if (this.model.getDataSource().isChanged()) {
            this.model.getDataSource().discard();
        }

        // refill changed fields
        changedFields.forEach(field => {
            field.refill();
        });

        // ui
        this.calcState();
        this.rerender();

        // event
        this.parent.onFormDiscard(this);
    }

    onRefresh() {
        console.log('RowFormController.onRefresh', this.model.getFullName());
        this.model.refresh();
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

    onFieldChange(e) {
        console.log('RowFormController.onFieldChange', this.model.getFullName());
        this.calcState();
        this.rerender();
        super.onFieldChange(e);
    }

    async onActionClick(action, row) {
        console.log('RowFormController.onActionClick', action, row);
    }

    rerender() {
        this.toolbar.rerender();
        this.formGrid.rerender();
    }

    onEditClick = e => {
        console.log('RowFormController.onEditClick', this);
        this.state.mode = 'edit';
        this.rerender();
    }
    onCancelClick = e => {
        console.log('RowFormController.onCancelClick', this);
        this.state.mode = 'view';
        this.rerender();
    }
}


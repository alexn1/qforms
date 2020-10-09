'use strict';

class RowFormController extends FormController {
    constructor(model, view, parent) {
        super(model, view, parent);
        this.fieldViews   = {};
        this.controlViews = {};
        this.toolbar = null;
        this.state = {};
        this.tooltip = {};
        this.formGrid = null;
    }

    init() {
        super.init();

        // fieldViews
        for (const name in this.model.fields) {
            const view = this.view.querySelector(`#${this.model.getPage().id}_${this.model.getName()}_${name}`);
            if (view) {
                this.fieldViews[name] = view;
            }
            /*this.tooltip[name] = ApplicationController.createReactComponent(this.view.querySelector(`.tooltip.${name}`), Tooltip, {
                position: 'left',
                type    : 'alert'
            });*/
        }

        // controlViews
        for (const name in this.model.controls) {
            const view = this.view.querySelector(`.${this.model.getPage().id}_${this.model.getName()}_${name}`);
            if (view === null) {
                continue;
            }
            this.controlViews[name] = view;
        }

        // listeners
        this.model.getDataSource().on('rowUpdate', this.listeners.rowUpdate = this.onRowUpdate.bind(this));

        this.state.changed = false;
        this.state.hasNew  = this.model.hasNew();
        this.state.valid   = true;

        this.toolbar = ApplicationController.createReactComponent(this.view.querySelector('.toolbar'), Toolbar, {
            ctrl: this
        });

        this.formGrid = ApplicationController.createReactComponent(this.view.querySelector('.grid2'), FormGrid, {
            ctrl: this
        });
    }

    deinit() {
        console.log('RowFormController.deinit', this.model.getFullName());
        this.model.getDataSource().off('rowUpdate', this.listeners.rowUpdate);

        const row = this.model.getRow();

        for (const name in this.fields) {
            const view = this.fieldViews[name];
            this.fields[name].deinit(row, view);
            // ReactDOM.unmountComponentAtNode(this.view.querySelector(`.tooltip.${name}`));
        }
        for (const name in this.controls) {
            this.controls[name].deinit();
        }
        ReactDOM.unmountComponentAtNode(this.view.querySelector('.toolbar'));
        ReactDOM.unmountComponentAtNode(this.view.querySelector('.grid2'));
        super.deinit();
    }

    onActionsClick = async li => {
        // console.log('Toolbar.onActionsClick:', li);
        const action = this.model.data.actions[li.dataset.action];
        const result = await this.onActionClick(action, this.model.getRow());
        if (!result) alert(`no handler for ${action.name}`);
    }

    calcState() {
        this.state.changed = this.isChanged();
        this.state.hasNew  = this.model.hasNew();
        this.state.valid   = this.isValid();
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



    fill() {
        // console.log('RowFormController.fill');
        super.fill();

        const row = this.model.getRow();

        // fields
        for (const name in this.fields) {
            const view = this.fieldViews[name];
            if (view) {
                this.fields[name].fill(row, view);
            }
        }

        // controls
        for (const name in this.controls) {
            const view = this.controlViews[name];
            if (view) {
                this.controls[name].fill(row, view);
            }
        }
    }

    onRowUpdate(e) {
        console.log('RowFormController.onRowUpdate', this.model.getFullName(), e);

        this.calcState();
        this.toolbar.rerender();

        for (const name in this.fields) {
            const view = this.fieldViews[name];
            if (view) {
                this.fields[name].refill(this.model.getRow(), view);
            }
        }
        this.parent.onFormUpdate(e);
    }

    isValid() {
        console.log('RowFormController.isValid', this.model.getFullName());
        let isValid = true;
        for (const name in this.fields) {
            const field = this.fields[name];
            const view = this.fieldViews[name];
            if (view) {
                if (!field.isValid(view)) isValid = false;
            }
        }
        return isValid;
    }

    getFieldValue(name) {
        return this.model.getFieldValue(name);
    }

    updateErrorClasses() {
        for (const name in this.fields) {
            const field = this.fields[name];
            const view = this.fieldViews[name];
            if (view) {
                field.updateErrorClass(view, field.isValid(view));
            }
        }
    }

    async onSaveClick() {
        console.log('RowFormController.onSaveClick');
        const valid = this.isValid();
        this.updateErrorClasses();
        if (valid) {
            await this.model.update();
        } else {
            console.error(`cannot update invalid row form: ${this.model.getFullName()}`);
        }
    }

    onDiscardClick() {
        console.log('RowFormController.onDiscardClick', this.model.getFullName());
        const changedFields = [];
        const row = this.model.getRow();
        for (const name in this.fields) {
            const field = this.fields[name];
            const view = this.fieldViews[name];
            if (view && field.isChanged(row, view)) {
                changedFields.push(field);
            }
        }

        if (this.model.getDataSource().isChanged()) {
            this.model.getDataSource().discard();
        }

        // refill changed fields
        changedFields.forEach(field => {
            const name = field.model.getName();
            const view = this.fieldViews[name];
            field.refill(row, view);
        });

        // ui
        this.calcState();
        this.toolbar.rerender();

        // event
        this.parent.onFormDiscard(this);
    }

    onRefresh() {
        console.log('RowFormController.onRefresh', this.model.getFullName());
        this.model.refresh();
    }

    isChanged() {
        console.log('RowFormController.isChanged', this.model.getFullName());
        if (this.model.isChanged()) return true;
        const row = this.model.getRow();
        for (const name in this.fields) {
            const field = this.fields[name];
            const view = this.fieldViews[name];
            if (field.isChanged(row, view)) return true;
        }
        return false;
    }

    onFieldChange(e) {
        console.log('RowFormController.onFieldChange', this.model.getFullName());
        this.calcState();
        this.toolbar.rerender();
        this.formGrid.rerender();
        super.onFieldChange(e);
    }

    async onActionClick(action, row) {
        console.log('RowFormController.onActionClick', action, row);
    }
}
